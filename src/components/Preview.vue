<template>
  <div class="image-container">
    <img class="main" :src="imageURL" @load="$emit('previewLoaded')" />
  </div>
</template>

<script>
export default {
  name: "Preview",
  props: ["imageURL"],
};
</script>

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.image-container img {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>