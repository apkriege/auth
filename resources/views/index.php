<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Angular-Laravel Authentication</title>
        <link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
        <link rel="stylesheet" href="scripts/app.css">
        <base href="/">
    </head>

    <body ng-app="authApp">
        <div class="container">
            <a ui-sref="/">Home</a><br>
            <a ui-sref="auth">Auth</a><br>
            <a ui-sref="users">Users</a><br>
            <a ui-sref="sign">Sign Up</a><br>
        </div>
        <div class="container" style="margin-top: 20px;">
            <div ui-view></div>
        </div>
    </body>


    <script src="node_modules/angular/angular.js"></script>
    <script src="node_modules/angular-ui-router/build/angular-ui-router.js"></script>
    <script src="node_modules/satellizer/satellizer.js"></script>

    <script src="scripts/app.js"></script>
    <script src="scripts/controllers.js"></script>
<!--    <script src="scripts/userController.js"></script>-->
<!--    <script src="scripts/signController.js"></script>-->
</html>