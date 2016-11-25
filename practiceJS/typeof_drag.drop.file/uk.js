//htmlにうんこ誕生
$(function(){
  //console.log(location);

  //うんこオブジェクトの生成
  //unnko_obj = new unnko();

  //ストレージを綺麗にする時に使用
  //localStorage.clear();

  //ストレージ内のdata吐き出し
  console.log(localStorage);

  //console.log(window.location.pathname);
  array_elem = Array.prototype.slice.call(document.getElementsByTagName("*"));
  //console.log(array_elem);
  image_elem = Array.prototype.slice.call(document.images);
  //console.log(image_elem);
  //image_elem[0].src = "jpg/bag.jpg";
  p_elem = document.getElementsByTagName("p");
  new_elem = document.createElement("div");
  elem_text = p_elem[0].innerHTML;
  new_elem.innerHTML = elem_text;
  //console.log(elem_text);
  parent_elem = p_elem[0].parentNode;
  //console.log(parent_elem);
  parent_elem.replaceChild(new_elem , p_elem[0]);
  //new_elem.parentNode.removeChild(new_elem);
  new_elem.innerHTML = "<h2 id='lll'>" + new_elem.innerHTML + "</h2>";
  var fragment = document.createDocumentFragment();
  for(var i = 0 ; i < 10 ; i++){
    var div = document.createElement("div");
    div.innerHTML = elem_text + i;
    div.id = "box"+i;
    div.draggable = true;
    div.addEventListener("click",function(){
      //console.log(this.innerHTML);
    },false);
    div.ondragstart = function (e){
      e.dataTransfer.setData("text/plain",this.innerHTML);
      e.dataTransfer.setData("text/html",this.innerHTML);
      e.dataTransfer.setData("text/uri-list",document.location.href);
      //console.log(e.dataTransfer);
    }
    fragment.appendChild(div);
  }
  var div = document.createElement("div");
  div.id = "network";
  div.innerHTML = "off";
  fragment.appendChild(div);
  div = document.createElement("div");
  div.id = "drophere";
  div.innerHTML = "Drop here";
  div.ondragover = function (e){
    for(var i = 0 ; i < e.dataTransfer.types.length ; i++){
      if(e.dataTransfer.types[i] === "text/plain"){
        e.preventDefault();
        break;
      }
    }
  };

  var ttt = document.getElementById("item");
  ttt.ondragover = function(e){
    e.preventDefault();
  };

  ttt.ondrop = function(e){
    if(e.dataTransfer.files.length){
      console.log("ファイルのドラッグを確認");
      console.log(e.dataTransfer.files[0]);
    }else{
      console.log("ファイル以外がドラッグされました");
    }
    e.preventDefault();
  };

  div.ondrop = function (e){
    e.preventDefault();
    var data = e.dataTransfer.getData("text/html");
    //console.log(data);
    this.innerHTML = "this is " + data;
    document.getElementById("modal-comment").innerHTML = data;
    this.classList.remove("drag");
  };
  div.ondragenter = function (e){
    this.classList.add("drag");
    //console.log(this)
  };
  div.ondragleave = function(e){
    this.classList.remove("drag");
  };
  fragment.appendChild(div);
  parent_elem.appendChild(fragment);

  var array_div = Array.prototype.slice.call(document.getElementsByClassName("site"));
  //console.log(array_div[0].classList);

  document.body.onload = updateline();
  document.body.ononline = updateline();
  document.body.onoffline = updateline();

  //console.log(navigator);

  var cont = document.getElementById("container");
  var hand = document.getElementById("handler");
  hand.draggable = true;

  container.ondragstart = function (e){
    e.dataTransfer.setData("text/html",this.innerHTML);
    e.dataTransfer.setData("text/plain","うんこ");
  };


  document.getElementById("sss").onchange = function(e){
    var reader = new FileReader();
    progBar.style.width = 0;
    if(e.target.files.length){
    var file = e.target.files[0];
    reader.onprogress = function(e){
      if(e.lengthComputable){
        var loaded = (e.loaded / e.total);
        progBar.style.width = progWrap.offsetWidth * loaded + "px";
      }
    };
    if(file.type.match(/image/g)){
      reader.readAsDataURL(file);
      reader.onload = function(e){
        var dataURL = this.result;
        document.body.style.background = "url(" + dataURL + ")";
        document.body.style.backgroundSize = "cover";
        localStorage.background = dataURL;
      };
  }
  };
};

  $("#modal-open").click( function(){
  	//キーボード操作などにより、オーバーレイが多重起動するのを防止する
  	$( this ).blur() ;	//ボタンからフォーカスを外す
  	if( $( "#modal-overlay" )[0] ) return false ;		//新しくモーダルウィンドウを起動しない (防止策1)
  	//if($("#modal-overlay")[0]) $("#modal-overlay").remove() ;		//現在のモーダルウィンドウを削除して新しく起動する (防止策2)

  	//オーバーレイを出現させる
  	$( "body" ).append( '<div id="modal-overlay"></div>' ) ;
  	$( "#modal-overlay" ).fadeIn( "slow" ) ;

  	//コンテンツをセンタリングする
  	centeringModalSyncer() ;

  	//コンテンツをフェードインする
  	$( "#modal-content" ).fadeIn( "slow" ) ;

  	//[#modal-overlay]、または[#modal-close]をクリックしたら…
  	$( "#modal-overlay,#modal-close" ).unbind().click( function(){

  		//[#modal-content]と[#modal-overlay]をフェードアウトした後に…
  		$( "#modal-content,#modal-overlay" ).fadeOut( "slow" , function(){

  			//[#modal-overlay]を削除する
  			$('#modal-overlay').remove() ;

  		} ) ;

  	} ) ;

  } ) ;

  //リサイズされたら、センタリングをする関数[centeringModalSyncer()]を実行する
  $( window ).resize( centeringModalSyncer ) ;

  	//センタリングを実行する関数
  	function centeringModalSyncer() {

  		//画面(ウィンドウ)の幅、高さを取得
  		var w = $( window ).width() ;
  		var h = $( window ).height() ;

  		// コンテンツ(#modal-content)の幅、高さを取得
  		// jQueryのバージョンによっては、引数[{margin:true}]を指定した時、不具合を起こします。
  //		var cw = $( "#modal-content" ).outerWidth( {margin:true} );
  //		var ch = $( "#modal-content" ).outerHeight( {margin:true} );
  		var cw = $( "#modal-content" ).outerWidth();
  		var ch = $( "#modal-content" ).outerHeight();

  		//センタリングを実行する
  		$( "#modal-content" ).css( {"left": ((w - cw)/2) + "px","top": ((h - ch)/2) + "px"} ) ;

  	}

    //ストレージ内のbackgroundデータの取得と背景の設定
    window.onload = function(){
      if(localStorage.background){
        document.body.style.background = "url(" + localStorage.background + ")";
        document.body.style.backgroundSize = "cover";
      }
    };
    //console.log(localStorage);
    //console.log(navigator);
});

