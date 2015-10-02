<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Angular-Laravel Authentication</title>
        <link rel="stylesheet" href="/assets/node_modules/bootstrap/dist/css/bootstrap.css">
        <link rel="stylesheet" href="/scripts/app.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,300">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

        <base href="/">
        <style type="text/css">
            #textAngular-editableFix-010203040506070809{
                display: none;
            }

        </style>

    </head>

    <body ng-app="authApp">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container">
                <div class="row">
                    <ul class="nav navbar-nav">
                        <li><a ng-href="/">Home</a></li>
                        <li><a ng-href="/login">Login</a></li>
                        <li><a ng-href="/users">Users</a></li>
                        <li><a ng-href="/sign">Sign Up</a></li>
                        <li><a ng-href="/pages">Pages</a></li>
                    </ul>
                </div>
            </div><!-- /.container-fluid -->
        </nav>
        <div class="container" style="margin-top: 60px;">
            <div ui-view></div>
        </div>
    </body>


    <script src="/assets/node_modules/jquery/dist/jquery.js"></script>
    <script src="/assets/node_modules/angular/angular.js"></script>
    <script src="/assets/node_modules/angular-ui-router/build/angular-ui-router.js"></script>
    <script src="/assets/node_modules/angular-sanitize/angular-sanitize.js"></script>
    <script src="/assets/node_modules/satellizer/satellizer.js"></script>
    <script src="/assets/node_modules/ng-storage/ngStorage.min.js"></script>

    <script src="/scripts/app.js"></script>
    <script src="/scripts/controllers.js"></script>

    <script src="http://textangular.com/dist/textAngular-rangy.min.js"></script>
    <script src="http://textangular.com/dist/textAngular-sanitize.min.js"></script>
    <script src="http://textangular.com/dist/textAngular.min.js"></script>
</html>