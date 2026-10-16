// lay du lieu localStorage
const userList = JSON.parse(localStorage.getItem("userList")) || [];

// lay cac phan tu can dung
const form = document.getElementById("add-new-user-form");

const msg = document.getElementById("msg");
const addToast = document.getElementById("add-toast");
const addError = document.getElementById("add-error");
const backBtn = document.querySelector(".back-btn");

// tu dong sinh ma user (khong trung nhau) va hien thi vao o User code
const userCode = "U" + Date.now();
document.getElementById("user-code").value = userCode;

// an tat ca thong bao
function hideAllMessages() {
  addToast.classList.add("hidden");
  addError.classList.add("hidden");
  msg.classList.remove("show");

  // an tung dong loi ben trong
  const errors = addError.children;
  for (let i = 0; i < errors.length; i++) {
    errors[i].classList.add("hidden");
  }
}

// hien 1 dong loi theo class
function showError(className) {
  addError.classList.remove("hidden");
  document.querySelector("." + className).classList.remove("hidden");
  msg.classList.add("show");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  hideAllMessages();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;
  const birthday = document.getElementById("dob").value;
  const status = document.querySelector('input[name="status"]:checked').value;
  const description = document.querySelector(".description-text-input").value.trim();

  let isValid = true;

  // username, email, password khong duoc de trong
  if (username === "" || email === "" || password === "") {
    showError("email-username-password-empty");
    isValid = false;
  }

  // password toi thieu 8 ky tu (chi bao khi password da nhap)
  if (password !== "" && password.length < 8) {
    showError("password-min-length-error");
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // them user moi
  const newUser = {
    usercode: userCode,
    username: username,
    email: email,
    password: password,
    role: role,
    birthday: birthday,
    status: status,
    description: description,
  };

  userList.push(newUser);  // nếu muốn thêm user mới lên đầu tiên thì dùng unshift thay vì push userList.unshift(newUser);
  localStorage.setItem("userList", JSON.stringify(userList));

  // thong bao thanh cong roi ve dashboard
  addToast.classList.remove("hidden");
  msg.classList.add("show");

    window.location.href = "dashboard.html";

});

// nut Back quay lai trang user management
backBtn.addEventListener("click", function () {
  window.location.href = "dashboard.html";
});
