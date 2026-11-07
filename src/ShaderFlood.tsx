import React, { useEffect, useRef } from 'react';

type Props = { active: boolean; colors: [string, string, string] };
type RGB = [number, number, number];

const vertex = `
attribute vec2 aPosition;
void main(){ gl_Position = vec4(aPosition, 0.0, 1.0); }
`;
const fragment = `
precision mediump float;
uniform vec2 uResolution;
uniform vec2 uPointer;
uniform float uTime;
uniform float uActive;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
float blob(vec2 p, vec2 c, float r){ return exp(-length(p-c)*r); }
void main(){
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = (uv-.5)*vec2(aspect,1.0);
  vec2 pointer = (uPointer-.5)*vec2(aspect,1.0);
  float t = uTime*.28;
  vec2 c1=vec2(-.22+sin(t*.8)*.08,.12+cos(t)*.12);
  vec2 c2=vec2(.18+cos(t*.65)*.12,-.14+sin(t*.9)*.10);
  vec2 c3=vec2(sin(t*.55)*.18,cos(t*.7)*.18);
  float flow=blob(p,c1,3.1)*.72+blob(p,c2,3.8)*.62+blob(p,c3,4.2)*.48;
  float ripple=sin(length(p-pointer)*17.0-t*4.0)*.08;
  float flood=blob(p,pointer,3.0)*uActive*1.25;
  float field=flow+flood+ripple*(.25+uActive*.75);
  float mask=smoothstep(mix(1.12,.42,uActive)-.12,mix(1.12,.42,uActive)+.30,field);
  float palette=clamp(field*.68+uv.y*.24+sin(p.x*4.0+t)*.10,0.0,1.0);
  vec3 color=mix(uColor1,uColor2,smoothstep(.12,.66,palette));
  color=mix(color,uColor3,smoothstep(.56,.98,palette));
  color+=vec3(.12,.08,.16)*(.5+.5*sin(p.x*8.0+p.y*6.0-t));
  gl_FragColor=vec4(color,mask*mix(.12,.88,uActive));
}
`;

function rgb(hex: string): RGB {
  const s = hex.replace('#','');
  const full = s.length === 3 ? s.split('').map(x=>x+x).join('') : s;
  return [0,2,4].map(i=>parseInt(full.slice(i,i+2),16)/255) as RGB;
}
function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source); gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; }
  return shader;
}

export function ShaderFloodLayer({ active, colors }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<[number,number]>([.5,.5]);
  const activeRef = useRef(active);
  useEffect(()=>{ activeRef.current=active; },[active]);

  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas) return;
    const gl=canvas.getContext('webgl',{alpha:true,antialias:false,powerPreference:'low-power'});
    if(!gl) return;
    const vs=compile(gl,gl.VERTEX_SHADER,vertex), fs=compile(gl,gl.FRAGMENT_SHADER,fragment);
    if(!vs||!fs) return;
    const program=gl.createProgram();
    if(!program) return;
    gl.attachShader(program,vs); gl.attachShader(program,fs); gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)) return;
    gl.useProgram(program);
    const buffer=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,buffer);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
    const pos=gl.getAttribLocation(program,'aPosition');
    gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    const u=(name:string)=>gl.getUniformLocation(program,name);
    const resolution=u('uResolution'), pointerLoc=u('uPointer'), time=u('uTime'), activeLoc=u('uActive');
    const c1=u('uColor1'),c2=u('uColor2'),c3=u('uColor3');
    const parsed=colors.map(rgb);
    gl.uniform3fv(c1,parsed[0]); gl.uniform3fv(c2,parsed[1]); gl.uniform3fv(c3,parsed[2]);
    const resize=()=>{
      const rect=canvas.getBoundingClientRect(), dpr=Math.min(devicePixelRatio||1,1.5);
      canvas.width=Math.max(1,Math.round(rect.width*dpr)); canvas.height=Math.max(1,Math.round(rect.height*dpr));
      gl.viewport(0,0,canvas.width,canvas.height); gl.uniform2f(resolution,canvas.width,canvas.height);
    };
    const observer=new ResizeObserver(resize); observer.observe(canvas); resize();
    let frame=0, eased=0, start=performance.now(), running=true;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const draw=(now:number)=>{
      const target=activeRef.current?1:0;
      eased += (target-eased)*.075;
      gl.clearColor(0,0,0,0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(time,reduce?0:(now-start)/1000); gl.uniform1f(activeLoc,eased);
      gl.uniform2f(pointerLoc,pointer.current[0],pointer.current[1]); gl.drawArrays(gl.TRIANGLES,0,6);
      if(activeRef.current||eased>.008){ frame=requestAnimationFrame(draw); }
      else { running=false; }
    };
    const wake=()=>{ if(!running){running=true;frame=requestAnimationFrame(draw);} };
    frame=requestAnimationFrame(draw);
    const onWake=()=>wake();
    canvas.addEventListener('pointermove',onWake);
    return ()=>{
      cancelAnimationFrame(frame); observer.disconnect(); canvas.removeEventListener('pointermove',onWake);
      if(buffer) gl.deleteBuffer(buffer); gl.deleteProgram(program); gl.deleteShader(vs); gl.deleteShader(fs);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  },[colors]);

  return <div className="tw-shader-layer" aria-hidden="true"
    onPointerMove={e=>{const r=e.currentTarget.getBoundingClientRect();pointer.current=[(e.clientX-r.left)/r.width,1-(e.clientY-r.top)/r.height];}}>
    <canvas ref={canvasRef}/>
  </div>;
}
