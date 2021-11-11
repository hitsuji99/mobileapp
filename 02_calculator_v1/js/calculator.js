'use strict';
//ページ上の要素(Element)を参照
const elementSelect = document. getElementById("calcType");
const elementNum1 = document. getElementById("num1");
const elementNum2 = document. getElementById("num2");
const elementResult = document. getElementById("result");
//イベントを登録
elementSelect.addEventListener("change",update);
elementNum1.addEventListener("change",update);
elementNum2.addEventListener("change",update);

//関数updateを作り、処理を纏め
function update() {
    //計算結果を求める
    const result = calculate(
        Number(elementNum1.value),
        Number(elementNum2.value),
        elementSelect.value
       );
//両面に表示
elementResult.innerHTML = result;
}
//関数を作ります、処理をまとめる
function calculate(num1,num2,calcType){
    let result;
//計算の種類で処理
switch(calcType){
    case "type-add":
        result= num1 + num2;
        break;
    case "type-substract":
        result= num1 - num2;
        break;
    case "type-multiply":
        result= num1 * num2; 
        break;
    case "type-divide":
        result= num1 / num2;   
        break;
 }
 return result;
}

