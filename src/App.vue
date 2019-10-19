<template>
    <div class="root">
        <main-page />
    </div>
</template>

<script>
import Pager from './components/Pager'
import pages from './pages/'

// console.log(aframeAR)
export default {
    name: 'App',
    components: {
        ...pages,
        Pager
    },
    created () {
        
    }
}
</script>

<style lang="scss">
body {
    margin: 0;
}
</style>

<style lang="scss" scoped>
.root {
    color: #fff;
    position: absolute;
    height: 100vh;
    width: 100vw;
}
</style>