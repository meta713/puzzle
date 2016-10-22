$(function(){
  //$("#btn-login").on("click",inputcheck);
  //$("#btn").on("click",show);
  //$(".wall").on("click",test);
  //console.log($("pre").find("span"));
  //test();
  //$("#pz").find("span:eq(56)").html("P").addClass("now");
  //$("#pz").find("span:eq(2968)").html("G").addClass("goal");
});

function show(){
    $(".wall").toggleClass("bass");
}

function test(){
    var array = $("#pz").find("span");
    var index = 55*1 + 2;
    //console.log(array["1"].addClass("now"));
    //array[1].html("P");
    //array[1].addClass("now");
}

function inputcheck(){
  var array = [];

  if(!$("#login-username").val()) array.push("usernameがありません");
  if(!$("#login-password").val()) array.push("passwordがありません");

  console.log(array);

  if(array.length > 0){
    $("#error").html(array.join("<br>"));
  }else{
      console.log("成功");
    $("#btn-login").submit();
  }
}
