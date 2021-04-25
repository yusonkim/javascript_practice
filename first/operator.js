// Compare between types
console.log(6 == "6"); // true
console.log(6 === "6"); // false

// Logical Operators
// || === or, && === and, !
console.log(true || false);
console.log(true && false);
console.log(!true);

console.log("ABC" || "");

// Switch STatement
let dice = 1;
// compared with '=== operator'
switch (dice) {
  case "1":
    console.log("string 1");
    break;
  case 1:
    console.log("number 1");
    break;
  default:
    console.log("default");
}
