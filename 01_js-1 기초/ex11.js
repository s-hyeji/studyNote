function add10(num) {
  const promise = new Promise((resolve, reject) => {
    // 비동기 작업 실행하는 함수
    // executor 함수라고 함
    setTimeout(() => {

      if (typeof num === "number") {
        resolve(num + 10)
      } else {

        reject("num이 숫자가 아닙니다.")

      }
      // console.log("안녕");
      // reject("왜 실패했는지 이유..")
    }, 2000);
  })
  return promise;
}

add10(10).then((value) => {
  console.log(value);
  return add10(value)
}).then((value) => {
  console.log(value);
  return add10(value)
}).then((value) => {
  console.log(value);
}).catch((error) => {
  console.log(error);
});


// then 메서드
//  --> 그 후에

// // resolve 시
// promise.then((value) => {
//   console.log(value);

//   // reject 시
// }).catch((error) => {
//   console.log(error);
// })

// console.log(promise);