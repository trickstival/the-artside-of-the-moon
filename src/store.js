import VueX from 'vuex'
import Vue from 'vue'

Vue.use(VueX)

const store = new VueX.Store({
    state: {
        currentPerspective: 'rocket',
        launchToggle: false
    },
    mutations: {
        setPerspective (state, perspective) {
            state.currentPerspective = perspective
        },
        launch(state) {
            state.launchToggle = !state.launchToggle
        }
    }
})

export default store
