$(function(){
  //$("#btn-login").on("click",inputcheck);
});

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
