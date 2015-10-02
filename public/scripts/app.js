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

    /*
    * function that runs on app being loaded
    * - on route change, checks for user authentication and sets 'login.auth' which is used below in the routes
    *   to dynamically restrict routing
    */
    authApp.run(function ($rootScope, $auth, $state, $http, $window, dataFactory) {

        dataFactory.setPages();

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

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
                $state.go('login', {notify: true});
                console.log('not authorized');
            }
        });
    });


    /*
    * ROUTING MAGIC
    *
    */
    authApp.config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider){

        $authProvider.loginUrl = '/api/authenticate';
        $authProvider.signupUrl = '/api/signup';

        $urlRouterProvider.otherwise('/404');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../views/home.html',
                controller: 'HomeController',
                resolve: {
                    setData: function (dataFactory) {
                        return dataFactory.setPages();
                    }
                }
            })
            .state('pages', {
                url: '/pages',
                templateUrl: '../views/pages.html',
                controller: 'PagesController'
            })
            .state('page', {
                url: '/pages/:id',
                templateUrl: '../views/page.html',
                controller: 'PageController'
            })
            .state('edit', {
                url:'/pages/edit/:id',
                templateUrl: '../views/edit.html',
                controller: 'EditController',
                resolve: {
                    page: function (dataFactory, $stateParams) {
                        return dataFactory.editPage($stateParams.id);
                    }
                }
            })
            .state('users', {
                url: '/users',
                templateUrl: '../views/user.html',
                controller: 'UserController',
                login: {auth: true}  // setting this to true means user has to be logged in
            })
            .state('login', {
                url: '/login',
                templateUrl: '../views/login.html',
                controller: 'LoginController as login'
            })
            .state('sign', {
                url:'/sign',
                templateUrl: '../views/signup.html',
                controller: 'SignupController as signup'
            })
            .state('404', {
                url: '/404',
                template: '<h1 style="color:white">404 Page does not exist</h1>'
            });

        $locationProvider.html5Mode(true);
    });


    /*
    * DATA FACTORY
    * all my http requests that are used in routing
    * $q.all(array) allows multiple ajax calls
    */
    authApp.factory('dataFactory', function ($http, $sessionStorage, $q){
        return {
            // save all the pages in the $sessionStorage (is removed on browser close)
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

    /*
    * ANGULAR FILTER MODULE
    * filter used to strip tags from page content
    */
    angular.module('filters', [])
        .filter('htmlToPlainText', function (){
            return function (text){
                return text ? String(text).replace(/<[^>]+>/gm, '') : '';
            }
        })
})();

