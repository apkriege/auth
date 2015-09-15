(function (){

    'use strict';

    angular.module('authApp').controller('HomeController', HomeController);

    function HomeController(){
        let a = [];
        for (let i = 0; i < 10; i++) {
            let x = a[i];
            console.log(i);
        }
    }

    angular.module('authApp').controller('AuthController', AuthController);

    function AuthController($auth, $state) {
        //console.log($state);
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
    }


    angular.module('authApp').controller('SignController', SignController);

    function SignController($auth, $state, $rootScope){
        //console.log($rootScope.currentUser.name);

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

    }


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