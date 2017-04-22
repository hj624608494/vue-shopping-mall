// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
Vue.prototype.axios = axios;
import App from './App'
import router from './router'
// import iView from 'iview'
import 'iview/dist/styles/iview.css';
import './assets/css/commond.css'
Vue.config.productionTip = false;

import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  	color: 'rgb(51,153,255)',
  	failedColor: 'red',
  	thickness: '2.5px'
})

router.beforeEach((to, from, next) => {
  	window.scrollTo(0,0);
 	next();
})

/* eslint-disable no-new */
new Vue({
  	el: '#app',
  	router,
  	template: '<App/>',
  	components: { App }
})
