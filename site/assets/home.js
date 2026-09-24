(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const smooth=(p,a,b)=>{const t=clamp((p-a)/(b-a),0,1);return t*t*(3-2*t)};
const rng=seed=>{let s=seed>>>0;return()=>(s=(s*1664525+1013904223)>>>0)/4294967296};

/* ── partir titulares en palabras (una vez, con semilla fija) ── */
$$('.split').forEach(el=>{
  const text=el.textContent.trim(), r=rng(+el.dataset.seed||1);
  const em=(el.dataset.em||'').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
  const words=text.split(' ');
  const total=words.length;
  const vis=words.map((w,i)=>{
    const isEm=em.includes(w.toLowerCase().replace(/[.,]/g,''));
    const th=(i/total)*0.5+r()*0.05;
    return `<span class="w${isEm?' em':''}" style="--th:${th.toFixed(3)}">${w}${i<total-1?' ':''}</span>`;
  }).join('');
  el.innerHTML=`<span class="sr">${text}</span><span aria-hidden="true">${vis}</span>`;
});

/* ── héroe ── */
const hero=$('#top'), stage=$('#stage'), cover=$('#cover'), dusk=$('#dusk'), sunglow=$('#sunglow'), cue=$('#cue');
const bands=$$('.band').map(el=>({el,a:+el.dataset.a,b:+el.dataset.b,op:-1,k:-1,ks:-1,kb:-1,isLast:false}));
bands[bands.length-1].isLast=true; bands[0].isFirst=true;
const b4=bands[3].el;
const IMG_AR=1536/1024, SUN_X=.505, SUN_Y=.588;
let vw=innerWidth, vh=innerHeight, W=0,H=0,coverTop=0,coverLeft=0,sunNX=0,sunNY=0;

function layout(){
  vw=innerWidth; vh=innerHeight;
  W=Math.max(vw,vh*IMG_AR); H=W/IMG_AR;
  coverLeft=(vw-W)/2;
  coverTop=clamp(vh*0.60-SUN_Y*H, vh-H, 0);
  cover.style.width=W+'px'; cover.style.height=H+'px';
  cover.style.left=coverLeft+'px'; cover.style.top=coverTop+'px';
  cover.style.transformOrigin=(SUN_X*W)+'px '+(SUN_Y*H)+'px';
  sunNX=coverLeft+SUN_X*W; sunNY=coverTop+SUN_Y*H;
}

let lastPaint=-1;
function paint(p){
  if(Math.abs(p-lastPaint)<0.0002 && lastPaint>=0) return;
  lastPaint=p;
  const e=p*p*(3-2*p);
  const s=1+1.45*e;
  const targetY=vh*0.36;
  const tx=0, ty=(targetY-sunNY)*e;
  cover.style.transform=`translate3d(${tx}px,${ty}px,0) scale(${s})`;
  const sx=sunNX+tx, sy=sunNY+ty;
  stage.style.setProperty('--sx',sx+'px'); stage.style.setProperty('--sy',sy+'px');
  dusk.style.opacity=(smooth(p,.12,.92)*.88).toFixed(3);
  sunglow.style.opacity=(1-smooth(p,.42,.78)).toFixed(3);
  const so=smooth(p,.46,.8);
  stage.style.setProperty('--so',so.toFixed(3));
  stage.style.setProperty('--ss',(.3+.7*smooth(p,.46,.95)).toFixed(3));
  cue.style.opacity=(1-smooth(p,.0,.06)).toFixed(2);
}

function updateBands(p,loadK){
  for(const b of bands){
    const {a,b:bb}=b;
    const f=Math.min(.02,(bb-a)/3);
    let op=smooth(p,a,a+f)*(1-smooth(p,bb-f,bb));
    if(b.isFirst) op=1-smooth(p,bb-f,bb);
    if(b.isLast) op=smooth(p,a,a+f);
    op=+op.toFixed(3);
    if(op!==b.op){b.op=op;b.el.style.opacity=op;b.el.style.pointerEvents=op>.5?'auto':'none'}
    const ramp=Math.min(.025,(bb-a)*.35);
    let k=clamp((p-a)/ramp,0,1);
    if(b.isFirst) k=Math.max(k,loadK);
    k=Math.round(k/.008)*.008;
    if(b.isLast){
      const kk=+clamp((p-a-ramp*.6)/((bb-a)*.16),0,1).toFixed(2);
      const kb=+clamp((p-a-ramp*.6-(bb-a)*.08)/((bb-a)*.16),0,1).toFixed(2);
      if(kk!==b.ks){b.ks=kk;b.el.style.setProperty('--ks',kk)}
      if(kb!==b.kb){b.kb=kb;b.el.style.setProperty('--kb',kb)}
    }
    if(k!==b.k){b.k=k;b.el.style.setProperty('--k',k)}
  }
}

let target=0, shown=0, rafId=null, lastTick=0, heroOnScreen=true, loadK=0, loadStart=0;
function heroProgress(){
  const r=hero.getBoundingClientRect();
  const range=hero.offsetHeight-vh;
  if(range<=0) return 1;
  return clamp(-r.top/range,0,1);
}
function tick(now){
  const dt=Math.min(100,now-(lastTick||now)); lastTick=now;
  const k=.14;
  shown+=(target-shown)*(1-Math.pow(1-k,dt/16.667));
  if(loadStart){loadK=clamp((now-loadStart)/1300,0,1);loadK=loadK*loadK*(3-2*loadK)}
  const settled=Math.abs(target-shown)<.0004;
  if(settled) shown=target;
  paint(shown); updateBands(shown,loadK);
  if(settled && loadK>=1){rafId=null;lastTick=0}
  else rafId=requestAnimationFrame(tick);
}
function onScroll(){
  if(!scrubOn) return;
  target=heroProgress();
  if(rafId===null && heroOnScreen) rafId=requestAnimationFrame(tick);
}
new IntersectionObserver(es=>{heroOnScreen=es[0].isIntersecting; if(heroOnScreen) onScroll()},{threshold:0}).observe(hero);

/* ── héroe estático: cinco condiciones, decididas en vivo ── */
const GATES=[
  '(max-width: 720px)',
  '(orientation: portrait) and (max-width: 1024px)',
  '(orientation: portrait) and (pointer: coarse)',
  '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
  '(prefers-reduced-motion: reduce)'
];
let scrubOn=false;
function enableScrub(){
  if(scrubOn) return; scrubOn=true;
  hero.classList.remove('static');
  addEventListener('scroll',onScroll,{passive:true});
  bands.forEach(b=>{b.op=-1;b.k=-1;b.ks=-1;b.kb=-1});
  lastPaint=-1; loadStart=performance.now(); loadK=0;
  target=shown=heroProgress(); paint(shown); updateBands(shown,0);
  if(rafId===null) rafId=requestAnimationFrame(tick);
}
function disableScrub(){
  scrubOn=false;
  removeEventListener('scroll',onScroll);
  if(rafId!==null){cancelAnimationFrame(rafId);rafId=null}
  hero.classList.add('static');
  layout(); lastPaint=-1; paint(1);
  bands.forEach(b=>{b.op=-1;b.k=-1;b.ks=-1;b.kb=-1});
  updateBands(1,1);
  bands.forEach(b=>b.el.style.removeProperty('opacity'));
}
function applyHeroMode(){
  layout();
  if(GATES.some(q=>matchMedia(q).matches)) disableScrub(); else enableScrub();
}
const MQLS=GATES.map(q=>matchMedia(q));
MQLS.forEach(m=>m.addEventListener('change',applyHeroMode));
let rz; addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(()=>{layout();lastPaint=-1;if(scrubOn){target=heroProgress();shown=target;paint(shown)}else paint(1)},120)});

