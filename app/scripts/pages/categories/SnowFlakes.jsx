import React from 'react'

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
function(callback) {
  window.setTimeout(callback, 1000 / 60)
}
window.requestAnimationFrame = requestAnimationFrame

export default class SnowFlakes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      flakes: [],
      flakeCount: 200,
      mX: -100,
      mY: -100
    }
  }

  componentDidMount() {
    var canvas = document.getElementById("canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    this.setState({
      canvas: canvas,
      ctx: canvas.getContext("2d"),
    })

    setTimeout(() => {
      this.init(canvas)
    }, 1000)
  }

  init(canvas) {
    var flakes = []
    for (var i = 0; i < this.state.flakeCount; i++) {
      var x = Math.floor(Math.random() * canvas.width),
          y = Math.floor(Math.random() * canvas.height),
          size = (Math.random() * 3) + 2,
          speed = (Math.random() * 1) + 0.5,
          opacity = (Math.random() * 0.5) + 0.3

      flakes.push({
        speed: speed,
        velY: speed,
        velX: 0,
        x: x,
        y: y,
        size: size,
        stepSize: (Math.random()) / 30,
        step: 0,
        angle: 180,
        opacity: opacity
      })
    }
    this.setState({
      flakes: flakes
    })

    this.snow()
  }

  snow() {
    var canvas = this.state.canvas
    this.state.ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (var i = 0; i < this.state.flakeCount; i++) {
        var flake = this.state.flakes[i],
            x = this.state.mX,
            y = this.state.mY,
            minDist = 150,
            x2 = flake.x,
            y2 = flake.y

        var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
            dx = x2 - x,
            dy = y2 - y

        if (dist < minDist) {
            var force = minDist / (dist * dist),
                xcomp = (x - x2) / dist,
                ycomp = (y - y2) / dist,
                deltaV = force / 2

            flake.velX -= deltaV * xcomp
            flake.velY -= deltaV * ycomp

        } else {
            flake.velX *= .98
            if (flake.velY <= flake.speed) {
                flake.velY = flake.speed
            }
            flake.velX += Math.cos(flake.step += .05) * flake.stepSize
        }

        this.state.ctx.fillStyle = "rgba(255,255,255," + flake.opacity + ")"
        flake.y += flake.velY
        flake.x += flake.velX

        if (flake.y >= canvas.height || flake.y <= 0) {
            this.reset(flake)
        }

        if (flake.x >= canvas.width || flake.x <= 0) {
            this.reset(flake)
        }

        this.state.ctx.beginPath()
        this.state.ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2)
        this.state.ctx.fill()
    }
    requestAnimationFrame(this.snow.bind(this))
  }

  reset(flake) {
    flake.x = Math.floor(Math.random() * this.state.canvas.width)
    flake.y = 0
    flake.size = (Math.random() * 3) + 2
    flake.speed = (Math.random() * 1) + 0.5
    flake.velY = flake.speed
    flake.velX = 0
    flake.opacity = (Math.random() * 0.5) + 0.3
  }

  render() {
    return (
        <canvas id="canvas"></canvas>
      )
  }
}
