console.log("process.env.NODE_ENV", process.env.NODE_ENV);

require("fastclick")(document.body)

const html = require("choo/html")
const choo = require("choo")

var app = choo()

app.use(require("choo-devtools")())

app.use(require('./store'))


const onload = el => {

}
//VIEWS


function mainView(state, emit) {
  return html`
    <div
    class="app"
    onload=${onload}
    >
      <div class="u-canvas-container">
        <canvas class="regl"></canvas>
      </div>
    </div>
  `
}

app.route(`/*`, mainView)

var tree = app.start()
document.body.appendChild(tree)
