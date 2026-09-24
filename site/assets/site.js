/* ADIVAN · piezas compartidas: navegación, carrito, footer, entorno, entradas */
(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const WA='524793203429';
const money=n=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(n)+' MXN';
const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const STAR='<svg viewBox="0 0 100 100" aria-hidden="true"><use href="#star"/></svg>';

/* ── símbolos SVG (estrella) ── */
document.body.insertAdjacentHTML('afterbegin',
`<div class="env" aria-hidden="true"></div><canvas id="dust" aria-hidden="true"></canvas>
<div class="spine" aria-hidden="true"><i></i><svg viewBox="0 0 100 100"><use href="#star"/></svg></div>
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="gA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2b98a"/><stop offset="1" stop-color="#b98a5c"/></linearGradient>
<linearGradient id="gB" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a97c50"/><stop offset="1" stop-color="#7d5732"/></linearGradient>
<g id="star"><polygon points="50,0 58,42 50,50" fill="url(#gA)"/><polygon points="50,0 42,42 50,50" fill="url(#gB)"/><polygon points="100,50 58,42 50,50" fill="url(#gA)"/><polygon points="100,50 58,58 50,50" fill="url(#gB)"/><polygon points="50,100 58,58 50,50" fill="url(#gB)"/><polygon points="50,100 42,58 50,50" fill="url(#gA)"/><polygon points="0,50 42,58 50,50" fill="url(#gA)"/><polygon points="0,50 42,42 50,50" fill="url(#gB)"/></g>
</defs></svg>
<a class="skip" href="#main">Saltar al contenido</a>`);

/* ── navegación ── */
const page=document.body.dataset.page||'';
const links=[['tienda.html','Tienda','tienda'],['nosotros.html','Nosotros','nosotros'],['artesania.html','Oficio','artesania'],['contacto.html','Contacto','contacto']];
const navLinks=links.map(([h,t,k])=>`<li><a href="${h}"${page===k?' aria-current="page"':''}>${t}</a></li>`).join('');
const menuLinks=links.map(([h,t])=>`<a href="${h}">${t}</a>`).join('');
document.body.insertAdjacentHTML('afterbegin',
`<header class="nav" id="nav">
  <a href="index.html" aria-label="ADIVAN, inicio"><img src="assets/adivan-logo-legado.png" alt="ADIVAN, Legado en cada paso"></a>
  <nav aria-label="Principal"><ul>${navLinks}</ul></nav>
  <div class="nav-actions">
    <button class="cart-btn" id="cartBtn" aria-label="Abrir carrito"><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 7h12l-1 13H7L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg><span class="cart-count" id="cartCount" aria-live="polite">0</span></button>
    <a class="pill wa-pill" href="https://wa.me/${WA}?text=${encodeURIComponent('Hola ADIVAN, quiero información')}" target="_blank" rel="noopener">WhatsApp</a>
    <button class="burger" id="burger" aria-label="Abrir menú" aria-expanded="false" aria-controls="menu"><i></i><i></i><i></i></button>
  </div>
</header>
<div class="menu" id="menu" aria-hidden="true"><nav aria-label="Menú móvil">${menuLinks}<a href="index.html">Inicio</a></nav></div>`);

/* ── carrito ── */
const KEY='adivan-rediseno-cart';
let items=[];
try{items=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){items=[]}
const same=(a,b)=>a.id===b.id&&(a.talla||'')===(b.talla||'')&&(a.color||'')===(b.color||'')&&(a.grabado||'')===(b.grabado||'');
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(items))}catch(e){}};
const total=()=>items.reduce((s,i)=>s+i.price*i.quantity,0);
const count=()=>items.reduce((s,i)=>s+i.quantity,0);

document.body.insertAdjacentHTML('beforeend',
`<div class="drawer-bg" id="drawerBg"></div>
<aside class="drawer" id="drawer" role="dialog" aria-label="Carrito" aria-hidden="true">
  <header><h2>Tu carrito</h2><button id="drawerClose" aria-label="Cerrar carrito">×</button></header>
  <div class="d-body" id="dBody"></div>
  <footer id="dFoot"></footer>
</aside>
<a class="wa-float" href="https://wa.me/${WA}" target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg></a>
<div class="toast" id="toast" role="status"></div>`);

