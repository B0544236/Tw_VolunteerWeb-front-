// 解析網址上的參數
const params = new URLSearchParams(location.search);
const pid = params.get("pid");
console.log("pid", pid);
// TODO: 顯示商品
// 取得單一文件
// .doc('集合/文件id')
let giver = "";
let taker = "";

// 萬一點了登出
$("#loginBtn").click(function() {
  logout();
  Swal.fire({
    title: "登出成功",
    type: "success"
  });
  location.reload();
});

db.doc(`trades/${pid}`)
  .get()
  .then(function(doc) {
    console.log("doc", doc);
    const user = doc.data();
    console.log("user", user);

    // $("#userImageContainer").html(`<img class="w-75" src="${user.image}">`);
    $("#tradeInfoContainer").html(`<div>
    <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">點數轉讓紀錄ID</h1>
    <p class="lead pl-3">${doc.id}</p>
  </div>
</div>
            
            <p class="pb-1">給予(點數)者ID:         ${
              user.giver
            }<a class="btn btn-primary text-right ml-5" target="_blank" href="./product.html?pid=${user.giver}">觀看詳情</a></p> 
            <p class="pb-1">接收(點數)者ID:         ${
              user.taker
            }<a class="btn btn-primary text-right ml-5" target="_blank" href="./product.html?pid=${user.taker}">觀看詳情</a></p> </p>

            <p class="pb-1">交易點數數量:         ${user.points}</p>
            <p class="pb-1">日期:         ${user.trade_date}</p>
            <p class="pb-1">時間:         ${user.time}</p>

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
