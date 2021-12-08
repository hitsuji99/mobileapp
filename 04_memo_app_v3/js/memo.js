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
            Swal.fire({
                  title: "Memo app"
                , html : "Key、Memoはいずれも必須です。"
                , type : "error"
                , allowOutsideClick : false
            });
            return;
        } else {
            let w_msg = "LocalStorageに\n「" + key +" " + value + "」\nを保存(save)しますか？";
            Swal.fire({
                title:"Memo app"
              , html : w_msg
              , type : "question"
              , showCancelButton : true
            }).then(function(result) {
              //確認ダイアログで「OK」を押されたとき 保存する
              if(result.value === true) { 
                localStorage.setItem(key, value);
                viewStorage();  
                let w_msg = "LocalStorageに" + key + " " + value +"を保存しました。";
                Swal.fire({
                    title:"Memo app"
                  , html : w_msg
                  , type : "success"
                  , allowOutsideClick : false 
                });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
              }
            });
        }
    } ,false
  );
}

// 3.LocalStorageから選択されている行を削除 // viersion-up3 chg 1件削除 ==> 選択されている行を削除
function delLocalStorage() {
    const del = document.getElementById("del");
  del.addEventListener("click",
    function(e) {
      e.preventDefault();   //削除ボタンクリックしたら version-up4
      const chkbox1 = document.getElementsByName("chkbox1"); // version-up3 add
      const table1 = document.getElementById("table1"); // version-up3 add
      let w_cnt = 0; //選択されているチェックボックスの数が返却される // version-up3 w_sel="0" ==> w_cnt=0
      w_cnt = selectCheckBox("del");//テーブルからデータ選択  version-up2 chg:selectRadioBtn ==> selectCheckBox
      if(w_cnt >= 1 ) {  //version-up3 chg w_sel ==="1" ==> w_cnt >= 1
         let w_msg = "LocalStorageから" + w_cnt + "件を削除(delete)しますか？";
          Swal.fire({
            title:"Memo app"
              , html : w_msg
              , type : "question"
              , showCancelButton : true
          }).then(function(result) {
             //確認ダイアログで「OK」を押されたとき 削除する
            if(result.value === true) {  
              for(let i=0; i< chkbox1.length; i++) { //version-up3 add
                if(chkbox1[i].checked) { // version-up3 add
                      localStorage.removeItem(table1.rows[i+1].cells[1].firstChild.data); // version-up3 chg
                } //version-up3 add
               } //version-up3 add
               viewStorage();  
               let w_msg = "LocalStorageから" + w_cnt + "件を削除(delete)しました。";
               Swal.fire({
                 title:"Memo app"
                  , html : w_msg
                  , type : "success"
                  , allowOutsideClick : false 
                });
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
          }     
        });
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
    let w_confirm ="LocalStorageのデータをすべて削除(all clear)します。\nよろしいですか？";
    //確認ダイアログで「OK」を押されたとき、すべて削除する
      Swal.fire( {
        title:"Memo app"
          , html : w_confirm
          , type : "question"
          , showCancelButton : true
      }).then(function(result) {
        if(result.value === true) {  
            localStorage.clear();
            viewStorage();  //localStoorageからのデータの取得とテーブルへ表示
            let w_msg = "LocalStorageからのデータをすべて削除(all clear)しました。";
            Swal.fire({
              title:"Memo app"
              , html : w_msg
              , type : "success"
              , allowOutsideClick : false 
            });
            document.getElementById("textKey").value = "";
            document.getElementById("textMemo").value = "";
        }
      });
    },false
  );
};    

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

//テーブルからデータ選択
function selectCheckBox(mode) { //version-up2 chg:selectRadioBtn ==> selectCheckBox // version-up3 chg 引数：なし ==> mode
  //let w_sel = "0"; //選択されていれば、"1"にする  // version-up3 del
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

    document.getElementById("textKey").value = w_textKey;  // version-up2 add
    document.getElementById("textMemo").value = w_textMemo;  // version-up2 add
    //選択ボタンを押したときチェック
    if(mode === "select") {  // version-up3 add
      if(w_cnt === 1) {
        return w_cnt;
      }else{
          Swal.fire({
            title: "Memo app"
          , html : "1つ選択(select)してください。"
          , type : "error"
          , allowOutsideClick : false
        });
      } 
    }
  // 削除ボタンを押したときのチェック version-up3 add
    if(mode === "del") {  
      if(w_cnt >= 1) { 
        return w_cnt;   
      }else{
        Swal.fire({
        title: "Memo app"
          , html : "1つ以上選択(select)してください。"
          , type : "error"
          , allowOutsideClick : false
        }); 
      }
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