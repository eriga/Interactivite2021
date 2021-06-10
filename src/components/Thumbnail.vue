<template>
  <div class="thumbnail">
    <img :src="thumbnail" />
  </div>
</template>

<script>
export default {
  name: "Thumbnail",
  props: ["thumbnail"],
};
</script>

<style scoped>
.thumbnail {
  width: 80px;
  height: 80px;
  padding: 4px 4px;
  display: inline-block;
  border-right: 1px solid rgb(61, 61, 61);
  box-shadow: inset 0px 5px 10px 1px rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: box-shadow 0.2s ease;
}

.thumbnail:hover {
  box-shadow: inset 0px 5px 10px 1px rgba(75, 200, 125, 0.7);
}

.thumbnail.active {
  box-shadow: inset 0px 5px 10px 1px rgba(17, 86, 235, 0.8);
}
.thumbnail.active img {
  filter: brightness(0.5);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.2s ease;
}

.thumbnail:hover img {
  filter: saturate(2);
}
</style>