const apiUrl1 = "https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST?fbclid=IwAR1UCKt-lM0mITqxyalzx-XdQ3cFYX51Il_7kU0X79sS5LDZwdIp7FFPAxg";
const apiUrl2 = "https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST?fbclid=IwAR1o7kdFhs5VHsR2q1m5EBhIG0cCSyLHg8D8xpbtSKKvngtpSUWMGWWGn5c";



Promise.all([
  fetch(apiUrl1),
  fetch(apiUrl2)
]).then(function (responses) {
  return Promise.all(responses.map(function (response) {
    return response.json();
  }));
}).then(function (data) {
  showCaBenh(data);
  showKhuVuc(data);

  report(data, showCaBenh, showKhuVuc);

}).catch(function (error) {
  console.log(error);
});

                          // cb, kv
function mergeArrayObjects(arr1, arr2) { 
  let i = 0;
  let merge = new Array();
  let a3 = new Array();
  
  for (i;i < arr1.length;i++) {
    if (arr1[i][4] === arr2[i][1]) {
      a3 = arr1[i].concat(arr2[i]); 
      merge.push({...a3});
      console.log(a3);
    } 
  }
  return merge;

  // while (i < arr1.length) {
  //   if (arr1[i]["hec_key"] === arr2[i]["hec_key"]) {
  //     a3 = arr1[i].concat(arr2[i]);
  //     merge.push({...a3});
  //   }
  //   i+=1;
  //   console.log(a3);
  // }
  // return merge;

}


const cabenh = new Array();
const khuvuc = new Array();

function showCaBenh(data) {

  for (let i = 0; i < data[0]["detail"].length; i++) {
    const socakhoi = data[0]["detail"][i]["socakhoi"];
    const socadangdieutri = data[0]["detail"][i]["socadangdieutri"];
    const socatuvong = data[0]["detail"][i]["socatuvong"];
    const tongca = data[0]["detail"][i]["value"];
    const id = data[0]["detail"][i]["hc-key"].toString();

    let arr = new Array(socakhoi, socadangdieutri, socatuvong, tongca, id);
    cabenh.push(arr);
  }
}

function showKhuVuc(data) {

  for (let i = 0; i < data[1]["key"].length; i++) {
    const name = data[1]["key"][i]["name"];
    const id = data[1]["key"][i]["hec-key"].toString();

    let arr = new Array(name, id);
    khuvuc.push(arr);
  }
}

function report(arr1, arr2, arr3) {
  let cb = cabenh;
  let kv = khuvuc;
  let p = mergeArrayObjects(cb, kv);

  const th = `        
    <tr id="j1">
      <th>ID</th>
      <th>ID</th>
      <th>Khu vực</th>
      <th>Số ca khỏi</th>
      <th>Số ca đang điều trị</th>
      <th>Số ca tử vong</th>
      <th>Tổng số ca</th>
    </tr>`;
  const tb = p.map(d => {
    return `
      <tr>
        <td class="txtcenter">${d[4]}</td>
        <td class="txtcenter">${d[6]}</td>
        <td>${d[5]}</td>
        <td class="txtcenter">${d[0]}</td>
        <td class="txtcenter">${d[1]}</td>
        <td class="txtcenter">${d[2]}</td>
        <td class="txtcenter">${d[3]}</td>
      </tr>
    `
  }).join("");
  document.getElementById("app").innerHTML = th+tb;
}