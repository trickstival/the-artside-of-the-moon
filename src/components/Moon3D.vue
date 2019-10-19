<template>
  <div class="moon-3d">
    <a-scene>
        <a-sky src="https://farm4.staticflickr.com/3281/2575759005_842060e60d_b.jpg"></a-sky>
        <a-sphere color="green" radius="2" position="-5 0 -6">
        </a-sphere> 
        <a-box color="yellow" position="0 0 0"></a-box>
    </a-scene>
  </div>
</template>

<script>
export default {};
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