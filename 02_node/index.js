// common JS ▼
// const { add, sub } = require("./math")

//  module ▼
// import mul  from "./math.js";
import mul, { add, sub } from "./math.js"
import randomColor from "randomcolor"

const color = randomColor()
console.log(color);

// //
// console.log(add(10, 30));
// console.log(sub(10, 30));
// console.log(mul(10, 30));
// console.log("안녕 Node.js");