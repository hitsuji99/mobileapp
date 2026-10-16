// lay du lieu localStorage
const userList = JSON.parse(localStorage.getItem("userList")) || [];

// lay cac phan tu can dung
const form = document.getElementById("edit-user-form");

const msg = document.getElementById("msg");
const editToast = document.getElementById("edit-toast");
const editError = document.getElementById("edit-error");
const backBtn = document.querySelector(".back-btn");

const userCodeInput = document.getElementById("user-code");
const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const roleSelect = document.getElementById("role");
const dobInput = document.getElementById("dob");
const descriptionInput = document.querySelector(".description-text-input");

// lay ma user can sua (dashboard da luu vao localStorage)
const code = localStorage.getItem("editUserCode");

// tim user can sua
const user = userList.find((u) => u.usercode === code);

// khong tim thay thi quay ve dashboard
if (!user) {
  window.location.href = "dashboard.html";
}

// do du lieu cua user vao form
userCodeInput.value = user.usercode;
usernameInput.value = user.username;
emailInput.value = user.email;
passwordInput.value = user.password;
roleSelect.value = user.role;
dobInput.value = user.birthday;
descriptionInput.value = user.description;

if (user.status === "Active") {
  document.getElementById("status-active").checked = true;
} else {
  document.getElementById("status-deactive").checked = true;
}

// an tat ca thong bao
function hideAllMessages() {
  editToast.classList.add("hidden");
  editError.classList.add("hidden");
  msg.classList.remove("show");

  const errors = editError.children;
  for (let i = 0; i < errors.length; i++) {
    errors[i].classList.add("hidden");
  }
}

// hien 1 dong loi theo class
function showError(className) {
  editError.classList.remove("hidden");
  document.querySelector("." + className).classList.remove("hidden");
  msg.classList.add("show");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  hideAllMessages();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  let isValid = true;

  // username, password khong duoc de trong
  if (username === "" || password === "") {
    showError("username-and-password-empty");
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

  // luu thong tin moi (usercode va email giu nguyen)
  user.username = username;
  user.password = password;
  user.role = roleSelect.value;
  user.birthday = dobInput.value;
  user.status = document.querySelector('input[name="status"]:checked').value;
  user.description = descriptionInput.value.trim();

  localStorage.setItem("userList", JSON.stringify(userList));

  // thong bao thanh cong roi ve dashboard
  editToast.classList.remove("hidden");
  msg.classList.add("show");

  window.location.href = "dashboard.html";
});

// nut Back quay lai trang user management
backBtn.addEventListener("click", function () {
  window.location.href = "dashboard.html";
});
