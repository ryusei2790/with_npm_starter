// "use strict";
document.addEventListener('DOMContentLoaded', function() {
    let countryItems = ["中華", "イタリアン", "和食", "アメリカ"];
    const selectCountryButton = document.getElementById("selectCountryButton");
    let country = document.getElementById("country");
    let number = 0;

    console.log(countryItems);
    console.log(selectCountryButton);
    console.log(country);
    console.log(number);

    selectCountryButton.addEventListener("click", function(){
        console.log("クリックされました");
        let number = Math.floor(Math.random() * countryItems.length);
        //結果を記録して同じのは出ないようにしたい
        console.log("結果取得", number);
        alert(countryItems[number]);
    });
});