import{o as I,c as O,a as t,J as d,u as p,S as w,aR as x,e as P}from"./chunks/framework.BlZS6pWm.js";const q=t("h1",{id:"tween-缓动动画",tabindex:"-1"},[w("Tween 缓动动画 "),t("a",{class:"header-anchor",href:"#tween-缓动动画","aria-label":'Permalink to "Tween 缓动动画"'},"​")],-1),_=t("p",null,[t("span",null,"Linear")],-1),m=t("p",null,[t("span",null,"quad easeIn")],-1),v=t("p",null,[t("span",null,"quad easeOut")],-1),T=t("p",null,[t("span",null,"quad easeInOut")],-1),S=x("",1),N=JSON.parse('{"title":"Tween 缓动动画","description":"","frontmatter":{},"headers":[],"relativePath":"data-structure/tween.md","filePath":"data-structure/tween.md","lastUpdated":1716254632000}'),$={name:"data-structure/tween.md"},V=Object.assign($,{setup(z){const E={linear:function(s,i,a,h){return a*s/h+i},quad:{easeIn:function(s,i,a,h){return a*(s/=h)*s+i},easeOut:function(s,i,a,h){return-a*(s/=h)*(s-2)+i},easeInOut:function(s,i,a,h){return(s/=h/2)<1?a/2*s*s+i:-a/2*(s*(s-2)-1)+i}},cubic:{easeIn:function(s,i,a,h){return a*(s/=h)*s*s+i},easeOut:function(s,i,a,h){return a*((s=s/h-1)*s*s+1)+i},easeInOut:function(s,i,a,h){return(s/=h/2)<1?a/2*s*s*s+i:a/2*((s-=2)*s*s+2)+i}},quart:{easeIn:function(s,i,a,h){return a*(s/=h)*s*s*s+i},easeOut:function(s,i,a,h){return-a*((s=s/h-1)*s*s*s-1)+i},easeInOut:function(s,i,a,h){return(s/=h/2)<1?a/2*s*s*s*s+i:-a/2*((s-=2)*s*s*s-2)+i}},quint:{easeIn:function(s,i,a,h){return a*(s/=h)*s*s*s*s+i},easeOut:function(s,i,a,h){return a*((s=s/h-1)*s*s*s*s+1)+i},easeInOut:function(s,i,a,h){return(s/=h/2)<1?a/2*s*s*s*s*s+i:a/2*((s-=2)*s*s*s*s+2)+i}},sine:{easeIn:function(s,i,a,h){return-a*Math.cos(s/h*(Math.PI/2))+a+i},easeOut:function(s,i,a,h){return a*Math.sin(s/h*(Math.PI/2))+i},easeInOut:function(s,i,a,h){return-a/2*(Math.cos(Math.PI*s/h)-1)+i}},expo:{easeIn:function(s,i,a,h){return s==0?i:a*Math.pow(2,10*(s/h-1))+i},easeOut:function(s,i,a,h){return s==h?i+a:a*(-Math.pow(2,-10*s/h)+1)+i},easeInOut:function(s,i,a,h){return s==0?i:s==h?i+a:(s/=h/2)<1?a/2*Math.pow(2,10*(s-1))+i:a/2*(-Math.pow(2,-10*-s)+2)+i}},circ:{easeIn:function(s,i,a,h){return-a*(Math.sqrt(1-(s/=h)*s)-1)+i},easeOut:function(s,i,a,h){return a*Math.sqrt(1-(s=s/h-1)*s)+i},easeInOut:function(s,i,a,h){return(s/=h/2)<1?-a/2*(Math.sqrt(1-s*s)-1)+i:a/2*(Math.sqrt(1-(s-=2)*s)+1)+i}},elastic:{easeIn:function(s,i,a,h,k,n){if(s==0)return i;if((s/=h)==1)return i+a;if(n||(n=h*.3),!k||k<Math.abs(a)){k=a;const l=n/4;return-(k*Math.pow(2,10*(s-=1))*Math.sin((s*h-l)*(2*Math.PI)/n))+i}else{const l=n/(2*Math.PI)*Math.asin(a/k);return-(k*Math.pow(2,10*(s-=1))*Math.sin((s*h-l)*(2*Math.PI)/n))+i}},easeOut:function(s,i,a,h,k,n){if(s==0)return i;if((s/=h)==1)return i+a;if(n||(n=h*.3),!k||k<Math.abs(a)){k=a;const l=n/4;return k*Math.pow(2,-10*s)*Math.sin((s*h-l)*(2*Math.PI)/n)+a+i}else{const l=n/(2*Math.PI)*Math.asin(a/k);return k*Math.pow(2,-10*s)*Math.sin((s*h-l)*(2*Math.PI)/n)+a+i}},easeInOut:function(s,i,a,h,k,n){if(s==0)return i;if((s/=h/2)==2)return i+a;n||(n=h*.155);let l=0;return!k||k<Math.abs(a)?(k=a,l=n/4):l=n/(2*Math.PI)*Math.asin(a/k),s<1?-.5*(k*Math.pow(2,10*(s-=1))*Math.sin((s*h-l)*(2*Math.PI)/n))+i:k*Math.pow(2,-10*(s-=1))*Math.sin((s*h-l)*(2*Math.PI)/n)*.5+a+i}},back:{easeIn:function(s,i,a,h,k){return k==null&&(k=1.70158),a*(s/=h)*s*((k+1)*s-k)+i},easeOut:function(s,i,a,h,k){return k==null&&(k=1.70158),a*((s=s/h-1)*s*((k+1)*s+k)+1)+i},easeInOut:function(s,i,a,h,k){return k==null&&(k=1.70158),(s/=h/2)<1?a/2*(s*s*(((k=1.525)+1)*s-k))+i:a/2*((s-=2)*s*(((k=1.525)+1)*s+k)+2)+i}},bounce:{easeIn:function(s,i,a,h){return a-E.bounce.easeOut(h-s,0,a,h)+i},easeOut:function(s,i,a,h){return(s/=h)<.36363636363636365?a*(7.5625*s*s)+i:s<.7272727272727273?a*(7.5625*(s-=.5454545454545454)*s+.75)+i:s<.9090909090909091?a*(7.5625*(s-=.8181818181818182)*s+.9375)+i:a*(7.5625*(s-=.9545454545454546)*s+.984375)+i},easeInOut:function(s,i,a,h){return s<h/2?E.bounce.easeIn(s*2,0,a,h)*.5+i:E.bounce.easeOut(s*2-h,0,a,h)*.5+a*.5+i}}},e=(s="linear")=>{const i=P(0);return{left:i,animate:()=>{let h,k,n=!1;function l(r){let b=0,g=3e3;h===void 0&&(h=r);const y=r-h;if(k!==r){const M=s(h,b,y,g),F=Math.min(M,670);i.value=F,F===670&&(n=!0)}y<g&&(k=r,n||window.requestAnimationFrame(l))}requestAnimationFrame(l)}}},{left:A,animate:D}=e(E.linear),{left:C,animate:c}=e(E.quad.easeIn),{left:B,animate:u}=e(E.quad.easeOut),{left:o,animate:f}=e(E.quad.easeInOut);return(s,i)=>(I(),O("div",null,[q,_,t("div",{style:{border:"1px dashed #ddd","font-size":"0",height:"60px","border-radius":"4px",width:"700px",position:"relative"},onClick:i[0]||(i[0]=a=>p(D)())},[t("span",{style:d([{height:"30px",width:"30px",display:"inline-flex","border-radius":"50%","background-color":"blue",position:"absolute",top:"14px"},{left:`${p(A)}px`}])},null,4)]),m,t("div",{style:{border:"1px dashed #ddd","font-size":"0",height:"60px","border-radius":"4px",width:"700px",position:"relative"},onClick:i[1]||(i[1]=a=>p(c)())},[t("span",{style:d([{height:"30px",width:"30px",display:"inline-flex","border-radius":"50%","background-color":"blue",position:"absolute",top:"14px"},{left:`${p(C)}px`}])},null,4)]),v,t("div",{style:{border:"1px dashed #ddd","font-size":"0",height:"60px","border-radius":"4px",width:"700px",position:"relative"},onClick:i[2]||(i[2]=a=>p(u)())},[t("span",{style:d([{height:"30px",width:"30px",display:"inline-flex","border-radius":"50%","background-color":"blue",position:"absolute",top:"14px"},{left:`${p(B)}px`}])},null,4)]),T,t("div",{style:{border:"1px dashed #ddd","font-size":"0",height:"60px","border-radius":"4px",width:"700px",position:"relative"},onClick:i[3]||(i[3]=a=>p(f)())},[t("span",{style:d([{height:"30px",width:"30px",display:"inline-flex","border-radius":"50%","background-color":"blue",position:"absolute",top:"14px"},{left:`${p(o)}px`}])},null,4)]),S]))}});export{N as __pageData,V as default};