/* ── el momento: coser una puntada ── */
(function(){
  const sec=$('#puntada'), seam=$('#seam'), needle=$('#needle'), hint=$('#hint');
  let sp=0, holding=false, done=false, last=0, raf=null;
  const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  function finish(){
    done=true; sp=1; seam.style.setProperty('--sp',1);
    sec.classList.add('done'); hint.textContent='Listo. Así se cose cada par: una puntada a la vez.'; hint.style.opacity=1;
    needle.classList.remove('hold');
  }
  function step(now){
    const dt=Math.min(60,now-(last||now)); last=now;
    sp=clamp(sp+(holding? dt/2300 : -dt/900),0,1);
    seam.style.setProperty('--sp',sp.toFixed(4));
    if(sp>=1){finish();raf=null;return}
    if(sp>0||holding) raf=requestAnimationFrame(step); else {raf=null;last=0}
  }
  function down(e){ if(done) return; if(e.cancelable) e.preventDefault(); holding=true; needle.classList.add('hold'); if(reduce()){finish();return} if(raf===null){last=0;raf=requestAnimationFrame(step)} }
  function up(){ holding=false; needle.classList.remove('hold') }
  needle.addEventListener('pointerdown',down);
  addEventListener('pointerup',up); addEventListener('pointercancel',up);
  needle.addEventListener('keydown',e=>{ if((e.key===' '||e.key==='Enter')&&!e.repeat){down(e)} });
  needle.addEventListener('keyup',e=>{ if(e.key===' '||e.key==='Enter') up() });
  if(reduce()) finish();
})();

/* ── preguntas ── */
$$('#faq .item').forEach(it=>{
  const btn=$('button',it);
  btn.addEventListener('click',()=>{
    const open=!it.classList.contains('open');
    $$('#faq .item.open').forEach(o=>{if(o!==it){o.classList.remove('open');$('button',o).setAttribute('aria-expanded','false')}});
    it.classList.toggle('open',open); btn.setAttribute('aria-expanded',open);
  });
});

/* ── formulario: arma el mensaje y abre WhatsApp ── */
$('#form').addEventListener('submit',e=>{
  e.preventDefault();
  const f=new FormData(e.target);
  const nombre=(f.get('nombre')||'').toString().trim(), tipo=f.get('tipo'), msg=(f.get('msg')||'').toString().trim();
  const txt=`Hola ADIVAN, soy ${nombre||'un cliente'}. Busco: ${tipo}.${msg?' '+msg:''}`;
  ADIVAN.toast('Abriendo WhatsApp…');
  window.open('https://wa.me/524793203429?text='+encodeURIComponent(txt),'_blank','noopener');
});

/* ── arranque ── */
applyHeroMode();
document.fonts && document.fonts.ready.then(()=>{layout();lastPaint=-1;paint(scrubOn?shown:1)});
})();
