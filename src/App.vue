<template>
    <div class="root">
        <pager>
            <main-page />
        </pager>
    </div>
</template>

<script>
import Pager from './components/Pager'
import pages from './pages/'
require('aframe')
export default {
    components: {
        ...pages,
        Pager
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
    background-color: #000;
}
</style>