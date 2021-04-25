// Create Grass Field
console.log("Create Grass Field");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const scale = 15; // scale
const gameSpeedAsFrameRate = 150; // Higher is Low speed
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// Create Snake
var snake;

// Unleash the Snake!
(function setup() {
  // Game Elements
  snake = new Snake(scale);
  fruit = new Fruit(scale);

  // Score Board
  scoreLabel = document.createTextNode(`Score: ${snake.score}`);
  scoreLabel.id = "scoreLabel";
  canvas.parentElement.appendChild(scoreLabel);

  // Game Start
  var game = window.setInterval(function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    if (snake.updateAndCheckIfIsOver()) {
      scoreLabel.data = `Game Over! Your Score is ${snake.score}`;
      clearInterval(game);
    }
    snake.draw();

    if (snake.eat(fruit)) {
      fruit.pickLocation();
      scoreLabel.data = `Score: ${snake.score}`;
    }
  }, gameSpeedAsFrameRate);
})();

// Listenning orders from user
window.addEventListener("keydown", function (event) {
  // console.log(event);
  const direction = event.key.replace("Arrow", "");
  snake.changeDirection(direction);
});

// TESTING SEVERAL EVENT HANDLERS
// https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener
// void handleEvent(in Event event);
function describeEvent(event) {
  console.log(event.type);
  // console.log(event);
}

canvas.addEventListener("mouseover", describeEvent);
canvas.addEventListener("mouseout", describeEvent);

// canvas.addEventListener("click", describeEvent);
canvas.addEventListener("mousedown", describeEvent);
canvas.addEventListener("mouseup", describeEvent);

// remove programatically
// element.removeEventListener("mousemove", myFunction);

// option once
// canvas.addEventListener("mouseup", describeEvent, {
//   once: true,
//   capture: true,
// });

// option : passive, if true preventDefault()を呼び出す
// イベントが明示的に処理されない場合にその既定のアクションを通常どおりに行うべきではないことを伝えます。
document.querySelector("#id-checkbox").addEventListener(
  "click",
  function (event) {
    document.getElementById("output-box").innerHTML +=
      "Sorry! <code>preventDefault()</code> won't let you check this!<br>";
    event.preventDefault();
  },
  false
);
document
  .querySelector("#id-checkbox")
  .addEventListener("click", describeEvent, { passive: true });

// Safely detecting option support
// ex) passiveオプションは、ブラウザやバージョンによってサポートしない
// https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener
var passiveSupported = false;
try {
  var options = Object.defineProperty({}, "passive", {
    get: function () {
      passiveSupported = true;
    },
  });
  window.addEventListener("test", options, options);
  window.removeEventListener("test", options, options);
} catch (err) {
  passiveSupported = false;
}
// at use
// scoreLabel.addEventListener(
//   "mouseup",
//   describeEvent,
//   passiveSupported ? { passive: true } : false
// );
