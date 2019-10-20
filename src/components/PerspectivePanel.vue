<template>
    <section class="perspective-panel">
        <div class="button-list">
            <audio ref="voice">
                <source :src="$options.voicePath" type="audio/wav">
            </audio>
            <button
                v-for="state in possibleStates"
                :key="state.label"
                :class="{ active: state.perspective === currentPerspective }"
                @click="$store.commit('setPerspective', state.perspective)"
                class="perspective-button"
            >
                {{ state.label }}
            </button>
        </div>
        <div class="launcher">
            <button @click="launch" class="perspective-button">
                Go!
            </button>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import voicePath from '../assets/voice.wav'

export default {
    voicePath,
    data () {
        return {
            possibleStates: [
                {
                    label: '1',
                    perspective: 'rocket'
                },
                {
                    label: '2',
                    perspective: 'moon'
                },
                {
                    label: '3',
                    perspective: 'earth'
                }
            ],
            audioCtx: null,
            keydownCb: (evt) => {
                console.log('teste', evt.keyCode)
                if (evt.keyCode === 32) {
                    this.$store.commit('toggleAudioPlay')
                }
            }
        }
    },
    methods: {
        launch () {
            this.$store.commit('launch')
        },
        playAudio () {
            const audioElement = this.$refs.voice
            if (this.ctx.state === 'suspended') {
                audioElement.resume()
                return
            }
            audioElement.play()
        },
        pauseAudio () {
            const audioElement = this.$refs.voice
            audioElement.pause()
        }
    },
    watch: {
        isPlayingAudio (val) {
            if (val) {
                this.playAudio()
            } else {
                this.pauseAudio()
            }
        }
    },
    computed: {
        ...mapState(['currentPerspective', 'isPlayingAudio'])
    },
    mounted () {
        const audioElement = this.$refs.voice
        const ctx = this.ctx = new AudioContext()
        const track = ctx.createMediaElementSource(audioElement)
        track.connect(ctx.destination)
        window.addEventListener('keydown', this.keydownCb)
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.keydownCb)
    }
}
</script>

<style lang="scss" scoped>
.launcher {
    margin-top: 10px;
}
.perspective-panel {
    z-index: 20;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.button-list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.perspective-button {
    pointer-events: all;
    outline: none;
    margin-top: 10px;
    border-radius: 100%;
    border: 1pt solid #fff;
    background-color: transparent;
    color: #fff;
    $btnSize: 35px;
    width: $btnSize;
    height: $btnSize;
    cursor: pointer;
    &:hover, &.active {
        color: #000;
        background-color: #fff;
    }
}
</style>