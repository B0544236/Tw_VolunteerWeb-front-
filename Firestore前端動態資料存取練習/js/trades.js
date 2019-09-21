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

db.collection("trades")
  //   .orderBy("createdAt", "desc")
  .get()
  .then(function(docs) {
    // 成功取得資料
    docs.forEach(function(doc) {
      const user = doc.data();

      //   user.ID = doc.id;
      //   let isVol = "";
      //   let badge = "primary";
      // doc.ID = user.id;  這樣無法增加那個欄位

      console.log(user);
      $("#tradesRow").append(`
        <tr >
        <td >
        ${doc.id}
        </td>
        <td >
        ${user.giver}
        </td>
        <td class="">${user.trade_date}</td>
        <td>
        <a class="btn btn-primary text-right" href="./tradeData.html?pid=${doc.id}">觀看詳情</a>
        </td>
      </tr>
     `);
    });
  })
  .catch(function(err) {
    console.log("[catch]");
    // 發生錯誤無法取得資料
    console.log(err);
  });

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

const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});

const ctx2 = document.getElementById("myChart2").getContext("2d");
//資料標題
const labels = ["年輕人", "老人", "中年人"];
const pieChart = new Chart(ctx2, {
  type: "pie",
  data: {
    labels: labels,
    datasets: [
      {
        //預設資料
        data: [10, 65, 25],
        backgroundColor: [
          //資料顏色
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)"
        ]
      }
    ]
  }
});
