<template>
    <section class="perspective-panel">
        <div class="button-list">
            <button
                v-for="state in possibleStates"
                :key="state.label"
                :class="{ active: state.perspective === currentPerspective }"
                @click="$store.commit('setPerspective', state.perspective)"
                class="perspective-button"
            >
                {{ state.label }}
            </button>
        </div>
        <div class="launcher">
            <button @click="$store.commit('launch')" class="perspective-button">
                Go!
            </button>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data () {
        return {
            possibleStates: [
                {
                    label: '1',
                    perspective: 'rocket'
                },
                {
                    label: '2',
                    perspective: 'moon'
                },
                {
                    label: '3',
                    perspective: 'earth'
                }
            ]
        }
    },
    computed: {
        ...mapState(['currentPerspective'])
    }
}
</script>

<style lang="scss" scoped>
.launcher {
    margin-top: 10px;
}
.perspective-panel {
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.button-list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.perspective-button {
    pointer-events: all;
    outline: none;
    margin-top: 10px;
    border-radius: 100%;
    border: 1pt solid #fff;
    background-color: transparent;
    color: #fff;
    $btnSize: 35px;
    width: $btnSize;
    height: $btnSize;
    cursor: pointer;
    &:hover, &.active {
        color: #000;
        background-color: #fff;
    }
}
</style>