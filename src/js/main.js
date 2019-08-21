import Vue from 'vue';
import VueRouter from 'vue-router';
import * as util from 'util';
import "../scss/index.scss";
import "../scss/common.scss";
import routerIndex from './common/router.js';
import * as filters from './common/filters.js';




Object.keys(filters).forEach(key=>{
	Vue.filter(key,filters[key])
});
Vue.use(VueRouter);

const router = new VueRouter(routerIndex);

const app = new Vue({
  router
  // render: (h) => h('#app')
}).$mount('#app');


/* 
var xhr = new XMLHttpRequest();
xhr.open("get", "/captcha/createCaptcha.do", true);
xhr.send(null);
*/

/*
var http = new XMLHttpRequest();
var url = '/login.do';
var params = 'username=913442780%40qq.com&password=zgt871220&captchaCode=6epu';
http.open('POST', url, true);
http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
http.send(params);
*/

const setRootRem = () => {
  let docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    //开发文档页面 ios safari下bug
    address = location.href.indexOf('docs') > -1,
    recalc = function () {
      let clientWidth = docEl.clientWidth > 19200 ? 19200 : docEl.clientWidth;
      if (!clientWidth) {
        return;
      }
      //这里的20是指在640是px的设计稿中字的基本大小
      docEl.style.fontSize = 234.376 * (clientWidth / 19200) + 'px';
    };
  document.addEventListener('DOMContentLoaded', recalc, false);
  !address && window.addEventListener(resizeEvt, recalc, false);
};
setRootRem();

