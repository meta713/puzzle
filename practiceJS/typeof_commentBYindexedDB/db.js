$(function(){
  //データベースの設定
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  //DB格納用のグローバル変数
  var db = null;

  const DB_NAME = "AAA";
  const STORE_NAME = "AAA";
  const DB_VERSION = 2;

  //コメントボタンアクション（コメントの新規追加）
  $( "#submit" ).on( "click" , click );

  //コメント追加関数（bind ・ unbind 用に外部宣言）
  function click( e ){
    //編集用のテキストエリア変数の取得
    var textarea = document.getElementById("comment");

    //コメントが適正なら
    if(textarea.value.match(/[^ ]+/g)){
      var objectStore = db.transaction( STORE_NAME , "readwrite" ).objectStore( STORE_NAME );
      var request = objectStore.add({"name":textarea.value});
      request.onerror = function( e ){
        _db_error( e );
      };
      request.onsuccess = function( e ){
        var key = e.target.result;
        var li = document.createElement("li");
        li.id = key;
        li.innerHTML = "<a>" + textarea.value + "</a>";
        //liのクリックイベント設定
        li.addEventListener("click", function li_click( e ){
          var self = this;
          //テキストエリアに対して、編集用にコメントを格納
          textarea.value = self.children[0].textContent;
          //コメントボタンについてイベント追加（thisについての内容変更にイベントを変更する）
          $( "#submit" ).unbind().on("click" , function ( e ){
            //textareaのコメントの精査
            if(!textarea.value.match(/[^ ]+/g)){
              //コメントの削除処理
              console.log( "remove" );
              //DBに於いてのdata削除(keyはidから取得)
              _delete_data( db , self.id - 0 );
              //htmlに於いてのli削除
              self.remove();
            }else{
              //コメントの更新処理
              console.log( "update" );
              //DBに於いてdataの更新
              _update_data( db , self.id - 0 , textarea.value );
              //htmlに於いてliの更新
              self.children[0].textContent = textarea.value ;
            }
            $( this ).unbind(e).bind( "click" , click );
            textarea.value = "";
          });
        });

        //liをcomment-listに追加
        document.getElementById("comment-list").appendChild(li);
        textarea.value = "";
      };
    }
  }

  //DBの初期設定
  window.onload = function( e ){
    //DBに接続
    var request = indexedDB.open( DB_NAME , DB_VERSION );

    //DB作成
    request.onupgradeneeded = function( e ){
      console.log("dbの作成");
      e.currentTarget.result.createObjectStore( STORE_NAME , { keyPath: '_id', autoIncrement: true } );
    };

    //エラー処理
    request.onerror = function( e ){
      alert("DBに接続できませんでした");
      return;
    };

    //接続時
    request.onsuccess = function( e ){
      db = e.target.result;
      console.log("DB接続完了");

      //オブジェクトストアの生成
      var objectStore = db.transaction( STORE_NAME ).objectStore( STORE_NAME );
      //初期要素追加のcomment-listの取得
      var list = document.getElementById("comment-list");
      //フラグメントの生成
      var fragment = document.createDocumentFragment();
      //追加用のli格納用変数
      var li;
      //編集用のテキストエリア変数の取得
      var textarea = document.getElementById("comment");

      //カーソルの開始
      objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        //DBの要素が存在する場合
        if (cursor) {
          //フラグメントに要素の追加
          li = document.createElement("li");
          li.id = cursor.key;
          li.innerHTML = "<a>" + cursor.value.name + "</a>";
          //li要素にイベント追加
          li.addEventListener("click", function li_click( e ){
            var self = this;
            //テキストエリアに対して、編集用にコメントを格納
            textarea.value = self.children[0].textContent;
            //コメントボタンについてイベント追加（thisについての内容変更にイベントを変更する）
            $( "#submit" ).unbind().on("click" , function ( e ){
              //textareaのコメントの精査
              if(!textarea.value.match(/[^ ]+/g)){
                //コメントの削除処理
                console.log( "remove" );
                //DBに於いてのdata削除(keyはidから取得)
                _delete_data( db , self.id - 0 );
                //htmlに於いてのli削除
                self.remove();
              }else{
                //コメントの更新処理
                console.log( "update" );
                //DBに於いてdataの更新
                _update_data( db , self.id - 0 , textarea.value );
                //htmlに於いてliの更新
                self.children[0].textContent = textarea.value ;
              }
              $( this ).unbind(e).bind( "click" , click );
              textarea.value = "";
            });
          });
          fragment.appendChild(li);
          //既存のデータの削除
          //objectStore.delete(cursor.key);
          cursor.continue();
        }
        else {
          //完了時の処理
          list.appendChild(fragment);
        }
      };
    };

  };

  //値の削除
  function _delete_data( db , key ){
    //ストアの作成
    var store = db.transaction( STORE_NAME , "readwrite" ).objectStore( STORE_NAME );
    var request = store.delete(key);
    request.onerror = function( e ){
      _db_error(e);
    };
    request.onsuccess = function( e ){
    };
  }

  //値の更新
  function _update_data( db , key , comment ){
    //ストアの作成
    var store = db.transaction( STORE_NAME , "readwrite" ).objectStore( STORE_NAME );
    var request = store.get(key);
    request.onerror = function( e ){
      _db_error(e);
    };
    request.onsuccess = function( e ){
      var data = request.result;
      data.name = comment ;
      var requestUpdate = store.put(data);
      requestUpdate.onerror = function( e ){
        _db_error(e);
      };
      requestUpdate.onsuccess = function( e ){
      };
    };
  }

  function _db_error( e ){
    console.log( e );
    alert( "DBエラーです" );
  }

});

//値の登録
function _regist_data(){
}








/*
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var db = null;
var data;

//DBに接続
var request = indexedDB.open("testDB" , 2);
console.log(request);
//console.log(db);

request.onerror = function(event) {
  alert("エラー");
};
request.onsuccess = function(event) {
  db = event.target.result;
  var transaction = db.transaction(["books"], "readwrite");
  var objectStore = transaction.objectStore("books");
  //objectStore.delete(1);
  console.log(objectStore);
  var request = objectStore.get(0);
  request.onsuccess = function(e){
    console.log(e.target.result);
    var data = e.target.result;
    var div = document.createElement("div");
    div.id = data._id;
    div.innerHTML = data.name;
    window.document.body.appendChild(div);
  }
};
request.onupgradeneeded = function(event) {
  db = event.target.result;
  var store = db.createObjectStore("books",{
    keyPath : "_id" ,
    autoIncrement : true
  });
  console.log(store);
};

console.log(db);
console.log(data);
*/
/*request.onsuccess = function load(e){
  db = e.target.result;
    var store = db.createObjectStore("books",{
      keyPath : "_id" ,
      autoIncrement : true
    });
    console.log(store);
};
request.onerror = function unload(e){
  console.log(e);
  console.log("DBの接続に失敗しました");
};
*/
/*
console.log(db);

request = db.setVersion("1.0");
request.onsuccess = function(e){
  var store = db.createObjectStore("books",{
    keyPath : "_id" ,
    autoIncrement : true
  });
  console.log(e);
  console.log(store);
};
*/
