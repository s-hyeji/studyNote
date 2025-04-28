// console.log("하이")
// 01. 콜백함수
function main(e) {
  // console.log(e);
  // console.log(1);
  // console.log(2);
  e()
  // console.log("end");
}

function sub() {
  console.log("i am sub");
}

// main(sub);
main(() => {
  // console.log("hyeji");
}
);

// 02. 콜백함수의 활용
function repeat(cnt, callback) {
  for (let idx = 1; idx <= cnt; idx++) {
    // console.log(idx);
    callback(idx)
  }
}
// function repeatDub(cnt) {
//   for (let idx = 1; idx <= cnt; idx++) {
//     console.log(idx * 2);
//   }
// }

repeat(5, (idx) => {
  // console.log(idx);
  console.log(idx * 2);
})
// repeatDub(10)