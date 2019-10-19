<template>
  <div class="moon-3d">
    <a-scene embedded>
        <a-sky color="black"></a-sky>
        <a-light type="point" color="white" intensity="0.1" position="-100 0 0"></a-light>
        <a-sphere radius="4" ref="moon" :src="$options.moonImg" position="0 1.5 -7">
        </a-sphere>
        <a-light type="point" color="white"></a-light>

        <a-light position="-100 0 0" intensity="1" type="directional" color="white"></a-light>
        <a-sphere roughness="-5" ref="sun" color="#ffe484" position="-70 1.5 -70">
        </a-sphere>
    </a-scene>
  </div>
</template>

<script>
import moonImg from '../assets/crop.jpg'
export default {
    moonImg,
    mounted () {
        const el = this.$refs.moon
        const rotate = () => {
            el.object3D.rotation.y += .002;
            requestAnimationFrame(rotate)
        }
        rotate()

        // With .setAttribute (less recommended).
        el.setAttribute('rotation', {x: 15, y: 30, z: 0});
    }
};
</script>

<style lang="scss" scoped>
.moon-3d {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>