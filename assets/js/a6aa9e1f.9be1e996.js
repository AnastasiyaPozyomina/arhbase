"use strict";(self.webpackChunkarhbase=self.webpackChunkarhbase||[]).push([[7643],{4887:(e,t,a)=>{a.d(t,{A:()=>s});a(4041);var n=a(8273),i=a(4417),r=a(2727),o=a(1085);function s(e){const{colorMode:t}=(0,r.G)(),{isBlogPostPage:a}=(0,i.e)();return a?(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.A,{...e}),(0,o.jsx)("div",{className:"docusaurus-blog-comments"})]}):(0,o.jsx)(n.A,{...e})}},5978:(e,t,a)=>{a.r(t),a.d(t,{default:()=>f});a(4041);var n=a(4357),i=a(396),r=a(2783),o=a(7473),s=a(8005),l=a(9471),d=a(6613),c=a(5906),g=a(9058),u=a(4194),m=a(1085);function p(e){const t=(0,u.k)(e);return(0,m.jsx)(g.A,{children:(0,m.jsx)("script",{type:"application/ld+json",children:JSON.stringify(t)})})}function h(e){const{metadata:t}=e,{siteConfig:{title:a}}=(0,i.A)(),{blogDescription:n,blogTitle:o,permalink:s}=t,l="/"===s?a:o;return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(r.be,{title:l,description:n}),(0,m.jsx)(d.A,{tag:"blog_posts_list"})]})}function b(e){const{metadata:t,items:a,sidebar:n}=e;return(0,m.jsxs)(s.A,{sidebar:n,children:[(0,m.jsx)(c.A,{items:a}),(0,m.jsx)(l.A,{metadata:t})]})}function f(e){return(0,m.jsxs)(r.e3,{className:(0,n.A)(o.G.wrapper.blogPages,o.G.page.blogListPage),children:[(0,m.jsx)(h,{...e}),(0,m.jsx)(p,{...e}),(0,m.jsx)(b,{...e})]})}},9471:(e,t,a)=>{a.d(t,{A:()=>o});a(4041);var n=a(9082),i=a(56),r=a(1085);function o(e){const{metadata:t}=e,{previousPage:a,nextPage:o}=t;return(0,r.jsxs)("nav",{className:"pagination-nav","aria-label":(0,n.T)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"}),children:[a&&(0,r.jsx)(i.A,{permalink:a,title:(0,r.jsx)(n.A,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)",children:"Newer Entries"})}),o&&(0,r.jsx)(i.A,{permalink:o,title:(0,r.jsx)(n.A,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)",children:"Older Entries"}),isNext:!0})]})}},5906:(e,t,a)=>{a.d(t,{A:()=>o});a(4041);var n=a(4417),i=a(4887),r=a(1085);function o(e){let{items:t,component:a=i.A}=e;return(0,r.jsx)(r.Fragment,{children:t.map((e=>{let{content:t}=e;return(0,r.jsx)(n.i,{content:t,children:(0,r.jsx)(a,{children:(0,r.jsx)(t,{})})},t.metadata.permalink)}))})}},4194:(e,t,a)=>{a.d(t,{k:()=>c,J:()=>g});var n=a(5215),i=a(396),r=a(893);var o=a(4417);const s=e=>new Date(e).toISOString();function l(e){const t=e.map(u);return{author:1===t.length?t[0]:t}}function d(e,t,a){return e?{image:m({imageUrl:t(e,{absolute:!0}),caption:`title image for the blog post: ${a}`})}:{}}function c(e){const{siteConfig:t}=(0,i.A)(),{withBaseUrl:a}=(0,n.hH)(),{metadata:{blogDescription:r,blogTitle:o,permalink:c}}=e,g=`${t.url}${c}`;return{"@context":"https://schema.org","@type":"Blog","@id":g,mainEntityOfPage:g,headline:o,description:r,blogPost:e.items.map((e=>function(e,t,a){const{assets:n,frontMatter:i,metadata:r}=e,{date:o,title:c,description:g,lastUpdatedAt:u}=r,m=n.image??i.image,p=i.keywords??[],h=`${t.url}${r.permalink}`,b=u?s(u):void 0;return{"@type":"BlogPosting","@id":h,mainEntityOfPage:h,url:h,headline:c,name:c,description:g,datePublished:o,...b?{dateModified:b}:{},...l(r.authors),...d(m,a,c),...p?{keywords:p}:{}}}(e.content,t,a)))}}function g(){const e=function(){const e=(0,r.A)(),t=e?.data?.blogMetadata;if(!t)throw new Error("useBlogMetadata() can't be called on the current route because the blog metadata could not be found in route context");return t}(),{assets:t,metadata:a}=(0,o.e)(),{siteConfig:c}=(0,i.A)(),{withBaseUrl:g}=(0,n.hH)(),{date:u,title:m,description:p,frontMatter:h,lastUpdatedAt:b}=a,f=t.image??h.image,x=h.keywords??[],j=b?s(b):void 0,A=`${c.url}${a.permalink}`;return{"@context":"https://schema.org","@type":"BlogPosting","@id":A,mainEntityOfPage:A,url:A,headline:m,name:m,description:p,datePublished:u,...j?{dateModified:j}:{},...l(a.authors),...d(f,g,m),...x?{keywords:x}:{},isPartOf:{"@type":"Blog","@id":`${c.url}${e.blogBasePath}`,name:e.blogTitle}}}function u(e){return{"@type":"Person",...e.name?{name:e.name}:{},...e.title?{description:e.title}:{},...e.url?{url:e.url}:{},...e.email?{email:e.email}:{},...e.imageURL?{image:e.imageURL}:{}}}function m(e){let{imageUrl:t,caption:a}=e;return{"@type":"ImageObject","@id":t,url:t,contentUrl:t,caption:a}}}}]);