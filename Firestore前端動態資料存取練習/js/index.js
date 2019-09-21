//篩選器陣列
const city = [
  "臺北市",
  "新北市",
  "桃園市",
  "臺中市",
  "臺南市",
  "高雄市",
  "基隆市",
  "新竹市",
  "嘉義市",
  "新竹縣",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "臺東縣",
  "澎湖縣"
];

// storageInit();
// // //這邊每個頁面都要引用主程式，然後去localstate抓狀態來看看
// // //黨味登入的人直接進入
// // console.log(LoginState.state);
// if (LoginState.state == true) {
//   //什麼事都不做
// } else if (LoginState.state == false) {
//   //  直接回首頁，因此現在剩下跨業狀態的問題
//   window.location = "/";
// }

// 萬一點了登出
$("#loginBtn").click(function() {
  logout();
  Swal.fire({
    title: "登出成功",
    type: "success"
  });
  location.reload();
});

$("#cityselected").click(function(e) {
  e.preventDefault();
  $("#userRow").html("");
  // render(); // 先不要，因為這個是database not realtime
  $("#testRow").html(""); // 必須先清空
  Test_render(); // 沒有地點塞選
});

function Test_render() {
  DB.ref("/users")
    .once("value")
    .then(function(docs) {
      docs.forEach(function(doc) {
        const user = doc.val();

        // console.log("這是userID", user.user_data.uid);
        // console.log("這是userName", user.user_data.name);
        // console.log("這是userCategory", user.Volunteer.v);

        //一樣，先來判別 是否為志工來決定badge
        let isVol = ""; //  待會要顯示的字
        let badge = "primary",
          badge_2 = "success";
        let isPay = "花點數請志工";

        // let badge2 = "";
        if (user.Volunteer.v == 3 || user.Volunteer.v == 4) {
          isVol = "志工";
          badge = "danger";
        } else {
          isVol = "一般人";
        }
        //第二小標(申請資格)
        if (user.Volunteer.v == 1) {
          badge_2 = "danger";
          isPay = "不可請志工";
        } else if (user.Volunteer.v == 2 || user.Volunteer.v == 4) {
          badge_2 = "primary";
          isPay = "免費請志工";
        }
        $("#testRow").append(`<div class="col-md-4">
          <div class="card mb-3">
              <img class="card-img-top  " src="${user.user_data.image}" style="height: 40vh;"   >
              <div class="card-body">
                  <h4>${user.user_data.name}</h4>
                  <span class="badge badge-${badge}">
                      ${isVol}
                  </span>
                  <span class="badge badge-${badge_2}">
                      ${isPay}
                  </span>
                  <p>ID: ${user.user_data.uid}</p>
                  <a class="btn btn-primary" href="./product.html?pid=${user.user_data.uid}">觀看詳情</a>
              </div>
          </div>
      </div>`);
        // console.log(isVol);
      });
    })
    .catch(function(err) {});
}

//藉由篩選 來render
function render() {
  let selectedCity = "";
  let userCity = "";
  db.collection("users")
    .orderBy("createdAt", "desc")
    .get()
    .then(function(docs) {
      docs.forEach(function(doc) {
        const user = doc.data();
        // console.log(doc);
        console.log(doc.id);
        // console.log(user.id);
        let isVol = "";
        let badge = "primary";
        if (user.is_Vol === "true") {
          isVol = "志工";
          badge = "danger";
        } else {
          isVol = "一般人";
        }
        selectedCity = $("#CityFormControlSelect").val();
        // console.log(selectedCity);
        userCity = user.address.substr(0, 3);
        //切字串某段文字的方法  String.substr( Start , Length )
        // console.log(user.address.substr(0, 3));
        if (userCity.match(selectedCity) != null) {
          $("#userRow").append(`<div class="col-md-4">
        <div class="card mb-3">
            <img class="card-img-top" src="${user.image}">
            <div class="card-body">
                <h4>${user.name}</h4>
                <span class="badge badge-${badge}">
                    ${isVol}
                </span>
                <p>ID: ${doc.id}</p>
                <a class="btn btn-primary" href="./product.html?pid=${doc.id}">觀看詳情</a>
            </div>
        </div>
    </div>`);
        } else if (selectedCity == "all") {
          $("#userRow").append(`<div class="col-md-4">
          <div class="card mb-3">
              <img class="card-img-top" src="${user.image}">
              <div class="card-body">
                  <h4>${user.name}</h4>
                  <span class="badge badge-${badge}">
                      ${isVol}
                  </span>
                  <p>ID: ${doc.id}</p>
                  <a class="btn btn-primary" href="./product.html?pid=${doc.id}">觀看詳情</a>
              </div>
          </div>
      </div>`);
        }
      });
    })
    .catch(function(err) {
      console.log("[catch]");
      // 發生錯誤無法取得資料
      console.log(err);
    });
}
// TODO: 顯示所有商品
// 取得在products集合內所有資料
// db.collection("users")
//   .orderBy("createdAt", "desc")
//   .get()
//   .then(function(docs) {
//     // 成功取得資料
//     docs.forEach(function(doc) {
//       const user = doc.data();
//       user.ID = doc.id;
//       let isVol = "";
//       let badge = "primary";
//       // doc.ID = user.id;  這樣無法增加那個欄位
//       if (user.is_Vol === "true") {
//         isVol = "志工";
//         badge = "danger";
//       } else {
//         isVol = "一般人";
//       }
//       console.log(user);
//       $("#userRow").append(`<div class="col-md-4">
//                 <div class="card mb-3">
//                     <img class="card-img-top" src="${user.image}">
//                     <div class="card-body">
//                         <h4>${user.name}</h4>
//                         <span class="badge badge-${badge}">
//                             ${isVol}
//                         </span>
//                         <p>ID: ${user.ID}</p>
//                         <a class="btn btn-primary" href="./product.html?pid=${
//                           user.ID
//                         }">觀看詳情</a>
//                     </div>
//                 </div>
//             </div>`);
//     });
//   })
//   .catch(function(err) {
//     console.log("[catch]");
//     // 發生錯誤無法取得資料
//     console.log(err);
//   });
