(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/seekhouse/map"],{

/***/ 233:
/*!**************************************************************************************************!*\
  !*** D:/HBuilderX.2.6.16.20200424/Projice/mp-toutiao/main.js?{"page":"pages%2Fseekhouse%2Fmap"} ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _map = _interopRequireDefault(__webpack_require__(/*! ./pages/seekhouse/map.vue */ 234));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_map.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 234:
/*!*******************************************************************************!*\
  !*** D:/HBuilderX.2.6.16.20200424/Projice/mp-toutiao/pages/seekhouse/map.vue ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _map_vue_vue_type_template_id_7268e768___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./map.vue?vue&type=template&id=7268e768& */ 235);
/* harmony import */ var _map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map.vue?vue&type=script&lang=js& */ 237);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./map.vue?vue&type=style&index=0&lang=css& */ 239);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 10);

var renderjs





/* normalize component */

var component = Object(_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _map_vue_vue_type_template_id_7268e768___WEBPACK_IMPORTED_MODULE_0__["render"],
  _map_vue_vue_type_template_id_7268e768___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _map_vue_vue_type_template_id_7268e768___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/seekhouse/map.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 235:
/*!**************************************************************************************************************!*\
  !*** D:/HBuilderX.2.6.16.20200424/Projice/mp-toutiao/pages/seekhouse/map.vue?vue&type=template&id=7268e768& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_template_id_7268e768___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./map.vue?vue&type=template&id=7268e768& */ 236);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_template_id_7268e768___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_template_id_7268e768___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_template_id_7268e768___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_template_id_7268e768___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 236:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.2.6.16.20200424/Projice/mp-toutiao/pages/seekhouse/map.vue?vue&type=template&id=7268e768& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 237:
/*!********************************************************************************************************!*\
  !*** D:/HBuilderX.2.6.16.20200424/Projice/mp-toutiao/pages/seekhouse/map.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./map.vue?vue&type=script&lang=js& */ 238);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 238:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.2.6.16.20200424/Projice/mp-toutiao/pages/seekhouse/map.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;











