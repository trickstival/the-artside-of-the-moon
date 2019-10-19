<template>
    <div class="main-page">
        <!-- <h1 class="main-title">
            Welcome to the Moon
        </h1> -->
        <div class="perspective-panel-wrapper">
            <perspective-panel />
        </div>
        <moon-3d />
    </div>
</template>

<script>
import Moon3d from '../components/Moon3D'
import PerspectivePanel from '../components/PerspectivePanel'
export default {
    name: 'MainPage',
    components: {
        Moon3d,
        PerspectivePanel
    }
}
</script>

<style lang="scss" scoped>
.main-page {
    display: flex;
    height: 100%;
    align-items: flex-end;
    font-family: Ubuntu;
}
.perspective-panel-wrapper {
    z-index: 2;
}
.main-title {
    font-size: 80px;
    z-index: 20;
    pointer-events: none;
}
</style>