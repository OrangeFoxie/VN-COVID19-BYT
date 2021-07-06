const apiCaBenh = 'https://api.apify.com/v2/key-value-stores/ZsOpZgeg7dFS1rgfM/records/LATEST';
const apiKhuVuc = 'https://api.apify.com/v2/key-value-stores/p3nS2Q9TUn6kUOriJ/records/LATEST';
const apiCachLi = 'https://api.apify.com/v2/key-value-stores/Tksmptn5O41eHrT4d/records/LATEST';

Promise.all([
    fetch(apiCaBenh),
    fetch(apiKhuVuc),
    fetch(apiCachLi)
  ]).then(function (responses) {
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) { // if(data), call data
    window.onload = main(data);
  }).catch(function (error) { // if(!data), call error
    console.log(error);
  });


  

const caBenhArr = new Array();
const khuVucArr = new Array();
const cachLiArr = new Array();
const clCaNhiem = new Array();
const clCaKhoi = new Array();
const clCaTuVong = new Array();

    function main(data){  //Void main
      getCaBenh(data);
      getKhuVuc(data);  
      getCachLi(data);
      getNameKV(caBenhArr,khuVucArr);
      getNgayCachLi(clCaNhiem,clCaKhoi,clCaTuVong);
      BangThongTin(caBenhArr);
      BangCachLi(clCaNhiem);
    }

    function getCaBenh(data) {
        caBenhArr.push(data[0]['detail']);
        return caBenhArr;
    }

    function getKhuVuc(data) {
        khuVucArr.push(data[1]['key']);
        return khuVucArr;
    }

    function getNameKV(caBenhArr,khuVucArr){
        
      for(var i=0; i<caBenhArr[0].length;i++){    caBenhArr[0][i]['stt'] = i+1;      
        for(var j =0; j<khuVucArr[0].length;j++){
          if(caBenhArr[0][i]['hc-key']===khuVucArr[0][j]['hec-key']){
            caBenhArr[0][i]['name'] = khuVucArr[0][j]['name'].replaceAll("-"," ");
          }
        }
      }
    }
    function getCachLi(data) {
      cachLiArr.push(data);
      clCaKhoi.push(cachLiArr[0][2]['cakhoi']);
      clCaNhiem.push(cachLiArr[0][2]['canhiem']);
      clCaTuVong.push(cachLiArr[0][2]['catuvong']);      
      return (clCaKhoi,clCaNhiem,clCaTuVong);
    } 

    function getNgayCachLi(clCaNhiem,clCaKhoi,clCaTuVong){
      for(var i = 0; i < clCaNhiem[0].length; i++){ clCaNhiem[0][i]['stt'] = i+1;
        for(var j = 0; j < clCaKhoi[0].length; j++){
          for(var k = 0; k < clCaTuVong[0].length; k++){
            if(clCaNhiem[0][i]['day'] === clCaKhoi[0][j]['day'] && clCaNhiem[0][i]['day'] === clCaTuVong[0][k]['day']){
              clCaNhiem[0][i]['cakhoi'] = clCaKhoi[0][j]['quantity'];
              clCaNhiem[0][i]['catuvong'] = clCaTuVong[0][k]['quantity'];      
            }
          }
        }
      }
    }

    function checkNameKV(nameKV){
      if(nameKV){        
        return nameKV;
      }else{
        return nameKV="mất dấu khu vực";
      }
    }

    function BangThongTin(caBenhArr) {
        let temp = "";

        data = caBenhArr[0];
        data.forEach((itemData) => {
            temp += `<tr>`;
            temp += `<td>${itemData['stt']}</td>`;
            temp += `<td>${itemData['hc-key']}</td>`;
            temp += `<td>${checkNameKV(itemData['name'])}</td>`;
            temp += `<td>${itemData['socakhoi']}</td>`;
            temp += `<td>${itemData['socadangdieutri']}</td>`;
            temp += `<td>${itemData['socatuvong']}</td>`;
            temp += `<td>${itemData['value']}</td>`;
            temp += `</tr>`;
        });
        document.getElementById('datatable').innerHTML = temp;
    }

    function BangCachLi(clCaNhiem) {
      let temp = "";

      data = clCaNhiem[0];
      data.forEach((itemData) => {
          temp += `<tr>`;
          temp += `<td>${itemData['stt']}</td>`;
          temp += `<td>${itemData['day']}</td>`;
          temp += `<td>${itemData['quantity']}</td>`;
          temp += `<td>${itemData['cakhoi']}</td>`;
          temp += `<td>${itemData['catuvong']}</td>`;
          temp += `</tr>`;
      });
      document.getElementById('datatableCL').innerHTML = temp;
  }