<template>
  <div class="moon-3d">
    <a-scene embedded>
        <a-sky color="black"></a-sky>
        <a-sphere radius="4" ref="moon" 
            :src="$options.moonImg" position="0 1.5 -7">
        </a-sphere> 
        <a-box color="yellow" position="0 0 0"></a-box>
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
  z-index: -1;
}
</style>