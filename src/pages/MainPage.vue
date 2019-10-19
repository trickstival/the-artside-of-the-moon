<template>
    <div class="main-page">
        <h1 class="main-title">
            Nasa SpaceApps
        </h1>
        <moon-3d />
    </div>
</template>

<script>
import Moon3d from '../components/Moon3D'
export default {
    components: {
        Moon3d
    }
}
</script>

<style lang="scss" scoped>
.main-page {
    font-family: Ubuntu;
}
.main-title {
    z-index: 2;
}
</style>