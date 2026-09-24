/* Panel de pedidos: lee y actualiza Supabase con la sesión del dueño (login por correo y contraseña).
   La seguridad real la da RLS en Supabase: sin sesión no se puede leer nada. */
(function(){
'use strict';
const CFG=window.ADIVAN_CFG||{};
const app=document.getElementById('app');
const SKEY='adivan_admin_session';
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const money=n=>n==null?'—':new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(n);

function getSession(){try{return JSON.parse(localStorage.getItem(SKEY)||'null')}catch(e){return null}}
function setSession(s){try{s?localStorage.setItem(SKEY,JSON.stringify(s)):localStorage.removeItem(SKEY)}catch(e){}}

async function auth(path,body){
  const r=await fetch(CFG.url+'/auth/v1/'+path,{method:'POST',headers:{apikey:CFG.anon,'Content-Type':'application/json'},body:JSON.stringify(body)});
  if(!r.ok) throw new Error('auth');
  const j=await r.json();
  return {access_token:j.access_token,refresh_token:j.refresh_token,expires_at:Date.now()+(j.expires_in-30)*1000};
}
async function token(){
  let s=getSession(); if(!s) return null;
  if(Date.now()>s.expires_at){
    try{s=await auth('token?grant_type=refresh_token',{refresh_token:s.refresh_token}); setSession(s)}catch(e){setSession(null); return null}
  }
  return s.access_token;
}
async function rest(path,opts={}){
  const t=await token(); if(!t) throw new Error('nosession');
  const r=await fetch(CFG.url+'/rest/v1/'+path,Object.assign({},opts,{headers:Object.assign({apikey:CFG.anon,Authorization:'Bearer '+t,'Content-Type':'application/json'},opts.headers||{})}));
  if(r.status===401){setSession(null); throw new Error('nosession')}
  if(!r.ok) throw new Error('rest '+r.status);
  return r.status===204?null:r.json();
}

function showLogin(err){
  app.innerHTML=`<div class="login"><form id="lf"><img src="assets/adivan-logo-legado.png" alt="ADIVAN"><h1>Panel de pedidos</h1>
  <label>Correo<input type="email" name="email" required autocomplete="username"></label>
  <label>Contraseña<input type="password" name="password" required autocomplete="current-password"></label>
  <p class="msg" role="alert">${err?esc(err):''}</p><button class="pill" type="submit">Entrar</button></form></div>`;
  document.getElementById('lf').addEventListener('submit',async e=>{
    e.preventDefault(); const f=new FormData(e.target); const btn=e.target.querySelector('button'); btn.disabled=true; btn.textContent='Entrando…';
    try{const s=await auth('token?grant_type=password',{email:f.get('email'),password:f.get('password')}); setSession(s); showPanel()}
    catch(_){showLogin('No pudimos iniciar sesión. Revisa tu correo y contraseña.')}
  });
}

async function showPanel(){
  app.innerHTML='<div class="a-wrap"><p style="color:var(--text-secondary)">Cargando…</p></div>';
  let pedidos=[],esc_=[];
  try{
    [pedidos,esc_]=await Promise.all([
      rest('pedidos?select=*&order=creado_en.desc&limit=100'),
      rest('conversaciones?select=*&estado=eq.requiere_humano&order=actualizada_en.desc')
    ]);
  }catch(e){ if(e.message==='nosession') return showLogin(); app.innerHTML='<div class="a-wrap"><p class="msg">No se pudieron cargar los datos ('+esc(e.message)+').</p></div>'; return; }

  const escHtml=esc_.length?esc_.map(c=>`<div class="a-card"><div><b>${esc(c.nombre_contacto||'Sin nombre')} · ${esc(c.telefono)}</b><p>${esc(c.motivo_escalacion||'Sin motivo registrado')}</p><small>${new Date(c.actualizada_en).toLocaleString('es-MX')}</small></div>
    <div class="acts"><a class="pill sm" style="background:#25D366;color:#fff" href="https://wa.me/${esc(c.telefono)}" target="_blank" rel="noopener">Abrir WhatsApp</a><button class="pill sm ghost" data-re="${esc(c.id)}">Reactivar agente</button></div></div>`).join('')
    :'<p style="color:var(--text-secondary)">Sin conversaciones pendientes de atención humana.</p>';

  const rows=pedidos.length?pedidos.map(p=>`<tr><td><code>${esc(p.folio)}</code></td><td><b>${esc(p.nombre_cliente)}</b><small>${esc(p.telefono)}</small></td>
    <td>${esc(p.producto_nombre)}<small>${esc([p.piel,p.color,p.talla&&'talla '+p.talla,'x'+p.cantidad].filter(Boolean).join(' · '))}</small><small>${money(p.precio_unitario)} c/u</small></td>
    <td>${esc(p.ciudad)}<small>${esc(p.direccion)}</small>${p.fecha_limite?'<small style="color:var(--accent)">Límite: '+esc(p.fecha_limite)+'</small>':''}${p.notas?'<small>'+esc(p.notas)+'</small>':''}</td>
    <td>${esc(p.forma_pago)}</td><td>${esc(p.estado)}</td><td><small>${new Date(p.creado_en).toLocaleString('es-MX')}</small></td></tr>`).join('')
    :'<tr><td colspan="7" style="color:var(--text-secondary)">Todavía no hay pedidos registrados.</td></tr>';

  app.innerHTML=`<div class="a-wrap"><div class="a-top"><h1>Panel ADIVAN · Pedidos</h1><div><button class="pill sm ghost" id="rf">Actualizar</button><button class="pill sm ghost" id="lo">Cerrar sesión</button></div></div>
  <section class="a-sec"><h2>Requieren atención ${esc_.length?'<span class="a-badge">'+esc_.length+'</span>':''}</h2>${escHtml}</section>
  <section class="a-sec"><h2>Pedidos (${pedidos.length})</h2><div class="tbl-wrap"><table><thead><tr><th>Folio</th><th>Cliente</th><th>Producto</th><th>Envío</th><th>Pago</th><th>Estado</th><th>Fecha</th></tr></thead><tbody>${rows}</tbody></table></div></section></div>`;
  document.getElementById('rf').addEventListener('click',showPanel);
  document.getElementById('lo').addEventListener('click',()=>{setSession(null);showLogin()});
  app.querySelectorAll('[data-re]').forEach(b=>b.addEventListener('click',async()=>{
    b.disabled=true;
    try{await rest('conversaciones?id=eq.'+encodeURIComponent(b.dataset.re),{method:'PATCH',body:JSON.stringify({estado:'activa'}),headers:{Prefer:'return=minimal'}}); showPanel()}
    catch(e){b.disabled=false; alert('No se pudo reactivar.')}
  }));
}

if(!CFG.url||!CFG.anon){
  app.innerHTML='<div class="a-wrap"><p class="msg">Falta configurar SUPABASE_URL y SUPABASE_ANON_KEY en Vercel para usar este panel.</p></div>';
}else if(getSession()) showPanel(); else showLogin();
})();
