(function (){
    'use strict';
    var authApp = angular.module('authApp', [
        'ui.router',
        'satellizer',
        'ngSanitize',
        'ngStorage',
        'textAngular',
        'filters'
    ]);

    authApp.run(function ($rootScope, $auth, $state, $http, $window, dataFactory) {

        dataFactory.setPages();

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            //console.log($auth.isAuthenticated());
            $rootScope.auth = $auth.isAuthenticated();

            //$http.get('/api/testing').success(function (data){
            //    console.log(data);
            //    $window.localStorage.currentUser = JSON.stringify(data);
            //    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
            //    //console.log($rootScope.currentUser);
            //});

            if ( !(toState.login) ) return;
            if ( !(toState.login.auth) ) return;

            if(toState.login.auth == true && !$auth.isAuthenticated()){
                event.preventDefault();
                $state.go('auth', {notify: true});
                console.log('not authorized');
            }
        });
    });

    authApp.config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider){

        $authProvider.loginUrl = '/api/authenticate';
        $authProvider.signupUrl = '/api/signup';
        //$authProvider.loginUrl = '/api/signup';

        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../views/home.html',
                controller: 'HomeController as home',
                resolve: {
                    setData: function (dataFactory) {
                        return dataFactory.setPages();
                    }
                }
            })
            .state('pages', {
                url: '/pages',
                templateUrl: '../views/pages.html',
                controller: 'PagesController as pages'
            })
            .state('page', {
                url: '/pages/:id',
                templateUrl: '../views/page.html',
                controller: 'PageController as page'
            })
            .state('edit', {
                url:'/pages/edit/:id',
                templateUrl: '../views/edit.html',
                controller: 'EditController as edit',
                resolve: {
                    page: function (dataFactory, $stateParams) {
                        return dataFactory.editPage($stateParams.id);
                    }
                }
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
                login: {auth: true}
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

    authApp.factory('dataFactory', function ($http, $sessionStorage, $q){
        return {
            setPages: function (){
                return $q.all([
                    $http.get('/api/getPages').then(function (respsonse){
                        $sessionStorage.pages = respsonse.data;
                    })
                ])
            },
            editPage: function (id){
                return $http.get('/api/editPage', {params: {test:id}}).then(function (response){
                    return response.data;
                })
            },
            updatePage: function (data){
                var x = this;
                return $http.post('/api/updatePage', {test:data}).then(function (repsonse){
                    console.log(repsonse);
                    x.setPages();
                });

            }
        }

    });

    angular.module('filters', [])
        .filter('htmlToPlainText', function (){
            return function (text){
                return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            }
        })
})();

