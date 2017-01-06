// ==UserScript==
// @name         Show QRCode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  显示网页二维码
// @author       whbb
// @match        http://*/*
// @match        https://*/*
// @require      https://cdn.bootcss.com/jquery/3.1.1/jquery.min.js
// @require      https://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js
// @require      https://cdn.bootcss.com/vex-js/3.0.0/js/vex.combined.min.js
// @resource     vexCSS https://cdn.bootcss.com/vex-js/3.0.0/css/vex.min.css
// @resource     vexTheme https://cdn.bootcss.com/vex-js/3.0.0/css/vex-theme-default.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==

(function () {
  'use strict';

  const vexCss = GM_getResourceText('vexCSS')
  const vexTheme = GM_getResourceText('vexTheme')
  GM_addStyle(vexCss)
  GM_addStyle(vexTheme)

  vex.defaultOptions.className = 'vex-theme-default'

  let q = false
  document.onkeydown = function (e) {
    if (e.altKey && e.ctrlKey) {
      if (e.which === 82 && q) {
        vex.dialog.open({
          message: location.href,
          input: '<div id="qrcode" style="width: 256px; margin: 20px auto"></div>',
          buttons: [vex.dialog.buttons.YES]
        })

        setTimeout(function () {
          $('#qrcode').qrcode(location.href)
        }, 0);

        e.stopPropagation()
        e.preventDefault()
      }
      q = e.which === 81
    }
  }
})();