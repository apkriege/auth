(function (){
    'use strict';
    angular
        .module('authApp', ['ui.router', 'satellizer'])
        .run(function ($rootScope, $auth, $state, $http, $window) {
                $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                    //console.log($auth.isAuthenticated());
                    $rootScope.auth = $auth.isAuthenticated();

                    //$http.get('/api/testing').success(function (data){
                    //    console.log(data);
                    //    $window.localStorage.currentUser = JSON.stringify(data);
                    //    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
                    //    //console.log($rootScope.currentUser);
                    //});

                    if ( !(toState.data) ) return;
                    if ( !(toState.data.auth) ) return;

                    if(toState.data.auth == true && !$auth.isAuthenticated()){
                        event.preventDefault();
                        $state.go('auth', {notify: true});
                        console.log('not authorized');
                    }
                });
            }
        )
        .config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider){

            $authProvider.loginUrl = '/api/authenticate';
            $authProvider.signupUrl = '/api/signup';
            //$authProvider.loginUrl = '/api/signup';

            $urlRouterProvider.otherwise('/404');

            $stateProvider
                .state('/', {
                    url: '/',
                    template: '<h1 style="color:white">Home Page</h1>',
                    controller: 'HomeController as home'
                })
                .state('auth', {
                    url: '/auth',
                    templateUrl: '../views/authView.html',
                    controller: 'AuthController as auth'
                })
                .state('users', {
                    url: '/users',
                    templateUrl: '../views/userView.html',
                    controller: 'UserController as user',
                    data: {auth: true}
                })
                .state('sign', {
                    url:'/sign',
                    templateUrl: '../views/signView.html',
                    controller: 'SignController as sign'
                })
                .state('404', {
                    url: '/404',
                    template: '<h1 style="color:white">404 Page does not exist</h1>'
                });

            $locationProvider.html5Mode(true);
        });
})();

