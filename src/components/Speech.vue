<template>
    <div class="speech">
        <transition name="fade" mode="out-in">
            <h1 v-if="currentSpeech" class="current-speech">
                {{ currentSpeech && currentSpeech.text }}
            </h1>
        </transition>
    </div>
</template>

<script>
const wait = time => new Promise(res => {
    setTimeout(res, time)
})
export default {
    data () {
        return {
            currentSpeech: '',
            speechs: [
                {
                    text: 'Isso aí meu povo',
                    duration: 2000
                },
                {
                    text: 'Teste teste',
                    duration: 2000
                },
                {
                    text: 'Eu',
                    duration: 2000
                },
                {
                    text: 'sou',
                    duration: 2000
                },
                {
                    text: 'Muito',
                    duration: 2000
                },
                {
                    text: 'Rápido',
                    duration: 2000
                }
            ],
            cancelRunning: false
        }
    },
    watch: {
        '$store.state.launchToggle' () {
            this.start()
        }
    },
    methods: {
        start (speechs = this.speechs.slice()) {
            const speech = speechs.shift()
            this.currentSpeech = speech || ''
            if (!speech) {
                return
            }
            wait(speech.duration)
                .then(() => {
                    this.currentSpeech = ''
                    return this.$nextTick()
                })
                .then(() => wait(speech.duration))
                .then(() => this.start(speechs))
        }
    }
}
</script>

<style lang="scss" scoped>
.speech {
    top: 0;
    left: 0;
    pointer-events: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
}
.current-speech {
    grid-column: 2;
    text-align: center;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>