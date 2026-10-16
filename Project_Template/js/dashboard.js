// lay du lieu localStorage 
let userList = JSON.parse(localStorage.getItem("userList")) || [];
// lay phan tu body
let tBody = document.getElementById("table-body");
// hien thi bang tu du lieu user trong local
function renderUsers() {
    tBody.innerHTML = ""; // xoa du lieu cu 
    //duyet tung phan tu cua mang 
    userList.forEach((u) => {
    // nếu muốn đổi ngược thứ tự hiển thì dùng    for (let i = userList.length - 1; i >= 0; i--) {
     // let user = userList[i];
    let statusClass = "deactive"
    if (u.status === "Active") {
        statusClass = "active"
    }

    let tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${u.usercode}</td>
    <td>${u.username}</td>
    <td>${u.email}</td>
    <td class="uppercase">${u.role}</td>
    <td>${u.birthday}</td>
    <td>
    <span class="status-cell ${statusClass}">
        <span class="dot"></span>${u.status}
    </span>
    </td>
    <td>
    <i id="${u.usercode}" class="fa-solid fa-trash"></i>    
    <i id="${u.usercode}" class="fa-solid fa-pen"></i>    
    </td>
    `;

    tBody.appendChild(tr); // dua tr vao tbody gan vao cuoi bang
});
}
// goi lai ham 1 lan de trang hien lai bang 
renderUsers();
// bam vao icon trong bang 
tBody.addEventListener("click", function(e) {
    // bam icon thung rac de xoa dung taget
    if (e.target.classList.contains("fa-trash")) {
        let deleteID = e.target.id; // id cua icon = user can xoa  
        if (confirm("Bạn có chắc muốn xoá người dùng này không?")) {
            let deleteIndex = userList.findIndex((u) =>u.usercode === deleteID);
            // splice xoa 1 phan tu tai vi tri do khoi mang 
            userList.splice(deleteIndex, 1);
            // luu lai vao local
            localStorage.setItem("userList", JSON.stringify(userList));
            // ve lai bang dong vua xoa bien mat
            renderUsers();
        }
    }
    // bam icon sang cay but de sang trang edit
    if (e.target.classList.contains("fa-pen")) {
        //luu user can sua sang trang edit
        localStorage.setItem("editUserCode", e.target.id);
        window.location.href = "edit-user.html";
    }
});
    