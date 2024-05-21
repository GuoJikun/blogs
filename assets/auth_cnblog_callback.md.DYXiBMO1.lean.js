function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{e as p,i as d,aP as h,o as u,c as _}from"./chunks/framework.BlZS6pWm.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{"layout":false},"headers":[],"relativePath":"auth/cnblog/callback.md","filePath":"auth/cnblog/callback.md","lastUpdated":1716254632000}'),m={name:"auth/cnblog/callback.md"},P=Object.assign(m,{setup(f){const n=t=>new URLSearchParams(t),r=p("");return d(async()=>{var a;await h(()=>import("./chunks/uni-webview.CG3FaEHD.js"),__vite__mapDeps([])),r.value=location.href;const t=n((a=location.hash)==null?void 0:a.replace("#","?")),e=t.get("state"),o=t.get("code");if(e.startsWith("tauri")){console.log(e),console.log(o);const c=decodeURIComponent(e).split("_");console.log(c);const s=c[1]||"prod";console.log(s);const i=s==="prod"?`https://tauri.localhost/auth?code=${o}`:`http://localhost:9001/auth?code=${o}`,l=document.createElement("a");l.href=i,setTimeout(()=>{l.click()},10),console.log("a 被点击了")}else e.startsWith("uni")?uni.webView.postMessage([o]):console.log("其他来源")}),(t,e)=>(u(),_("div"))}});export{b as __pageData,P as default};
