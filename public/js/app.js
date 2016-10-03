/**
 * Created by Ghaith on 22/07/2016.
 */
var myApp = angular.module('myApp',['ui.bootstrap','ngAnimate','ui.router','ngStorage','angular-growl']);
/*Const*/
myApp.constant('BASE_API','http://laravel.angular.com/api');



/*intialation */
myApp.run(function(growl,Authentication,$state,$rootScope,$localStorage){
    Authentication.loggedIn();
    // redirecting params  'redirectTo'
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
      if (to.onAuth && !$localStorage.token){

        evt.preventDefault();
        $state.go('main');
      }
    });


});
/*routeprovider service */
myApp.config(['growlProvider','$urlRouterProvider','$stateProvider','$httpProvider',
    function(growlProvider,$urlRouteProvider,$stateProvider,$httpProvider){
        growlProvider.globalTimeToLive(3000);

        $urlRouteProvider.otherwise('/main');
        $stateProvider.
        state('main', {/*partial list*/
            url:'/main',
            templateUrl:'partials/main.html',
            controller:'publicController'
        }).
        state('login',{
            url:'/login',
            templateUrl:'partials/login.html',
            controller:'loginController'
        }).
        state('signup',{
            url:'/signup',
            templateUrl:'partials/signup.html',
            controller:'signupController'

        }).
        state('profile',{
            url:'/profile',
            templateUrl:'partials/profile.html',
            controller:'profileController',
            onAuth:'j'
        }).
        state('notifications',{
            url:'/notifications',
            templateUrl:'partials/notifications.html',
            onAuth:'i'
        }).
        state('home',{
            url:'/home',
            templateUrl:'partials/home.html',
            controller:'homeController',
            redirectTo: 'home.dashdoard',
            onAuth:'h'
        }).
        state('home.dashdoard',{
            url:'/dashboard',
            templateUrl:'partials/home/Dashboard.html',
            controller:'dashController',
            onAuth:'g'
        }).
        state('home.tasks',{
            url:'/tasks',
            templateUrl:'partials/home/Tasks.html',
            controller:'taskController',
            onAuth:'f'
        }).
        state('home.project',{
            url:'/project',
            templateUrl:'partials/home/Projectpass.html',
            redirectTo:'home.project.view',
            onAuth:'e'
        }).
        state('home.newProject',{
            url:'/new',
            templateUrl:'partials/home/nProject.html', 
            controller:'projectController',
            onAuth:'d'
        }).
        state('home.project.view',{
            url:'/view',
            templateUrl:'partials/home/Projects.html',
            controller:'projectsController',
            onAuth:'c'
        }).
        state('home.project.edit',{
            url:'/edit',
            templateUrl:'partials/home/eProject.html',
            controller:'editController',
            onAuth:'b'
        }).
        state('home.notifications',{
            url:'/notifications',
            templateUrl:'partials/home/notifications.html',
            controller:'notifController',
            onAuth:'a'
        });

        $httpProvider.interceptors.push(function ($q, $location, $localStorage,growl) {
                return {
                    'request': function (config) {
                        config.headers = config.headers || {};
                        if ($localStorage.token) {
                            config.headers.Authorization = 'Bearer ' + $localStorage.token;
                        }
                        return config;
                    },
                    'responseError': function (response) {
                        if (response.status === 401 || response.status === 403) {
                            delete $localStorage.token;
                        }
                        growl.warning(response.statusText,{title:response.status});
                        window.console.log(response)
                        return $q.reject(response);
                    }
                };
        });

    }
]);