function updateline(){
  var line = document.getElementById("network");
  line.innerHTML = navigator.onLine ? "network is on" : "network is off";
}

/******************
うんこ用のオブジェクト
******************/

/*****************
  オブジェクト作成
*****************/
unnko = function UK(){
  this.comment = [];
  this.number = 0;
  this.setEvent();
  this.list = {};
  this.list_num = 0;
  this.elem = uk;
}
// ************************
// 自身commentとnumberを更新
// ************************
unnko.prototype.update = function(comment){
  this.number++;
  this.comment.push(comment);
}

// ************
//  初期化処理
// ************
unnko.prototype.init = function(){
  this.list[this.list_num] = this.comment;
  this.number = 0;
  this.comment = [];
  this.list_num++;
}

// ***********************
//うんこ関係のイベント設定
// ***********************
unnko.prototype.setEvent = function(){
  var self = this;
  //そもそもbodyタグが存在しない場合、あるのだろうか...
  if(document.getElementsByTagName("body")[0] == null){
    var body = document.createElement("body");
    document.appendChild(body);
  }
  //jqueryを使っているのにこれは必要なのか...?
  self.area = document.body;
  self.area.style.width = "1000px";
  self.area.style.height = "1000px";
  self.area.style.position = "relative";
  //ヘッド・ボディのスタイルの調整
  $("head").append('<link rel="stylesheet" href="style.css">');
  //$("body").css({"width" : "1000px" , "height" : "1000px" , "position" : "relative"});
  //うんこのセットアップ
  //1:うんこの導入
  $("body").append("<img src='gif/unnko.gif' name='uk' style='position:absolute;width:30px;height:30px;top:0;left:0;'>");

  //マウス移動時のイベントの追加・うんこの移動に関して
  $("body").on("mousemove",function(e){
    self.mouseEvent( e , self );
  });

  //ボディに適応・うんこが喋る機能
  $("body").on("click",function (e){
    self.uk_speak( e , self );
  });

  //うんこのリサイズ機能・うんこオブジエクトの初期化処理に使用
  $("body").on("mouseout",function (e){
    self.uk_bomb( e , self );
  });

}

// *************************************************************************
//うんこのマウスイベントの設定、引数にはマウス自体のイベントが設定されている
// *************************************************************************
unnko.prototype.mouseEvent = function ( e , obj ){
  var self = obj;
  //マウスの動作の停止
  e.preventDefault();

  //マウスの座標を取得
  var mouseX = e.pageX;
  var mouseY = e.pageY;

  //結果の書き出し
  var ajust = (self.elem.style.width.replace(/\D/g , "") - 0) / 2;
  //imgの位置設定
  self.elem.style.left = mouseX - ajust + "px";
  self.elem.style.top = mouseY - ajust + "px";
  if( self.comment_elem !== undefined ){
    self.comment_elem.style.top = self.elem.style.top.match(/\d/g).join("") - ( 20 + ajust ) + "px";
    self.comment_elem.style.left = self.elem.style.left.match(/\d/g).join("") - ( 100 - ajust ) + "px";
  }
}

