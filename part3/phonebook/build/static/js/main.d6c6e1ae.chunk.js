(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{21:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),c=n(16),u=n.n(c),a=(n(7),n(6)),i=n(3),l=(n(21),n(0)),s=function(e){var t=e.person,n=e.deleteContact;return Object(l.jsxs)("div",{children:[Object(l.jsxs)("h3",{children:[" ",t.name,":",t.number]}),Object(l.jsx)("button",{onClick:function(){return n(t.id)},children:"Delete"}),"    "]})},d=function(e){var t=e.setSearch;return Object(l.jsxs)("div",{children:["Filter shown with: ",Object(l.jsx)("input",{onChange:function(e){var n=e.target;return t(n.value)}})]})},b=function(e){var t=e.onSubmit,n=e.newName,r=e.addNewName,o=e.newNumber,c=e.addNewNumber;return Object(l.jsxs)("form",{onSubmit:t,children:[Object(l.jsx)("h2",{children:"Add Contact"}),"Name:",Object(l.jsx)("input",{value:n,onChange:r})," ",Object(l.jsx)("br",{})," ",Object(l.jsx)("br",{}),"Number:",Object(l.jsx)("input",{value:o,onChange:c}),Object(l.jsx)("button",{type:"submit",children:"Save"})]})},j=n(4),f=n.n(j),m="https://sheltered-plains-59703.herokuapp.com/api/persons",h={getAll:function(){return f.a.get(m).then((function(e){return e.data}))},create:function(e){return f.a.post(m,e).then((function(e){return e.data}))},remove:function(e){return f.a.delete("".concat(m,"/").concat(e)).then((function(e){return e.data}))},update:function(e,t){return f.a.put("".concat(m,"/").concat(e),t).then((function(e){return e.data}))}},O=function(e){var t=e.message;e.error;return null===t?null:Object(l.jsx)("div",{style:{color:"green",backgroundColor:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5},children:t})},v=function(e){var t=e.error;return null===t?null:Object(l.jsx)("div",{style:{color:"red",backgroundColor:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5},children:t})},p=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),u=Object(i.a)(c,2),j=u[0],f=u[1],m=Object(r.useState)(""),p=Object(i.a)(m,2),g=p[0],x=p[1],w=Object(r.useState)(""),S=Object(i.a)(w,2),N=S[0],C=S[1],y=Object(r.useState)(null),k=Object(i.a)(y,2),F=k[0],T=k[1],A=Object(r.useState)(null),L=Object(i.a)(A,2),D=L[0],I=L[1];Object(r.useEffect)((function(){h.getAll().then((function(e){o(e)}))}),[]);var P=""===N?n:n.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase())})),z=function(e){var t=n.filter((function(t){return t.id===e}))[0].name;window.confirm("Are you sure want to delete contact ".concat(t))&&(h.remove(e),console.log("".concat(e," is deleted")),o(n.filter((function(t){return t.id!==e}))))};return Object(l.jsxs)("div",{children:[Object(l.jsx)("h1",{children:"Phonebook"}),Object(l.jsx)(d,{setSearch:C}),Object(l.jsx)(b,{onSubmit:function(e){e.preventDefault();var t=n.find((function(e){return e.name===j}));if(t){if(window.confirm("".concat(j," is already added to phonebook,do you want to replace old number with new number"))){var r=Object(a.a)(Object(a.a)({},t),{},{number:g}),c=t.id;h.update(c,r).then((function(e){o(n.map((function(t){return t.id!==c?t:e}))),f(""),x(""),T("".concat(e.name," number is updated")),setTimeout((function(){T(null)}),5e3)})).catch((function(e){o(n.filter((function(e){return e.name!==t.name}))),I("Information of ".concat(t.name," is already removed from the server")),setTimeout((function(){return I(null)}),5e3)}))}}else{var u={name:j,number:g};h.create(u).then((function(e){o(n.concat(e)),f(""),x(""),T("".concat(e.name," is added to phonebook")),setTimeout((function(){T(null)}),5e3)}))}},newName:j,addNewName:function(e){console.log(e.target.value),f(e.target.value)},newNumber:g,addNewNumber:function(e){console.log(e.target.value),x(e.target.value)}}),Object(l.jsx)(O,{message:F}),Object(l.jsx)(v,{error:D}),Object(l.jsx)("h2",{children:" Numbers "}),P.map((function(e){return Object(l.jsx)(s,{person:e,deleteContact:z},e.name)}))]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,42)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,c=t.getLCP,u=t.getTTFB;n(e),r(e),o(e),c(e),u(e)}))};u.a.render(Object(l.jsx)(o.a.StrictMode,{children:Object(l.jsx)(p,{})}),document.getElementById("root")),g()},7:function(e,t,n){}},[[41,1,2]]]);
//# sourceMappingURL=main.d6c6e1ae.chunk.js.map