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
      <link rel="stylesheet" href="assets/lib/bootstrap/css/bootstrap.min.css" />
      <!-- Optional theme -->
      <link rel="stylesheet" href="assets/lib/bootstrap/css/bootstrap-theme.css" />
      <script src="assets/lib/jquery-1.12.1.min.js"></script>
      <!-- Latest compiled and minified JavaScript -->
      <script src="assets/lib/bootstrap/js/bootstrap.min.js"></script>
      <!-- underscore.js -->
      <script src="assets/lib/underscore-min.js"></script>
      <script src="assets/scripts/login.js"></script>
      <style>
          .wall{
              
          }
      </style>
   </head>
   <body>
       <?php
       
       ?>
   </body>
</html>
<?php
      }
?>