// lay du lieu tu localStorage
const userList = JSON.parse(localStorage.getItem("userList")) || [];
// lay cac phan tu can dung
const form = document.getElementById("sign-in-form");
const msg = document.getElementById("msg");
const loginValidation = document.getElementById("login-validation"); // khung chua thong bao loi ko dc bo trong
const emailBlank = document.querySelector(".email-cannot-blank"); // hien loi email
const passwordBlank = document.querySelector(".password-cannot-blank"); // hien loi password

const LoginToast = document.getElementById("login-toast"); // khung thong bao dang nhap thanh cong
const LoginError = document.getElementById("login-error"); // khung thong bao dang nhap that bai
const closeBtn = document.querySelector(".close-btn"); // nut dong thong bao
// chay khi bam nut sign in
form.addEventListener("submit", function (e) {
  e.preventDefault(); // ngan chan form submit tai lai trang
  // lay gia tri nguoi dung nhap vao
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // an cac thong bao loi cu va khung thong bao loi
  loginValidation.classList.add("hidden");
  emailBlank.classList.add("hidden");
  passwordBlank.classList.add("hidden");
  LoginToast.classList.add("hidden");
  LoginError.classList.add("hidden");
  msg.classList.remove("show"); // bo class show de an khung thong bao loi

  let isValid = true; // co danh dau du lieu hop le hay khong

  //email trong
  if (email === "") {
    emailBlank.classList.remove("hidden");
    isValid = false;
  }
  // mat khau trong
  if (password === "") {
    passwordBlank.classList.remove("hidden");
    isValid = false;
  }

  //co loi hien khung loi roi return
  if (!isValid) {
    loginValidation.classList.remove("hidden");
    msg.classList.add("show");
    return;
  }

  // tim user khop vs ca email va password
  // dung find
  const result = userList.find(
    (u) => u.email === email && u.password === password,
  );
  // khong tim thay hoac sai mat khau
  if (!result) {
    LoginError.classList.remove("hidden");
    msg.classList.add("show");
    return;
  }
  // damg nhap thanh con luu user dang nhap sang dashbroad
  // doi object thanh chuoi vi localstorage chi luu duoc chuoi
  localStorage.setItem("userLoggedIn", JSON.stringify(result));
  LoginToast.classList.remove("hidden"); // hien dang nhap thanh cong
  msg.classList.add("show");
  alert("đăng nhập thành công");
  // sang trang dashborad
  window.location.href = "dashboard.html";
});

closeBtn.addEventListener("click", function () {
  loginValidation.classList.add("hidden");
  msg.classList.remove("show");
});
