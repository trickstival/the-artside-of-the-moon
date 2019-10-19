<template>
    <div class="root">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
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