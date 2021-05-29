<template>
<div id="jeu">
    <div class="personnage-container">
        <div class="personnage" :style="{
                left: x + 'px',
                bottom: y + 'px',
            }">
            <div class="nom">{{ nom }}</div>
            <img src="../images/chat.png" :style="{ filter: `hue-rotate(${hue}deg)` }">
        </div>

        <div v-for="personnage in autrePersonnages" :key="personnage.id" class="personnage" :style="{
                left: personnage.x + 'px',
                bottom: personnage.y + 'px',
            }">
            <div class="nom">{{ personnage.nom }}</div>
            <img src="../images/chat.png" :style="{ filter: `hue-rotate(${personnage.hue}deg)` }">
        </div>
    </div>
    <div class="sol"></div>
</div>
</template>

<script>
import Keyboard from '../utils/Keyboard'

const keyboard = new Keyboard();

export default {  
  data(){
    return {
      id: null,
      x: Math.random() * 400,
      y: 0,
      vx: 0, 
      vy: 0,
      friction: 0.15,
      gravite: 0.1,
      hue: null,
      nom: null,
      socket: null,
      autrePersonnages: {},
    }
  }, // fin DATA
  
  mounted(){
    // Paramètres de route
    this.hue = this.$route.params.hue;
    this.nom = this.$route.params.nom;

    // Connexion
    this.socket = io('http://localhost:3021/');

    this.socket.emit('hello')
    this.emitMove()

    this.socket.on('hello', this.emitMove)
    this.socket.on('move', this.moveAutre)
    this.socket.on('remove', this.removeAutre)

    window.requestAnimationFrame(this.update)
  }, // fin MOUNTED

  methods: {
    update(){      
      if (keyboard.isDown("ArrowLeft") || keyboard.isDown("a")) {
          this.vx -= 0.5
      } else if (keyboard.isDown("ArrowRight") || keyboard.isDown("d")) {
          this.vx += 0.5
      }

      if (keyboard.isDown(" ") && this.y === 0) {
          this.vy = 5
      }
      
      if (this.vx < this.friction && this.vx > -this.friction) {
          this.vx = 0
      } else {
          this.vx -= (this.vx > 0) ? this.friction : -this.friction
      }

      if (this.y > 0) {
          this.vy -= this.gravite
      } else if (this.y < 0) {
          this.y = 0
          this.vy = 0
      }

      if (this.vx !== 0 || this.vy !== 0) {
          this.x += this.vx
          this.y += this.vy
          this.emitMove()
      }


      window.requestAnimationFrame(this.update)
    },
    
    emitMove(){
      this.socket.emit('move', {
          nom: this.nom,
          hue: this.hue,
          x: this.x,
          y: this.y,
      })
    },

    moveAutre(data){
      if (this.autrePersonnages[data.id] === undefined) {        
          this.autrePersonnages[data.id] = data
      } else {
          this.autrePersonnages[data.id].x = data.x
          this.autrePersonnages[data.id].y = data.y
      }
    },

    removeAutre(data){            
      delete this.autrePersonnages[data.id];
    },
  }

}
</script>
<style scoped>
#jeu .sol {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100px;
    background-image: url('../images/sol.jpg');
    background-repeat: repeat-x;
    box-shadow: inset 0px 5px 5px rgba(200,200,255,0.4);
}
#jeu .personnage-container {
    position: absolute;
    top: 0px;
    bottom: 100px;
    left: 0px;
    width: 100%;
}
#jeu .personnage {
    position: absolute;
    transform: translateY(5px);
    /* transition: all 15ms ease; */
}
#jeu .personnage .nom {
    text-align: center;
}
#jeu .personnage img {
    width: 60px;
}
</style>