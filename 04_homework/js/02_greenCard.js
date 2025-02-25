const greenCard = document.querySelector(".greenCard_clone");
const header = document.querySelector("#main-header");
const mainNav = document.querySelector("#main-nav");
const subNav = document.querySelector("#sub-nav");

if (greenCard) {
  // 홈 페이지
  document.querySelectorAll(".link-goHome").forEach((goHome) => {
    goHome.setAttribute("href", "./02_preparing.html");
  });
  // 준비중 페이지
  document.querySelectorAll(".link-prepar").forEach((preparing) => {
    preparing.setAttribute("href", "./02_preparing.html");
  });
  console.log(header.children.length);


  // 네비게이션 관련 
  const mainList = mainNav.querySelectorAll(".main-nav-name");
  // 마우스 호버    
  for (let list of mainList) {
    list.addEventListener("mouseenter", function () {
      navOpen()
    });
  };
  header.addEventListener("mouseleave", function () {
    navClose()
  });
  // 탭, 포커스
  mainNav.addEventListener('focusin', () => {
    navOpen();
  });
  header.addEventListener('focusout', (e) => {
    if (!header.contains(e.relatedTarget)) {
      navClose();
    }
  });
  function navOpen() {
    mainNav.classList.add("on");
  }
  function navClose() {
    mainNav.classList.remove("on");
  }

}