var _config = _interopRequireDefault(__webpack_require__(/*! @/common/config.js */ 11));
var _utilsFilter = _interopRequireDefault(__webpack_require__(/*! @/common/utils.filter.js */ 12));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //
//
//
//
//
//
//
//
//
//
//
var _default = { data: function data() {return { title: 'Hello', utils: _utilsFilter.default, isshow: 4, Sale: [], salest: 0, activest: 0, Region: [], Metro: [],
      AllPrice: [],
      Price: [],
      regionst: 0,
      metrost: 0,
      pricest: 0,
      allpricest: 0,
      decoratest: 0,
      doorst: 0,
      areast: 0,
      Renovation: [], //装修
      Apartment: [], //户型
      Area: [], //面积
      catelist: [],
      laberlist: [{
        title: '区域',
        id: 0 },

      {
        title: '价格',
        id: 1 },

      {
        title: '户型',
        id: 2 },

      {
        title: '面积',
        id: 3 },

      {
        title: '装修',
        id: 4 }],



      windowHeight: '603rpx',
      latitude: 30.64242,
      longitude: 104.04311,
      covers: [],
      citys: [],
      housecount: [] };

  },
  onLoad: function onLoad() {
    var _seft = this;
    //楼盘数量
    /* _seft.housecountTop() */
    /* 	_seft.citystop() */
  },

  onShow: function onShow() {
    var _seft = this;
    uni.getSystemInfo({
      success: function success(res) {
        console.log(res.windowWidth);
        console.log(res.windowHeight);
        _seft.windowHeight = res.windowHeight + 'px';

      } });



    uni.getLocation({
      type: 'gcj02',
      success: function success(res) {
        console.log('res=====', res);
        _seft.longitude = res.longitude;
        _seft.latitude = res.latitude;
        /* _seft.covers = [{
                                       	latitude: _seft.latitude,
                                       	longitude: _seft.longitude,
                                       	width: 25,
                                       	height: 25,
                                       	iconPath: "../../static/map.png",
                                       }, ] */
      } });


    console.log('res==', _seft.longitude, _seft.latitude);
    //楼盘数量
    _seft.housecountTop();
    /* 	_seft.citystop()
                           */

  },

  methods: {

    selecthouseTop: function selecthouseTop(e) {
      console.log('e', e.markerId);
      uni.navigateTo({
        url: "./houselist?regionst=" + e.markerId });

    },
    getSonValue: function getSonValue(res) {
      var _seft = this;
      var data = '';
      if (res.proper_id) data += '&regionst=' + res.proper_id;
      if (res.metro_id) data += '&metro_id=' + res.metro_id;
      if (res.price) data += '&price=' + res.price;
      if (res.amount) data += '&amount=' + res.amount;
      if (res.apartment_id) data += '&apartment_id=' + res.apartment_id;
      if (res.area_id) data += '&area_id=' + res.area_id;
      if (res.renovation_id) data += '&renovation_id=' + res.renovation_id; //装修
      if (res.sale_id) data += '&sale_id=' + res.sale_id; //销售情况
      if (res.type_id) data += '&type_id=' + res.type_id; //类型
      uni.navigateTo({
        url: "./houselist?" + data });

      //console.log('res', res)
    },
    citystop: function citystop() {
      var _seft = this;
      _seft.qqmapsdk.getDistrictByCityId({
        id: '510100',
        success: function success(res) {//成功后的回调"510100"  成都id
          //console.log(res);
          _seft.citys = res.result[0];
          _seft.maphouse(_seft.housecount, _seft.citys);
          console.log('楼盘数量', _seft.housecount, '城市', _seft.citys);

        } });


    },

    maphouse: function maphouse(restun, citys) {

      var _seft = this;
      var fly = [];
      for (var item in restun) {
        var res = {};
        for (var i in citys) {
          if (restun[item].name == citys[i].fullname) {
            res['id'] = restun[item]['id'];
            res['latitude'] = citys[i]['location']['lat'];
            res['longitude'] = citys[i]['location']['lng'];
            res['width'] = 20;
            res['height'] = 20;
            res['iconPath'] = "../../static/map.png";
            res['callout'] = {
              content: restun[item]['name'] + '(' + restun[item]['count'] + ')',
              color: "#000",
              fontSize: 13,
              padding: 8,
              borderRadius: 15,
              bgColor: "#FFF",
              display: 'ALWAYS',
              textAlign: 'center' };


            fly.push(res);
          }

        }

      }

      _seft.covers = fly;
      console.log('fly======', fly);
    },

    housecountTop: function housecountTop() {
      var _seft = this;
      //楼盘数量
      _config.default.sendRequest({
        url: '/home/region/getAddress',
        method: 'get',
        success: function success(res) {
          var datas = res.data;
          if (datas.code == 1) {
            var restun = datas.data;
            _seft.citystop();
            _seft.housecount = restun;

          }
        } });


    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-toutiao/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 239:
/*!****************************************************************************************************************!*\
  !*** D:/HBuilderX.2.6.16.20200424/Projice/mp-toutiao/pages/seekhouse/map.vue?vue&type=style&index=0&lang=css& ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!../../../../HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!../../../../HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--6-oneOf-1-3!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./map.vue?vue&type=style&index=0&lang=css& */ 240);
/* harmony import */ var _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_6_oneOf_1_2_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_map_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 240:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--6-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--6-oneOf-1-2!./node_modules/postcss-loader/src??ref--6-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/HBuilderX.2.6.16.20200424/Projice/mp-toutiao/pages/seekhouse/map.vue?vue&type=style&index=0&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[233,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVuaS1hcHA6Ly8vbWFpbi5qcyIsIndlYnBhY2s6Ly8vRDovSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC9Qcm9qaWNlL21wLXRvdXRpYW8vcGFnZXMvc2Vla2hvdXNlL21hcC52dWU/MWQ1ZiIsIndlYnBhY2s6Ly8vRDovSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC9Qcm9qaWNlL21wLXRvdXRpYW8vcGFnZXMvc2Vla2hvdXNlL21hcC52dWU/MGMxNCIsIndlYnBhY2s6Ly8vRDovSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC9Qcm9qaWNlL21wLXRvdXRpYW8vcGFnZXMvc2Vla2hvdXNlL21hcC52dWU/NWYwNCIsIndlYnBhY2s6Ly8vRDovSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC9Qcm9qaWNlL21wLXRvdXRpYW8vcGFnZXMvc2Vla2hvdXNlL21hcC52dWU/MmE4NSIsInVuaS1hcHA6Ly8vcGFnZXMvc2Vla2hvdXNlL21hcC52dWUiLCJ3ZWJwYWNrOi8vL0Q6L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQvUHJvamljZS9tcC10b3V0aWFvL3BhZ2VzL3NlZWtob3VzZS9tYXAudnVlPzY3NGYiLCJ3ZWJwYWNrOi8vL0Q6L0hCdWlsZGVyWC4yLjYuMTYuMjAyMDA0MjQvUHJvamljZS9tcC10b3V0aWFvL3BhZ2VzL3NlZWtob3VzZS9tYXAudnVlP2QxY2UiXSwibmFtZXMiOlsiY3JlYXRlUGFnZSIsIlBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7a0RBQUE7QUFDQTtBQUNBLDZGO0FBQ0FBLFVBQVUsQ0FBQ0MsWUFBRCxDQUFWLEM7Ozs7Ozs7Ozs7Ozs7QUNIQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBZ0g7QUFDaEg7QUFDdUQ7QUFDTDtBQUNhOzs7QUFHL0Q7QUFDbUs7QUFDbkssZ0JBQWdCLDZLQUFVO0FBQzFCLEVBQUUseUVBQU07QUFDUixFQUFFLDhFQUFNO0FBQ1IsRUFBRSx1RkFBZTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNB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a2hvdXNlL21hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAndW5pLXBhZ2VzJztcbmltcG9ydCBWdWUgZnJvbSAndnVlJ1xuaW1wb3J0IFBhZ2UgZnJvbSAnLi9wYWdlcy9zZWVraG91c2UvbWFwLnZ1ZSdcbmNyZWF0ZVBhZ2UoUGFnZSkiLCJpbXBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucywgcmVjeWNsYWJsZVJlbmRlciwgY29tcG9uZW50cyB9IGZyb20gXCIuL21hcC52dWU/dnVlJnR5cGU9dGVtcGxhdGUmaWQ9NzI2OGU3NjgmXCJcbnZhciByZW5kZXJqc1xuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9tYXAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9tYXAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL21hcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJwYWdlcy9zZWVraG91c2UvbWFwLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy90ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS0xNi0wIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3RlbXBsYXRlLmpzIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay11bmktYXBwLWxvYWRlci9wYWdlLW1ldGEuanMhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vbWFwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD03MjY4ZTc2OCZcIiIsInZhciBjb21wb25lbnRzXG52YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbn1cbnZhciByZWN5Y2xhYmxlUmVuZGVyID0gZmFsc2VcbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0iLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanMhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy93ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTEyLTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3dlYnBhY2stdW5pLW1wLWxvYWRlci9saWIvc2NyaXB0LmpzIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL21hcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tMTItMSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zY3JpcHQuanMhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vbWFwLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsIjx0ZW1wbGF0ZT5cclxuXHQ8dmlldyBjbGFzcz1cImNvbnRlbnRcIj5cclxuXHRcdDxteS1ob3VzZS1jYXRlIHN0eWxlPVwid2lkdGg6IDEwMCU7XCIgOmxhYmVybGlzdD1cImxhYmVybGlzdFwiIEBzZW5kPVwiZ2V0U29uVmFsdWVcIj48L215LWhvdXNlLWNhdGU+XHJcblxyXG5cclxuXHRcdDxtYXAgc3R5bGU9XCJ3aWR0aDogMTAwJTtcIiB2LWJpbmQ6c3R5bGU9XCJ7aGVpZ2h0OndpbmRvd0hlaWdodH1cIiAgOmxhdGl0dWRlPVwibGF0aXR1ZGVcIiAgc2NhbGU9XCI5XCIgIDpsb25naXR1ZGU9XCJsb25naXR1ZGVcIiAgIDptYXJrZXJzPVwiY292ZXJzXCJcclxuXHRAY2FsbG91dHRhcD1cInNlbGVjdGhvdXNlVG9wXCJcdCBhbHRpdHVkZT1cInRydWVcIj5cclxuXHRcdDwvbWFwPlxyXG5cdDwvdmlldz5cclxuPC90ZW1wbGF0ZT5cclxuXHJcbjxzY3JpcHQ+XHJcblx0aW1wb3J0IGNvbiBmcm9tICdAL2NvbW1vbi9jb25maWcuanMnXHJcblx0aW1wb3J0IHV0aWxzIGZyb20gJ0AvY29tbW9uL3V0aWxzLmZpbHRlci5qcyc7XHJcblx0ZXhwb3J0IGRlZmF1bHQge1xyXG5cdFx0ZGF0YSgpIHtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0aXRsZTogJ0hlbGxvJyxcclxuXHRcdFx0XHR1dGlsczogdXRpbHMsXHJcblx0XHRcdFx0aXNzaG93OiA0LFxyXG5cdFx0XHRcdFNhbGU6IFtdLFxyXG5cdFx0XHRcdHNhbGVzdDogMCxcclxuXHRcdFx0XHRhY3RpdmVzdDogMCxcclxuXHRcdFx0XHRSZWdpb246IFtdLFxyXG5cdFx0XHRcdE1ldHJvOiBbXSxcclxuXHRcdFx0XHRBbGxQcmljZTogW10sXHJcblx0XHRcdFx0UHJpY2U6IFtdLFxyXG5cdFx0XHRcdHJlZ2lvbnN0OiAwLFxyXG5cdFx0XHRcdG1ldHJvc3Q6IDAsXHJcblx0XHRcdFx0cHJpY2VzdDogMCxcclxuXHRcdFx0XHRhbGxwcmljZXN0OiAwLFxyXG5cdFx0XHRcdGRlY29yYXRlc3Q6IDAsXHJcblx0XHRcdFx0ZG9vcnN0OiAwLFxyXG5cdFx0XHRcdGFyZWFzdDogMCxcclxuXHRcdFx0XHRSZW5vdmF0aW9uOiBbXSwgLy/oo4Xkv65cclxuXHRcdFx0XHRBcGFydG1lbnQ6IFtdLCAvL+aIt+Wei1xyXG5cdFx0XHRcdEFyZWE6IFtdLCAvL+mdouenr1xyXG5cdFx0XHRcdGNhdGVsaXN0OiBbXSxcclxuXHRcdFx0XHRsYWJlcmxpc3Q6IFt7XHJcblx0XHRcdFx0XHRcdHRpdGxlOiAn5Yy65Z+fJyxcclxuXHRcdFx0XHRcdFx0aWQ6IDBcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHRpdGxlOiAn5Lu35qC8JyxcclxuXHRcdFx0XHRcdFx0aWQ6IDFcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHRpdGxlOiAn5oi35Z6LJyxcclxuXHRcdFx0XHRcdFx0aWQ6IDJcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHRpdGxlOiAn6Z2i56evJyxcclxuXHRcdFx0XHRcdFx0aWQ6IDNcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdHRpdGxlOiAn6KOF5L+uJyxcclxuXHRcdFx0XHRcdFx0aWQ6IDRcclxuXHRcdFx0XHRcdH0sXHJcblxyXG5cdFx0XHRcdF0sXHJcblx0XHRcdFx0d2luZG93SGVpZ2h0OiAnNjAzcnB4JyxcclxuXHRcdFx0XHRsYXRpdHVkZTogMzAuNjQyNDIsXHJcblx0XHRcdFx0bG9uZ2l0dWRlOiAxMDQuMDQzMTEsXHJcblx0XHRcdFx0Y292ZXJzOiBbXSxcclxuXHRcdFx0XHRjaXR5czogW10sXHJcblx0XHRcdFx0aG91c2Vjb3VudDogW10sXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRvbkxvYWQoKSB7XHJcblx0XHRcdGxldCBfc2VmdCA9IHRoaXNcclxuXHRcdFx0Ly/mpbznm5jmlbDph49cclxuXHRcdFx0LyogX3NlZnQuaG91c2Vjb3VudFRvcCgpICovXHJcblx0XHQvKiBcdF9zZWZ0LmNpdHlzdG9wKCkgKi9cclxuXHRcdH0sXHJcblxyXG5cdFx0b25TaG93KCkge1xyXG5cdFx0XHRsZXQgX3NlZnQgPSB0aGlzXHJcblx0XHRcdHVuaS5nZXRTeXN0ZW1JbmZvKHtcclxuXHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbihyZXMpIHtcclxuXHRcdFx0XHRcdGNvbnNvbGUubG9nKHJlcy53aW5kb3dXaWR0aCk7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhyZXMud2luZG93SGVpZ2h0KTtcclxuXHRcdFx0XHRcdF9zZWZ0LndpbmRvd0hlaWdodCA9IHJlcy53aW5kb3dIZWlnaHQgKyAncHgnXHJcblxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHJcblxyXG5cdFx0XHR1bmkuZ2V0TG9jYXRpb24oe1xyXG5cdFx0XHRcdHR5cGU6ICdnY2owMicsXHJcblx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZygncmVzPT09PT0nLCByZXMpXHJcblx0XHRcdFx0XHRfc2VmdC5sb25naXR1ZGUgPSByZXMubG9uZ2l0dWRlXHJcblx0XHRcdFx0XHRfc2VmdC5sYXRpdHVkZSA9IHJlcy5sYXRpdHVkZVxyXG5cdFx0XHRcdFx0LyogX3NlZnQuY292ZXJzID0gW3tcclxuXHRcdFx0XHRcdFx0bGF0aXR1ZGU6IF9zZWZ0LmxhdGl0dWRlLFxyXG5cdFx0XHRcdFx0XHRsb25naXR1ZGU6IF9zZWZ0LmxvbmdpdHVkZSxcclxuXHRcdFx0XHRcdFx0d2lkdGg6IDI1LFxyXG5cdFx0XHRcdFx0XHRoZWlnaHQ6IDI1LFxyXG5cdFx0XHRcdFx0XHRpY29uUGF0aDogXCIuLi8uLi9zdGF0aWMvbWFwLnBuZ1wiLFxyXG5cdFx0XHRcdFx0fSwgXSAqL1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHJcbmNvbnNvbGUubG9nKCdyZXM9PScsIF9zZWZ0LmxvbmdpdHVkZSxfc2VmdC5sYXRpdHVkZSlcclxuXHRcdFx0Ly/mpbznm5jmlbDph49cclxuXHRcdFx0X3NlZnQuaG91c2Vjb3VudFRvcCgpXHJcblx0XHQvKiBcdF9zZWZ0LmNpdHlzdG9wKClcclxuICovXHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRtZXRob2RzOiB7XHJcblx0XHRcdFxyXG5cdFx0XHRzZWxlY3Rob3VzZVRvcChlKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZygnZScsIGUubWFya2VySWQpXHJcblx0XHRcdFx0dW5pLm5hdmlnYXRlVG8oe1xyXG5cdFx0XHRcdFx0dXJsOiBcIi4vaG91c2VsaXN0P3JlZ2lvbnN0PVwiKyBlLm1hcmtlcklkXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSxcclxuXHRcdFx0Z2V0U29uVmFsdWU6IGZ1bmN0aW9uKHJlcykge1xyXG5cdFx0XHRcdGxldCBfc2VmdCA9IHRoaXNcclxuXHRcdFx0XHR2YXIgZGF0YSA9ICcnXHJcblx0XHRcdFx0aWYgKHJlcy5wcm9wZXJfaWQpIGRhdGEgKz0gJyZyZWdpb25zdD0nICsgcmVzLnByb3Blcl9pZFxyXG5cdFx0XHRcdGlmIChyZXMubWV0cm9faWQpIGRhdGEgKz0gJyZtZXRyb19pZD0nICsgcmVzLm1ldHJvX2lkXHJcblx0XHRcdFx0aWYgKHJlcy5wcmljZSlkYXRhICs9ICcmcHJpY2U9JyArIHJlcy5wcmljZVxyXG5cdFx0XHRcdGlmIChyZXMuYW1vdW50KSBkYXRhICs9ICcmYW1vdW50PScgKyByZXMuYW1vdW50XHJcblx0XHRcdFx0aWYgKHJlcy5hcGFydG1lbnRfaWQpIGRhdGEgKz0gJyZhcGFydG1lbnRfaWQ9JyArICByZXMuYXBhcnRtZW50X2lkXHJcblx0XHRcdFx0aWYgKHJlcy5hcmVhX2lkKSBkYXRhICs9ICcmYXJlYV9pZD0nICsgIHJlcy5hcmVhX2lkXHJcblx0XHRcdFx0aWYgKHJlcy5yZW5vdmF0aW9uX2lkICkgZGF0YSArPSAnJnJlbm92YXRpb25faWQ9JyArICByZXMucmVub3ZhdGlvbl9pZCAvL+ijheS/rlxyXG5cdFx0XHRcdGlmIChyZXMuc2FsZV9pZCkgZGF0YSArPSAnJnNhbGVfaWQ9JyArICByZXMuc2FsZV9pZCAvL+mUgOWUruaDheWGtVxyXG5cdFx0XHRcdGlmIChyZXMudHlwZV9pZCkgZGF0YSArPSAnJnR5cGVfaWQ9JyArICByZXMudHlwZV9pZCAvL+exu+Wei1xyXG5cdFx0XHRcdHVuaS5uYXZpZ2F0ZVRvKHtcclxuXHRcdFx0XHRcdHVybDogXCIuL2hvdXNlbGlzdD9cIitkYXRhXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQvL2NvbnNvbGUubG9nKCdyZXMnLCByZXMpXHJcblx0XHRcdH0sXHJcblx0XHRcdGNpdHlzdG9wKCkge1xyXG5cdFx0XHRcdGxldCBfc2VmdCA9IHRoaXNcclxuXHRcdFx0XHRfc2VmdC5xcW1hcHNkay5nZXREaXN0cmljdEJ5Q2l0eUlkKHtcclxuXHRcdFx0XHRcdGlkOiAnNTEwMTAwJyxcclxuXHRcdFx0XHRcdHN1Y2Nlc3M6IGZ1bmN0aW9uKHJlcykgeyAvL+aIkOWKn+WQjueahOWbnuiwg1wiNTEwMTAwXCIgIOaIkOmDvWlkXHJcblx0XHRcdFx0XHRcdC8vY29uc29sZS5sb2cocmVzKTtcclxuXHRcdFx0XHRcdFx0X3NlZnQuY2l0eXMgPSByZXMucmVzdWx0WzBdXHJcblx0XHRcdFx0XHRcdF9zZWZ0Lm1hcGhvdXNlKF9zZWZ0LmhvdXNlY291bnQsIF9zZWZ0LmNpdHlzKVxyXG5cdFx0XHRcdFx0XHRjb25zb2xlLmxvZygn5qW855uY5pWw6YePJywgX3NlZnQuaG91c2Vjb3VudCwgJ+WfjuW4gicsIF9zZWZ0LmNpdHlzKVxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9LFxyXG5cclxuXHRcdFx0bWFwaG91c2UocmVzdHVuLCBjaXR5cykge1xyXG5cclxuXHRcdFx0XHRsZXQgX3NlZnQgPSB0aGlzXHJcblx0XHRcdFx0bGV0IGZseSA9IFtdXHJcblx0XHRcdFx0Zm9yIChsZXQgaXRlbSBpbiByZXN0dW4pIHtcclxuXHRcdFx0XHRcdGxldCByZXMgPSB7fVxyXG5cdFx0XHRcdFx0Zm9yIChsZXQgaSBpbiBjaXR5cykge1xyXG5cdFx0XHRcdFx0XHRpZiAocmVzdHVuW2l0ZW1dLm5hbWUgPT0gY2l0eXNbaV0uZnVsbG5hbWUpIHtcclxuXHRcdFx0XHRcdFx0XHRyZXNbJ2lkJ10gPSByZXN0dW5baXRlbV1bJ2lkJ11cclxuXHRcdFx0XHRcdFx0XHRyZXNbJ2xhdGl0dWRlJ10gPSBjaXR5c1tpXVsnbG9jYXRpb24nXVsnbGF0J11cclxuXHRcdFx0XHRcdFx0XHRyZXNbJ2xvbmdpdHVkZSddID0gY2l0eXNbaV1bJ2xvY2F0aW9uJ11bJ2xuZyddXHJcblx0XHRcdFx0XHRcdFx0cmVzWyd3aWR0aCddID0gMjBcclxuXHRcdFx0XHRcdFx0XHRyZXNbJ2hlaWdodCddID0gMjBcclxuXHRcdFx0XHRcdFx0XHRyZXNbJ2ljb25QYXRoJ10gPSBcIi4uLy4uL3N0YXRpYy9tYXAucG5nXCJcclxuXHRcdFx0XHRcdFx0XHRyZXNbJ2NhbGxvdXQnXSA9IHtcclxuXHRcdFx0XHRcdFx0XHRcdGNvbnRlbnQ6cmVzdHVuW2l0ZW1dWyduYW1lJ10rJygnK3Jlc3R1bltpdGVtXVsnY291bnQnXSArJyknLFxyXG5cdFx0XHRcdFx0XHRcdFx0Y29sb3I6XCIjMDAwXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRmb250U2l6ZToxMyxcclxuXHRcdFx0XHRcdFx0XHRcdHBhZGRpbmc6OCxcclxuXHRcdFx0XHRcdFx0XHRcdGJvcmRlclJhZGl1czoxNSxcclxuXHRcdFx0XHRcdFx0XHRcdGJnQ29sb3I6XCIjRkZGXCIsXHJcblx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5OidBTFdBWVMnLFxyXG5cdFx0XHRcdFx0XHRcdFx0dGV4dEFsaWduOidjZW50ZXInXHJcblx0XHRcdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0Zmx5LnB1c2gocmVzKVxyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdF9zZWZ0LmNvdmVycyA9IGZseVxyXG5cdFx0XHRcdGNvbnNvbGUubG9nKCdmbHk9PT09PT0nLCBmbHkpXHJcblx0XHRcdH0sXHJcblxyXG5cdFx0XHRob3VzZWNvdW50VG9wKCkge1xyXG5cdFx0XHRcdGxldCBfc2VmdCA9IHRoaXNcclxuXHRcdFx0XHQvL+alvOebmOaVsOmHj1xyXG5cdFx0XHRcdGNvbi5zZW5kUmVxdWVzdCh7XHJcblx0XHRcdFx0XHR1cmw6ICcvaG9tZS9yZWdpb24vZ2V0QWRkcmVzcycsXHJcblx0XHRcdFx0XHRtZXRob2Q6ICdnZXQnLFxyXG5cdFx0XHRcdFx0c3VjY2VzczogZnVuY3Rpb24ocmVzKSB7XHJcblx0XHRcdFx0XHRcdHZhciBkYXRhcyA9IHJlcy5kYXRhXHJcblx0XHRcdFx0XHRcdGlmIChkYXRhcy5jb2RlID09IDEpIHtcclxuXHRcdFx0XHRcdFx0XHR2YXIgcmVzdHVuID0gZGF0YXMuZGF0YVxyXG5cdFx0XHRcdFx0XHQgICAgX3NlZnQuY2l0eXN0b3AoKVxyXG5cdFx0XHRcdFx0XHRcdF9zZWZ0LmhvdXNlY291bnQgPSByZXN0dW5cclxuXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSxcclxuXHJcblxyXG5cclxuXHRcdH1cclxuXHR9XHJcbjwvc2NyaXB0PlxyXG5cclxuPHN0eWxlPlxyXG5cdC5jb250ZW50IHtcclxuXHRcdGRpc3BsYXk6IGZsZXg7XHJcblx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG5cdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cdH1cclxuPC9zdHlsZT5cbiIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4vZGlzdC9sb2FkZXIuanM/P3JlZi0tNi1vbmVPZi0xLTAhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cmVmLS02LW9uZU9mLTEtMSEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3Z1ZS1sb2FkZXIvbGliL2xvYWRlcnMvc3R5bGVQb3N0TG9hZGVyLmpzIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LW9uZU9mLTEtMiEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9zcmMvaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTMhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby93ZWJwYWNrLXVuaS1tcC1sb2FkZXIvbGliL3N0eWxlLmpzIS4vbWFwLnZ1ZT92dWUmdHlwZT1zdHlsZSZpbmRleD0wJmxhbmc9Y3NzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL21pbmktY3NzLWV4dHJhY3QtcGx1Z2luL2Rpc3QvbG9hZGVyLmpzPz9yZWYtLTYtb25lT2YtMS0wIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3JlZi0tNi1vbmVPZi0xLTEhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvQGRjbG91ZGlvL3Z1ZS1jbGktcGx1Z2luLXVuaS9wYWNrYWdlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vdnVlLWNsaS1wbHVnaW4tdW5pL3BhY2thZ2VzL3dlYnBhY2stcHJlcHJvY2Vzcy1sb2FkZXIvaW5kZXguanM/P3JlZi0tNi1vbmVPZi0xLTIhLi4vLi4vLi4vLi4vSEJ1aWxkZXJYL3BsdWdpbnMvdW5pYXBwLWNsaS9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvc3JjL2luZGV4LmpzPz9yZWYtLTYtb25lT2YtMS0zIS4uLy4uLy4uLy4uL0hCdWlsZGVyWC9wbHVnaW5zL3VuaWFwcC1jbGkvbm9kZV9tb2R1bGVzL0BkY2xvdWRpby92dWUtY2xpLXBsdWdpbi11bmkvcGFja2FnZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuLi8uLi8uLi8uLi9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9AZGNsb3VkaW8vd2VicGFjay11bmktbXAtbG9hZGVyL2xpYi9zdHlsZS5qcyEuL21hcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuICAgIGlmKG1vZHVsZS5ob3QpIHtcbiAgICAgIC8vIDE1OTMzOTQ4OTQ4MDJcbiAgICAgIHZhciBjc3NSZWxvYWQgPSByZXF1aXJlKFwiRDovSEJ1aWxkZXJYLjIuNi4xNi4yMDIwMDQyNC9IQnVpbGRlclgvcGx1Z2lucy91bmlhcHAtY2xpL25vZGVfbW9kdWxlcy9taW5pLWNzcy1leHRyYWN0LXBsdWdpbi9kaXN0L2htci9ob3RNb2R1bGVSZXBsYWNlbWVudC5qc1wiKShtb2R1bGUuaWQsIHtcImhtclwiOnRydWUsXCJwdWJsaWNQYXRoXCI6XCIuLi8uLi9cIixcImxvY2Fsc1wiOmZhbHNlfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoY3NzUmVsb2FkKTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KHVuZGVmaW5lZCwgY3NzUmVsb2FkKTtcbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0=