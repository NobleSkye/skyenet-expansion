import 'kaplay'
import './style.css'
import kaplay from 'kaplay'
import spaceship from './sprites/spaceship.webp'
import * as websocket from './websocket';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  </div>
`

let thrusting = false;
let speed = 0;

const k = kaplay({
  buttons: {
    thrust: {
      keyboard: ["w"],
    }
  }
});

k.loadSprite("player", spaceship, {
    sliceX: 1, // how many sprites are in the X axis
    sliceY: 1, // how many sprites are in the Y axis
});

const player = k.add([
  k.sprite("player"),
  k.pos(100, 100),
])

k.onButtonDown("thrust", () => {
  thrusting = true
});
 
k.onButtonRelease("thrust", () => {
  thrusting = false;
})

k.onUpdate("player" ,(player) => {
  if (thrusting) {
    if (player.move.speed < 2) {
      player.move.speed += 0.2
    }
  } else {
    if (player.move.speed > 0) {
      player.move.speed -= 2
    }
  }
})

websocket.init();