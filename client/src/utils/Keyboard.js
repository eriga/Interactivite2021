export default class Keyboard {
    constructor() {
        this.keys = {}

        document.addEventListener("keydown", e => this.keydown(e))
        document.addEventListener("keyup", e => this.keyup(e))
    }

    keydown(e) {
        this.keys[e.key] = true
    }

    keyup(e) {
        this.keys[e.key] = false
    }

    isDown(key) {
        return this.keys[key] === true
    }
}