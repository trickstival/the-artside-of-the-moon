<template>
  <div class="moon-3d">
    <a-scene embedded>
        <a-camera :position="cameraPos"></a-camera>
        <a-sky color="black"></a-sky>
        <a-sphere radius="4" ref="moon" :src="$options.moonImg" position="0 1.5 -7">
        </a-sphere>
        <a-light type="point" color="white"></a-light>

        <a-sphere roughness="-5" ref="sun" color="#ffe484" position="-130 1.5 -130">
        </a-sphere>

        <a-sphere radius="40" roughness="0" ref="earth" color="blue" position="0 1.5 800">
        </a-sphere>
    </a-scene>
  </div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'
import moonImg from '../assets/crop.jpg'
export default {
    moonImg,
    data () {
      return {
        camera: {
          x: 0,
          y: 1.5,
          z: 500
        }
      }
    },
    computed: {
      cameraPos () {
        const { x, y, z } = this.camera
        return `${x} ${y} ${z}`
      }
    },
    methods: {
      rotateMoon () {
        const el = this.$refs.moon
        el.object3D.rotation.y += .002;
      },
      shipCamera () {
        if (this.camera.z === 0) {
          return
        }
        this.camera.z -= 2
      }
    },
    mounted () {
        const animate = (time) => {
            this.rotateMoon()
            // this.shipCamera()
            TWEEN.update(time)
            requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)

        const cameraTween = new TWEEN.Tween(this.camera)
          .to({ z: 0 }, 20000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start()

        this.$refs.moon.setAttribute('rotation', {x: 15, y: 30, z: 0});
        this.$refs.earth.object3D.shininess = 0
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