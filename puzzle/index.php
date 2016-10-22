<!DOCTYPE html>
<html>
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>THE PUZZLE</title>
      
      <?php 
      session_start();
      if(isset($_POST["username"])){
          $_SESSION["username"] = $_POST["username"];
      }
      if(!isset($_POST["username"]) || $_SESSION["username"] == ""){
      ?>

      <!-- Latest compiled and minified CSS -->
      <link rel="stylesheet" href="assets/lib/bootstrap/css/bootstrap.min.css" />
      <!-- Optional theme -->
      <link rel="stylesheet" href="assets/lib/bootstrap/css/bootstrap-theme.css" />
      <script src="assets/lib/jquery-1.12.1.min.js"></script>
      <!-- Latest compiled and minified JavaScript -->
      <script src="assets/lib/bootstrap/js/bootstrap.min.js"></script>
      <!-- underscore.js -->
      <script src="assets/lib/underscore-min.js"></script>
      <script src="assets/scripts/login.js"></script>
   </head>
   <body>

     <div class="container">
       <div id="loginbox" style="margin-top:50px;" class="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <div class="panel panel-info" >
          <div class="panel-heading">
            <div class="panel-title">THE PUZZLE LOGIN</div>
            </div>
            <div style="padding-top:30px" class="panel-body" >
              <div style="display:none" id="login-alert" class="alert alert-danger col-sm-12"></div>
              <form id="loginform" class="form-horizontal" role="form" method="post" action="">
              <div style="margin-bottom: 25px" class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                <input id="login-username" type="text" class="form-control" name="username" value="" placeholder="PUZZLER NAME">
              </div>
              <div style="margin-bottom: 25px" class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                <input id="login-password" type="password" class="form-control" name="password" placeholder="PUZZLER PASSWORD">
              </div>
              <div style="margin-bottom: 25px" class="" id="error"></div>
              <div style="margin-top:10px" class="form-group">
                <!-- Button -->
                <div class="col-sm-12 controls">
                  <button id="btn-login" class="btn btn-success">START PUZZLE!</button>
                </div>
              </div>
              </form>
            </div>
        </div>
       </div>
     </div>
   </body>
   <?php
      }else{
   ?>
    <!-- Latest compiled and minified CSS -->
      <!-- Latest compiled and minified JavaScript -->
      <!-- underscore.js -->
      <script src="assets/lib/jquery-1.12.1.min.js"></script>
      <script src="assets/scripts/login.js"></script>
      <style>
          .wall {
              background-color: black ;
              color: black ;
          }
          .road {
              background-color: white ;
              color : white;
          }
          pre {
              padding: 6px;
              font-size: 5px;
              height: 800px;
          }
          span {
              margin: 0;
              padding: 5px;
          }
          .now {
              background-color: red;
              color: blue;
          }
          .goal {
              background-color: yellowgreen;
              color: red;
          }
          .body {
              width : auto;
              height: auto;
          }
          .box {
              width: 100%;
              height: 50%;
          }
      </style>
   </head>
   <body>
       <div class="box">
       <pre id="pz"><?php
           function generateMaze($width = 55 , $height = 55){
               $width = floor($width / 2) * 2 + 1;
               $height = floor($height / 2) * 2 + 1;
               $maze = array();
               for($y = 0 ; $y < $height ; $y++){
                   $maze[$y] = array();
                   for($x = 0 ; $x < $width ; $x++){
                       $maze[$y][$x] = 0;
                       if($x == 0 || ($x == ($width -1)) ||
                               $y == 0 || ($y == ($height -1))){
                           $maze[$y][$x] = 1;
                       }
                   }
               }
               $UDLR = [[0,-1],[0,1],[-1,0],[1,0]];
               for($y = 2 ;$y < $height-2 ; $y += 2){
                   for($x = 2 ; $x < $width-2 ; $x += 2){
                       $maze[$y][$x] = 1;
                       $r = $UDLR[mt_rand(0, 3)];
                       $y2 = $y + $r[0];
                       $x2 = $x + $r[1];
                       $maze[$y2][$x2] = 1;
                   }
               }
               $maze[1][1] = 0;
               $maze[53][53] = 0;
               return $maze;
           }
           
           function drawMaze($maze){
               $pat = array();
               $pat[0] = "<span class='road'>0</span>";
               $pat[1] = "<span class='wall'>1</span>";
               $html = "";
               for($y = 0 ; $y < count($maze) ; $y++){
                   for($x = 0 ; $x < count($maze) ; $x++){
                       $html .= $pat[$maze[$y][$x]];
                   }
                   $html .= "\n";
               }
               return $html;
           }
           $maze = generateMaze(55 ,55);
           echo drawMaze($maze);
           ?>
       </pre>
       </div>
   </body>
   
   <script type="text/javascript">
       $("#pz").find("span:eq(56)").html("P").addClass("now");
       $("#pz").find("span:eq(2968)").html("G").addClass("goal");
       //$("#pz").find("span:eq(2968)").html("G").addClass("goal");
	// ------------------------------------------------------------
	// キーボードの入力を監視するコンストラクタ関数
	// ------------------------------------------------------------
	function InputKeyboard(){

		// ------------------------------------------------------------
		// プライベートな変数
		// ------------------------------------------------------------
		var _input_key_buffer = null;

		// ------------------------------------------------------------
		// プライベートな関数
		// ------------------------------------------------------------
		function KeyDownFunc (e){
			_input_key_buffer[e.keyCode] = true;
		}
		function KeyUpFunc (e){
			_input_key_buffer[e.keyCode] = false;
		}
		function BlurFunc (e){
			_input_key_buffer.length = 0;
		}

		// ------------------------------------------------------------
		// キーコードを指定して入力状態を取得する
		// ------------------------------------------------------------
		this.isDown = function (key_code){
			if(_input_key_buffer[key_code])	return true;
			return false;
		};

		// ------------------------------------------------------------
		// 解放する
		// ------------------------------------------------------------
		this.release = function (){
			if(window.removeEventListener){
				document.removeEventListener("keydown",KeyDownFunc);
				document.removeEventListener("keyup",KeyUpFunc);
				window.removeEventListener("blur",BlurFunc);
			}else if(window.detachEvent){
				document.detachEvent("onkeydown",KeyDownFunc);
				document.detachEvent("onkeyup",KeyUpFunc);
				window.detachEvent("onblur",BlurFunc);
			}
		};

		// ------------------------------------------------------------
		// 初期化
		// ------------------------------------------------------------
		(function (){
 			_input_key_buffer = new Array();

			if(window.addEventListener){
				document.addEventListener("keydown",KeyDownFunc);
				document.addEventListener("keyup",KeyUpFunc);
				window.addEventListener("blur",BlurFunc);
			}else if(window.attachEvent){
				document.attachEvent("onkeydown",KeyDownFunc);
				document.attachEvent("onkeyup",KeyUpFunc);
				window.attachEvent("onblur",BlurFunc);
			}
		})();
	}
        
        function hasClass(element, className) {
            console.log((' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + className + ' '));
            return (' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + className + ' ') !== -1;
        }


	// ------------------------------------------------------------
	// 初期化
	// ------------------------------------------------------------
	// InputKeyboard オブジェクトを作成
	var input_key = new InputKeyboard();

	// id 属性が、"aaa" であるエレメントを取得
	var element = document.getElementsByClassName("now");
        var span = document.getElementsByTagName("span");
        var index,rand_index;
        for(var i = 0 ; i < span.length ; i++){
            if(span[i].innerHTML == "P"){
                index = i;
                break;
            }
        }
        for(var i = 0 ; i < span.length ; i++){
            if(span[i].innerHTML == "G"){
                rand_index = i;
                break;
            }
        }

	// 座標
	//var pos_x = 0;
	//var pos_y = 0;
        
        //0~3の乱数生成
        var rand;
        console.log(rand_index);
        
	// ------------------------------------------------------------
	// 一定の時間隔で実行
	// ------------------------------------------------------------
	// 60 フレームレート間隔で実行
	setInterval(function (){

		// 上キー38が押された(Uキー85)
		if(input_key.isDown(85)){
                    var id = index - 55;
                    //console.log(span[id].className == "road");
                    if(span[id].className != "wall"){
                        console.log("unnko");
                        span[index].className = "road";
                        span[index].innerHTML = "0";
                        span[id].innerHTML = "P";
                        span[id].classList.add("now");
                        index -= 55;
                    }
                }

		// 下キー40が押された(Jキー86)
		if(input_key.isDown(86)){
                    var id = index + 55;
                    //console.log(span[id].className == "road");
                    if(span[id].className != "wall"){
                        console.log("unnko");
                        span[index].className = "road";
                        span[index].innerHTML = "0";
                        span[id].innerHTML = "P";
                        span[id].classList.add("now");
                        index += 55;
                    }
                }

		// 左キー37が押された(Gキー71)
		if(input_key.isDown(71)){
                   var id = index - 1;
                    //console.log(span[id].className == "road");
                    if(span[id].className != "wall"){
                        console.log("unnko");
                        span[index].className = "road";
                        span[index].innerHTML = "0";
                        span[id].innerHTML = "P";
                        span[id].classList.add("now");
                        index -= 1;
                    } 
                }

		// 右キー39が押された(Hキー72)
		if(input_key.isDown(72)){
                    var id = index + 1;
                    //console.log(span[id].className == "road");
                    if(span[id].className != "wall"){
                        console.log("unnko");
                        span[index].className = "road";
                        span[index].innerHTML = "0";
                        span[id].innerHTML = "P";
                        span[id].classList.add("now");
                        index += 1;
                    }
                }

		// エレメントの位置を更新
		//element.style.left = (pos_x) + "px";
		//element.style.top  = (pos_y) + "px";

	},1000/12);
        
        
        setInterval(function(){
            //0~3の乱数生成
            rand = Math.floor(Math.random() * 4);
            console.log(rand);
            switch(rand){
                //上
                case 0:
                {
                    var id = rand_index - 55;
                    if(span[id].className != "wall"){
                        span[rand_index].className = "road";
                        span[rand_index].innerHTML = "0";
                        span[id].innerHTML = "G";
                        span[id].classList.add("goal");
                        rand_index -= 55;
                        break;
                    }
                }
                //下
                case 1:
                {
                    var id = rand_index + 55;
                    if(span[id].className != "wall"){
                        span[rand_index].className = "road";
                        span[rand_index].innerHTML = "0";
                        span[id].innerHTML = "G";
                        span[id].classList.add("goal");
                        rand_index += 55;
                        break;
                    }
                }
                //右
                case 2:
                {
                    var id = rand_index + 1;
                    if(span[id].className != "wall"){
                        span[rand_index].className = "road";
                        span[rand_index].innerHTML = "0";
                        span[id].innerHTML = "G";
                        span[id].classList.add("goal");
                        rand_index += 1;
                        break;
                    }
                }
                //左
                case 3:
                {
                    var id = rand_index - 1;
                    if(span[id].className != "wall"){
                        span[rand_index].className = "road";
                        span[rand_index].innerHTML = "0";
                        span[id].innerHTML = "G";
                        span[id].classList.add("goal");
                        rand_index -= 1;
                        break;
                    }
                }
            }
        },100);
        
        
	// ------------------------------------------------------------
	// キーボードの入力監視を終了
	// ------------------------------------------------------------
	//input_key.release();
	//input_key = null;

    </script>

   
</html>
<?php
      }
?>