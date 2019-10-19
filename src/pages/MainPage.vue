<template>
    <div class="main-page">
        <h1 class="main-title">
            Welcome to the Moon
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
    display: flex;
    height: 100%;
    align-items: flex-end;
    font-family: Ubuntu;
}
.main-title {
    font-size: 80px;
    z-index: 20;
}
</style>