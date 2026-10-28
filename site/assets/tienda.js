(function(){
'use strict';
const {$,$$,card,esc}=ADIVAN;
const D=window.ADIVAN_DATA;
const q=new URLSearchParams(location.search);
const st={g:q.get('g')||'Todo',sub:q.get('sub')||'Todas',gen:q.get('genero')||'Todos',sort:'default'};
if(!D.grupos.includes(st.g)) st.g='Todo';
const focusId=+q.get('p')||0;

/* ── filtros ── */
function chip(label,pressed,attrs='',cls=''){return `<button class="chip ${cls}" aria-pressed="${pressed}" ${attrs}>${label}</button>`}
function renderFilters(){
  $('#fGroups').innerHTML=D.grupos.map(g=>chip(g,st.g===g,`data-g="${g}"`,g==='Ofertas'?'sale':'')).join('');
  const b=$('#fBoots');
  const parao=`<div class="sub-row"><span class="lbl">Para</span>${['Todos','Dama','Hombre'].map(s=>chip(s,st.gen===s,`data-gen="${s}"`,'sm')).join('')}</div>`;
  if(st.g==='Botas'){
    b.innerHTML=`<div class="sub-row"><span class="lbl">Tipo</span>${D.subBota.map(s=>chip(s,st.sub===s,`data-sub="${s}"`,'sm')).join('')}</div>`+parao;
  }else if(st.g==='Botines'){
    b.innerHTML=parao;
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
    if((st.g==='Botas'||st.g==='Botines')&&st.gen!=='Todos') base=base.filter(p=>p.genero===st.gen);
  }
  base=[...base];
  if(st.sort==='asc') base.sort((a,b)=>a.price-b.price);
  if(st.sort==='desc') base.sort((a,b)=>b.price-a.price);
  return base;
}

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
  if((st.g==='Botas'||st.g==='Botines')&&st.gen!=='Todos') u.searchParams.set('genero',st.gen);
  try{history.replaceState(null,'',u)}catch(e){}
}
update();
if(focusId){
  const el=$('#p-'+focusId);
  if(el){setTimeout(()=>{el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.add('hit');setTimeout(()=>el.classList.remove('hit'),3200)},500)}
}
})();
