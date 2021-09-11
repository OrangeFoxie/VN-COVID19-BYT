const apiCaBenh =
  "https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST";
const apiKhuVuc =
  "https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST";
const apiCaBenhTheoNgay =
  "https://api.apify.com/v2/key-value-stores/Tksmptn5O41eHrT4d/records/LATEST";

Promise.all([fetch(apiCaBenh), fetch(apiCaBenhTheoNgay)])
  .then(function (responses) {
    return Promise.all(
      responses.map(function (response) {
        return response.json();
      })
    );
  })
  .then(function (data) {
    // if(data), call main function to display results(data)
    window.onload = main(data);
  })
  .catch(function (error) {
    // if(!data), call error
    console.log(error);
  });

const cabenhArray = new Array(),
  cachliArray = new Array(),
  cachliCaNhiemArray = new Array(),
  cachliCaKhoiArray = new Array(),
  cachliCaTuVongArray = new Array();

function main(data) {
  bangCaBenh(data);
  CachLi(getCachli(data));
  BangCachLi(cachliArray);
  chartCaBenhTheoNgay();
  chartTongCaBenh();
}

// Bảng thông tin khu vực ca bệnh
function caBenh(khuvuc) {
  return [
    khuvuc.name,
    khuvuc.death,
    khuvuc.treating,
    khuvuc.cases,
    khuvuc.recovered,
    khuvuc.casesToday,
  ];
}

const getCaBenh = (data) => {
  cabenhArray.push(data[0]["detail"]);
  return [cabenhArray[0].map((khuvuc) => caBenh(khuvuc))];
};

const bangCaBenh = (data) => {
  let temp = "",
    d = getCaBenh(data)[0];
  d.forEach((cabenh, index) => {
    temp += `<tr>`;
    temp += `<td>${index + 1}</td>`;
    temp += `<td>${cabenh[0]}</td>`;
    temp += `<td>${cabenh[3]}</td>`;
    temp += `<td>${cabenh[1]}</td>`;
    temp += `<td>${cabenh[2]}</td>`;
    temp += `<td>${cabenh[4]}</td>`;
    temp += `<td>${cabenh[5]}</td>`;
    temp += `</tr>`;
    document.getElementById("tableCaBenh").innerHTML = temp;
  });
};

// Bảng thông tin ca bệnh theo ngày
const getCachli = (data) => {
  cachliCaNhiemArray.push(data[1]["canhiem"]);
  cachliCaKhoiArray.push(data[1]["cakhoi"]);
  cachliCaTuVongArray.push(data[1]["catuvong"]);
  return [cachliCaNhiemArray[0], cachliCaKhoiArray[0], cachliCaTuVongArray[0]];
};

const CachLi = (getCachLi) => {
  for (const key in cachliCaNhiemArray[0]) {
    if (
      cachliCaNhiemArray[0].hasOwnProperty.call(cachliCaNhiemArray[0], key) ===
        cachliCaKhoiArray[0].hasOwnProperty.call(cachliCaKhoiArray[0], key) &&
      cachliCaNhiemArray[0].hasOwnProperty.call(cachliCaNhiemArray[0], key) ===
        cachliCaTuVongArray[0].hasOwnProperty.call(cachliCaTuVongArray[0], key)
    ) {
      const canhiem = cachliCaNhiemArray[0][key];
      const cakhoi = cachliCaKhoiArray[0][key];
      const catuvong = cachliCaTuVongArray[0][key];
      cachliArray.push([
        [
          canhiem["day"].replace("-", "/"),
          canhiem["quantity"],
          cakhoi["quantity"],
          catuvong["quantity"],
        ],
      ]);
    }
  }
  return cachliArray;
};

function BangCachLi(cachliArray) {
  let temp = "",
    d = new Array(cachliArray);

  d[0]
    .slice()
    .reverse()
    .forEach((data, index) => {
      temp += `<tr>`;
      temp += `<td>${index + 1}</td>`;
      temp += `<td>${data[0][0]}</td>`;
      temp += `<td>${data[0][1]}</td>`;
      temp += `<td>${data[0][2]}</td>`;
      temp += `<td>${data[0][3]}</td>`;
      temp += `</tr>`;
    });
  document.getElementById("tableCaBenhTheoNgay").innerHTML = temp;
}

