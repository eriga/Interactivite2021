<template>
  <div id="main">
    <div class="preview">
      <div class="preview-content" v-if="loaded">
        <Preview
          :imageURL="images[selectedIndex].url"
          @previewLoaded="previewLoading = false"
        />
        <Info
          :title="images[selectedIndex].title"
          :author="images[selectedIndex].author"
          :permalink="images[selectedIndex].permalink"
        />
        <div class="control-left" @click="changeImage(-1)">⮜</div>
        <div class="control-right" @click="changeImage(+1)">⮞</div>
      </div>
      <img class="loading" src="images/loading.gif" v-if="previewLoading" />
    </div>
    <div class="thumbnails">
      <div class="control-left" @click="scroll(-1)">⮜</div>
      <div class="control-right" @click="scroll(+1)">⮞</div>
      <div class="thumbnail-scroller" :style="scrollCSS">
        <Thumbnail
          :thumbnail="img.thumbnail"
          v-for="(img, i) in images"
          :class="{ active: selectedIndex === i }"
          @click="selectedIndex = i"
          :key="i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import shuffle from "./utils/shuffle";
import Preview from "./components/Preview";
import Info from "./components/Info";
import Thumbnail from "./components/Thumbnail";

export default {
  name: "App",
  components: {
    Preview,
    Info,
    Thumbnail,
  },
  data() {
    return {
      loaded: false,
      images: [],
      selectedIndex: 0,
      scrollOffset: 0,
      previewLoading: true,

      scrollCSS: {
        transform: "translateX(0px)",
      },
    };
  }, // fin DATA
  methods: {
    getImages(subreddit) {
      const url = `https://www.reddit.com/r/${subreddit}.json?limit=10`;
      const r = new RegExp(/\.(jpg|png|jpeg|gif|webp)/);

      return fetch(url)
        .then((resp) => resp.json())
        .then((json) => {
          console.log(json);
          for (let img of json.data.children) {
            if (img.data.url.match(r)) {
              this.images.push(img.data);
            }
          }
        });
    },
    // Modification du scroll
    scroll(offset) {
      this.scrollOffset += offset;

      if (this.scrollOffset < 0) {
        this.scrollOffset = 0;
      }

      if (this.scrollOffset > this.images.length - 1) {
        this.scrollOffset = this.images.length - 1;
      }

      this.scrollCSS.transform = `translateX(-${this.scrollOffset * 70}px)`;
    },
    // Activation de l'image sélectionnée
    changeImage(offset) {
      let newIndex = this.selectedIndex + offset;

      if (newIndex >= 0 && newIndex < this.images.length) {
        this.selectedIndex += offset;
        this.previewLoading = true;
      }
    },
  }, // fin METHODS
  mounted() {
    Promise.all([
      this.getImages("wallpaper"),
      this.getImages("landscape"),
      this.getImages("cats"),
    ]).then(() => {
      shuffle(this.images);
      this.loaded = true;
    });

    // BONUS: naviguer avec le clavier
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        this.changeImage(1);
      } else if (e.key === "ArrowLeft") {
        this.changeImage(-1);
      }
    });
  }, // fin MOUNTED
};
</script>

<style>
@import url("https://rsms.me/inter/inter.css");
html {
  font-family: "Inter", sans-serif;
}
@supports (font-variation-settings: normal) {
  html {
    font-family: "Inter var", sans-serif;
  }
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #222;
}

#main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.preview {
  position: relative;
  flex: 1;
  background-color: rgb(77, 77, 77);
}

.preview .preview-content {
  height: 100%;
  padding: 15px;
}

.preview .loading {
  width: 130px;
  height: 130px;
  border-radius: 130px;
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.preview .control-left,
.preview .control-right {
  position: absolute;
  top: 0px;
  width: 35px;
  height: 100%;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  z-index: 100;
  cursor: pointer;
  user-select: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.preview .control-left {
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  left: 0px;
}

.preview .control-right {
  background: linear-gradient(
    -90deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  right: 0px;
}

.preview:hover .control-left,
.preview:hover .control-right {
  opacity: 1;
}

.thumbnails {
  position: relative;
  width: 100%;
  background-color: rgb(46, 46, 46);
  border-top: 2px solid rgb(48, 48, 48);
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.thumbnail-scroller {
  width: 10000px;
  transition: transform 0.2s ease;
}

.thumbnails .control-left,
.thumbnails .control-right {
  position: absolute;
  top: 0px;
  width: 35px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 24px;
  z-index: 100;
  cursor: pointer;
  user-select: none;
}

.thumbnails .control-left {
  left: 0px;
}
.thumbnails .control-right {
  right: 0px;
}

.thumbnails .control-left:hover,
.thumbnails .control-right:hover {
  background-color: rgba(50, 50, 100, 0.7);
}
</style>
