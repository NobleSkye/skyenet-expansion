import { unknown } from "zod"
import type { Game } from "../../../core/src/types"

export class player{
    x = 500
  y = 500
  velX = 0
  velY = 0
  rotation = 0
  velR = 0
  game = {} as Game
    constructor(Game:Game){
        this.game = Game
    }

  tick(){
    this.velocityChange()
    this.move()

  }
  velocityChange(){
    if(this.game.keys.isKeyPressed("KeyW")){
      this.velY -= Math.cos(this.rotation * Math.PI /180)/3
      this.velX -= Math.sin(this.rotation * Math.PI /180)/3
    }
    if(this.game.keys.isKeyPressed("KeyS")){
      this.velY *= .90
      this.velX *= .90
      this.velR *= .90
    }
    if(this.game.keys.isKeyPressed("KeyA")){
      this.velR +=.1
    }
    if(this.game.keys.isKeyPressed("KeyD")){
      this.velR -=.1
    }

  }
  
    move(){
      this.y += this.velY
      this.x += this.velX
      this.rotation += this.velR
      this.velY *= .97
      this.velX *= .97
      this.velR *= .97
      if(this.rotation >= 360){
        this.rotation -= 360
      }
      if(this.rotation <= 0){
        this.rotation += 360
      }
    }
}