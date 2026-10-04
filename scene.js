import * as THREE from './vendor/three.module.js';
export function createScene(shell){
  const canvas=shell.querySelector('canvas');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=matchMedia('(max-width: 800px)').matches;
  const renderer=new THREE.WebGLRenderer({canvas,antialias:!mobile,alpha:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.5:2));
  renderer.setClearColor(0x000000,0);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.4;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(35,1,.1,100);
  camera.position.set(0,.4,9.7);
  const group=new THREE.Group();scene.add(group);
  scene.add(new THREE.AmbientLight(0xb6d5e4,1.6));
  const key=new THREE.DirectionalLight(0xe2fcff,4.5);key.position.set(4,6,5);scene.add(key);
  const rim=new THREE.DirectionalLight(0x00b5ef,4);rim.position.set(-4,1,-2);scene.add(rim);
  const warm=new THREE.DirectionalLight(0xe8c6a1,2);warm.position.set(1,-2,4);scene.add(warm);
  const objects=[];
  let printMaterial,explosion=0,explosionTarget=0;
  if(shell.dataset.scene==='print'){
    printMaterial=new THREE.MeshStandardMaterial({color:0x00d8e8,metalness:.38,roughness:.32,side:THREE.DoubleSide});
    const count=46;
    for(let j=0;j<count;j++){
      const y=j/(count-1)*2.5-1.25;
      const radius=1.05+.27*Math.cos(y*2.5)+.12*Math.sin(y*4);
      const outer=new THREE.Shape();const hole=new THREE.Path();
      for(let i=0;i<=80;i++){
        const angle=i/80*Math.PI*2;
        const r=radius+.16*Math.sin(angle*5+y*1.8);
        const x=Math.cos(angle)*r,z=Math.sin(angle)*r;
        if(i===0)outer.moveTo(x,z);else outer.lineTo(x,z);
        const hr=r-.14;
        if(i===0)hole.moveTo(Math.cos(-angle)*hr,Math.sin(-angle)*hr);else hole.lineTo(Math.cos(-angle)*hr,Math.sin(-angle)*hr);
      }
      outer.holes.push(hole);
      const geometry=new THREE.ExtrudeGeometry(outer,{depth:.041,bevelEnabled:false,steps:1,curveSegments:8});
      geometry.rotateX(Math.PI/2);
      const layer=new THREE.Mesh(geometry,printMaterial);layer.position.y=y;layer.userData.baseY=y;group.add(layer);objects.push(layer);
    }
    group.rotation.set(.1,-.45,.15);
    camera.position.set(0,1.1,10.2);camera.lookAt(0,0,0);
    shell.querySelectorAll('[data-form]').forEach(button=>button.addEventListener('click',()=>{
      explosionTarget=button.dataset.form==='layers'?1:0;
      if(reduced.matches)explosion=explosionTarget;
      shell.dataset.view=button.dataset.form;
      shell.querySelectorAll('[data-form]').forEach(el=>{el.classList.toggle('active',el===button);el.setAttribute('aria-pressed',el===button);});
    }));
    shell.querySelectorAll('[data-color]').forEach(button=>button.addEventListener('click',()=>{
      printMaterial.color.set(button.dataset.color);shell.dataset.color=button.dataset.color;
      shell.querySelectorAll('[data-color]').forEach(el=>{el.classList.toggle('active',el===button);el.setAttribute('aria-pressed',el===button);});
    }));
  }else{
    const coreGeometry=new THREE.IcosahedronGeometry(1.05,0);
    const coreMaterial=new THREE.MeshStandardMaterial({color:0x3d8599,metalness:.85,roughness:.24,flatShading:true});
    const core=new THREE.Mesh(coreGeometry,coreMaterial);group.add(core);
    group.add(new THREE.LineSegments(new THREE.EdgesGeometry(coreGeometry),new THREE.LineBasicMaterial({color:0x8ce4ef,transparent:true,opacity:.6})));
    for(let i=0;i<3;i++){
      const ring=new THREE.Mesh(new THREE.TorusGeometry(1.8+i*.12,.012,6,100),new THREE.MeshStandardMaterial({color:0x8adce8,metalness:.7,roughness:.28,emissive:0x16586b,emissiveIntensity:.8}));
      ring.rotation.set(.6+i*.75,.3+i*.8,.2+i*.4);group.add(ring);
      const node=new THREE.Mesh(new THREE.SphereGeometry(.065,12,8),new THREE.MeshStandardMaterial({color:0xb6faff,emissive:0x15bbc7,emissiveIntensity:1.5}));
      node.userData={phase:i*2.1,radius:1.8+i*.12};group.add(node);objects.push(node);
    }
    const positions=new Float32Array(180*3);
    let seed=19;const random=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};
    for(let i=0;i<positions.length;i++)positions[i]=(random()-.5)*8;
    const dots=new THREE.BufferGeometry();dots.setAttribute('position',new THREE.BufferAttribute(positions,3));
    group.add(new THREE.Points(dots,new THREE.PointsMaterial({color:0x5a92a2,size:.014,transparent:true,opacity:.5})));
    group.rotation.set(.2,.2,-.15);
  }
  let width=0,height=0;
  function resize(){width=shell.clientWidth;height=shell.clientHeight;renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(shell);resize();
  let visible=true;
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:0});observer.observe(shell);
  let paused=false,dragging=false,lastX=0,lastY=0,rotationX=group.rotation.x,rotationY=group.rotation.y;
  shell.querySelector('.scene-pause').addEventListener('click',event=>{paused=!paused;event.currentTarget.textContent=paused?'Resume motion':'Pause motion';event.currentTarget.setAttribute('aria-pressed',paused);shell.dataset.paused=paused;});
  canvas.addEventListener('pointerdown',event=>{dragging=true;lastX=event.clientX;lastY=event.clientY;canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener('pointermove',event=>{if(dragging){rotationY+=(event.clientX-lastX)*.008;rotationX+=(event.clientY-lastY)*.005;rotationX=Math.max(-.8,Math.min(.8,rotationX));lastX=event.clientX;lastY=event.clientY;}});
  const endDrag=()=>dragging=false;canvas.addEventListener('pointerup',endDrag);canvas.addEventListener('pointercancel',endDrag);
  canvas.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){event.preventDefault();rotationY+=(event.key==='ArrowLeft'?-.15:event.key==='ArrowRight'?.15:0);rotationX+=(event.key==='ArrowUp'?-.12:event.key==='ArrowDown'?.12:0);}});
  let frame=0,lastTime=0,elapsed=0,renderCount=0,disposed=false;
  function animate(time){
    if(disposed)return;frame=requestAnimationFrame(animate);
    const dt=Math.min((time-lastTime)/1000,.04);
    if(time-lastTime<(mobile?30:20))return;lastTime=time;
    if(!visible||document.hidden)return;
    if(!paused&&!dragging&&!reduced.matches){rotationY+=dt*.16;elapsed+=dt;}
    const ease=reduced.matches?1:.12;
    group.rotation.x+=(rotationX-group.rotation.x)*ease;
    group.rotation.y+=(rotationY-group.rotation.y)*ease;
    explosion+=(explosionTarget-explosion)*ease;
    if(shell.dataset.scene==='print'){objects.forEach(layer=>layer.position.y=layer.userData.baseY*(1+explosion*.6));}
    else objects.forEach((node,i)=>{const a=elapsed*.3+node.userData.phase;const r=node.userData.radius;node.position.set(Math.cos(a)*r,Math.sin(a*1.1)*.9,Math.sin(a)*r*.65);});
    renderer.render(scene,camera);shell.dataset.frames=String(++renderCount);
  }
  shell.classList.add('scene-ready');shell.dataset.webgl='ready';animate(performance.now());
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();shell.classList.remove('scene-ready');shell.dataset.webgl='lost';});
  canvas.addEventListener('webglcontextrestored',()=>{shell.classList.add('scene-ready');shell.dataset.webgl='ready';});
  addEventListener('pagehide',event=>{
    if(event.persisted)return;disposed=true;cancelAnimationFrame(frame);observer.disconnect();resizeObserver.disconnect();
    scene.traverse(object=>{object.geometry?.dispose();if(object.material){const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(m=>m.dispose());}});renderer.dispose();
  },{once:true});
}
