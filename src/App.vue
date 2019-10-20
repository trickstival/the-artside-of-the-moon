<template>
    <div @keydown="test" class="root">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    methods: {
        test () {
            console.log('teste')
        }
    },
    created () {
        
    }
}
</script>

<style lang="scss">
* {
    box-sizing: border-box;
}
body#spec[style], html {
    margin: 0!important;
    width: 100vw!important;
    height: 100vh!important;
    overflow: hidden;
}
</style>

<style lang="scss" scoped>
.root {
    color: #fff;
    position: fixed;
    height: 100vh;
    width: 100vw;
}
</style>