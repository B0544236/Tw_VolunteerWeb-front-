// 解析網址上的參數
const params = new URLSearchParams(location.search);
const pid = params.get("pid");
console.log("pid", pid);
// TODO: 顯示商品
// 取得單一文件
// .doc('集合/文件id')
let isVol = "";
let badge = "primary";

// 萬一點了登出
$("#loginBtn").click(function() {
  logout();
  Swal.fire({
    title: "登出成功",
    type: "success"
  });
  location.reload();
});

db.doc(`contracts/${pid}`)
  .get()
  .then(function(doc) {
    console.log("doc", doc);
    const user = doc.data();
    console.log("user", user);

    // $("#userImageContainer").html(`<img class="w-75" src="${user.image}">`);
    $("#contractInfoContainer").html(`<div>
    <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">合約ID</h1>
    <p class="lead pl-3">${user.contract_id}</p>
  </div>
</div>
            
            <p class="pb-1">受照顧者ID:         ${user.be_cared}</p>
            <p class="pb-1">照護員ID:         ${user.server}</p>
            <p class="pb-1">開始編號:         ${user.start_number}</p>
            <p class="pb-1">開始日期:         ${user.start_date}</p>
            <p class="pb-1">開始時間:         ${user.start_time}</p>
            <p class="pb-1">結束編號:         ${user.end_number}</p>
            <p class="pb-1">結束日期:         ${user.end_date}</p>
            <p class="pb-1">結束時間:         ${user.end_time}</p>
            <p  class="pb-1">地址:       ${user.address}</p>

        </div>
        `);
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });

// function formSend(e) {
//   e.preventDefault();
//   // 取得表單內的名稱,價格,類型,備註存到一個物件裡
//   const user = {
//     timer: parseInt($("#timerInput").val())
//   };

db.doc(`users/${pid}`)
  .update(user)
  .then(function(doc) {
    const user = doc.data();
    user.timer = parseInt($("#timerInput").val);
  });
Swal.fire({
  title: "UpDated!",
  type: "success",
  onClose: function() {
    window.location = "/product.html?pid=" + `${pid}`;
  }
});
