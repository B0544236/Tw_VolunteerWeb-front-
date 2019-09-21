// 網頁的主程式寫在這裡
let account = "test00187@gmail.com";
let password = "12345678";

//設定localStorage的名稱
const storage = localStorage;
const storageName = "LoginState"; //怕之後寫錯
// 預設購物車是一個空白的陣列
let LoginState = "";

const login = {
  state: false
};

function storageInit() {
  // 判斷在本地端儲存內有沒有shoppnigCart的資訊
  if (storage.getItem(storageName)) {
    // 如果資料存在，就設定購物車的資料是過去存過的資料
    LoginState = JSON.parse(storage.getItem(storageName));
    console.log("已存過:", LoginState.state);
    //  這是後來發現的狀況，萬一登入後進其他頁面，再回首頁，這邊不會是logout紐
    if (LoginState.state) {
      console.log("現在是有登入喔");
      $("#loginBtn").html("Logout");
      $("#dataPage").html("資料管理");
      $("#dataPage").attr("href", "./data-index.html");
    }
  } else {
    //不然的話就先設定loginState物件 state:false
    storage.setItem(storageName, JSON.stringify(login));
  }
  // console.log("購物車初始化完成:", LoginState);
}

function logout() {
  // 清空
  login.state = false;
  // 把購物車更新到storage
  storage.setItem(storageName, JSON.stringify(login));
}
// login.state = true;

// 讓瀏覽器等待文件載入完成後，再執行以下的流程
$(document).ready(function(e) {
  storageInit();
  // 瀏覽器已把文件載入完成...
  //   e.preventDefault();
  // 綁定導覽列按鈕的點擊事件
  $(".navbar .nav-link, #goBackBtn").click(function() {
    // 印出「這個」被點擊的按鈕
    // console.log(this);
    // 取得移動的目標
    // 把被點擊的.nav-link的href屬性的值擷取出來
    // 並儲存到變數target內
    var target = $(this).attr("href");
    console.log(target);

    // 取得目標的座標
    // target => #移動目標的id
    var targetPosition = $(target).offset().top;
    // console.log(targetPosition);

    // 取得導覽列的高度
    // 把.navbar的高度儲存到navbarHeight變數裡
    var navbarHeight = $(".navbar").outerHeight();
    // console.log(navbarHeight);

    // 設定動畫的時間 2000=>2秒
    var duration = 500;

    // (停止)並執行動畫
    // .stop() 停止動畫
    // .animate({}, 動畫時間) 執行動畫
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: targetPosition - navbarHeight
        },
        duration
      );
  });

  //   console.log($("#loginBtn").html());
  //    Login按鈕:  這邊寫好 Login改logout、Modal隱藏邏輯
  $("#loginBtn").click(function() {
    if ($("#loginBtn").html() == "Login") {
      $("#loginBtn").attr("data-target", "#exampleModal");
      //   $("#exampleModal").modal("show");
    } else if ($("#loginBtn").html() == "Logout") {
      //   $("#exampleModal").modal("hide");
      $("#loginBtn").attr("data-target", "");
      $("#loginBtn").html("Login");
      $("#dataPage").html("");
      $("#dataPage").attr("href", "");
      // login.state = false;
      // // 把登入狀態物件的state屬性:fasle更新到storage
      // storage.setItem(storageName, JSON.stringify(login));
      logout();
      Swal.fire({
        title: "登出成功",
        type: "success"
      });
      //
      //   $("#dataPage").html("資料管理");
      //   $("#dataPage").attr("href", "./layout.html");
    }
  });

  //    Modal帳密送出
  $("#loginForm").submit(function(e) {
    // $("#exampleModal").modal("hide");
    e.preventDefault();
    //  如果登入成功
    if (
      $("#exampleInputEmail1").val() == account &&
      $("#exampleInputPassword1").val() == password
    ) {
      console.log("登入成功");
      login.state = true;
      storage.setItem(storageName, JSON.stringify(login));
      Swal.fire({
        title: "登入成功",
        type: "success"
      });
      $("#loginBtn").text("Logout");
      //   $("#loginForm").html(""); 這寫法會當掉
      $("#dataPage").html("資料管理");
      $("#dataPage").attr("href", "./data-index.html");
      $("#exampleModal").modal("hide");
    } else {
      console.log("帳密錯誤");
      Swal.fire({
        title: "帳密輸入錯誤",
        type: "error"
      });
      $("#loginBtn").text("Login");
    }
    // console.log($("#exampleInputEmail1").val());
    // console.log($("#exampleInputPassword1").val());
  });
});

// console.log($("#exampleInputEmail1").val());

// $("#buttonFinish").click(function(e) {
//   e.preventDefault();
//   console.log($("#exampleInputEmail1").val());
//   console.log($("#exampleInputPassword1").val());
// });

// $("#loginForm").submit(function(e) {
//   e.preventDefault();
//   console.log($("#exampleInputEmail1").val());
//   console.log($("#exampleInputPassword1").val());
//   //   //   //   if (
//   //   //   //     $("#exampleInputEmail1").val() == account &&
//   //   //   //     $("#exampleInputPassword1").val() == password
//   //   //   //   ) {
//   //   //   //     console.log("登入成功");
//   //   //   //   } else {
//   //   //   //     console.log("登入失敗");
//   //   //   //   }
// });
