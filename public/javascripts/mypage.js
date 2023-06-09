const $loginButton = document.getElementById("login-button");
const $signupButton = document.getElementById("signup-button");
const $receipeButton = document.getElementById("nav-cocktail-receipe");
const $ownReceipeButton = document.getElementById("nav-own-cocktail");
const $ingredientButton = document.getElementById("nav-ingredient");
const $searchButton = document.getElementById("nav-search");

$loginButton.addEventListener("click", () => {
  window.location.href = "./login.html";
});

$signupButton.addEventListener("click", () => {
  window.location.href = "./signup.html";
});
$receipeButton.addEventListener("click", () => {
  window.location.href = "./cocktailmain.html";
});
$ownReceipeButton.addEventListener("click", () => {
  window.location.href = "./mycocktailmain.html";
});
$ingredientButton.addEventListener("click", () => {
  window.location.href = "./ingredient.html";
});
$searchButton.addEventListener("click", () => {
  window.location.href = "./search.html";
});

window.onload = function () {
  const $loginButtonTop = document.querySelector("#login-button");
  const $signupButtonTop = document.querySelector("#signup-button");
  const $nickname = document.querySelector(".nickname");

  const $titleLogo = document.querySelector(".title-logo");
  $titleLogo.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
  const user = JSON.parse(sessionStorage.getItem("user"));

  if (user && user.isLogin) {
    // 로그인이 된 상태
    $loginButtonTop.textContent = "로그아웃";
    $loginButtonTop.onclick = function () {
      // 로그아웃 로직 실행
      sessionStorage.removeItem("user"); // 세션스토리지에서 사용자 정보 삭제
      window.location.href = "./index.html"; // 메인 페이지로 이동
    };

    $signupButtonTop.textContent = "마이페이지";
    $signupButtonTop.onclick = function () {
      // 마이페이지로 이동
      window.location.href = "./mypage.html";
    };
  } else {
    // 로그인이 되지 않은 상태
    $loginButtonTop.onclick = function () {
      // 로그인 페이지로 이동
      window.location.href = "./login.html";
    };

    $signupButtonTop.onclick = function () {
      // 회원가입 페이지로 이동
      window.location.href = "./signup.html";
    };
  }
  //닉네임 서버에서 불러오기
  fetch("/users/mypage_info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member_id: user.id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.member_id);
      $nickname.textContent = data[0].member_id;
    })
    .catch((error) => {
      console.error(error);
    });
};

const $changePasswordButton = document.querySelector(".change-pw");
const user = JSON.parse(sessionStorage.getItem("user"));
$changePasswordButton.addEventListener("click", () => {
  let changePassword = prompt("변경할 비밀번호를 입력해주세요.");

  fetch("/users/passwd_update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      member_id: user.id,
      passwd: changePassword,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // or any other way to use 'data'
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    });
});
