import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'

Vue.prototype.$http = Axios
// Vue.prototype.Host = '/v2'

new Vue({
    el: '#app',
    render: h => h(App)
})