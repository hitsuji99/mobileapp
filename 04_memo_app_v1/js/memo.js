"use strict"

//ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
function() {

    //4.localStorageが使えるか確認
    if(typeof localStorage === "undefined") {
        window.alert("このブラウザはlocal Storage機能が実装されていません");
        return;
    } else {
        viewStorage();       // localStorageからのデータの取得とテーブルへ表示
        saveLocalStorage(); //2.localStorageへの保存
        delLocalStorage();  //3.LocalStorageから１件削除
        allClearLocalStorage(); //4.LocalStorageから全て削除
        selectTable();      //5.データ選択
    }
  }
);

//2.localStorageへの保存
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
    function(e) {
        e.preventDefault();
        const key = document.getElementById("textKey").value;
        const value = document.getElementById("textMemo").value;

        //値の入力チェック
        if(key=="" || value=="") {
            window.alert("Key,Memoはいずれも必須です。");
            return;
        } else {
            let w_confirm = confirm("LocalStorageのデータを保存(save)しますか？");
            //確認ダイアログで「OK」を押されたとき 保存する version-up1 add
            if(w_confirm === true) { //version-up1 add
              localStorage.setItem(key, value);
              viewStorage();       // localStorageからのデータの取得とテーブルへ表示
              let w_msg = "LocalStorageに" + key + " " + value +"を保存しました。";
              window.alert(w_msg);
              document.getElementById("textKey").value = "";
              document.getElementById("textMemo").value = "";
            }
       } 
    } ,false
  );
}

//5.データ選択
function selectTable() {
  const select = document.getElementById("select");
  select.addEventListener("click",
  function(e) {
    e.preventDefault;
    selectCheckBox("select");//テーブルからデータ選択 // viersion-up3 chg 引数：なし==>"select"
    },false
  );
};

//3.LocalStorageから１件削除
function delLocalStorage() {
  const del = document.getElementById("del");
  del.addEventListener("click",
function(e) {
  e.preventDefault();
  let w_sel = "0"; //選択されていれば、"1"が返却される
  w_sel = selectCheckBox();//テーブルからデータ選択  version-up2 chg:selectRadioBtn ==> selectCheckBox

  if(w_sel ==="1") {
    const key = document.getElementById("textKey").value;
    const value = document.getElementById("textMemo").value;
  let w_confirm = confirm("LocalStorageのデータを削除(delete)しますか？");
  //確認ダイアログで「OK」を押されたとき 削除する version-up1 add
  if(w_confirm === true) { //version-up1 add
    localStorage.removeItem(key);
    viewStorage();//localStoorageからのデータの取得とテーブルへ表示
    let w_msg = "LocalStorageから" + key + " " + value +"削除しました";
    window.alert(w_msg);
              document.getElementById("textKey").value = "";
              document.getElementById("textMemo").value = "";
          }
        }
    },false
  );
};

//4.LocalStorageから全て削除
function allClearLocalStorage() {
  const allClear = document.getElementById("allClear");
  allClear.addEventListener("click",
  function(e) {
    e.preventDefault();
    let w_confirm = confirm("LocalStorageのデータをすべて削除(all clear)します。\nよろしいですか？");
    //確認ダイアログで「OK」を押されたとき、すべて削除する
    if(w_confirm === true) {
      localStorage.clear();
      viewStorage();  //localStoorageからのデータの取得とテーブルへ表示
      let w_msg = "LocalStorageのデータをすべて削除(all clear)しました。";
      window.alert(w_msg);
      document.getElementById("textKey").value = "";
      document.getElementById("textMemo").value = "";
      }
    },false
  );
};    

//テーブルからデータ選択
function selectCheckBox() { //version-up2 chg:selectRadioBtn ==> selectCheckBox
  let w_sel = "0"; //選択されていれば、"1"にする
  let w_cnt = 0 ; //選択されているチェックボックスの数 // version-up2 add
  const chkbox1 = document.getElementsByName("chkbox1");
  const table1 = document.getElementById("table1");
  let w_textKey = ""; // work version-up2 add
  let w_textMemo = ""; // work version-up2 add

  for(let i=0; i< chkbox1.length; i++) { // version-up2 chg: radio1 ==> chkbox1
    if(chkbox1[i].checked) {  // version-up2 chg: radio1 ==> chkbox1
      if(w_cnt === 0) {  // 最初にチェックされている行をワークに退避 version-up2 add
        w_textKey = table1.rows[i+1].cells[1].firstChild.data; // version-up2 add document.getElementById("textKey").value ==> w_textKey
        w_textMemo = table1.rows[i+1].cells[2].firstChild.data; // version-up2 add document.getElementById("textMemo").value ==> w_textMemo
      //return w_sel = "1";  version-up2 del
      }// vesion-up2 add
      w_cnt++; //選択されているチェックボックスの数をカウント version-up2 add
    }
  }
  
w_textKey = document.getElementById("textKey").value = "";  // version-up2 add
w_textMemo = document.getElementById("textMemo").value = "";  // version-up2 add
if(w_sel === 1) { //version-up2 add
  const key = document.getElementById("textKey").value;   // version-up2 add
  const value = document.getElementById("textMemo").value;    // version-up2 add
let w_confirm = confirm("LocalStorageのデータを1つ選択(select)してください。");   // version-up2 add
  window.alert("1つ選択(select)してください。");    // version-up2 add
} 
};
// localStorageからのデータの取得とテーブルへ表示
function viewStorage() {
  const list = document.getElementById("list");
  // htmlのテーブル初期化
  while(list.rows[0] ) list.deleteRow(0);

  //localStorageすべての情報の取得
  for (let i=0; i < localStorage.length; i++) {
    let w_key = localStorage.key(i);

    //localStorageのキーと値を表示
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2= document.createElement("td");
    let td3 = document.createElement("td");
    list.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    td1.innerHTML = "<input name='chkbox1'  type='checkbox'>";  //version-up2 chg: radio1 ==> chkbox1
    td2.innerHTML = w_key;
    td3.innerHTML =localStorage.getItem(w_key);
  }
  // jQueryのplugin tablesorterを使ってテーブルのソート
  // sortList: 引数1...最初からソートしておく列を指定、引数２...0…昇順,1…降順
  $("#table1").tablesorter({    //tablesort add
    sortList: [[1,0]]           //tablesort add
  });                           //tablesort add
  $("#table1").trigger("update"); //tablesort add
};