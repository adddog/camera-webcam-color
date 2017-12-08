import LocalMedia from "localmedia"
import { cover, contain } from "intrinsic-scale"
import Regl from "./video"

const WIDTH = 640
const HEIGHT = 480

const WebRTC = (canvasEl, stream) => {
  const el = document.createElement("video")
  el.setAttribute("autoplay", true)
  el.setAttribute("playsinline", "")
  el.setAttribute("crossorigin", "anonymous")
  el.width = WIDTH
  el.height = HEIGHT
  el.srcObject = stream
  const startBtn = document.querySelector(".btn")
  startBtn.addEventListener("click", () => {
    el.play()
    startBtn.style.display = "none"
  })

  //  document.body.appendChild(el)

  el.addEventListener("loadeddata", () => {
    console.log("ready")
    const regl = Regl(canvasEl, {
      video: {
        source: el,
        width: WIDTH,
        height: HEIGHT,
      },
    })
  })
}

function store(state, emitter) {
  emitter.on("DOMContentLoaded", function() {
    const startBtn = document.querySelector(".btn")
    let _started = false
    startBtn.addEventListener("click", () => {
      console.log(_started);
      if (_started) return
      _started = true
      const canvasEl = document.querySelector(".regl")
      canvasEl.width = WIDTH
      canvasEl.height = WIDTH

      const resizeCanvas = (w = WIDTH, h = HEIGHT) => {
        let { width, height, x, y } = cover(
          window.innerWidth,
          window.innerHeight,
          w,
          h
        )
        const scale = Math.max(width / w, height / h)
        canvasEl.style.transform = `scale3d(${scale},${scale},1) translate3d(0, 0, 0)`
        canvasEl.style.webkitTransform = `scale3d(${scale},${scale},1) translate3d(0,0, 0)`
        canvasEl.style.top = `${y / 2}px`
        canvasEl.style.left = `${x / 2}px`
      }

      window.addEventListener("resize", () => resizeCanvas())
      resizeCanvas()

      const appEl = document.querySelector(".app")
      const media = new LocalMedia()
      media.start(
        {
          video: { facingMode: { exact: "environment" } },
          audio: false,
        },
        function(err, stream) {
          if (err) {
            return
          }
          const webrtc = WebRTC(canvasEl, stream)
        }
      )
    })
  })
}

module.exports = store
