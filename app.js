(() => {
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  const header=document.querySelector('.site-header');
  const progress=document.querySelector('.scroll-progress');
  const heroImage=document.querySelector('.hero-image');
  let scrollQueued=false;
  function updateScroll(){
    const max=document.documentElement.scrollHeight-innerHeight;
    progress.style.width=(max>0?scrollY/max*100:0)+'%';
    header.classList.toggle('scrolled',scrollY>80);
    if(heroImage&&!motion.matches&&innerWidth>800){heroImage.style.transform=`translateY(${Math.min(scrollY*.13,120)}px) scale(${1+Math.min(scrollY*.00004,.06)})`;}
    scrollQueued=false;
  }
  addEventListener('scroll',()=>{if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateScroll);}},{passive:true});
  addEventListener('resize',updateScroll);updateScroll();
  motion.addEventListener('change',()=>{if(heroImage)heroImage.style.transform='';updateScroll();});

  if('IntersectionObserver' in window&&!motion.matches){
    const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.remove('reveal-pending');entry.target.classList.add('reveal-visible');reveals.unobserve(entry.target);}
    }),{threshold:.08});
    document.querySelectorAll('[data-reveal]').forEach((el,i)=>{
      if(el.getBoundingClientRect().top>innerHeight){el.classList.add('reveal-pending');el.style.transitionDelay=(i%2)*.08+'s';}
      reveals.observe(el);
    });
  }

  const menu=document.querySelector('#menu-dialog');
  const menuButton=document.querySelector('.menu-toggle');
  menuButton.addEventListener('click',()=>{menu.showModal();document.body.classList.add('modal-open');menuButton.setAttribute('aria-expanded','true');});
  document.querySelector('.close-menu').addEventListener('click',()=>menu.close());
  menu.addEventListener('close',()=>{document.body.classList.remove('modal-open');menuButton.setAttribute('aria-expanded','false');});

  const toast=document.querySelector('.toast');let toastTimer;
  function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3500);}
  document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(button.dataset.copy);notify('Email address copied');}
    catch{notify('Email: '+button.dataset.copy);}
  }));

  const projects=JSON.parse(document.querySelector('#project-data').textContent);
  const dialog=document.querySelector('#project-dialog');
  document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
    const project=projects.find(p=>p.id===button.dataset.project);
    document.querySelector('#project-category').textContent=project.label;
    document.querySelector('#project-title').textContent=project.title;
    document.querySelector('#project-detail').textContent=project.detail;
    document.querySelector('#project-status').textContent=project.status+' / '+project.tag;
    document.querySelector('#project-source').href='https://github.com/darmigan2011-ops/'+project.repo;
    dialog.showModal();document.body.classList.add('modal-open');
  }));
  document.querySelector('.project-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));
  dialog.addEventListener('click',event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close();}});
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    document.querySelectorAll('[data-filter]').forEach(el=>{const selected=el===button;el.classList.toggle('active',selected);el.setAttribute('aria-pressed',selected);});
    let count=0;
    document.querySelectorAll('.project-card').forEach(card=>{
      card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;
      if(!card.hidden){count++;card.classList.remove('reveal-pending');card.classList.add('reveal-visible');}
    });
    document.querySelector('.filter-count').textContent=count+' project'+(count===1?'':'s');updateScroll();
  }));

  const form=document.querySelector('#contact-form');
  if(form){
    const requested=new URLSearchParams(location.search).get('interest');
    if([...form.elements.interest.options].some(o=>o.value===requested))form.elements.interest.value=requested;
    form.addEventListener('submit',event=>{
      event.preventDefault();if(!form.reportValidity())return;
      const data=new FormData(form);
      const interest=form.elements.interest.selectedOptions[0].textContent;
      const subject=interest+' — '+data.get('name');
      const body=`Hi Darmigan,\n\n${data.get('message')}\n\nFrom: ${data.get('name')}\nReply to: ${data.get('email')}`;
      const email='darmiganbaskar@gmail.com';
      const mailto=`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const fallback=document.querySelector('#draft-link');
      fallback.href=`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      fallback.hidden=false;
      form.dataset.draft=mailto;
      document.querySelector('.form-result').textContent='Your draft is ready. Review it in your email app, or use Gmail below. Nothing has been sent.';
      location.href=mailto;
    });
  }

  const shells=[...document.querySelectorAll('[data-scene]')];
  async function loadScene(shell){
    if(shell.dataset.loaded)return;shell.dataset.loaded='true';
    try{const {createScene}=await import('./scene.js');createScene(shell);}
    catch(error){shell.dataset.error=error.message;shell.querySelector('.scene-bottom').hidden=true;shell.querySelector('.scene-controls')?.setAttribute('hidden','');console.warn('3D unavailable; static artwork retained.',error.message);}
  }
  if('IntersectionObserver' in window){const sceneObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){loadScene(entry.target);sceneObserver.unobserve(entry.target);}}),{rootMargin:'200px'});shells.forEach(shell=>sceneObserver.observe(shell));}
  else shells.forEach(loadScene);
})();