const drawer=$('#drawer'), bg=$('#drawerBg'), dBody=$('#dBody'), dFoot=$('#dFoot');
function renderCart(){
  $('#cartCount').textContent=count(); $('#cartCount').classList.toggle('on',count()>0);
  if(!items.length){
    dBody.innerHTML='<div class="empty">'+STAR+'<p>Tu carrito está vacío.</p><a class="pill" href="tienda.html">Ver la tienda</a></div>'; dFoot.innerHTML=''; return;
  }
  dBody.innerHTML=items.map((it,idx)=>`<div class="line"><img src="${it.image}" alt="" width="72" height="72"><div class="l-info"><h3>${it.name}</h3><p>${[it.talla&&'Talla '+it.talla,it.color&&it.color,it.grabado&&'Grabado: '+it.grabado].filter(Boolean).join(' · ')}</p><span class="l-price">${money(it.price)}</span><div class="qty"><button data-q="${idx}" data-d="-1" aria-label="Menos">−</button><b>${it.quantity}</b><button data-q="${idx}" data-d="1" aria-label="Más">+</button><button class="rm" data-rm="${idx}" aria-label="Quitar">Quitar</button></div></div></div>`).join('');
  dFoot.innerHTML=`<div class="tot"><span>Total estimado</span><b>${money(total())}</b></div><button class="pill" id="orderWa">Pedir por WhatsApp</button><small>Sin pago en línea: te escribimos por WhatsApp para confirmar talla, disponibilidad y forma de pago.</small>`;
}
function openCart(){drawer.classList.add('open');bg.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.classList.add('lock');$('#drawerClose').focus()}
function closeCart(){drawer.classList.remove('open');bg.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.classList.remove('lock')}
dBody.addEventListener('click',e=>{
  const q=e.target.closest('[data-q]'), r=e.target.closest('[data-rm]');
  if(q){const i=+q.dataset.q; items[i].quantity+=+q.dataset.d; if(items[i].quantity<=0) items.splice(i,1); save(); renderCart()}
  if(r){items.splice(+r.dataset.rm,1); save(); renderCart()}
});
dFoot.addEventListener('click',e=>{
  if(!e.target.closest('#orderWa')) return;
  const lineas=items.map(it=>{
    const det=[it.talla&&'Talla: '+it.talla,it.color&&'Color: '+it.color,it.grabado&&'Grabado: '+it.grabado].filter(Boolean);
    return '• '+it.name+(det.length?' ('+det.join(', ')+')':'')+' x'+it.quantity+' - '+money(it.price*it.quantity);
  });
  const msg=['Hola, me gustaría hacer el siguiente pedido:','',...lineas,'','*Total: '+money(total())+'*'].join('\n');
  window.open('https://wa.me/'+WA+'?text='+encodeURIComponent(msg),'_blank','noopener');
});
$('#cartBtn').addEventListener('click',openCart); $('#drawerClose').addEventListener('click',closeCart); bg.addEventListener('click',closeCart);
addEventListener('keydown',e=>{if(e.key==='Escape'){closeCart();closeMenu()}});
renderCart();

/* ── menú móvil ── */
const burger=$('#burger'), menu=$('#menu');
function closeMenu(){menu.classList.remove('open');burger.setAttribute('aria-expanded','false');menu.setAttribute('aria-hidden','true');document.body.classList.remove('lock')}
burger.addEventListener('click',()=>{const o=!menu.classList.contains('open');menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);menu.setAttribute('aria-hidden',!o);document.body.classList.toggle('lock',o)});
menu.addEventListener('click',e=>{if(e.target.closest('a')) closeMenu()});

/* ── aviso de cookies ── */
try{
  if(!localStorage.getItem('adivan_cookie_consent')){
    setTimeout(()=>{
      document.body.insertAdjacentHTML('beforeend',`<div class="cookie" id="cookie" role="dialog" aria-label="Aviso de cookies"><p>Usamos cookies propias y de terceros para que el carrito funcione, recordar tus preferencias y entender cómo se usa el sitio. Puedes aceptar todas o solo las esenciales. <a href="privacidad.html#cookies">Leer más</a>.</p><div><button class="pill ghost" data-c="essential-only">Solo esenciales</button><button class="pill" data-c="all">Aceptar todas</button></div></div>`);
      const ck=$('#cookie'); requestAnimationFrame(()=>ck.classList.add('show'));
      ck.addEventListener('click',e=>{const b=e.target.closest('[data-c]'); if(!b) return; try{localStorage.setItem('adivan_cookie_consent',b.dataset.c);localStorage.setItem('adivan_cookie_consent_date',new Date().toISOString())}catch(_){} ck.classList.remove('show'); setTimeout(()=>ck.remove(),500)});
    },900);
  }
}catch(e){}

