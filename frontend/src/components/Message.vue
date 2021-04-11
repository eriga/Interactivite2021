<!-- PORTION HTML -->
<template>
  <div class="message">
    <div class="ligne-titre">
      <p class="nom">{{ infos.username }}</p>
      <p class="date">{{ infos.updated_at }}</p>
    </div>
    <p class="texte">{{ informations.message }}</p>
    <img
      v-if="image !== null"
      :src="image"
      style="width: 200px"
      @click="imageClick"
    />
  </div>
</template>

<!-- PORTION CODE -->
<script>
import Emoticons from "../utils/emoticon";

export default {
  name: "Message",
  props: ["infos"],
  data() {
    return {
      image: null,
      informations: this.infos,
    };
  }, // FIN DATA
  mounted() {
    this.informations.message = Emoticons.convert(this.infos.message);

    const imgRegex = new RegExp(/https?:\/\/.*\.(jpg|png|jpeg|gif|webp)/, "g");
    const img = this.infos.message.match(imgRegex);
    if (img !== null) {
      this.image = img[0];
    }
  },
  methods: {
    imageClick() {
      window.open(this.image);
    },
  },
};
</script>

<!-- PORTION STYLE -->
<style scoped>
.message {
  margin: 25px 0px;
  background-color: #0f5781;
  padding: 5px 10px;
  border-radius: 5px;
  width: fit-content;
}

.message p {
  margin: 0px;
}

.message .ligne-titre {
  display: flex;
}

.message .nom {
  font-weight: bold;
  color: #777;
}

.message .date {
  font-size: 13px;
  color: #666;
  margin-left: 10px;
  margin-top: 2px;
}

.message .texte {
  margin: 5px 0px;
}
</style>