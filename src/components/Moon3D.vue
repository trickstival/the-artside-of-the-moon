<template>
  <div class="moon-3d">
    <a-scene arjs='sourceType: webcam;' ref="scene" embedded>
      <a-light intensity=".3" type="ambient" color="#ccc"></a-light>
      <!-- Camera -->
      <a-entity :rotation="cameraWrapper.rotation" :position="cameraWrapper.position">
        <ar-camera ref="camera" preset='hiro'></ar-camera>
        <!-- <a-camera ref="camera" :position="cameraPos"></a-camera> -->
      </a-entity>
      <!-- Rocket -->
      <a-cylinder
        :src="$options.foguete"
        ref="rocket"
        radius="1"
        :particle-system="hasStarted ? 'color: #000,#FFF;direction:-1;maxAge:1;' : null"
        height="6"
        rotation="270 180 0"
        :position="`${rocketCam.x} ${rocketCam.y - 4} ${rocketCam.z - 8}`"
      >
        <a-cylinder
          color="orange"
          radius=".99"
          position="0 3 0"
        >
        </a-cylinder>
        <a-light type="point" distance="10" color="red"></a-light>
        <a-cone color="red" height="1.5" radius-bottom="1.1" rotation="180 0 0" position="0 -3.7 0"></a-cone>
        <a-cone :src="$options.foguete" rotation="90 90 0"  position="1.3 2.3 0"></a-cone>
        <a-cone :src="$options.foguete" rotation="90 -90 0" position="-1.3 2.3 0"></a-cone>
      </a-cylinder>
      <!-- Sky -->
      <!-- <a-sky :src="sky.currentSky" repeat="10 10"></a-sky> -->
      <!-- Moon -->
      <a-sphere
        particle-system="preset: dust;"
        :rotation="moon.rotation"
        radius="4"
        ref="moon"
        repeat="5 3"
        :src="$options.moonImg"
        position="0 1.5 -7"
      >
        <!-- Halo -->
        <a-sphere
          ref="moonHalo"
          :radius="halos.moonHaloRadius"
          material="emissive:#ccc;transparent: true; opacity: 0.04"
        >
        </a-sphere>
      </a-sphere>
      <!-- Sun -->
      <a-sphere
        radius="5"
        roughness="-5"
        ref="sun"
        color="#ffe484"
        :position="`${sun.x} ${sun.y} ${sun.z}`"
      >
        <!-- Halo -->
        <a-sphere
          ref="moonHalo"
          :radius="halos.sunHaloRadius"
          material="emissive:#ccc;transparent: true; opacity: 0.04"
        >
        </a-sphere>
        <a-light type="directional" color="white"></a-light>
        <a-light type="point" color="white" position="20 0 20" distance="100" intensity="2"></a-light>
      </a-sphere>
      <!-- Earth -->
      <a-sphere
        radius="40"
        roughness="0"
        ref="earth"
        :src="$options.earthImg"
        :position="`${earth.x} ${earth.y} ${earth.z}`"
      >
        <!-- Halo -->
        <a-sphere
          ref="earthHalo"
          :radius="halos.earthHaloRadius"
          material="emissive:#ccc;transparent: true; opacity: 0.04"
        >
      </a-sphere>
    </a-scene>
  </div>
</template>

<script>
import TWEEN from "@tweenjs/tween.js";
import moonImg from "../assets/moon_cartoon.svg";
import earthImg from '../assets/earth_cartoon_1.svg'
import skyImg from "../assets/sky.svg";
import sky2Img from "../assets/sky2.svg";
import sky3Img from "../assets/sky3.svg";
import foguete from '../assets/foguete_1.svg'
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
  earthImg,
  foguete,
  data() {
    return {
      camera: getVector3(0, 1.5, 500),
      rocketCam: getVector3(40, 1.5, 790),
      moon: getVector3(),
      sun: getVector3(-130, 1.5, -130),
      earth: getVector3(0, 1.5, 800),
      rocketSpinAroundAnimation: null,
      halos: {
        moonHaloRadius: 8,
        sunHaloRadius: 9,
        earthHaloRadius: 50,
        earthHalo2Radius: 80,
      },
      sky: {
        currentSky: skyImg
      },
      hasStarted: false
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
    },
  },
  watch: {
    launchToggle() {
      this.startRocket();
    }
  },
  methods: {
    startRocket() {
      this.hasStarted = true
      const rocket = this.getObject("rocket");
      rocket.rotation.set(...[270, 180, 0].map(THREE.Math.degToRad))
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
        .to({ x: 0, y: 1.5, z: radiusStep }, 60000)
        // .to({ x: 0, y: 1.5, z: radiusStep }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          this.rocketSpinAroundAnimation = spinAround(this.rocketCam, this.moon)
            .start()
            .onUpdate(({ x, y, z }) => {
              const moonPosition = this.getPosition("moon");
              const testMesh = rocket.clone()
              testMesh.lookAt(moonPosition)
              testMesh.rotation.z -= 1.5
              rocket.rotation.copy(testMesh.rotation);
            });
        })
        .start();
    },
    pulseHalos () {
      new TWEEN.Tween(this.halos)
        .to({ moonHaloRadius: 9, sunHaloRadius: 7, earthHaloRadius: 55, earthHalo2Radius: 95 }, 6000)
        .repeat(Infinity)
        .yoyo(true)
        .easing(TWEEN.Easing.Quadratic.In)
        .start()
    },
    blinkSky () {
      // new TWEEN.Tween({ count: 0 })
      //   .to({ count: 90 }, 1000)
      //   .repeat(Infinity)
      //   .onUpdate(({ count }) => {
      //     if (count < 30) {
      //       this.sky.currentSky = skyImg
      //     } else if (count < 60) {
      //       this.sky.currentSky = sky2Img
      //     } else {
      //       this.sky.currentSky = sky3Img
      //     }
      //   })
      //   .start()
    },
    getObject(ref) {
      return this.$refs[ref].object3D;
    },
    getRotation(ref) {
      return this.$refs[ref].object3D.rotation;
    },
    getPosition(ref) {
      return this.$refs[ref].object3D.position;
    }
  },
  mounted() {
    const animate = time => {
      TWEEN.update(time);
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    autoRotate(this.getRotation("moon")).start();
    autoRotate(this.getRotation("earth"), 5000000).start();
    this.pulseHalos()
    this.blinkSky()
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