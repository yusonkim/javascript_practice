// type
let n1 = null;
console.log(typeof n1);
let n2;
console.log(typeof n2);

console.log(n1 == n2);

// auto type conversion
let num = 10;
let num_txt = "5";
let txt = "txt";
console.log(num + num_txt);
console.log(num + +num_txt);
console.log(num_txt + num);
console.log(txt + num);

// array
const a = [1, "text", undefined];
console.log(a);

// function as ref. variable
const f = function (n1, n2) {
  return n1 + n2;
};
console.log(f(1, 2));
