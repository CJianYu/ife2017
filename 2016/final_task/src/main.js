// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Router from 'vue-router'
import {store} from './vuex/store.js'
import {routes} from './router/router.js'

Vue.config.productionTip = false;
Vue.use(Router);

const router = new Router({
  routes,
  mode: 'history'
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
