<template>
    <div class="speech">
        <transition name="fade" mode="out-in">
            <h1 v-if="currentSpeech.text" class="current-speech">
                <q>
                    {{ currentSpeech && currentSpeech.text }}
                </q>
                <br>
                <i class="author">
                    — {{ currentSpeech.author }}
                </i>
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
                    text: '',
                    duration: 18000
                },
                {
                    text: 'Al, It‘s been a long way, but we‘re here.',
                    duration: 5000,
                    author: 'Alan Shepard'
                },
                {
                    text: 'That’s one small step for a man, one giant leap for mankind.',
                    duration: 5000,
                    author: 'Neil Armstrong'
                },
                {
                    text: 'In presence of the moon nobody sees stars.',
                    duration: 5000,
                    author: 'James Lowell'
                },
                {
                    text: 'I think it is very beautiful that 50 years after Apollo, the Artemis program will carry the next man and the first woman to the Moon  ',
                    duration: 6000,
                    author: 'Jim Bridenstine'
                },
                {
                    text: 'I have a daughter who is 11 years old, and I want her to be able to see herself in the same role as the next women that go to the Moon.',
                    duration: 6000,
                    author: 'Jim Bridenstine'
                },
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
    padding-right: 80px;
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