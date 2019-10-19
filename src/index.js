import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

if (module.hot) {
  module.hot.dispose(function() {
    // Módulo que está prestes a ser substituído
  })

  module.hot.accept(function() {
    // Módulo ou uma de suas dependências que acabaram de ser atualizados
  })
}

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')