document.body.style.backgroundColor = "red"; // background color
document.body.style.color = "yellow"; // font color
document.getElementById("btn1").style.color = "red";

document.querySelector("#btn2").style.backgroundColor = "green";

// window object
// console.log(window);

const btn = document.getElementById("btn1");
const name = btn.nodeName;
const css = btn.style;
const className = btn.className;

console.log(btn); // <button class="btn" id="btn1" style="color: red;">Click Me1</button>
console.log(name); // BUTTON
console.log(document);

// console.dir for display properties
console.dir(document);
console.dir(css); // CSSStyleDeclaration {0: "color", alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", …}