function chartTongCaBenh() {
  var ctx = document.getElementById("chartTongCaBenh").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: cabenhArray[0].map((khuvuc) => khuvuc["name"]),
      datasets: [
        {
          label: "Tổng ca bệnh",
          data: cabenhArray[0].map((khuvuc) => khuvuc["cases"]),
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
          hoverOffset: 20,
          // },
          // {
          //   label: "Ca tử vong",
          //   data: cabenhArray[0].map((khuvuc) => khuvuc["death"]),
          //   backgroundColor: [
          //     "rgba(255, 99, 132, 0.2)",
          //     "rgba(54, 162, 235, 0.2)",
          //     "rgba(255, 206, 86, 0.2)",
          //     "rgba(75, 192, 192, 0.2)",
          //     "rgba(153, 102, 255, 0.2)",
          //     "rgba(255, 159, 64, 0.2)",
          //   ],
          //   borderColor: [
          //     "rgba(255, 99, 132, 1)",
          //     "rgba(54, 162, 235, 1)",
          //     "rgba(255, 206, 86, 1)",
          //     "rgba(75, 192, 192, 1)",
          //     "rgba(153, 102, 255, 1)",
          //     "rgba(255, 159, 64, 1)",
          //   ],
          //   borderWidth: 2,
          // },
          // {
          //   label: "Ca bệnh đang điều trị",
          //   data: cabenhArray[0].map((khuvuc) => khuvuc["treating"]),
          //   backgroundColor: [
          //     "rgba(255, 99, 132, 0.2)",
          //     "rgba(54, 162, 235, 0.2)",
          //     "rgba(255, 206, 86, 0.2)",
          //     "rgba(75, 192, 192, 0.2)",
          //     "rgba(153, 102, 255, 0.2)",
          //     "rgba(255, 159, 64, 0.2)",
          //   ],
          //   borderColor: [
          //     "rgba(255, 99, 132, 1)",
          //     "rgba(54, 162, 235, 1)",
          //     "rgba(255, 206, 86, 1)",
          //     "rgba(75, 192, 192, 1)",
          //     "rgba(153, 102, 255, 1)",
          //     "rgba(255, 159, 64, 1)",
          //   ],
          //   borderWidth: 2,
          // },
          // {
          //   label: "Ca bệnh hồi phục",
          //   data: cabenhArray[0].map((khuvuc) => khuvuc["recovered"]),
          //   backgroundColor: [
          //     "rgba(255, 99, 132, 0.2)",
          //     "rgba(54, 162, 235, 0.2)",
          //     "rgba(255, 206, 86, 0.2)",
          //     "rgba(75, 192, 192, 0.2)",
          //     "rgba(153, 102, 255, 0.2)",
          //     "rgba(255, 159, 64, 0.2)",
          //   ],
          //   borderColor: [
          //     "rgba(255, 99, 132, 1)",
          //     "rgba(54, 162, 235, 1)",
          //     "rgba(255, 206, 86, 1)",
          //     "rgba(75, 192, 192, 1)",
          //     "rgba(153, 102, 255, 1)",
          //     "rgba(255, 159, 64, 1)",
          //   ],
          //   borderWidth: 2,
          // },
          // {
          //   label: "Số ca mới",
          //   data: cabenhArray[0].map((khuvuc) => khuvuc["casesToday"]),
          //   backgroundColor: [
          //     "rgba(255, 99, 132, 0.2)",
          //     "rgba(54, 162, 235, 0.2)",
          //     "rgba(255, 206, 86, 0.2)",
          //     "rgba(75, 192, 192, 0.2)",
          //     "rgba(153, 102, 255, 0.2)",
          //     "rgba(255, 159, 64, 0.2)",
          //   ],
          //   borderColor: [
          //     "rgba(255, 99, 132, 1)",
          //     "rgba(54, 162, 235, 1)",
          //     "rgba(255, 206, 86, 1)",
          //     "rgba(75, 192, 192, 1)",
          //     "rgba(153, 102, 255, 1)",
          //     "rgba(255, 159, 64, 1)",
          //   ],
          //   borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Tổng ca bệnh",
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function chartCaBenhTheoNgay() {
  var ctx = document.getElementById("chartCaBenhTheoNgay").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: cachliArray.map((x) => x[0][0]),
      datasets: [
        {
          label: "Số ca nhiễm",
          data: cachliArray.map((x) => x[0][1]),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 3,
        },
        {
          label: "Số ca khỏi",
          data: cachliArray.map((x) => x[0][2]),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 3,
        },
        {
          label: "Số ca tử vong",
          data: cachliArray.map((x) => x[0][3]),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 3,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
