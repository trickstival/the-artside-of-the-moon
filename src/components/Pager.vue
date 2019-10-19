<template>
    <div class="pager">
        <slot />
    </div>
</template>

<script>
    export default {
        name: 'Pager'
    }
</script>

<style lang="scss" scoped>
.pager {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>