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
  // render();
  $("#testRow").html(""); // 必須先清空
  Test_render();
});

function Test_render() {
  // 志工有地址，所以要塞選
  let selectedCity = $("#CityFormControlSelect").val();
  let userCity = "";
  DB.ref("/users")
    .once("value")
    .then(function(docs) {
      docs.forEach(function(doc) {
        const user = doc.val();
        userCity = user.user_data.region;
        userCity = userCity.substr(0, 3); // 取縣市就好
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
          //第二小標(申請資格)
          if (user.Volunteer.v == 1) {
            badge_2 = "danger";
            isPay = "不可請志工";
          } else if (user.Volunteer.v == 2 || user.Volunteer.v == 4) {
            badge_2 = "primary";
            isPay = "免費請志工";
          }

          if (userCity.match(selectedCity) != null) {
            $("#testRow").append(`<div class="col-md-4">
          <div class="card mb-3">
              <img class="card-img-top" src="${user.user_data.image}" style="height: 40vh;">
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
          } else if (selectedCity == "all") {
            //如果選到顯示全部
            $("#testRow").append(`<div class="col-md-4" >
          <div class="card mb-3">
              <img class="card-img-top" src="${user.user_data.image}" style="height: 40vh;">
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
          }
        }
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
      // 成功取得資料
      docs.forEach(function(doc) {
        const user = doc.data();
        user.ID = doc.id;
        let isVol = "";
        let badge = "primary";
        // doc.ID = user.id;  這樣無法增加那個欄位
        if (user.is_Vol === "true") {
          isVol = "志工";
          badge = "danger";

          selectedCity = $("#CityFormControlSelect").val();
          // console.log(selectedCity);
          userCity = user.address.substr(0, 3);
          //切字串某段文字的方法  String.substr( Start , Length )
          console.log(user);
          if (userCity.match(selectedCity) != null) {
            $("#userRow").append(`<div class="col-md-4">
                <div class="card mb-3">
                    <img class="card-img-top" src="${user.image}">
                    <div class="card-body">
                        <h4>${user.name}</h4>
                        <span class="badge badge-${badge}">
                            ${isVol}
                        </span>
                        <p>ID: ${user.ID}</p>
                        <a class="btn btn-primary" href="./product.html?pid=${user.ID}">觀看詳情</a>
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
        }
      });
    })
    .catch(function(err) {
      console.log("[catch]");
      // 發生錯誤無法取得資料
      console.log(err);
    });
}
