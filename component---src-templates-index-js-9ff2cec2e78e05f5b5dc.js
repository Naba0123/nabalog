(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"3CW5":function(e,t,a){"use strict";var n=a("q1tI"),l=a.n(n),r=a("Wbzz");t.a=function(e){var t=e.context,a=t.previousPagePath,n=t.nextPagePath,i=t.humanPageNumber,c=t.numberOfPages;return l.a.createElement("div",{className:"pagination"},l.a.createElement("p",{style:{marginBottom:0}},l.a.createElement("span",null,"Page ",i," of ",c)),l.a.createElement("ul",null,l.a.createElement("li",null,a&&l.a.createElement(r.Link,{to:a,className:"pagination-before"},"前のページ")),n&&l.a.createElement("li",null,l.a.createElement(r.Link,{to:n,className:"pagination-after"},"次のページ"))))}},TRom:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",(function(){return u}));var n=a("q1tI"),l=a.n(n),r=a("Wbzz"),i=a("Bl7J"),c=a("vrFN"),o=a("d+8V"),m=a("p3AD"),s=a("3CW5");t.default=function(e){var t=e.data,a=e.location,n=e.pageContext,u=t.site.siteMetadata.title,d=t.site.siteMetadata.description,p=t.allMarkdownRemark.edges;return l.a.createElement(i.a,{location:a,title:u,description:d},l.a.createElement(c.a,{title:"TOP"}),p.map((function(e){var t=e.node,a=t.frontmatter.title||t.fields.slug;return l.a.createElement("article",{key:t.fields.slug},l.a.createElement("header",null,l.a.createElement("p",{style:{margin:0}},l.a.createElement("small",null,t.frontmatter.date)),l.a.createElement("h3",{style:{marginBottom:Object(m.a)(.5)}},l.a.createElement(r.Link,{style:{boxShadow:"none"},to:t.fields.slug},a)),l.a.createElement(o.a,{tags:t.frontmatter.tags})),l.a.createElement("section",null,l.a.createElement("p",{dangerouslySetInnerHTML:{__html:t.frontmatter.description||t.excerpt}})),l.a.createElement("hr",null))})),l.a.createElement(s.a,{context:n}))};var u="1405584837"}}]);
//# sourceMappingURL=component---src-templates-index-js-9ff2cec2e78e05f5b5dc.js.map