/* ── pie de página ── */
document.body.insertAdjacentHTML('beforeend',
`<footer><div class="wrap"><div class="foot">
  <div><img src="assets/adivan-logo-legado.png" alt="ADIVAN, Legado en cada paso"><small>Artículos de piel genuina hechos a mano en León, Guanajuato, con tradición Western y diseño moderno.</small></div>
  <div><h3>Enlaces</h3><ul><li><a href="index.html">Inicio</a></li><li><a href="tienda.html">Tienda</a></li><li><a href="nosotros.html">Nosotros</a></li><li><a href="artesania.html">Oficio</a></li><li><a href="contacto.html">Contacto</a></li></ul></div>
  <div><h3>Legal</h3><ul><li><a href="privacidad.html">Aviso de privacidad</a></li><li><a href="terminos.html">Términos de compra</a></li></ul></div>
  <div><h3>Escríbenos</h3><ul><li><a href="https://wa.me/${WA}" target="_blank" rel="noopener">WhatsApp +52 479 320 3429</a></li><li><a href="https://www.tiktok.com/@adivan.western" target="_blank" rel="noopener">TikTok @adivan.western</a></li><li><span>México · Envíos nacionales</span></li></ul></div>
</div><p class="fine">© ${new Date().getFullYear()} ADIVAN · Todos los derechos reservados</p></div></footer>`);

/* ── toast ── */
let tt; function toast(msg){const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('show'),2600)}

/* ── nav sólida, costura de página ── */
const nav=$('#nav'), spine=$('.spine');
function onPage(){
  nav.classList.toggle('solid',scrollY>innerHeight*(document.body.dataset.hero?0.5:0.05));
  const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
  spine.style.setProperty('--pp',clamp(scrollY/max,0,1).toFixed(4));
}
addEventListener('scroll',onPage,{passive:true}); onPage();

/* ── entradas al hacer scroll ── */
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){e.target.classList.add('in'); if(e.target.matches('[data-r]')) setTimeout(()=>e.target.classList.add('done-in'),1400); io.unobserve(e.target)}
}),{threshold:.14,rootMargin:'0px 0px -6% 0px'});
function watch(root=document){$$('[data-r]:not(.w-on),[data-line]:not(.w-on),[data-step]:not(.w-on)',root).forEach(el=>{el.classList.add('w-on'); if(el.hasAttribute('data-line')) el.classList.add('stitch-line'); io.observe(el)})}
watch();

/* ── polvo, en susurro ── */
(function(){
  const c=$('#dust'), x=c.getContext('2d'); let pts=[],w=0,h=0;
  function size(){w=c.width=innerWidth;h=c.height=innerHeight;pts=Array.from({length:Math.round(w*h/26000)},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.4+.4,vx:(Math.random()-.4)*.12,vy:-Math.random()*.16-.03,a:Math.random()*.35+.08}))}
  size(); addEventListener('resize',size);
  if(reduce()) return;
  let on=true; document.addEventListener('visibilitychange',()=>{on=!document.hidden;document.body.classList.toggle('paused',!on);if(on)loop()});
  function loop(){
    if(!on) return;
    x.clearRect(0,0,w,h);
    for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.y<-4){p.y=h+4;p.x=Math.random()*w}if(p.x<-4)p.x=w+4;if(p.x>w+4)p.x=-4;
      x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fillStyle='rgba(240,170,90,'+p.a+')';x.fill()}
    requestAnimationFrame(loop);
  }
  loop();
})();

/* ── contador ── */
$$('[data-count]').forEach(cn=>{
  const io2=new IntersectionObserver(es=>{
    if(!es[0].isIntersecting) return; io2.disconnect();
    if(reduce()) return;
    const to=+cn.dataset.count, t0=performance.now();
    (function f(n){const t=clamp((n-t0)/1400,0,1),e=1-Math.pow(1-t,3);cn.textContent=(to*e).toFixed(1);if(t<1)requestAnimationFrame(f)})(t0);
  },{threshold:.6}); io2.observe(cn);
});

$$('[data-today]').forEach(e=>{e.textContent=new Date().toLocaleDateString('es-MX',{year:'numeric',month:'long',day:'numeric'})});
window.ADIVAN=Object.assign(window.ADIVAN||{},{
  $,$$,clamp,money,toast,watch,WA,reduce,STAR,
  cart:{add(item){const ex=items.find(i=>same(i,item)); if(ex) ex.quantity+=1; else items.push(Object.assign({quantity:1},item)); save(); renderCart(); openCart()},open:openCart}
});
const showPage=()=>document.body.classList.add('ready'); requestAnimationFrame(showPage); setTimeout(showPage,400);
})();
