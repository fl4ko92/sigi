(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-470b4216"],{"334c":function(e,t,a){},a28d:function(e,t,a){"use strict";a("334c")},e8f5:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticStyle:{padding:"8px"}},[e.init?a("div",[a("v-data-table",{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.centers,loading:e.loadingCentersData,"footer-props":{"disable-items-per-page":!0,"items-per-page-text":"Centros por página"},"sort-by":"name","server-items-length":e.totalCentersItems,"loading-text":"Cargando Centros..."},on:{pagination:e.paginateCenters},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[e._v("Centros de aislamiento")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,o=t.attrs;return[a("v-btn",e._g(e._b({staticClass:"mb-2",attrs:{color:"success",dark:""}},"v-btn",o,!1),i),[a("v-icon",[e._v("mdi-plus")]),e._v("Añadir Centro ")],1)]}}],null,!1,3346714907),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"fix-title"},[a("span",{staticClass:"text-h5"},[e._v(e._s(e.formTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Nombre"},model:{value:e.editedItem.nombre_centro,callback:function(t){e.$set(e.editedItem,"nombre_centro",t)},expression:"editedItem.nombre_centro"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-autocomplete",{attrs:{items:e.municipalities,color:"white","item-text":"name",label:"Municipio"},model:{value:e.editedItem.municipio,callback:function(t){e.$set(e.editedItem,"municipio",t)},expression:"editedItem.municipio"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Organismo"},model:{value:e.editedItem.organismo,callback:function(t){e.$set(e.editedItem,"organismo",t)},expression:"editedItem.organismo"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v(" Cancelar ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.save}},[e._v(" Guardar ")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDelete,callback:function(t){e.dialogDelete=t},expression:"dialogDelete"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5",staticStyle:{"word-break":"normal"}},[e._v(" ¿Está seguro que desea eliminar el elemento? ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDelete}},[e._v(" Cancel ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteItemConfirm}},[e._v(" OK ")]),a("v-spacer")],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogDeleteUnavailable,callback:function(t){e.dialogDeleteUnavailable=t},expression:"dialogDeleteUnavailable"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5"},[e._v(" Este Centro no se puede eliminar porque tiene camas en uso!!!! ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeDeleteU}},[e._v(" OK ")]),a("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var i=t.item;return[a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on,n=t.attrs;return[a("v-icon",e._g(e._b({staticClass:"mr-2",attrs:{color:"orange"},on:{click:function(t){return e.editItem(i)}}},"v-icon",n,!1),o),[e._v(" mdi-pencil ")])]}}],null,!0)},[a("span",[e._v("Editar")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on,n=t.attrs;return[a("v-icon",e._g(e._b({staticClass:"mr-2",attrs:{color:"error"},on:{click:function(t){return e.deleteItem(i)}}},"v-icon",n,!1),o),[e._v(" mdi-delete ")])]}}],null,!0)},[a("span",[e._v("Eliminar")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on,n=t.attrs;return[a("v-icon",e._g(e._b({attrs:{color:"info"},on:{click:function(t){return e.detailsItem(i)}}},"v-icon",n,!1),o),[e._v(" mdi-dots-horizontal-circle ")])]}}],null,!0)},[a("span",[e._v("Detalles")])])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:e.initialize}},[e._v(" Reset ")])]},proxy:!0}],null,!1,3821072573)})],1):e.area?a("div",[a("v-card",[a("v-btn",{staticStyle:{margin:"12px"},on:{click:function(t){e.init=!0}}},[a("v-icon",[e._v(" mdi-arrow-left ")]),e._v(" Atras ")],1),a("v-card-title",[a("v-icon",{attrs:{large:""}},[e._v(" mdi-hospital-building ")]),a("v-card-title",{staticClass:"text-h5"},[e._v(" "+e._s(e.editedItem.nombre_centro)+" / "+e._s(e.editedItem.organismo)+" ")])],1),a("v-card-subtitle",[e._v(e._s(e.editedItem.municipio))]),a("v-card-text",[a("info-box",{attrs:{stats:e.myStats,more:!1}}),e.area?a("v-data-table",{staticClass:"elevation-1",staticStyle:{margin:"8px"},attrs:{headers:e.areaHeaders,items:e.areas,loading:e.loadingAreasData,"footer-props":{"disable-items-per-page":!0,"items-per-page-text":"Areas por página"},"sort-by":"nombre","server-items-length":e.totalAreasItems,"loading-text":"Cargando Areas..."},on:{pagination:e.paginateAreas},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[e._v("Areas")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,o=t.attrs;return[a("v-btn",e._g(e._b({staticClass:"mb-2",attrs:{color:"success",dark:""}},"v-btn",o,!1),i),[a("v-icon",[e._v("mdi-plus")]),e._v("Añadir Area ")],1)]}}],null,!1,2186800173),model:{value:e.areaDialog,callback:function(t){e.areaDialog=t},expression:"areaDialog"}},[a("v-card",[a("v-card-title",{staticClass:"fix-title"},[a("span",{staticClass:"text-h5"},[e._v(e._s(e.areaFormTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Nombre"},model:{value:e.editedAreaItem.nombre,callback:function(t){e.$set(e.editedAreaItem,"nombre",t)},expression:"editedAreaItem.nombre"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-autocomplete",{attrs:{items:e.categories,color:"white","item-text":"name",label:"Categoria"},model:{value:e.editedAreaItem.categoria,callback:function(t){e.$set(e.editedAreaItem,"categoria",t)},expression:"editedAreaItem.categoria"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeArea}},[e._v(" Cancelar ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.saveArea}},[e._v(" Guardar ")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogAreaDelete,callback:function(t){e.dialogAreaDelete=t},expression:"dialogAreaDelete"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5",staticStyle:{"word-break":"normal"}},[e._v(" ¿Está seguro que desea eliminar el elemento? ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeAreaDelete}},[e._v(" Cancel ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteAreaItemConfirm}},[e._v(" OK ")]),a("v-spacer")],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogAreaDeleteUnavailable,callback:function(t){e.dialogAreaDeleteUnavailable=t},expression:"dialogAreaDeleteUnavailable"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5"},[e._v(" Esta Area no se puede eliminar porque tiene camas en uso!!!! ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeAreaDeleteU}},[e._v(" OK ")]),a("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var i=t.item;return[a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on,n=t.attrs;return[a("v-icon",e._g(e._b({staticClass:"mr-2",attrs:{color:"orange"},on:{click:function(t){return e.editAreaItem(i)}}},"v-icon",n,!1),o),[e._v(" mdi-pencil ")])]}}],null,!0)},[a("span",[e._v("Editar")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on,n=t.attrs;return[a("v-icon",e._g(e._b({staticClass:"mr-2",attrs:{color:"error"},on:{click:function(t){return e.deleteAreaItem(i)}}},"v-icon",n,!1),o),[e._v(" mdi-delete ")])]}}],null,!0)},[a("span",[e._v("Eliminar")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on,n=t.attrs;return[a("v-icon",e._g(e._b({attrs:{color:"info"},on:{click:function(t){return e.detailsAreaItem(i)}}},"v-icon",n,!1),o),[e._v(" mdi-dots-horizontal-circle ")])]}}],null,!0)},[a("span",[e._v("Detalles")])])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:e.initialize}},[e._v(" Reset ")])]},proxy:!0}],null,!1,1018810100)}):e._e()],1)],1)],1):e.room?a("div",[a("v-card",[a("v-btn",{staticStyle:{margin:"12px"},on:{click:function(t){e.area=!0}}},[a("v-icon",[e._v(" mdi-arrow-left ")]),e._v(" Atras ")],1),a("v-card-title",[a("v-icon",{attrs:{large:""}},[e._v(" mdi-hospital-building ")]),a("v-card-title",{staticClass:"text-h5"},[e._v(" "+e._s(e.editedItem.nombre_centro)+" / "+e._s(e.editedItem.organismo)+" ")])],1),a("v-card-subtitle",[e._v(e._s(e.editedItem.municipio))]),a("v-card-text",[a("v-card",[a("v-card-title",[a("v-icon",[e._v(" mdi-domain ")]),e._v(e._s(e.editedAreaItem.nombre)+" ")],1),a("v-card-subtitle",[e._v(e._s(e.editedAreaItem.categoria))]),a("info-box",{staticStyle:{margin:"4px"},attrs:{stats:e.myAreaStats,more:!1}}),e.room?a("v-data-table",{staticClass:"elevation-1",staticStyle:{margin:"14px"},attrs:{headers:e.roomsHeaders,items:e.rooms,"sort-by":"calories"},scopedSlots:e._u([{key:"top",fn:function(){return[a("v-toolbar",{attrs:{flat:""}},[a("v-toolbar-title",[e._v("Habitaciones")]),a("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,o=t.attrs;return[a("v-btn",e._g(e._b({staticClass:"mb-2",attrs:{color:"success",dark:""}},"v-btn",o,!1),i),[a("v-icon",[e._v("mdi-plus")]),e._v("Añadir Habitación ")],1)]}}],null,!1,2863502842),model:{value:e.roomsDialog,callback:function(t){e.roomsDialog=t},expression:"roomsDialog"}},[a("v-card",[a("v-card-title",{staticClass:"fix-title"},[a("span",{staticClass:"text-h5"},[e._v(e._s(e.roomsFormTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Numero"},model:{value:e.editedRoomItem.number,callback:function(t){e.$set(e.editedRoomItem,"number",t)},expression:"editedRoomItem.number"}})],1),a("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[a("v-text-field",{attrs:{label:"Capacidad",type:"number"},model:{value:e.editedRoomItem.capacity,callback:function(t){e.$set(e.editedRoomItem,"capacity",t)},expression:"editedRoomItem.capacity"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeRoom}},[e._v(" Cancelar ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.saveRoom}},[e._v(" Guardar ")])],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogRoomDelete,callback:function(t){e.dialogRoomDelete=t},expression:"dialogRoomDelete"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5",staticStyle:{"word-break":"normal"}},[e._v(" ¿Está seguro que desea eliminar el elemento? ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeRoomDelete}},[e._v(" Cancel ")]),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.deleteRoomItemConfirm}},[e._v(" OK ")]),a("v-spacer")],1)],1)],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:e.dialogRoomDeleteUnavailable,callback:function(t){e.dialogRoomDeleteUnavailable=t},expression:"dialogRoomDeleteUnavailable"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5"},[e._v(" Esta Habitacion no se puede eliminar porque tiene camas en uso!!!! ")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.closeRoomDeleteU}},[e._v(" OK ")]),a("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(t){var i=t.item;return[a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on,n=t.attrs;return[a("v-icon",e._g(e._b({staticClass:"mr-2",attrs:{color:"orange"},on:{click:function(t){return e.editRoomItem(i)}}},"v-icon",n,!1),o),[e._v(" mdi-pencil ")])]}}],null,!0)},[a("span",[e._v("Editar")])]),a("v-tooltip",{attrs:{bottom:""},scopedSlots:e._u([{key:"activator",fn:function(t){var o=t.on,n=t.attrs;return[a("v-icon",e._g(e._b({staticClass:"mr-2",attrs:{color:"error"},on:{click:function(t){return e.deleteRoomItem(i)}}},"v-icon",n,!1),o),[e._v(" mdi-delete ")])]}}],null,!0)},[a("span",[e._v("Eliminar")])])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:e.initialize}},[e._v(" Reset ")])]},proxy:!0}],null,!1,3768710194)}):e._e()],1)],1)],1)],1):e._e()])},o=[],n=a("1da1"),r=(a("a434"),a("96cf"),a("0f47")),s=(a("99af"),a("bc3a")),c=a.n(s),l=a("c9d9"),d=a("4e40"),u=a("72bf"),m=a.n(u);function v(){return p.apply(this,arguments)}function p(){return p=Object(n["a"])(regeneratorRuntime.mark((function e(){var t,a,i,o=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=o.length>0&&void 0!==o[0]?o[0]:1,a="".concat(l["c"],"centros?page=").concat(t),e.next=4,c.a.get(a,Object(d["a"])());case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}}),e)}))),p.apply(this,arguments)}function b(e){return g.apply(this,arguments)}function g(){return g=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a="".concat(l["c"],"centros"),e.next=3,c.a.post(a,t,Object(d["b"])());case 3:return i=e.sent,e.abrupt("return",i);case 5:case"end":return e.stop()}}),e)}))),g.apply(this,arguments)}function f(e){return h.apply(this,arguments)}function h(){return h=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a="".concat(l["c"],"centros/").concat(t),e.next=3,c.a.delete(a,Object(d["a"])());case 3:return i=e.sent,e.abrupt("return",i);case 5:case"end":return e.stop()}}),e)}))),h.apply(this,arguments)}function x(e){return _.apply(this,arguments)}function _(){return _=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a="".concat(l["c"],"centros/").concat(t.id_centro),e.next=3,c.a.put(a,t,Object(d["b"])());case 3:return i=e.sent,e.abrupt("return",i);case 5:case"end":return e.stop()}}),e)}))),_.apply(this,arguments)}function I(e){return k.apply(this,arguments)}function k(){return k=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,i,o,n=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=n.length>1&&void 0!==n[1]?n[1]:1,i="".concat(l["c"],"centros/").concat(t,"/areas?page=").concat(a),e.next=4,c.a.get(i,Object(d["a"])());case 4:return o=e.sent,e.abrupt("return",o);case 6:case"end":return e.stop()}}),e)}))),k.apply(this,arguments)}function C(e){return A.apply(this,arguments)}function A(){return A=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a="".concat(l["c"],"/areas"),t=m.a.stringify(t),e.next=4,c.a.post(a,t,Object(d["b"])());case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}}),e)}))),A.apply(this,arguments)}function D(e,t){return R.apply(this,arguments)}function R(){return R=Object(n["a"])(regeneratorRuntime.mark((function e(t,a){var i,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i="".concat(l["c"],"centros/").concat(t,"/areas/").concat(a),e.next=3,c.a.delete(i,Object(d["a"])());case 3:return o=e.sent,e.abrupt("return",o);case 5:case"end":return e.stop()}}),e)}))),R.apply(this,arguments)}function y(e){return w.apply(this,arguments)}function w(){return w=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a="".concat(l["c"],"areas/").concat(t.id_area),t=m.a.stringify(t),e.next=4,c.a.put(a,t,Object(d["b"])());case 4:return i=e.sent,e.abrupt("return",i);case 6:case"end":return e.stop()}}),e)}))),w.apply(this,arguments)}var O={components:{InfoBox:r["a"]},data:function(){return{centersFilters:{page:1},areasFilters:{page:1},centersFirstLoad:!0,areasFirstLoadL:!0,loadingAreasData:!0,loadingCentersData:!0,totalCentersItems:0,totalAreasItems:0,myStats:[{bgColor:"success  ligthen-1",iconClass:"blue lighten-3 white--text",icon:"mdi-bunk-bed-outline",title:"Camas Totales",data:"450",action:{label:"more",link:""}},{bgColor:"success  ligthen-1",iconClass:"blue lighten-3 white--text",icon:"mdi-bed",title:"Camas Usadas",data:"200",action:{label:"more",link:""}},{bgColor:"success  ligthen-1",iconClass:"blue lighten-3 white--text",icon:"mdi-bed-empty",title:"Camas Disponibles",data:"250",action:{label:"more",link:""}}],myAreaStats:[{bgColor:"success  ligthen-1",iconClass:"blue lighten-3 white--text",icon:"mdi-bunk-bed-outline",title:"Camas Totales",data:"200",action:{label:"more",link:""}},{bgColor:"success  ligthen-1",iconClass:"blue lighten-3 white--text",icon:"mdi-bed",title:"Camas Usadas",data:"150",action:{label:"more",link:""}},{bgColor:"success  ligthen-1",iconClass:"blue lighten-3 white--text",icon:"mdi-bed-empty",title:"Camas Disponibles",data:"50",action:{label:"more",link:""}}],area:!1,init:!0,room:!1,dialogDeleteUnavailable:!1,dialogAreaDeleteUnavailable:!1,dialogRoomDeleteUnavailable:!1,dialog:!1,areaDialog:!1,roomsDialog:!1,dialogDelete:!1,dialogAreaDelete:!1,dialogRoomDelete:!1,municipalities:[{name:"Santa Clara",abbr:"SC",id:1},{name:"Manicaragua",abbr:"MC",id:2},{name:"Remedios",abbr:"RE",id:3},{name:"Camajuani",abbr:"CA",id:4}],categories:[{name:"Sospechoso",id:1},{name:"Positivo",id:2},{name:"Contacto",id:3}],headers:[{text:"Nombre",align:"start",sortable:!0,value:"nombre_centro"},{text:"Municipio",value:"municipio"},{text:"Organismo",value:"organismo"},{text:"Acciones",value:"actions",sortable:!1}],areaHeaders:[{text:"Nombre",align:"start",sortable:!0,value:"nombre"},{text:"Categoria",value:"categoria"},{text:"Acciones",value:"actions",sortable:!1}],roomsHeaders:[{text:"Numero",align:"start",sortable:!0,value:"number"},{text:"Capacidad",value:"capacity"},{text:"Acciones",value:"actions",sortable:!1}],centers:[],areas:[],rooms:[],editedIndex:-1,editedAreaIndex:-1,editedRoomIndex:-1,editedItem:{nombre_centro:"",municipio:"",organismo:"",cap_total:0,cap_disponible:0,id:-1},defaultItem:{nombre_centro:"",municipio:"",organismo:"",cap_total:0,cap_disponible:0,id:-1},editedAreaItem:{nombre:"",categoria:"",capacity:0,availability:0},defaultAreaItem:{nombre:"",categoria:"",capacity:0,availability:0},editedRoomItem:{number:"",capacity:0},defaultRoomItem:{number:"",capacity:0}}},computed:{formTitle:function(){return-1===this.editedIndex?"Nuevo Centro":"Editar Centro"},areaFormTitle:function(){return-1===this.editedAreaIndex?"Nueva Area":"Editar Area"},roomsFormTitle:function(){return-1===this.editedRoomIndex?"Nueva Habitación":"Editar Habitación"}},watch:{dialog:function(e){e||this.close()},dialogDelete:function(e){e||this.closeDelete()},dialogArea:function(e){e||this.closeArea()},dialogAreaDelete:function(e){e||this.closeAreaDelete()},dialogRoom:function(e){e||this.closeRoom()},dialogRoomDelete:function(e){e||this.closeRoomDelete()}},mounted:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.initialize(),e.loadCentersData();case 2:case"end":return t.stop()}}),t)})))()},methods:{loadCentersData:function(){var e=arguments,t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i=e.length>0&&void 0!==e[0]?e[0]:1,t.loadingCentersData=!0,a.prev=2,a.next=5,v(i);case 5:o=a.sent,t.totalCentersItems=o.data.meta.total,t.centers=o.data.centros,t.loadingCentersData=!1,a.next=14;break;case 11:a.prev=11,a.t0=a["catch"](2),console.log(a.t0);case 14:case"end":return a.stop()}}),a,null,[[2,11]])})))()},loadAreasData:function(){var e=arguments,t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var i,o;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i=e.length>0&&void 0!==e[0]?e[0]:1,t.loadingAreasData=!0,a.prev=2,a.next=5,I(t.editedItem.id_centro,i);case 5:o=a.sent,t.totalAreasItems=o.data.meta.total,t.areas=o.data.areas,t.loadingAreasData=!1,a.next=14;break;case 11:a.prev=11,a.t0=a["catch"](2),console.log(a.t0);case 14:case"end":return a.stop()}}),a,null,[[2,11]])})))()},detailsItem:function(e){this.editedIndex=this.centers.indexOf(e),this.editedItem=Object.assign({},e),this.loadAreasData(),this.init=!1,this.area=!0},detailsAreaItem:function(e){this.editedAreaIndex=this.areas.indexOf(e),this.editedAreaItem=Object.assign({},e),this.area=!1,this.room=!0},closeDeleteU:function(){this.dialogDeleteUnavailable=!1},closeAreaDeleteU:function(){this.dialogAreaDeleteUnavailable=!1},closeRoomDeleteU:function(){this.dialogRoomDeleteUnavailable=!1},initialize:function(){this.centers=[{nombre_centro:"EIA",municipio:"Santa Clara",organismo:"MINED",cap_positivos:100,cap_sospechosos:67,cap_contactos:67,dis_positivos:80,dis_sospechosos:25,dis_contactos:50},{nombre_centro:"UCLV",municipio:"Santa Clara",organismo:"MES",cap_positivos:100,cap_sospechosos:67,cap_contactos:67,dis_positivos:80,dis_sospechosos:25,dis_contactos:50},{nombre_centro:"Pedagogico",municipio:"Santa Clara",organismo:"MES",cap_positivos:100,cap_sospechosos:67,cap_contactos:67,dis_positivos:80,dis_sospechosos:25,dis_contactos:50},{nombre_centro:"Perez Quintosa",municipio:"Santa Clara",organismo:"MINED",cap_positivos:100,cap_sospechosos:67,cap_contactos:67,dis_positivos:80,dis_sospechosos:25,dis_contactos:50}],this.areas=[{name:"900-A",category:"Sospechosos",capacity:45,availability:20},{name:"900-B",category:"Sospechosos",capacity:45,availability:15},{name:"900-C",category:"Sospechosos",capacity:53,availability:20}],this.rooms=[{number:101,capacity:20},{number:102,capacity:25}]},editItem:function(e){this.editedIndex=this.centers.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0},editAreaItem:function(e){this.editedAreaIndex=this.areas.indexOf(e),this.editedAreaItem=Object.assign({},e),this.areaDialog=!0},editRoomItem:function(e){this.editedRoomIndex=this.rooms.indexOf(e),this.editedRoomItem=Object.assign({},e),this.roomsDialog=!0},deleteItem:function(e){this.editedIndex=this.centers.indexOf(e),this.editedItem=Object.assign({},e),this.editedItem.cap_disponible<this.editedItem.cap_total?this.dialogDeleteUnavailable=!0:this.dialogDelete=!0},deleteAreaItem:function(e){this.editedAreaIndex=this.areas.indexOf(e),this.editedAreaItem=Object.assign({},e),this.dialogAreaDelete=!0},deleteRoomItem:function(e){this.editedRoomIndex=this.rooms.indexOf(e),this.editedRoomItem=Object.assign({},e),this.dialogRoomDelete=!0},deleteItemConfirm:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,f(e.editedItem.id_centro);case 3:e.loadCentersData(),t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),console.log(t.t0);case 9:e.centers.splice(e.editedIndex,1),e.closeDelete();case 11:case"end":return t.stop()}}),t,null,[[0,6]])})))()},deleteAreaItemConfirm:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,D(e.editedAreaItem.id_area);case 3:e.loadAreasData(),t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](0),console.log(t.t0);case 9:e.areas.splice(e.editedAreaIndex,1),e.closeAreaDelete();case 11:case"end":return t.stop()}}),t,null,[[0,6]])})))()},deleteRoomItemConfirm:function(){this.rooms.splice(this.editedRoomIndex,1),this.closeRoomDelete()},close:function(){var e=this;this.dialog=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},closeArea:function(){var e=this;this.areaDialog=!1,this.$nextTick((function(){e.editedAreaItem=Object.assign({},e.defaultAreaItem),e.editedAreaIndex=-1}))},closeRoom:function(){var e=this;this.roomsDialog=!1,this.$nextTick((function(){e.editedRoomItem=Object.assign({},e.defaultRoomItem),e.editedRoomIndex=-1}))},closeDelete:function(){var e=this;this.dialogDelete=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},closeAreaDelete:function(){var e=this;this.dialogAreaDelete=!1,this.$nextTick((function(){e.editedAreaItem=Object.assign({},e.defaultAreaItem),e.editedAreaIndex=-1}))},closeRoomDelete:function(){var e=this;this.dialogRoomDelete=!1,this.$nextTick((function(){e.editedRoomItem=Object.assign({},e.defaultRoomItem),e.editedRoomIndex=-1}))},save:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.editedIndex>-1)){t.next=7;break}return t.next=3,x(e.editedItem);case 3:e.loadCentersData(),Object.assign(e.centers[e.editedIndex],e.editedItem),t.next=11;break;case 7:return t.next=9,b(e.editedItem);case 9:e.loadCentersData(),e.centers.push(e.editedItem);case 11:e.close();case 12:case"end":return t.stop()}}),t)})))()},saveArea:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!(e.editedAreaIndex>-1)){t.next=7;break}return t.next=3,y(e.editedAreaItem);case 3:e.loadAreasData(),Object.assign(e.areas[e.editedAreaIndex],e.editedAreaItem),t.next=11;break;case 7:return t.next=9,C(e.editedItem.id_centro,e.editedAreaItem);case 9:e.loadAreasData(),e.areas.push(e.editedAreaItem);case 11:e.closeArea();case 12:case"end":return t.stop()}}),t)})))()},saveRoom:function(){console.log(this.editedRoomItem),this.editedRoomIndex>-1?Object.assign(this.rooms[this.editedRoomIndex],this.editedRoomItem):this.rooms.push(this.editedRoomItem),this.closeRoom()},paginateCenters:function(e){this.centersFirstLoad?this.centersFirstLoad=!1:(this.centersFilters.page=e.page,this.loadCentersData(e.page))},paginateAreas:function(e){this.areasFirstLoad?this.areasFirstLoad=!1:(this.areasFilters.page=e.page,this.loadAreasData(e.page))}}},j=O,S=(a("a28d"),a("2877")),U=a("6544"),E=a.n(U),T=a("c6a6"),V=a("8336"),F=a("b0af"),$=a("99d9"),N=a("62ad"),H=a("a523"),z=a("8fea"),L=a("169a"),M=a("ce7e"),q=a("132d"),K=a("0fd9"),B=a("2fa4"),G=a("8654"),P=a("71d9"),J=a("2a7f"),Q=a("3a2f"),W=Object(S["a"])(j,i,o,!1,null,"a45ca702",null);t["default"]=W.exports;E()(W,{VAutocomplete:T["a"],VBtn:V["a"],VCard:F["a"],VCardActions:$["a"],VCardSubtitle:$["b"],VCardText:$["c"],VCardTitle:$["d"],VCol:N["a"],VContainer:H["a"],VDataTable:z["a"],VDialog:L["a"],VDivider:M["a"],VIcon:q["a"],VRow:K["a"],VSpacer:B["a"],VTextField:G["a"],VToolbar:P["a"],VToolbarTitle:J["a"],VTooltip:Q["a"]})}}]);
//# sourceMappingURL=chunk-470b4216.2de8920e.js.map