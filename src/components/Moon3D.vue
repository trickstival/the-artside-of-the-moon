<template>
  <div class="moon-3d">
    <a-scene embedded>
      <a-light intensity=".1" type="ambient" color="#ccc"></a-light>
        <!-- Camera -->
        <a-entity :rotation="cameraWrapper.rotation" :position="cameraWrapper.position">
          <a-camera ref="camera" :position="cameraPos"></a-camera>
        </a-entity>
        <!-- Ship -->
        <a-sphere radius="1" color="green" :position="`${rocketCam.x} ${rocketCam.y - 3} ${rocketCam.z - 4}`">
          <a-light type="point" distance="10" color="green"></a-light>
        </a-sphere>
        <!-- Sky -->
        <a-sky color="black"></a-sky>
        <!-- Moon -->
        <a-sphere radius="4" ref="moon" :src="$options.moonImg" position="0 1.5 -7">
        </a-sphere>
        <a-light type="point" color="white"></a-light>
        <!-- Sun -->
        <a-sphere roughness="-5" ref="sun" color="#ffe484" position="-130 1.5 -130">
        </a-sphere>
        <!-- Earth -->
        <a-sphere radius="40" roughness="0" ref="earth" color="blue" position="0 1.5 800">
        </a-sphere>
    </a-scene>
  </div>
</template>

<script>
import TWEEN from '@tweenjs/tween.js'
import moonImg from '../assets/crop.jpg'
import { mapState } from 'vuex'

export default {
    name: 'Moon3d',
    moonImg,
    data () {
      return {
        camera: {
          x: 0,
          y: 1.5,
          z: 500
        },
        rocketCam: {
          x: 40,
          y: 1.5,
          z: 790
        }
      }
    },
    computed: {
      ...mapState(['currentPerspective', 'launchToggle']),
      cameraPos () {
        const perspective = this.currentPerspective
        this.$refs.camera
        if (perspective === 'rocket') {
          const { x, y, z } = this.rocketCam
          return `${x} ${y} ${z}`
        } else if (perspective === 'moon') {
          return '0 1.5 5'
        } else if (perspective === 'earth') {
          return '-17 0 -47'
        }
      },
      cameraWrapper () {
        if (this.currentPerspective === 'earth') {
          return {
            position: '180 1.5 750',
            rotation: '0 60 0'
          }
        }
        return {
          position: '0 0 0',
          rotation: '0 0 0'
        }
      }
    },
    watch: {
      launchToggle () {
        this.startRocket()
      }
    },
    methods: {
      rotateMoon () {
        const el = this.$refs.moon
        el.object3D.rotation.y += .002;
      },
      startRocket () {
        this.rocketCam = {
          x: 40,
          y: 1.5,
          z: 790
        }
        const rocketTween = new TWEEN.Tween(this.rocketCam)
          .to({ x: 0, y: 1.5, z: 0, }, 20000)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start()
      }
    },
    mounted () {
        const animate = (time) => {
            this.rotateMoon()
            TWEEN.update(time)
            requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)

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