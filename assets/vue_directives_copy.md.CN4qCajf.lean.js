import{av as _,d as h,ag as u,ap as y,o,c as f,P as p,M as l,O as d,Z as m,_ as v,a as e,S as t}from"./chunks/framework.BlZS6pWm.js";import{E as C}from"./chunks/theme.NjBjx5L9.js";const b=h({setup(){const a=m({loading:!0,attrs:[{attr:"value",desc:"要复制的文字，如果为空则复制内容为当前元素的innerText",type:"string",isMust:"false"}]}),s=r=>{const n=r.detail;C.success(`复制成功，复制的内容：${n}`)};return{...v(a),copySuccess:s}}}),N=JSON.parse('{"title":"Copy 复制","description":"","frontmatter":{},"headers":[],"relativePath":"vue/directives/copy.md","filePath":"vue/directives/copy.md","lastUpdated":1716254632000}'),x=e("h1",{id:"copy-复制",tabindex:"-1"},[t("Copy 复制 "),e("a",{class:"header-anchor",href:"#copy-复制","aria-label":'Permalink to "Copy 复制"'},"​")],-1),g=e("h2",{id:"用法-1",tabindex:"-1"},[t("用法 1 "),e("a",{class:"header-anchor",href:"#用法-1","aria-label":'Permalink to "用法 1"'},"​")],-1),k=e("p",null,"复制指令的 binding.value",-1),P=e("h2",{id:"用法-2",tabindex:"-1"},[t("用法 2 "),e("a",{class:"header-anchor",href:"#用法-2","aria-label":'Permalink to "用法 2"'},"​")],-1),S=e("p",null,"复制元素的 textContent",-1);function $(a,s,r,n,B,D){const c=u("el-button"),i=y("copy");return o(),f("div",null,[x,g,k,p((o(),l(c,{type:"primary",onClipboardCopy:a.copySuccess},{default:d(()=>[t(" 通过指令提供值 ")]),_:1},8,["onClipboardCopy"])),[[i,"通过指令提供值"]]),P,S,p((o(),l(c,{type:"primary",onClipboardCopy:a.copySuccess},{default:d(()=>[t(" 通过 textContent 属性复制 ")]),_:1},8,["onClipboardCopy"])),[[i]])])}const w=_(b,[["render",$]]);export{N as __pageData,w as default};
