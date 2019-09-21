// TODO: 綁定新增產品表單的送出事件
// 萬一點了登出
$("#loginBtn").click(function() {
  logout();
  Swal.fire({
    title: "登出成功",
    type: "success"
  });
  location.reload();
});

$("#createUserForm").submit(function(e) {
  // 準備要新增的資料
  const newUser = {
    name: $("#userName").val(),
    timer: parseInt($("#userTimer").val()),
    image: $("#userImage").val(),
    is_Vol: $("#userCategory").val(),
    address: $("#city").val() + $("#userAddress").val(),
    points: parseInt($("#userPoints").val()),
    createdAt: new Date()
    //  這邊new Date().getTime()可以取得毫秒
  };
  console.log("newUser", newUser);
  // 把資料新增到資料庫
  db.collection("users")
    .add(newUser)
    .then(function(res) {
      console.log("res:", res);
      console.log(res.id);
      newUser.ID = res.id;
      Swal.fire({
        title: "會員已經建立",
        text: "請前往首頁",
        type: "success",
        onClose: function() {
          // 會在swal被關閉時觸發
          // 引導user到首頁
          window.location = "/";
        }
      });
    })
    .catch(function(err) {
      console.log(err);
      Swal.fire({
        title: "Error",
        type: "error"
      });
    });
});
