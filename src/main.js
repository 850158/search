// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios';
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import ElementUi from 'element-ui'


import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'
import '../node_modules/element-ui/lib/theme-chalk/index.css'

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(ElementUi);
Vue.prototype.$ajax = axios
//Vue.prototype.$http = axios;

Vue.config.productionTip = false

Vue.http.options.emulateJSON = true;
Vue.http.options.headers = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => {
	console.log("登录");
  console.log(to);
  console.log(from);
  console.log("读取缓存");
  console.log(from.path);
  console.log(window.localStorage.getItem('usermsg'));
  var usermsg = window.localStorage.getItem('usermsg');
  var frompath = from.path;
  var fromfullPath = from.fullPath;
  // usermsg.append({frompath:frompath});
  // window.localStorage.setItem('usermsg',usermsg);
  console.log("读取带路径的缓存");
  console.log(usermsg);
  // console.log(usermsg.area);
  // var usermsg = eval("(" + usermsg + ")");

  // usermsg = Object.assign({usermsg:usermsg},{frompath:frompath});
  // window.localStorage.setItem('usermsg');
  console.log(usermsg)
  var usermsgObj = eval("(" + usermsg + ")");
  console.log("usermsgObj11");
  console.log(usermsgObj);
  // usermsgObj.append("frompath:this.frompat");
  // usermsgObj.unshift(frompath);
  // console.log(usermsgObj);
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限

    if(usermsgObj){ //判断本地是否存在access_token
    	console.log("有token 进入页面");
      next();
    }else {
      next({
        path:'/',
        query: {redirect: to.fullPath}   //登录成功后重定向到当前页面
      })
    }
  }
  else {
    next();
  }
  /*如果本地 存在 token 则 不允许直接跳转到 登录页面*/
  if(to.fullPath == "/"){
    if(usermsgObj){
      next({
        path:from.fullPath
      });
    }else {
      next();
    }
  }
  // if (from.path=="/announce") {
  //   console.log("这一次的backstate");
  //   console.log(this.backstate);
  //   this.backstate==1;
  // }
});
