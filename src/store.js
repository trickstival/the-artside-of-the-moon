import VueX from 'vuex'
import Vue from 'vue'

Vue.use(VueX)

const store = new VueX.Store({
    state: {
        currentPerspective: 'rocket',
        launchToggle: false,
        speechToggle: false
    },
    mutations: {
        setPerspective (state, perspective) {
            state.currentPerspective = perspective
        },
        launch(state) {
            state.launchToggle = !state.launchToggle
        },
        startSpeech(state) {
            state.speechToggle = !state.speechToggle
        }
    }
})

export default store
