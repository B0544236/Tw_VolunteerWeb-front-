// 解析網址上的參數
const params = new URLSearchParams(location.search);
const pid = params.get("pid");
console.log("pid", pid);
// TODO: 顯示商品
// 取得單一文件
// .doc('集合/文件id')
let isVol = "";
let badge = "primary";

$("#loginBtn").click(function() {
  logout();
  Swal.fire({
    title: "登出成功",
    type: "success"
  });
  location.reload();
});
Test_render();
function Test_render() {
  DB.ref(`/users/${pid}`)
    .once("value")
    .then(function(docs) {
      const user = docs.val();
      console.log("user:", user);

      // console.log("這是userID", user.user_data.uid);
      // console.log("這是userName", user.user_data.name);
      // console.log("這是userCategory", user.Volunteer.v);

      //一樣，先來判別 是否為志工來決定badge
      let isVol = ""; //  待會要顯示的字
      let badge = "primary",
        badge_2 = "success";
      let isPay = "花點數請志工";

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

      if (isVol == "志工") {
        $("#userImageContainer").html(
          `<img class="w-75" src="${user.user_data.image}">`
        );
        $("#userInfoContainer").html(`<div>
            <h3  class="pb-1">${user.user_data.name}</h3>
            <p class="pb-1">ID:         ${pid}</p>
            <p  class="pb-1">身分:       <span class="badge badge-${badge}">
            ${isVol}</span>
            <span class="badge badge-${badge_2}">
            ${isPay}</span>
            </p>
            <p class="pb-1">Mail:         ${user.user_data.mail}</p>
            <p  class="pb-1">Phone:       ${user.user_data.phone}</p>
            <p  class="pb-1">line:       ${user.user_data.lineID}</p>
            <p class="pb-1">評分:         ${user.user_data.grade}</p>
            <p class="pb-1">計時器:     ${user.user_data.service_times}(分) 計一次          <button type="button" class="btn btn-primary ml-3" data-toggle="modal" data-target="#editModal">
            修改
          </button>
          </p> 
          <form onsubmit="timerformSend(event)" >
            <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">計時器時間修改</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
           </div>
           
          <div class="modal-body">
          
          <div class="form-group">
          <label for="timerInput">計時器間隔(分)</label>
          <input type="number" min="1" class="form-control" id="timerInput" placeholder=${user.user_data.service_times}>
          </div>
          
          </div>
          <div class="modal-footer">
          <div class="form-group">
                        <button id="sendFormBtn" type="submit" class="btn btn-primary btn-lg">save</button>
                    </div>
                    </div>
          
          
          </div>
          </div>
          </div>
          </form>
            <p  class="pb-1">地址:       ${user.user_data.region}</p>
            <p class="pb-1">點數數量:   ${user.user_data.points}沒這個欄位</p>
            

        </div>`);
      }
    })
    .catch(function(err) {});
}

//render(); 先不要讓他執行
function render() {
  db.doc(`users/${pid}`)
    .get()
    .then(function(doc) {
      console.log("doc", doc);
      const user = doc.data();
      console.log("user", user);

      if (user.is_Vol === "true") {
        isVol = "志工";
      } else {
        isVol = "一般人";
      }
      $("#userImageContainer").html(`<img class="w-75" src="${user.image}">`);
      $("#userInfoContainer").html(`<div>
            <h3  class="pb-1">${user.name}</h3>
            <p class="pb-1">ID:         ${pid}</p>
            <p  class="pb-1">身分:       ${isVol}</p>
            <p class="pb-1">計時器:     ${user.timer}(分) 計一次          <button type="button" class="btn btn-primary ml-3" data-toggle="modal" data-target="#editModal">
            修改
          </button>
          </p> 
          <form onsubmit="timerformSend(event)" >
            <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">計時器時間修改</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
           </div>
           
          <div class="modal-body">
          
          <div class="form-group">
          <label for="timerInput">計時器間隔(分)</label>
          <input type="number" min="1" class="form-control" id="timerInput" placeholder=${user.timer}>
          </div>
          
          </div>
          <div class="modal-footer">
          <div class="form-group">
                        <button id="sendFormBtn" type="submit" class="btn btn-primary btn-lg">save</button>
                    </div>
                    </div>
          
          
          </div>
          </div>
          </div>
          </form>
            <p  class="pb-1">地址:       ${user.address}</p>
            <p class="pb-1">點數數量:   ${user.points}</p>

        </div>`);
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
}

//  原本 版本
// function timerformSend(e) {
//   e.preventDefault();
//   // 取得表單內的名稱,價格,類型,備註存到一個物件裡
//   const user = {
//     timer: parseInt($("#timerInput").val())
//   };

//   db.doc(`users/${pid}`)
//     .update(user)
//     .then(function(doc) {
//       const user = doc.data();
//       user.timer = parseInt($("#timerInput").val);
//       // user.status = parseInt($("#timerInput").val); 沒辦法這樣
//     });
//   Swal.fire({
//     title: "UpDated!",
//     type: "success",
//     onClose: function() {
//       window.location = "/product.html?pid=" + `${pid}`;
//     }
//   });
// }

function timerformSend(e) {
  e.preventDefault();
  // 取得表單內的名稱,價格,類型,備註存到一個物件裡
  const user_data = {
    service_times: parseInt($("#timerInput").val) //這邊其實沒用到
  };

  DB.ref(`users/${pid}/user_data`)
    // .update(user_data)
    //parseInt($("#timerInput").val)
    .update({ service_times: parseInt($("#timerInput").val()) })
    .then(function(docs) {
      // console.log("123123123123");
      console.log(parseInt($("#timerInput").val()));
    });

  // db.doc(`users/${pid}`)
  //   .update(user)
  //   .then(function(doc) {
  //     const user = doc.data();
  //     user.timer = parseInt($("#timerInput").val());
  //     // user.status = parseInt($("#timerInput").val); 沒辦法這樣
  //   });

  Swal.fire({
    title: "UpDated!",
    type: "success",
    onClose: function() {
      window.location = "/product.html?pid=" + `${pid}`;
    }
  });
}
