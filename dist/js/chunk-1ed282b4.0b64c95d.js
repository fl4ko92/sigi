(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ed282b4"],{"0f47":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",t._l(t.stats,(function(e,i){return n("v-col",{key:i,attrs:{md:"4",sm:"6",cols:"12"}},[n("v-card",{class:e.bgColor,attrs:{dark:"",elevation:"4"}},[n("v-list-item",[n("v-list-item-avatar",[n("v-icon",{class:[e.iconClass],domProps:{textContent:t._s(e.icon)}})],1),n("v-list-item-content",[n("v-list-item-title",{domProps:{textContent:t._s(e.title)}}),n("br"),n("v-list-item-title",[n("b",{domProps:{textContent:t._s(e.data)}})])],1),t.more?n("v-list-item-action",[n("v-btn",{attrs:{icon:""}},[n("v-icon",{attrs:{color:"grey lighten-3"}},[t._v(" mdi-information ")])],1)],1):t._e()],1)],1)],1)})),1)},a=[],o={name:"InfoBox",props:{stats:{type:Array,default:function(){return[]}},more:{type:Boolean,default:!1}}},s=o,l=n("2877"),c=n("6544"),r=n.n(c),d=n("8336"),m=n("b0af"),u=n("62ad"),b=n("132d"),h=n("da13"),p=n("1800"),g=n("8270"),C=n("5d23"),v=n("0fd9"),k=Object(l["a"])(s,i,a,!1,null,null,null);e["a"]=k.exports;r()(k,{VBtn:d["a"],VCard:m["a"],VCol:u["a"],VIcon:b["a"],VListItem:h["a"],VListItemAction:p["a"],VListItemAvatar:g["a"],VListItemContent:C["a"],VListItemTitle:C["b"],VRow:v["a"]})},"2d59":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{attrs:{id:"dashboard"}},[n("v-row",{staticStyle:{padding:"8px"},attrs:{"no-gutters":""}},[n("info-box",{attrs:{stats:t.monthlyStats,more:!0}})],1)],1)},a=[],o=(n("99af"),n("0f47")),s={name:"SectionDashboard",components:{InfoBox:o["a"]},data:function(){return{monthlyStats:[{bgColor:"success darken-1",iconClass:"blue lighten-3 white--text",icon:"mdi-hospital-building",title:"Centros de aislamiento",data:"22",action:{label:"more",link:""}},{bgColor:"success  ligthen-1",iconClass:"blue lighten-3 white--text",icon:"mdi-bunk-bed-outline",title:"Camas Totales",data:"450",action:{label:"more",link:""}},{bgColor:"success  ligthen-1",iconClass:"blue lighten-3 white--text",icon:"mdi-bed",title:"Camas Usadas",data:"200",action:{label:"more",link:""}},{bgColor:"success  ligthen-1",iconClass:"blue lighten-3 white--text",icon:"mdi-bed-empty",title:"Camas Disponibles",data:"250",action:{label:"more",link:""}},{bgColor:"red  lighten-1",iconClass:"grey white--text",icon:"mdi-account-alert",title:"Pacientes Registrados",data:"150",action:{label:"more",link:""}},{bgColor:"orange lighten-2",iconClass:"grey darken-5 white--text",icon:"mdi-account-search",title:"Pacientes Sospechosos",data:"78",action:{label:"more",link:""}},{bgColor:"pink  darken-1",iconClass:"grey darken-5 white--text",icon:"mdi-account-plus",title:"Pacientes Positivos",data:"72",action:{label:"more",link:""}},{bgColor:"pink  darken-1",iconClass:"grey darken-5 white--text",icon:"mdi-account-plus",title:"Sospechosos Pendientes a Ingreso",data:"25",action:{label:"more",link:""}},{bgColor:"pink  darken-1",iconClass:"grey darken-5 white--text",icon:"mdi-account-plus",title:"Positivos Pendientes a Ingreso",data:"15",action:{label:"more",link:""}}]}},provide:{theme:{isDark:!0}},computed:{minHeight:function(){var t=this.$vuetify.breakpoint.mdAndUp?"100vh":"50vh";return"calc(".concat(t," - ").concat(this.$vuetify.application.top,"px)")}}},l=s,c=n("2877"),r=n("6544"),d=n.n(r),m=n("0fd9"),u=Object(c["a"])(l,i,a,!1,null,null,null);e["default"]=u.exports;d()(u,{VRow:m["a"]})}}]);
//# sourceMappingURL=chunk-1ed282b4.0b64c95d.js.map