// 단락 평가 활용 사례

function printName(person) {
  const name = person && person.name;
  console.log(name || "person의 값이 없음");
  console.log(person);
  console.log(person.name);
}

// printName();
printName({ name: "서혜지" });