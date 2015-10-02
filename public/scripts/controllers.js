(function (){

    'use strict';

    /*
    *   HOME CONTROLLER
    *   All this does is grab the home page data and displays it ('/views/home.html')
    */
    angular.module('authApp').controller('HomeController', function ($scope, $sessionStorage){
        var test = $sessionStorage.pages.filter(function (el){
            return el.url == 'home';
        });
        $scope.home = test[0];
    });

    /*
     *   PAGES CONTROLLER
     *   Displays a list of the pages
     *   ('/views/pages.html')
     */
    angular.module('authApp').controller('PagesController', function ($scope, $sessionStorage) {
        $scope.pages = $sessionStorage.pages;

    });

    /*
     *   PAGE CONTROLLER
     *   Displays the pages based on url, if non found 404s
     *   ('/views/page.html')
     */
    angular.module('authApp').controller('PageController', function ($scope, $sessionStorage, $stateParams, $state){
        var test = $sessionStorage.pages.filter(function (el){
            return el.url == $stateParams.id;
        });

        if(test[0]){
            $scope.page = test[0];
        }
        else{
            $state.go('404');
        }
    });

    /*
     *   EDIT CONTROLLER
     *   All this does is grab the home page data and displays it
     *   ('/edit/home.html')
     */
    angular.module('authApp').controller('EditController', function ($scope, $sessionStorage, $timeout, page, dataFactory) {
        $scope.update = page[0];

        $timeout(function (){
            angular.element('.ta-toolbar').children().last().hide();
        }, 50);

        $scope.sub = function (d){
            dataFactory.updatePage(d);
        }
    });

    /*
     *   USER CONTROLLER
     *   Click the button and displays a list of all the users
     *   ('/views/user.html')
     */
    angular.module('authApp').controller('UserController', function ($scope, $http) {

        $scope.getUsers = function() {
            $http.get('api/authenticate').success(function(users) {
                console.log(users);
                $scope.users = users;
            }).error(function(error) {
                $scope.error = error;
            })
        }

    });

    /*
     *   LOGIN CONTROLLER
     *   Allows user to login and then redirects them to users
     *   ('/views/login.html')
     *   * currently just 401 errors if creds don't match
     */
    angular.module('authApp').controller('LoginController', function ($auth, $state) {
        var log = this;

        log.login = function() {
            var credentials = {
                email: log.email,
                password: log.password
            };

            $auth.login(credentials).then(function (data){
                $state.go('users', {});
            })
        }
    });

    /*
     *   SIGNUP CONTROLLER
     *   Allows a new user to sing up which then redirects the user to the login page
     *   ('/views/signup.html')
     */
    angular.module('authApp').controller('SignupController', function ($auth, $state){
        var x = this;

        x.signup = function() {
            var credentials = {
                name: x.name,
                email: x.email,
                password: x.password
            };

            console.log(credentials);

            $auth.signup(credentials).then(function (data){
                $state.go('auth', {});
            })
        }
    });


})();