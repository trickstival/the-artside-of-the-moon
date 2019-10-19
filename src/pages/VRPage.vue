<template>
    <div class="main-page">
        <div class="perspective-panel-wrapper">
            <!-- <speech /> -->
            <perspective-panel />
        </div>
        <moon-3d />
    </div>
</template>

<script>
import Moon3d from '../components/Moon3D'
import PerspectivePanel from '../components/PerspectivePanel'
import Speech from '../components/Speech'
require('aframe')
export default {
    name: 'VRPage',
    components: {
        Moon3d,
        PerspectivePanel,
        // Speech
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