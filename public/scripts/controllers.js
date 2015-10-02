(function (){

    'use strict';

    angular.module('authApp').controller('HomeController', function ($sessionStorage){
        var x = this;
        var test = $sessionStorage.pages.filter(function (el){
            return el.url == 'home';
        });
        x.home = test[0];
    });

    angular.module('authApp').controller('PagesController', function ($sessionStorage) {
        var x = this;
        x.pages = $sessionStorage.pages;

    });

    angular.module('authApp').controller('PageController', function ($sessionStorage, $stateParams, $state){
        var x = this;
        var test = $sessionStorage.pages.filter(function (el){
            return el.url == $stateParams.id;
        });
        if(test[0]){
            x.page = test[0];
        }
        else{
            $state.go('404');
        }
    });

    angular.module('authApp').controller('EditController', function ($sessionStorage, $timeout, page, dataFactory) {
        var x = this;
        x.update = page[0];

        $timeout(function (){
            angular.element('.ta-toolbar').children().last().hide();
        }, 50);

        x.sub = function (d){
            dataFactory.updatePage(d);
        }
    });

    angular.module('authApp').controller('AuthController', function ($auth, $state) {
        var vm = this;

        vm.login = function() {
            var credentials = {
                email: vm.email,
                password: vm.password
            };

            $auth.login(credentials).then(function (data){
                $state.go('users', {});
            })
        }
    });


    angular.module('authApp').controller('SignController', function ($auth, $state, $rootScope){
        var ak = this;

        ak.signup = function() {
            var credentials = {
                name: ak.name,
                email: ak.email,
                password: ak.password
            };

            console.log(credentials);

            $auth.signup(credentials).then(function (data){
                //$auth.setToken(data)
                $state.go('auth', {});
            })
        }
    });


    angular.module('authApp').controller('UserController', UserController);

    function UserController($http) {

        var vm = this;

        vm.users;
        vm.error;

        vm.getUsers = function() {
            $http.get('api/authenticate').success(function(users) {
                console.log(users);
                vm.users = users;
            }).error(function(error) {
                vm.error = error;
            })
        }

    }
})();