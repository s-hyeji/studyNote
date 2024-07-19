// math 모듈
// common JS ▼
//  function add(a, b) {
//   return a + b;
// }

//  function sub(a, b) {
//   return a - b;
// }
// module.exports = {
//   // add : add
//   add,
//   sub,
// }

//  module ▼
// export { add, sub }
export function add(a, b) {
  return a + b;
}

export function sub(a, b) {
  return a - b;
}
export default function multiply(a, b) {
  return a * b;
}