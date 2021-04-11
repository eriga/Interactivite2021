<!-- PORTION HTML -->
<template>
  <div id="content" class="chat">
    <aside>
      <div class="user" v-for="user in activeUsers" :key="user.id">
        <div class="icon">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 1000 1000"
            enable-background="new 0 0 1000 1000"
            xml:space="preserve"
          >
            <g>
              <path
                d="M861.2,831.1C941.2,743.9,990,627.6,990,500c0-270.6-219.4-490-490-490C229.4,10,10,229.4,10,500c0,132,52.2,251.8,137.1,339.9c33.5-94.6,103.6-173.4,196.5-217.3l75.1-35.5l-59.5-58c-38.8-37.8-61-89.3-61-144.5c0-111.4,90.3-201.8,201.8-201.8c111.4,0,201.8,90.3,201.8,201.8c0,53.8-21.1,104.2-58.1,141.7l-58.4,59.1l75.8,34C754.4,661.3,825.7,738.1,861.2,831.1z"
              />
              <path
                d="M500,932.4L500,932.4c238.8,0,432.4-193.6,432.4-432.4c0-238.8-193.6-432.4-432.4-432.4C261.2,67.6,67.6,261.2,67.6,500C67.6,738.8,261.2,932.4,500,932.4L500,932.4z M500,990L500,990C229.4,990,10,770.6,10,500C10,229.4,229.4,10,500,10c270.6,0,490,219.4,490,490C990,770.6,770.6,990,500,990L500,990z"
              />
            </g>
          </svg>
        </div>
        <div class="username">
          {{ user.username }}
        </div>
      </div>
    </aside>
    <main>
      <div id="messages" ref="messages">
        <Message
          :infos="message"
          v-for="message in messageList"
          :key="message.id"
        />
      </div>
      <div id="textbox">
        <form
          action="#"
          method="POST"
          name="message"
          @submit.prevent="envoiMessage"
        >
          <input
            type="text"
            name="textbox"
            placeholder="Message"
            v-model="texteMessage"
          />
        </form>
        <div id="refresh">Rafraîchir</div>
      </div>
    </main>
  </div>
</template>

<!-- PORTION CODE -->
<script>
import Message from "../components/Message";
import { http_get, http_post } from "../utils/request";

const API_URL = "http://127.0.0.1:8000/api";

export default {
  name: "Chat",
  components: {
    Message,
  },
  data() {
    return {
      messageList: [],
      texteMessage: "",
      activeUsers: [],
    };
  }, // FIN DATA
  methods: {
    envoiMessage() {
      //console.log(this.texteMessage);
      http_post(API_URL + "/messages/new", {
        username: this.$route.params.username,
        message: this.texteMessage,
      }).then((data) => {
        if (data.success) {
          this.refresh();
          this.texteMessage = "";
        }
      });
    },
    refresh() {
      this.refreshMessages();
      this.refreshActiveUsers();
    },
    refreshMessages() {
      http_get(API_URL + "/messages").then((data) => {
        this.messageList = data;
      });
    },
    refreshActiveUsers() {
      http_get(API_URL + "/users/activeSince/5000").then((data) => {
        this.activeUsers = data;
      });
    },
  }, // FIN METHODS
  mounted() {
    this.refresh();
  },
};
</script>

<!-- PORTION STYLE -->
<style scoped>
.chat aside {
  width: 300px;
  height: 100%;
  background-color: #2b2b2b;
  padding: 10px;
}

.chat aside .user {
  display: flex;
  align-items: center;
  padding: 6px 0px;
  border-bottom: 1px solid #444;
}
.chat aside .icon {
  width: 30px;
  fill: rgb(48, 184, 82);
}
.chat aside .username {
  margin-left: 5px;
  font-size: 18px;
}

.chat main {
  display: flex;
  padding: 0px 20px;
  flex-direction: column;
  flex: 1;
}

#textbox {
  display: flex;
  padding-bottom: 20px;
  align-items: center;
}

#textbox form,
#textbox input {
  width: 100%;
  flex: 1;
}

#textbox input {
  border-radius: 8px;
  border: none;
  padding: 15px 15px;
  background: #464646;
  font-size: 16px;
  color: #ccc;
}

#textbox .refresh {
  margin: 15px;
  color: white;
  background-color: #0f5781;
  padding: 15px 15px;

  width: auto;
  border-radius: 8px;
  border: none;
}

#textbox .refresh:hover {
  background-color: #0c4769;
}
</style>