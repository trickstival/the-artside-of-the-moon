<template>
    <div class="speech">
        <h1>

        </h1>
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
                }
            ]
        }
    },
    methods: {
        start (speechs = this.speechs.slice()) {
            if (!speech) {
                return
            }
            wait(speech.duration).then(() => {
                speechs.shift()
                this.start(speechs)
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>