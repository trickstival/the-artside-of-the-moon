<template>
  <div class="moon-3d">
    <a-scene>
        <a-sky src="https://farm4.staticflickr.com/3281/2575759005_842060e60d_b.jpg"></a-sky>
        <a-sphere radius="4" ref="moon" 
            :src="$options.moonImg" position="-5 0 -6">
        </a-sphere> 
        <a-box color="yellow" position="0 0 0"></a-box>
    </a-scene>
  </div>
</template>

<script>
import moonImg from '../assets/moon2.jpg'
export default {
    moonImg,
    mounted () {
        const el = this.$refs.moon
        const rotate = () => {
            el.object3D.rotation.y += .01;
            requestAnimationFrame(rotate)
        }
        rotate()

        // With .setAttribute (less recommended).
        el.setAttribute('rotation', {x: 15, y: 30, z: 90});
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
}
</style>