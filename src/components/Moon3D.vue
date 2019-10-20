<template>
  <div class="moon-3d">
    <a-scene embedded>
      <a-light intensity=".3" type="ambient" color="#ccc"></a-light>
      <!-- Camera -->
      <a-entity :rotation="cameraWrapper.rotation" :position="cameraWrapper.position">
        <a-camera ref="camera" :position="cameraPos"></a-camera>
      </a-entity>
      <!-- Rocket -->
      <a-sphere
        ref="rocket"
        radius="1"
        color="#036558"
        :position="`${rocketCam.x} ${rocketCam.y - 4} ${rocketCam.z - 8}`"
      >
        <a-light type="point" distance="10" color="red"></a-light>
        <a-cone rotation="90 90 0"  position="1 0 0" color="#2fa590"></a-cone>
        <a-cone rotation="90 -90 0"  position="-1 0 0" color="#2fa590"></a-cone>
      </a-sphere>
      <!-- Sky -->
      <a-sky color="black"></a-sky>
      <!-- Moon -->
      <a-sphere
        :rotation="moon.rotation"
        radius="4"
        ref="moon"
        :src="$options.moonImg"
        position="0 1.5 -7"
      ></a-sphere>
      <!-- Sun -->
      <a-sphere
        radius="5"
        roughness="-5"
        ref="sun"
        color="#ffe484"
        :position="`${sun.x} ${sun.y} ${sun.z}`"
      >
        <a-light type="directional" color="white"></a-light>
        <a-light type="point" color="white" position="20 0 20" distance="100" intensity="2"></a-light>
      </a-sphere>
      <!-- Earth -->
      <a-sphere
        radius="40"
        roughness="0"
        ref="earth"
        color="blue"
        :position="`${earth.x} ${earth.y} ${earth.z}`"
      ></a-sphere>
    </a-scene>
  </div>
</template>

<script>
import TWEEN from "@tweenjs/tween.js";
import moonImg from "../assets/crop.jpg";
import { mapState } from "vuex";
import { spinAround, autoRotate } from "../animations/";

const getVector3 = (x = 0, y = 0, z = 0) => ({
  x,
  y,
  z
});

export default {
  name: "Moon3d",
  moonImg,
  data() {
    return {
      camera: getVector3(0, 1.5, 500),
      rocketCam: getVector3(40, 1.5, 790),
      moon: getVector3(),
      sun: getVector3(-130, 1.5, -130),
      earth: getVector3(0, 1.5, 800),
      rocketSpinAroundAnimation: null
    };
  },
  computed: {
    ...mapState(["currentPerspective", "launchToggle"]),
    cameraPos() {
      const perspective = this.currentPerspective;
      this.$refs.camera;
      if (perspective === "rocket") {
        const { x, y, z } = this.rocketCam;
        return `${x} ${y} ${z}`;
      } else if (perspective === "moon") {
        return "0 1.5 17";
      } else if (perspective === "earth") {
        return "-17 0 -47";
      }
    },
    cameraWrapper() {
      if (this.currentPerspective === "earth") {
        return {
          position: "180 1.5 750",
          rotation: "0 60 0"
        };
      }
      return {
        position: "0 0 0",
        rotation: "0 0 0"
      };
    }
  },
  watch: {
    launchToggle() {
      this.startRocket();
    }
  },
  methods: {
    startRocket() {
      this.rocketCam = {
        x: 40,
        y: 1.5,
        z: 790
      };
      if (this.rocketSpinAroundAnimation) {
        this.rocketSpinAroundAnimation.stop();
      }
      const radiusStep = 20;

      const rocketTween = new TWEEN.Tween(this.rocketCam)
        .to({ x: 0, y: 1.5, z: radiusStep }, 20000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          this.rocketSpinAroundAnimation = spinAround(
            this.rocketCam,
            this.moon
          )
            .start()
            .onUpdate(() => {
              const moonPosition = this.getPosition('moon')
              this.getObject('rocket').lookAt(moonPosition)
            })
            .onComplete(() => {
              this.rocketSpinAroundAnimation = null;
            });
        })
        .start();
    },
    getObject(ref) {
      return this.$refs[ref].object3D
    },
    getRotation(ref) {
      return this.$refs[ref].object3D.rotation
    },
    getPosition(ref) {
      return this.$refs[ref].object3D.position
    }
  },
  mounted() {
    const animate = time => {
      TWEEN.update(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    autoRotate(this.getRotation("moon")).start()
    autoRotate(this.getRotation("earth"), 5000000).start()
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