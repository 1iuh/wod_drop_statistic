// ==UserScript==
// @name        WoD_Drops_Statistics
// @namespace   1iuh
// @version     0.0.1
// @author      1iuh <liuhsmail@gmail.com>
// @source      https://github.com/Trim21/webpack-userscript-template
// @match       http*://*.world-of-dungeons.org/wod/spiel//dungeon/report.php*
// @match       http*://*.world-of-dungeons.org/wod/spiel/dungeon/report.php*
// @require     https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/axios@0.21.1/dist/axios.min.js
// @require     https://cdn.jsdelivr.net/npm/axios-userscript-adapter@0.1.4/dist/axiosGmxhrAdapter.min.js
// @grant       GM.xmlHttpRequest
// @connect     www.wodgroup.top
// @run-at      document-end
// ==/UserScript==


/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: external "axios"
var external_axios_namespaceObject = axios;
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: external "axiosGmxhrAdapter"
var external_axiosGmxhrAdapter_namespaceObject = axiosGmxhrAdapter;
var external_axiosGmxhrAdapter_default = /*#__PURE__*/__webpack_require__.n(external_axiosGmxhrAdapter_namespaceObject);
;// CONCATENATED MODULE: ./src/utils.ts


function get(url, config) {
    return axios.get(url, Object.assign({ adapter }, config));
}
function post(url, data, config) {
    return external_axios_default().post(url, data, Object.assign({ adapter: (external_axiosGmxhrAdapter_default()) }, config));
}

;// CONCATENATED MODULE: ./src/index.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // 如果实在战报页面，添加按钮
        var form_data = $('form').serialize();
        if (window.location.pathname == '/wod/spiel/dungeon/report.php') {
            var the_th = $('.content_table .header th').eq(2);
            const urlParams = new URLSearchParams(form_data);
            var group_id = urlParams.get('gruppe_id');
            the_th.html('<a href="http://www.wodgroup.top/' + group_id + '/drops" target="_blank" class="menu">特产统计</a>');
            return;
        }
        // 判断是否在掉落页面
        if ($('h1').text().split(':')[0] != '物品纵览') {
            return;
        }
        // 提取时间
        var datetime_string = $('h2').eq(0).text();
        var datetime = datetime_string.split(' - ')[0];
        var map_name = datetime_string.split(' - ')[1];
        // 提取掉落明细
        var index = 0;
        var content_table = $('.content_table');
        var drops = [];
        while (index < 12) {
            var charname = content_table.find('h2').eq(index).text();
            if (charname == '') {
                break;
            }
            var sub_table = content_table.children('tbody').children('tr').children('td').children('table').eq(index);
            var items = sub_table.children('tbody').children('tr').children('td').eq(2).find('a');
            for (var it of items) {
                drops.push({ 'item_name': it.innerHTML, 'charname': charname });
            }
            index += 1;
        }
        // 组织数据
        var payload = {
            "form_data": form_data,
            "datetime": datetime,
            "map_name": map_name,
            "drops": drops,
        };
        // 上传
        const res = yield post('http://www.wodgroup.top/upload', payload);
    });
}
main().catch(e => {
    console.log(e);
});

/******/ })()
;