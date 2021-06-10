<template>
  <div class="infos">
    <div class="title" v-html="title"></div>
    <div class="author">Par {{ author }}</div>
    <div class="link">
      <a :href="`https://reddit.com${permalink}`" target="_blank">
        Lien original
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  props: ["title", "author", "permalink"],
};
</script>

<style scoped>
.preview .infos {
  position: absolute;
  top: 10px;
  left: 45px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 16px;
  padding: 15px;
}

.infos .title {
  color: cornflowerblue;
  font-size: 1.1rem;
}

.infos .author {
  color: #888;
  font-size: 0.8rem;
}

.infos .link {
  font-size: 0.8rem;
}

.infos .link a {
  color: rgb(157, 186, 240);
}
</style>