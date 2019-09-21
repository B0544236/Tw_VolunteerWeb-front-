// TODO: 顯示所有商品
// 取得在products集合內所有資料

// 萬一點了登出
$("#loginBtn").click(function() {
  logout();
  Swal.fire({
    title: "登出成功",
    type: "success"
  });
  location.reload();
});

$(function() {
  $(".dates .datetimepicker").datepicker({
    format: "yyyy-mm-dd ",
    autoclose: true,
    lang: "zh"
  });
});

let satartDate = "";
let endDate = "";
$("#DateSelectBtn").click(function(e) {
  // 如果不是空白(undefined)

  console.log("到底是不是沒輸入?", !$("#usr1").val());
  if (!$("#usr1").val() || !$("#usr2").val()) {
    Swal.fire({
      title: "請務必選擇日期",
      type: "error"
    });
  } else {
    e.preventDefault();
    $("#contractsRow").html("");
    render();
  }
});
function render() {
  let selectedCity = "";
  let userCity = "";

  console.log(selectedCity);
  // 選擇的日期
  startDate = $("#usr1").val();
  endDate = $("#usr2").val();
  console.log("起始、終止日期", startDate, endDate);
  // console.log(typeof startDate);
  //  改成毫秒
  startDate = new Date(startDate).getTime();
  endDate = new Date(endDate).getTime();
  console.log("起始、終止日毫秒", startDate, endDate);
  db.collection("contracts")
    //   .orderBy("createdAt", "desc")
    .get()
    .then(function(docs) {
      // 成功取得資料
      docs.forEach(function(doc) {
        const user = doc.data();
        let user_StDate = "";
        let user_endDate = "";
        // 塞選的地點
        selectedCity = $("#CityFormControlSelect").val();
        // console.log(selectedCity);
        // 合約的地點
        userCity = user.address.substr(0, 3);
        console.log(selectedCity, userCity);
        //  合約轉毫秒
        //  這邊格式已經連日期、時間一起加入，並轉毫秒了，到時只要塞選那邊改(加入時間)就行
        user_StDate = new Date(
          user.start_date + " " + user.start_time
        ).getTime();
        //  console.log("讓俺看看", user.end_date + " " + user.end_time);
        //  這邊格式已經連日期、時間一起加入，並轉毫秒了，到時只要塞選那邊改(加入時間)就行
        user_endDate = new Date(user.end_date + " " + user.end_time).getTime();
        console.log("合約的起始、終止日期", user_StDate, user_endDate);
        //   user.ID = doc.id;
        //   let isVol = "";
        //   let badge = "primary";
        // doc.ID = user.id;  這樣無法增加那個欄位
        if (user_StDate >= startDate && user_endDate <= endDate) {
          console.log(user);
          //如果吻合
          if (userCity.match(selectedCity) != null) {
            $("#contractsRow").append(`
      <tr >
      <td >
      ${user.contract_id}
      </td>
      <td >
      ${user.be_cared}
      </td>
      <td class="">${user.start_date}</td>
      <td>
      <a class="btn btn-primary text-right" href="./contractData.html?pid=${
        doc.id
      }">觀看詳情</a>
      </td>
    </tr>
   `);
          }
          // 如果選顯示全部，全印
          else if (selectedCity == "all") {
            $("#contractsRow").append(`
          <tr >
          <td >
          ${user.contract_id}
          </td>
          <td >
          ${user.be_cared}
          </td>
          <td class="">${user.start_date}</td>
          <td>
          <a class="btn btn-primary text-right" href="./contractData.html?pid=${
            doc.id
          }">觀看詳情</a>
          </td>
        </tr>
       `);
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
//   <thead>
//   <tr>
//     <th>產品名稱</th>
//     <th class="text-right">單價</th>
//     <th class="text-right">數量</th>
//     <th class="text-right">總計</th>
//   </tr>
// </thead>
// <tbody id="cartTableBody"></tbody>
// <tfoot id="cartTableFoot"></tfoot>

{
  /* <table class="table table-hover">
  <caption>悬停表格布局</caption>
  <thead>
    <tr>
      <th>名称</th>
      <th>城市</th>
      <th>邮编</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Tanmay</td>
      <td>Bangalore</td>
      <td>560001</td>
    </tr>
    <tr>
      <td>Sachin</td>
      <td>Mumbai</td>
      <td>400003</td>
    </tr>
    <tr>
      <td>Uma</td>
      <td>Pune</td>
      <td>411027</td>
    </tr>
  </tbody>
</table>; */
}
