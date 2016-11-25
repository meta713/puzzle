$(function(){
  //コメント格納用のlistオブジェクトの作成
  list = new commentlist();
  //コメント内容格納用のcommentオブジェクトの作成
  c = new comment();
  //ローカルストレージの初期化用
  //localStorage.clear();

  //コメントボタンのイベント（unbind・bind用に関数は別定義）
  $("#submit").on("click",click);
  //$("#submit").on("click",function click(e){
  //コメントボタンのクリックイベント
  function click(e){
    //コメントの内容取得
    var comment = $("#comment").val();
    //コメントの内容が空白でないか確認
    if(comment.match(/[^ ]+/g)){
      c.id_update();
      var li = document.createElement("li");
      var a = document.createElement("a");

      a.textContent = comment;
      var c_obj = c.newcomment();
      c_obj.createComment(comment);
      li.appendChild(a);
      li.id = "comment_"+c_obj.commentid;
      c_obj.elem = li;
      document.getElementById("comment-list").appendChild(li);
      list.addComment(c_obj);
      $("#comment").val("");
      //ローカルストレージにjsonとして保存
      var json = JSON.stringify(list);
      localStorage.list = json;
      //自身にクリックイベントを追加
      a.addEventListener("click",function (e){
        var self = this;
        $("#comment").val(self.innerHTML);
        //変更内容の適応
        $("#submit").unbind().on("click",function(e){
          self.textContent = $("#comment").val();
          var parent = self.parentNode;
          if(!self.textContent.match(/[^ ]+/g)){
            list.list[parent.id.match(/\d+/g)[0]] = "";
            self.parentNode.remove();
          }else{
            list.list[parent.id.match(/\d+/g)[0]].comment_update(self.textContent);
          }
          $("#comment").val("");
          $(this).unbind(e).bind("click",click);
          //変更内容をローカルストレージに保存
          var json = JSON.stringify(list);
          localStorage.list = json;
        });
      } , false);
    }
  }
  //});

  //ストレージに保存されているコメントデータの初期追加
  window.onload = function(e){
    //reader = new FileReader();

    /*if(localStorage.background){
        var dataURL = localStorage.background;
        document.body.style.background = "url(" + dataURL + ")";
        document.body.style.backgroundSize = "cover";
    }*/
    //コメントリストの格納用の変数
    var locallist = localStorage.list;
    if(locallist){
      locallist = JSON.parse(locallist);
      var fragment = document.createDocumentFragment();
      var total = 0;
      for(var i = 0 ; i < locallist.list.length ; i++){
        if(locallist.list[i] !== ""){
          total++;
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.textContent = locallist.list[i].comment;
          li.id = "comment_"+locallist.list[i].commentid;
          li.appendChild(a);
          fragment.appendChild(li);
          locallist.list[i].elem = li;
          a.addEventListener("click",function aclick(e){
            var self = this;
            $("#comment").val(self.innerHTML);
            $("#submit").unbind().on("click",function(event){
              self.textContent = $("#comment").val();
              //console.log(self);
              var parent = self.parentNode;
              if(!self.textContent.match(/[^ ]+/g)){
                //console.log(list.list.splice(parent.id.match(/\d+/g)[0],1));
                list.list[parent.id.match(/\d+/g)[0]] = "";
                self.parentNode.remove();
              }else{
                list.list[parent.id.match(/\d+/g)[0]].comment = self.textContent;
              }
              $("#comment").val("");
              //console.log(click);
              $(this).unbind(event).bind("click",click);
              //console.log(list);
              var json = JSON.stringify(list);
              localStorage.list = json;
            });
          } , false);
        }
      }
      //console.log(localStorage);
      list.init(locallist);
      c.init(list.seedid - 1);
      //console.log(list);
      document.getElementById("comment-list").appendChild(fragment);
      if(!(total > 0)){
        localStorage.clear();
        c.const();
        list.const();
      }
    }
  };

});

/*********************
  コメントクラス
*********************/

comment = function( id ){
  this.commentid = -1;
  this.comment = "";
  this.elem = "";
  if ( id != undefined){
    this.update( id );
  }
};

comment.prototype.const = function(){
  this.commentid = -1;
  this.comment = "";
  this.elem = "";
};

//初期化
comment.prototype.init = function(id){
  this.commentid = id;
  this.comment = "";
};

comment.prototype.update = function( id ){
  this.commentid = id;
};

//コメントの作成
comment.prototype.createComment = function(str){
  //this.commentid++;
  this.comment = str;
};

comment.prototype.newcomment = function(){
  return (new comment(this.commentid));
}

comment.prototype.id_update = function(){
  this.commentid += 1;
}

comment.prototype.comment_update = function(str){
  this.comment = str;
}

/*********************
  コメントリストクラス
*********************/

commentlist = function(){
  this.list = [];
  this.seedid = 0;
}

commentlist.prototype.const = function(){
  this.list = [];
  this.seedid = 0;
}

commentlist.prototype.init = function(obj){
  this.list = obj.list;
  this.seedid = obj.seedid;
}

commentlist.prototype.addComment = function(comment){
  this.seedid++;
  this.list.push(comment);
}
