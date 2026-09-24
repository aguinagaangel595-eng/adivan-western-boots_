(function(){
'use strict';
const {$,$$,money,cart,toast,watch}=ADIVAN;
const D=window.ADIVAN_DATA;
const NO_COLOR=['Único'];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const q=new URLSearchParams(location.search);
const st={g:q.get('g')||'Todo',sub:q.get('sub')||'Todas',gen:q.get('genero')||'Todos',sort:'default'};
if(!D.grupos.includes(st.g)) st.g='Todo';
const focusId=+q.get('p')||0;

/* ── filtros ── */
function chip(label,pressed,attrs='',cls=''){return `<button class="chip ${cls}" aria-pressed="${pressed}" ${attrs}>${label}</button>`}
function renderFilters(){
  $('#fGroups').innerHTML=D.grupos.map(g=>chip(g,st.g===g,`data-g="${g}"`,g==='Ofertas'?'sale':'')).join('');
  const b=$('#fBoots');
  if(st.g==='Botas'){
    b.innerHTML=`<div class="sub-row"><span class="lbl">Tipo</span>${D.subBota.map(s=>chip(s,st.sub===s,`data-sub="${s}"`,'sm')).join('')}</div>
    <div class="sub-row"><span class="lbl">Para</span>${['Todos','Dama','Hombre'].map(s=>chip(s,st.gen===s,`data-gen="${s}"`,'sm')).join('')}</div>`;
  }else b.innerHTML='';
}
$('#fGroups').addEventListener('click',e=>{const b=e.target.closest('[data-g]'); if(!b) return; st.g=b.dataset.g; st.sub='Todas'; st.gen='Todos'; update()});
$('#fBoots').addEventListener('click',e=>{
  const s=e.target.closest('[data-sub]'), g=e.target.closest('[data-gen]');
  if(s){st.sub=s.dataset.sub; update()} if(g){st.gen=g.dataset.gen; update()}
});
$('#sort').addEventListener('change',e=>{st.sort=e.target.value; update(false)});

function filtered(){
  let base=D.products;
  if(st.g==='Ofertas') base=base.filter(p=>p.originalPrice);
  else if(st.g!=='Todo'){
    base=base.filter(p=>p.group===st.g);
    if(st.g==='Botas'&&st.sub!=='Todas') base=base.filter(p=>p.category===st.sub);
    if(st.g==='Botas'&&st.gen!=='Todos') base=base.filter(p=>p.genero===st.gen);
  }
  base=[...base];
  if(st.sort==='asc') base.sort((a,b)=>a.price-b.price);
  if(st.sort==='desc') base.sort((a,b)=>b.price-a.price);
  return base;
}

/* ── tarjeta de producto ── */
const lb={imgs:[],i:0};
function card(p,idx){
  const s={ci:0,ii:0,si:0,talla:null};
  const hasSw=p.swatches.length>0, hasGr=p.grabadoPatrones.length>0, hasVar=p.variants.length>0;
  const el=document.createElement('article'); el.className='pcard'; el.id='p-'+p.id; el.style.setProperty('--d',(Math.min(idx,12)*0.05)+'s');
  const imgs=()=> hasGr&&p.grabadoImages.length ? p.grabadoImages : hasVar ? p.variants[s.ci].images : p.image?[p.image]:['assets/adivan-logo-legado.png'];
  const colorName=()=> hasSw ? p.swatches[s.si].name : (hasGr||!hasVar||NO_COLOR.includes(p.variants[s.ci].color)) ? undefined : p.variants[s.ci].color;
  const tallaHtml=p.tallas.length?`<div class="opt"><div class="ol"><span>Talla</span></div><div class="row" role="group" aria-label="Talla">${p.tallas.map(t=>`<button class="o-btn o-size" data-t="${t}" aria-pressed="false">${t}</button>`).join('')}</div><p class="err" hidden>Selecciona una talla</p></div>`:'';
  let colorHtml='';
  if(hasSw){
    colorHtml=`<div class="opt"><div class="ol"><span>Color</span><b data-swname>${esc(p.swatches[0].name)}</b></div><div class="row" role="group" aria-label="Color">${p.swatches.map((c,i)=>`<button class="sw" data-sw="${i}" aria-pressed="${i===0}" aria-label="${esc(c.name)}" title="${esc(c.name)}" style="background:${c.hex2?`linear-gradient(135deg,${c.hex} 50%,${c.hex2} 50%)`:c.hex}"></button>`).join('')}</div><p style="font-size:11px;color:#8a5a2b;margin-top:6px">Foto de referencia. Confirmamos con muestra real.</p></div>`;
  }else if(hasVar&&!hasGr){
    if(p.variants.length>1) colorHtml=`<div class="opt"><div class="ol"><span>Color</span></div><div class="row" role="group" aria-label="Color">${p.variants.map((v,i)=>`<button class="o-btn" data-c="${i}" aria-pressed="${i===0}">${esc(v.color)}</button>`).join('')}</div></div>`;
    else if(!NO_COLOR.includes(p.variants[0].color)&&p.variants[0].color!=='Surtido') colorHtml=`<div class="opt"><div class="ol"><span>Color</span><b>${esc(p.variants[0].color)}</b></div></div>`;
  }
  const grHtml=hasGr?`<div class="opt">${p.grabadoCatalogUrl?`<a class="gr-link" href="${p.grabadoCatalogUrl}" target="_blank" rel="noopener">Ver catálogo de grabados ↗</a>`:''}<div class="ol" style="margin-top:12px"><span>¿Qué grabado quieres?</span></div><input class="gr-in" data-gr placeholder="Ej. ${esc(p.grabadoPatrones.join(', '))}..." aria-label="Grabado que quieres"></div>`:'';
  el.innerHTML=`<div class="pimg"><button class="zoom" aria-label="Ver imagen ampliada de ${esc(p.name)}"></button><img alt="" loading="lazy"><span class="badge">${esc(p.category)}${p.genero?' · '+p.genero:''}</span>${p.originalPrice?'<span class="badge sale">Oferta</span>':''}${p.referenceImage?'<span class="ref">Imagen de referencia</span>':''}<span data-nav></span><div class="dots" data-dots></div></div>
  <div class="pbody"><div><h3>${esc(p.name)}</h3><p class="desc">${esc(p.description)}</p></div>${colorHtml}${grHtml}${tallaHtml}
  <div class="pfoot"><div class="pprice">${p.originalPrice?`<s>${money(p.originalPrice)}</s>`:''}<b class="${p.originalPrice?'sale':''}">$${p.price.toLocaleString('es-MX')}</b><span>MXN</span></div><button class="pill" data-add>Agregar<span class="sr"> al carrito</span></button></div></div>`;
  const img=$('img',el), dots=$('[data-dots]',el), navSlot=$('[data-nav]',el);
  function paint(){
    const L=imgs(); if(s.ii>=L.length) s.ii=0;
    img.src=L[s.ii]; img.alt=p.name+(colorName()?' - '+colorName():''); if(p.id===38) img.style.objectFit='contain';
    dots.innerHTML=L.length>1?L.map((_,i)=>`<i class="${i===s.ii?'on':''}"></i>`).join(''):'';
    navSlot.innerHTML=L.length>1?'<button class="arrow prev" data-p aria-label="Foto anterior">‹</button><button class="arrow next" data-n aria-label="Foto siguiente">›</button>':'';
  }
  paint();
  el.addEventListener('click',e=>{
    const L=imgs();
    if(e.target.closest('[data-p]')){s.ii=(s.ii-1+L.length)%L.length; paint(); return}
    if(e.target.closest('[data-n]')){s.ii=(s.ii+1)%L.length; paint(); return}
    if(e.target.closest('.zoom')){openLb(L,s.ii,p.name); return}
    const c=e.target.closest('[data-c]'); if(c){s.ci=+c.dataset.c; s.ii=0; $$('[data-c]',el).forEach(b=>b.setAttribute('aria-pressed',b===c)); paint(); return}
    const sw=e.target.closest('[data-sw]'); if(sw){s.si=+sw.dataset.sw; $$('[data-sw]',el).forEach(b=>b.setAttribute('aria-pressed',b===sw)); $('[data-swname]',el).textContent=p.swatches[s.si].name; return}
    const t=e.target.closest('[data-t]'); if(t){s.talla=t.dataset.t; $$('[data-t]',el).forEach(b=>b.setAttribute('aria-pressed',b===t)); const er=$('.err',el); if(er) er.hidden=true; return}
    if(e.target.closest('[data-add]')){
      if(p.tallas.length&&!s.talla){const er=$('.err',el); er.hidden=false; return}
      const gr=hasGr?($('[data-gr]',el).value.trim()||'Sin especificar'):undefined;
      cart.add({id:p.id,name:p.name,price:p.price,image:imgs()[0],talla:s.talla||undefined,color:colorName(),grabado:gr});
      s.talla=null; $$('[data-t]',el).forEach(b=>b.setAttribute('aria-pressed','false'));
    }
  });
  return el;
}

/* ── visor de imágenes ── */
const lbEl=$('#lb'), lbImg=$('#lbImg');
function openLb(list,i,name){lb.imgs=list;lb.i=i;lbImg.alt=name;lbImg.src=list[i];lbEl.classList.add('open');lbEl.setAttribute('aria-hidden','false');$('#lbPrev').hidden=$('#lbNext').hidden=list.length<2;document.body.classList.add('lock')}
function closeLb(){lbEl.classList.remove('open');lbEl.setAttribute('aria-hidden','true');document.body.classList.remove('lock')}
$('#lbClose').addEventListener('click',closeLb);
lbEl.addEventListener('click',e=>{if(e.target===lbEl) closeLb()});
$('#lbPrev').addEventListener('click',()=>{lb.i=(lb.i-1+lb.imgs.length)%lb.imgs.length;lbImg.src=lb.imgs[lb.i]});
$('#lbNext').addEventListener('click',()=>{lb.i=(lb.i+1)%lb.imgs.length;lbImg.src=lb.imgs[lb.i]});
addEventListener('keydown',e=>{if(!lbEl.classList.contains('open'))return; if(e.key==='Escape')closeLb(); if(e.key==='ArrowLeft')$('#lbPrev').click(); if(e.key==='ArrowRight')$('#lbNext').click()});

/* ── pintar ── */
function update(rebuildFilters=true){
  if(rebuildFilters) renderFilters();
  const list=filtered(), grid=$('#grid');
  $('#count').textContent=list.length+(list.length===1?' pieza':' piezas');
  grid.innerHTML='';
  if(!list.length){
    grid.innerHTML=`<div class="empty-shop"><h3>Próximamente en ${esc(st.g)}</h3><p>Todavía no tenemos fotos listas de esta categoría. Escríbenos y te avisamos en cuanto esté disponible.</p><a class="pill" href="https://wa.me/${ADIVAN.WA}" target="_blank" rel="noopener">Avísenme por WhatsApp</a></div>`;
  }else list.forEach((p,i)=>grid.appendChild(card(p,i)));
  const u=new URL(location.href); u.search='';
  if(st.g!=='Todo') u.searchParams.set('g',st.g);
  if(st.g==='Botas'&&st.sub!=='Todas') u.searchParams.set('sub',st.sub);
  if(st.g==='Botas'&&st.gen!=='Todos') u.searchParams.set('genero',st.gen);
  try{history.replaceState(null,'',u)}catch(e){}
}
update();
if(focusId){
  const el=$('#p-'+focusId);
  if(el){setTimeout(()=>{el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.add('hit');setTimeout(()=>el.classList.remove('hit'),3200)},500)}
}
})();
