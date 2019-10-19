<template>
    <section class="main-page">
        main page
        <router-link to="/">
            Home
        </router-link>
        |
        <router-link to="/artemis">
            Artemis
        </router-link>
        |
        <router-link to="/vr">
            VR
        </router-link>
        <main class="main-page-content">
            <router-view />
        </main>
    </section>
</template>

<script>
export default {
    name: 'MainPage'   
}
</script>

<style lang="scss" scoped>
.main-page {
    color: #000;
}
</style>