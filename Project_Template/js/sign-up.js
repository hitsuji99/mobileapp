// lay du lieu localStorage
const userList = JSON.parse(localStorage.getItem("userList")) || [];
const form = document.getElementById("sign-up-form"); // lay the form dang ky
const msg = document.getElementById("msg"); // khung chua thong bao 
const validation = document.getElementById("sign-up-validation"); // khung chua thong bao loi
const emailError = document.getElementById("email-cannot-blank"); // hien loi email
const userError = document.getElementById("username-cannot-blank"); // hien loi username
const passwordError = document.getElementById("password-cannot-blank"); // hien loi password

//regex kiem tra email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/; // regex kiem tra username
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // regex kiem tra password 
// chay khi bam nut sign up
form.addEventListener("submit", function (event) {
  event.preventDefault(); // ngan chan form submit tai lai trang
  // lay gia tri nguoi dung nhap vao
  const email = document.getElementById("email").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  // reset cac loi 
  // xoa loi cu (innerText = "") va an khung thong bao loi
  emailError.innerText = '';
  userError.innerText = '';
  passwordError.innerText = '';
  validation.classList.add("hidden");
  msg.classList.remove("show");
  let isValid = true; // co danh dau du lieu hop le hay khong
  const checkEmail = userList.find((u) => u.email === email); // kiem tra email da ton tai chua 
  //email sai dinh dang
  if (!emailRegex.test(email)) {
    emailError.innerText = "Email không hợp lệ";
    isValid = false;
  }

// user sai dinh dang 
  if (!usernameRegex.test(username)) {
    userError.innerText = "Username không hợp lệ";
    isValid = false;
  }
  // password sai dinh dang 
  if (!passwordRegex.test(password)) {
    passwordError.innerText ="password không hợp lệ"; 
    isValid = false;
  }

// co loi thi thi hien khung thong bao loi
  if (!isValid) {
    validation.classList.remove("hidden");
    msg.classList.add("show");
    return;
  }

  // dang ky thanh cong, luu du lieu vao localStorage
  const newUser = {
    usercode: "U" + Date.now(), // tao usercode tu dong
    email: email,
    username: username,
    password: password,
    role: "user",
    birthday: "",
    status: "Active",
    description: "",
  };
  userList.push(newUser);
  localStorage.setItem("userList", JSON.stringify(userList));
  // hien thong bao dang ky thanh cong
  msg.classList.add("show");
  alert("Đăng ký thành công! Vui lòng đăng nhập để tiếp tục.");
  // chuyen ve trang login
    window.location.href = "./sign-in.html";
});