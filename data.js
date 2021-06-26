const apiCaBenh = 'https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST';
const apiKhuVuc = 'https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST';
const apiCachLi = 'https://api.apify.com/v2/key-value-stores/Tksmptn5O41eHrT4d/records/LATEST';

Promise.all([
    fetch(apiCaBenh),
    fetch(apiKhuVuc)
  ]).then(function (responses) {
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    getCaBenh(data);
    getKhuVuc(data);  
    getNameKV(caBenhArr,khuVucArr);
    BangThongTin(caBenhArr);
  }).catch(function (error) {
    console.log(error);
  });


  

const caBenhArr = new Array();
const khuVucArr = new Array();

    function getCaBenh(data) {
        caBenhArr.push(data[0]['detail']);
        return caBenhArr;
    }

    function getKhuVuc(data) {
        khuVucArr.push(data[1]['key']);
        return khuVucArr;
    }

    function getNameKV(caBenhArr,khuVucArr){
        
        for(var i=0; i<caBenhArr[0].length;i++){          
          for(var j =0; j<khuVucArr[0].length;j++){
            if(caBenhArr[0][i]['hc-key']===khuVucArr[0][j]['hec-key']){
              caBenhArr[0][i]['name'] = khuVucArr[0][j]['name'];
              // console.log(caBenhArr[0][i]['name'],caBenhArr[0][i]['hc-key'],khuVucArr[0][j]['hec-key']);
            }
          }
        }
    }

    function BangThongTin(caBenhArr) {
        let temp = "";
            temp += `<tr>`;  
            temp += `<th>ID</>`;            
            temp += `<th>Khu vực</>`;            
            temp += `<th>Số ca khỏi</>`;            
            temp += `<th>Số ca đang điều trị</>`;            
            temp += `<th>Số ca tử vong</>`;            
            temp += `<th>Tổng ca bệnh</>`;            
            temp += `</th>`;

        data = caBenhArr[0];
        data.forEach((itemData) => {
            temp += `<tr>`;
            temp += `<td class="txtcenter">${itemData['hc-key']}</td>`;
            temp += `<td>${itemData['name']}</td>`;
            temp += `<td class="txtcenter">${itemData['socakhoi']}</td>`;
            temp += `<td class="txtcenter">${itemData['socadangdieutri']}</td>`;
            temp += `<td class="txtcenter">${itemData['socatuvong']}</td>`;
            temp += `<td class="txtcenter">${itemData['value']}</td>`;
            temp += `</tr>`;
        });
        document.getElementById('datatable').innerHTML = temp;
    }
