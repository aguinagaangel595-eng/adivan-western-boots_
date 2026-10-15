/* ADIVAN · página de producto: pinta la ficha interactiva (fotos, color, talla, carrito) */
(function(){
'use strict';
const {$,card}=ADIVAN;
const host=$('#buy'); if(!host) return;
const p=window.ADIVAN_DATA.products.find(x=>x.id===+host.dataset.pid);
if(p) host.appendChild(card(p,0,{page:true}));
})();
