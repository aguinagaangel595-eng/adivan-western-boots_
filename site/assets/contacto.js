document.getElementById('cform').addEventListener('submit',function(e){
  e.preventDefault();
  const f=new FormData(e.target), g=k=>(f.get(k)||'').toString().trim();
  const txt=['*Nuevo mensaje desde adivanwesternboots.com*','Nombre: '+g('name'),'Correo: '+g('email'),g('phone')?'Teléfono: '+g('phone'):null,g('type')?'Tipo de consulta: '+g('type'):null,'',g('message')].filter(x=>x!==null).join('\n');
  ADIVAN.toast('Abriendo WhatsApp…');
  window.open('https://wa.me/'+ADIVAN.WA+'?text='+encodeURIComponent(txt),'_blank','noopener');
  e.target.reset();
});
