(this.webpackJsonpgeocoder=this.webpackJsonpgeocoder||[]).push([[0],{29:function(e,a,t){},54:function(e,a,t){"use strict";t.r(a);var s=t(2),r=t.n(s),c=t(19),n=t.n(c),o=t(3),i=t.n(o),d=t(20),l=t(4),j=(t(29),t(21)),p=t.n(j),b=t(22),h=t.n(b),u=t(23),x=t(0);var O=function(){var e=Object(s.useState)(!1),a=Object(l.a)(e,2),t=a[0],r=a[1],c=Object(s.useState)(!1),n=Object(l.a)(c,2),o=n[0],j=n[1],b=Object(s.useState)(4326),O=Object(l.a)(b,2),m=O[0],v=O[1],f=Object(s.useState)([]),g=Object(l.a)(f,2),y=g[0],k=g[1],w=function(){var e=Object(d.a)(i.a.mark((function e(a,t){var s,c,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t&&r(!0),s=[],c=i.a.mark((function e(t){var r,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=a[t].addr,"EBB1ED94-DE92-302B-9402-D87472CEFCA1",c="http://api.vworld.kr/req/address?service=address&request=getcoord&version=2.0&crs=epsg:".concat(m,"&address=").concat(r,"&refine=true&simple=false&format=json&type=road&key=").concat("EBB1ED94-DE92-302B-9402-D87472CEFCA1"),e.prev=3,e.next=6,h.a.get(c).then((function(e){var a=e.data.response.result.point.x,t=e.data.response.result.point.y;s.push({address:r,xcoord:a,ycoord:t})}));case 6:e.next=13;break;case 8:e.prev=8,e.t0=e.catch(3),"","",s.push({address:r,xcoord:"",ycoord:""});case 13:case"end":return e.stop()}}),e,null,[[3,8]])})),n=0;case 4:if(!(n<a.length)){e.next=9;break}return e.delegateYield(c(n),"t0",6);case 6:n++,e.next=4;break;case 9:k(s),r(!1),j(!0);case 12:case"end":return e.stop()}}),e)})));return function(a,t){return e.apply(this,arguments)}}();return Object(x.jsxs)("div",{className:"App",children:[Object(x.jsxs)("div",{className:"wrapper",children:[Object(x.jsxs)("div",{className:"header",children:[Object(x.jsx)("h4",{children:"\ub3c4\ub85c\uba85\uc8fc\uc18c \uc88c\ud45c \ubcc0\ud658\uae30 ver 1.0 \ud83d\udccd"}),Object(x.jsxs)("div",{className:"desc",children:["\ube0c\uc774\uc6d4\ub4dc(vworld)\uc5d0\uc11c \uc81c\uacf5\ud558\ub294 geocoder api\ub97c \uc774\uc6a9\ud558\uc5ec ",Object(x.jsx)("br",{}),"\ub3c4\ub85c\uba85\uc8fc\uc18c\ub97c",Object(x.jsxs)("select",{className:"options",onChange:function(e){v(e.target.value)},children:[Object(x.jsx)("option",{value:"4326",children:" \ud83c\udf0f \uc704\uacbd\ub3c4 (EPSG:4326)"}),Object(x.jsx)("option",{value:"3857",children:" \ud83c\udf0f \uad6c\uae00\uc9c0\ub3c4 (EPSG:3857)"}),Object(x.jsx)("option",{value:"5180",children:"\ud83c\udf0f TM\uc11c\ubd80\uc6d0\uc810 (EPSG:5180)"}),Object(x.jsx)("option",{value:"5181",children:"\ud83c\udf0f TM\uc911\ubd80\uc6d0\uc810 (EPSG:5181)"}),Object(x.jsx)("option",{value:"5182",children:"\ud83c\udf0f TM\uc81c\uc8fc\uc6d0\uc810 (EPSG:5182)"}),Object(x.jsx)("option",{value:"5183",children:"\ud83c\udf0f TM\ub3d9\ubd80\uc6d0\uc810 (EPSG:5183)"}),Object(x.jsx)("option",{value:"5179",children:"\ud83c\udf0f UTM-K (EPSG:5179)"})]}),"\uc88c\ud45c\uacc4\ub85c \ubcc0\ud658\ud574\uc90d\ub2c8\ub2e4\xa0\u2728",Object(x.jsx)("br",{}),Object(x.jsx)("p",{children:"\uceec\ub7fc\uba85\uc744 addr \ub85c \uc124\uc815\ud6c4 csv \ud30c\uc77c\ub85c \uc62c\ub824\uc8fc\uc138\uc694"})]})]}),Object(x.jsx)(p.a,{className:"reader",cssClass:"react-csv-input",onFileLoaded:w,parserOptions:{header:!0,dynamicTyping:!0,skipEmptyLines:!0,transformHeader:function(e){return e.toLowerCase().replace("/W/g","_")}},inputStyle:{width:"180px"}}),t?Object(x.jsx)("span",{className:"material-icons progress",children:"loop"}):"",o?Object(x.jsx)(u.CSVLink,{data:y,headers:[{label:"addr",key:"address"},{label:"x",key:"xcoord"},{label:"y",key:"ycoord"}],separator:",",filename:"geocoding.csv",className:"download",children:Object(x.jsxs)("div",{className:"download",children:[Object(x.jsx)("p",{children:"Download"}),Object(x.jsx)("span",{className:"material-icons",children:"file_download"})]})}):"",Object(x.jsxs)("p",{className:"footer",children:["\xa9 ",(new Date).getFullYear(),". ethanlee. all rights reserved.",Object(x.jsx)("br",{}),"if you have any questions, please let me know! ",Object(x.jsx)("br",{}),Object(x.jsx)("a",{href:"https://github.com/seungwoonlee90",target:"_blank",rel:"noopener noreferrer",children:Object(x.jsx)("span",{className:"material-icons footer-icon",children:"home"})}),Object(x.jsx)("a",{href:"mailto:superman@test.com",children:Object(x.jsx)("span",{className:"material-icons footer-icon",children:"email"})})]})]}),Object(x.jsx)("ins",{className:"kakao_ad_area",style:{display:"none"},"data-ad-unit":"DAN-rgk7dxo2C6UptXbe","data-ad-width":"160","data-ad-height":"600"}),Object(x.jsx)("script",{type:"text/javascript",src:"//t1.daumcdn.net/kas/static/ba.min.js",async:!0})]})};n.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(O,{})}),document.getElementById("root"))}},[[54,1,2]]]);
//# sourceMappingURL=main.e8fc6b89.chunk.js.map