import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Notify from "@/components/NotificationPlugin";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "@/assets/css/nucleo-icons.css";
import '@/assets/sass/theme.scss'

Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(Notify)
Vue.config.productionTip = false

Vue.http.headers.common['Authorization'] =
  'QH4iM3l+K0xQWipVQXkha242RD5hbiFlJUomO31HV0d0dHd9e01OUSpDSl5TNCJ4bS1UdnhgeT9tfHMiMkVL'

Vue.http.options.emulateHTTP = true
// Vue.http.options.emulateJSON = true

Vue.filter('date', function (value) {
  var day, month, year, date = new Date(value)
  day = date.getDate() || '';
  month = date.getMonth() || '';
  year = date.getFullYear() || '';
  return [day, month, year].join('.')
})

Vue.filter('capitalize', function (value) {
  return value.substr(0, 1).toUpperCase() + value.substr(1).toLowerCase();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})
