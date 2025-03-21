"use strict";(self.webpackChunkarhbase=self.webpackChunkarhbase||[]).push([[7643],{1430:(e,t,a)=>{a.d(t,{W:()=>c});var n=a(6540),s=a(797);const r=["zero","one","two","few","many","other"];function l(e){return r.filter((t=>e.includes(t)))}const i={locale:"en",pluralForms:l(["one","other"]),select:e=>1===e?"one":"other"};function o(){const{i18n:{currentLocale:e}}=(0,s.A)();return(0,n.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:l(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),i}}),[e])}function c(){const e=o();return{selectMessage:(t,a)=>function(e,t,a){const n=e.split("|");if(1===n.length)return n[0];n.length>a.pluralForms.length&&console.error(`For locale=${a.locale}, a maximum of ${a.pluralForms.length} plural forms are expected (${a.pluralForms.join(",")}), but the message contains ${n.length}: ${e}`);const s=a.select(t),r=a.pluralForms.indexOf(s);return n[Math.min(r,n.length-1)]}(a,t,e)}}},1865:(e,t,a)=>{a.d(t,{A:()=>l});a(6540);var n=a(4164),s=a(6289),r=a(4848);function l(e){const{permalink:t,title:a,subLabel:l,isNext:i}=e;return(0,r.jsxs)(s.A,{className:(0,n.A)("pagination-nav__link",i?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[l&&(0,r.jsx)("div",{className:"pagination-nav__sublabel",children:l}),(0,r.jsx)("div",{className:"pagination-nav__label",children:a})]})}},6547:(e,t,a)=>{a.d(t,{A:()=>d});a(6540);var n=a(4164),s=a(539),r=a(6289);const l={tag:"tag_zVej",tagRegular:"tagRegular_sFm0",tagWithCount:"tagWithCount_h2kH"};var i=a(4848);function o(e){let{permalink:t,label:a,count:s,description:o}=e;return(0,i.jsxs)(r.A,{href:t,title:o,className:(0,n.A)(l.tag,s?l.tagWithCount:l.tagRegular),children:[a,s&&(0,i.jsx)("span",{children:s})]})}const c={tags:"tags_jXut",tag:"tag_QGVx"};function d(e){let{tags:t}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("b",{children:(0,i.jsx)(s.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,i.jsx)("ul",{className:(0,n.A)(c.tags,"padding--none","margin-left--sm"),children:t.map((e=>(0,i.jsx)("li",{className:c.tag,children:(0,i.jsx)(o,{...e})},e.permalink)))})]})}},8189:(e,t,a)=>{a.d(t,{A:()=>C});a(6540);var n=a(4164),s=a(3750),r=a(4848);function l(e){let{children:t,className:a}=e;return(0,r.jsx)("article",{className:a,children:t})}var i=a(6289);const o={title:"title_f1Hy"};function c(e){let{className:t}=e;const{metadata:a,isBlogPostPage:l}=(0,s.e7)(),{permalink:c,title:d}=a,u=l?"h1":"h2";return(0,r.jsx)(u,{className:(0,n.A)(o.title,t),children:l?d:(0,r.jsx)(i.A,{to:c,children:d})})}var d=a(539),u=a(1430),m=a(8569);const g={container:"container_mt6G"};function h(e){let{readingTime:t}=e;const a=function(){const{selectMessage:e}=(0,u.W)();return t=>{const a=Math.ceil(t);return e(a,(0,d.T)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))}}();return(0,r.jsx)(r.Fragment,{children:a(t)})}function p(e){let{date:t,formattedDate:a}=e;return(0,r.jsx)("time",{dateTime:t,children:a})}function x(){return(0,r.jsx)(r.Fragment,{children:" \xb7 "})}function j(e){let{className:t}=e;const{metadata:a}=(0,s.e7)(),{date:l,readingTime:i}=a,o=(0,m.i)({day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});return(0,r.jsxs)("div",{className:(0,n.A)(g.container,"margin-vert--md",t),children:[(0,r.jsx)(p,{date:l,formattedDate:(c=l,o.format(new Date(c)))}),void 0!==i&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(x,{}),(0,r.jsx)(h,{readingTime:i})]})]});var c}var f=a(5921);const b={authorCol:"authorCol_Hf19",imageOnlyAuthorRow:"imageOnlyAuthorRow_pa_O",imageOnlyAuthorCol:"imageOnlyAuthorCol_G86a"};function A(e){let{className:t}=e;const{metadata:{authors:a},assets:l}=(0,s.e7)();if(0===a.length)return null;const i=a.every((e=>{let{name:t}=e;return!t})),o=1===a.length;return(0,r.jsx)("div",{className:(0,n.A)("margin-top--md margin-bottom--sm",i?b.imageOnlyAuthorRow:"row",t),children:a.map(((e,t)=>(0,r.jsx)("div",{className:(0,n.A)(!i&&(o?"col col--12":"col col--6"),i?b.imageOnlyAuthorCol:b.authorCol),children:(0,r.jsx)(f.A,{author:{...e,imageURL:l.authorsImageUrls[t]??e.imageURL}})},t)))})}function v(){return(0,r.jsxs)("header",{children:[(0,r.jsx)(c,{}),(0,r.jsx)(j,{}),(0,r.jsx)(A,{})]})}var N=a(99),_=a(4490);function k(e){let{children:t,className:a}=e;const{isBlogPostPage:l}=(0,s.e7)();return(0,r.jsx)("div",{id:l?N.LU:void 0,className:(0,n.A)("markdown",a),children:(0,r.jsx)(_.A,{children:t})})}var w=a(204),T=a(5783),y=a(6547);function F(){return(0,r.jsx)("b",{children:(0,r.jsx)(d.A,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read more"})})}function P(e){const{blogPostTitle:t,...a}=e;return(0,r.jsx)(i.A,{"aria-label":(0,d.T)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t}),...a,children:(0,r.jsx)(F,{})})}function R(){const{metadata:e,isBlogPostPage:t}=(0,s.e7)(),{tags:a,title:l,editUrl:i,hasTruncateMarker:o,lastUpdatedBy:c,lastUpdatedAt:d}=e,u=!t&&o,m=a.length>0;if(!(m||u||i))return null;if(t){const e=!!(i||d||c);return(0,r.jsxs)("footer",{className:"docusaurus-mt-lg",children:[m&&(0,r.jsx)("div",{className:(0,n.A)("row","margin-top--sm",w.G.blog.blogFooterEditMetaRow),children:(0,r.jsx)("div",{className:"col",children:(0,r.jsx)(y.A,{tags:a})})}),e&&(0,r.jsx)(T.A,{className:(0,n.A)("margin-top--sm",w.G.blog.blogFooterEditMetaRow),editUrl:i,lastUpdatedAt:d,lastUpdatedBy:c})]})}return(0,r.jsxs)("footer",{className:"row docusaurus-mt-lg",children:[m&&(0,r.jsx)("div",{className:(0,n.A)("col",{"col--9":u}),children:(0,r.jsx)(y.A,{tags:a})}),u&&(0,r.jsx)("div",{className:(0,n.A)("col text--right",{"col--3":m}),children:(0,r.jsx)(P,{blogPostTitle:l,to:e.permalink})})]})}function C(e){let{children:t,className:a}=e;const i=function(){const{isBlogPostPage:e}=(0,s.e7)();return e?void 0:"margin-bottom--xl"}();return(0,r.jsxs)(l,{className:(0,n.A)(i,a),children:[(0,r.jsx)(v,{}),(0,r.jsx)(k,{children:t}),(0,r.jsx)(R,{})]})}},8518:(e,t,a)=>{a.r(t),a.d(t,{default:()=>A});a(6540);var n=a(4164),s=a(797),r=a(1082),l=a(204),i=a(569),o=a(539),c=a(1865),d=a(4848);function u(e){const{metadata:t}=e,{previousPage:a,nextPage:n}=t;return(0,d.jsxs)("nav",{className:"pagination-nav","aria-label":(0,o.T)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"}),children:[a&&(0,d.jsx)(c.A,{permalink:a,title:(0,d.jsx)(o.A,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)",children:"Newer entries"})}),n&&(0,d.jsx)(c.A,{permalink:n,title:(0,d.jsx)(o.A,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)",children:"Older entries"}),isNext:!0})]})}var m=a(7220),g=a(3750),h=a(8189);function p(e){let{items:t,component:a=h.A}=e;return(0,d.jsx)(d.Fragment,{children:t.map((e=>{let{content:t}=e;return(0,d.jsx)(g.in,{content:t,children:(0,d.jsx)(a,{children:(0,d.jsx)(t,{})})},t.metadata.permalink)}))})}var x=a(7143);function j(e){const t=(0,g.kJ)(e);return(0,d.jsx)(x.A,{children:(0,d.jsx)("script",{type:"application/ld+json",children:JSON.stringify(t)})})}function f(e){const{metadata:t}=e,{siteConfig:{title:a}}=(0,s.A)(),{blogDescription:n,blogTitle:l,permalink:i}=t,o="/"===i?a:l;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(r.be,{title:o,description:n}),(0,d.jsx)(m.A,{tag:"blog_posts_list"})]})}function b(e){const{metadata:t,items:a,sidebar:n}=e;return(0,d.jsxs)(i.A,{sidebar:n,children:[(0,d.jsx)(p,{items:a}),(0,d.jsx)(u,{metadata:t})]})}function A(e){return(0,d.jsxs)(r.e3,{className:(0,n.A)(l.G.wrapper.blogPages,l.G.page.blogListPage),children:[(0,d.jsx)(f,{...e}),(0,d.jsx)(j,{...e}),(0,d.jsx)(b,{...e})]})}}}]);