// *********************************************************************************************
//うんこのクリックイベントの設定、引数にはマウス自体のイベント・うんこオブジェクトを設定している
// *********************************************************************************************
unnko.prototype.uk_speak = function ( e , obj ){
  var self = obj;
  //マウス動作の停止
  e.preventDefault();
  if(document.getElementById("uk_comment") == null){
    $("body").append("<div class='balloon' id='uk_comment' style='position:absolute;'></div>");
    //console.log($("#uk_comment"));
    //self.comment_elem = $("#uk_comment");
    self.comment_elem = uk_comment;
  }
  //self.comment_elem.empty();
  self.comment_elem.innerHTML = "";
  var comment = ["ごあいさつ","うんこですwww","うふふふふ","残像だ...","俺だよおれおれ！！","鶏皮","マッスル","あぁ~"];
  var ajust = (self.elem.style.width.replace(/\D/g , "") - 0) / 2;
  var ukX = self.elem.style.left.match(/\d/g).join("");
  var ukY = self.elem.style.top.match(/\d/g).join("");
  //コメント用の乱数生成
  var rand = Math.floor( Math.random() * comment.length );
  self.comment_elem.append(comment[rand]);
  self.update(comment[rand]);
  self.comment_elem.style.left = ukX - ( 100 - ajust ) + "px";
  self.comment_elem.style.top = ukY - ( 20 + ajust ) + "px";
}

// ********************************
// うんこオブジェクトのリサイズ処理
// ********************************
unnko.prototype.uk_bomb = function ( e , obj ){
  var self = obj;
  //10pxずつの増分ゲット
  var size = self.elem.style.width.replace(/\D/g,"") - 0 + 10;
  //width・height増加処理
  self.elem.style.width = size + "px";
  self.elem.style.height = size + "px";

  if(size > 500){
    self.init();
    self.elem.style.width = 30 + "px";
    self.elem.style.height = 30 + "px";

    /*var div = document.createElement("div");
    var str = document.createTextNode("うんこ");
    div.appendChild(str);
    console.log(div.function);
    div.style.fontSize = 320 + "px";
    document.body.appendChild(div);
    */
  }
}


/*************************
過去の遺物

function uk_bomb(e){
  var elem_uk = $("img[name='uk']");
  var uk_width = elem_uk.css("width").replace(/\D/g,"") - 0 + 10;
  //console.log(uk_width);
  elem_uk.css({"width" : uk_width+"px" , "height" : uk_width+"px"});
  //elem_uk.css("display","none");
  //$("img[name='uk']").attr("src","gif/bomb.jpg")
  //画面サイズを超えたら初期化する
  unnko_obj.init();
  //console.log(unnko_obj);
}

// イベントの設定
//document.body.addEventListener( "click", mouseEvent ) ;
//document.body.addEventListener( "mousemove", mouseEvent ) ;
var mouseEvent = function( e ) {
	// 動作を停止
	e.preventDefault() ;
	// マウス位置を取得する
	var mouseX = e.pageX ;	// X座標
	var mouseY = e.pageY ;	// Y座標

	// 結果の書き出し
  var ajust = (uk.style.width.replace(/\D/g , "") - 0) / 2;
	uk.style.left = mouseX - ajust + "px";
	uk.style.top = mouseY - ajust  + "px";
  if(document.getElementById("uk_comment") !== null){
    uk_comment.style.top = uk.style.top.match(/\d/g).join("") - (20 + ajust) + "px";
    uk_comment.style.left = uk.style.left.match(/\d/g).join("") - (100 -ajust) + "px";
  }
} ;

function uk_speak(e){
  //マウス停止
  e.preventDefault() ;
  //コメントdivをbodyに追加、うんこに追加
  if(document.getElementById("uk_comment") == null){
    $("body").append('<div class="balloon" id="uk_comment" style="position:absolute;"></div>');
  }
  $("#uk_comment").empty();
  var comment = ["ごあいさつ","うんこですwww","うふふふふ","残像だ...","俺だよおれおれ！！","鶏皮","マッスル","あぁ~"];
  var ajust = (uk.style.width.replace(/\D/g , "") - 0) / 2;
  var mouseX =  uk.style.left.match(/\d/g).join("");	// X座標
	var mouseY = uk.style.top.match(/\d/g).join("");
  //乱数生成
  var rand = Math.floor( Math.random() * comment.length ) ;
  $("#uk_comment").append(comment[rand]);
  unnko_obj.update(comment[rand]);
  //コメントの位置調整
  uk_comment.style.left = mouseX - (100 -ajust) + "px";
  uk_comment.style.top = mouseY - (20 + ajust) + "px";
}


*/
