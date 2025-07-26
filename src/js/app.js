// // "use strict";
// document.addEventListener('DOMContentLoaded', async function() {
//     console.log("DOM読み込み完了");
  
//     // 3秒待つPromise関数
//     function delay(ms) {
//       return new Promise(resolve => setTimeout(resolve, ms));
//     }
  
//     // 非同期関数で待機
//     await delay(30000);
  
//     const overlay = document.getElementById('loadingOverlay');
//     overlay.style.display = 'none';
//     console.log("オーバーレイ非表示");
//   });

document.addEventListener('DOMContentLoaded', function() {
    let countryItems = ["中華", "イタリアン", "和食", "アメリカ"];
    const selectCountryButton = document.getElementById("selectCountryButton");
    let country = document.getElementById("selectedCountry");
    let number = 0;
    let selectedIndexes = [];

    console.log(countryItems);
    console.log(selectCountryButton);
    console.log(country);
    console.log(number);

    selectCountryButton.addEventListener("click", function(){
        console.log("クリックされました");
        let number = Math.floor(Math.random() * countryItems.length);
        //結果を記録して同じのは出ないようにしたい
        console.log("結果取得", number);
        // alert(countryItems[number]);
        selectedIndexes.push(number);//ここの値を出力結果のランダム性に反映させたい
        const result = countryItems[number];
        country.textContent = result;
        console.log('結果取得：', result);
    });
});




$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    focusOnSelect: true
  });