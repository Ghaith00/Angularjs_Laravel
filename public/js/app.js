/**
 * Created by Ghaith on 22/07/2016.
 */
var myApp = angular.module('myApp',['ui.bootstrap','ngAnimate','ui.router','ngStorage','angular-growl']);
// API Consts
myApp.constant('BASE_API','/api');
myApp.constant('API',{
  logIn : '/auth/login',
  signUp : '/auth/signup',
  state : '/user/state',
  info : '/user/info',
  logOut : '/auth/logout',
  checkUsername : '/check/username',
  checkEmail : '/check/email',
});


/*routeprovider service */
myApp.config(function(growlProvider,$stateProvider,$urlRouterProvider,$httpProvider){
        growlProvider.globalTimeToLive(3000);

        // check if the user is already logged in
        var skipIfLoggedIn  = ['$state','$q','Authentication', function($state,$q,Authentication) {
          var deferred = $q.defer();
          Authentication.state().then(
            function(response){
              $state.go('home');
              deferred.reject();
            },
            function(){deferred.resolve();}
          );
          return deferred.promise;
        }];

        // Authentication filter
        var loginRequired = ['$state','$q','Authentication','growl',
          function($state,$q,Authentication,growl) {
            alert('kokok')
            var deferred = $q.defer();
            Authentication.state().then(
              function(response){ deferred.resolve();},
              function(){
                $state.go('login');
                growl.warning(response.data.error,{title:response.status});
              }
            );
            return deferred.promise;
        }];

        $urlRouterProvider.otherwise('/main');
        $stateProvider.
        state('main', {/*partial list*/
            url:'/main',
            templateUrl:'partials/main.html',
            controller:'publicController',
            resolve: {
              skipIfLoggedIn: skipIfLoggedIn
            }
        }).
        state('login',{
            url:'/login',
            templateUrl:'partials/login.html',
            controller:'loginController',
            resolve: {
              skipIfLoggedIn: skipIfLoggedIn
            }
        }).
        state('signup',{
            url:'/signup',
            templateUrl:'partials/signup.html',
            controller:'signupController',
            resolve: {
              skipIfLoggedIn: skipIfLoggedIn
            }

        }).
        state('profile',{
            url:'/profile',
            templateUrl:'partials/profile.html',
            controller:'profileController',
            resolve: {
              loginRequired: loginRequired
            }
        }).
        state('notifications',{
            url:'/notifications',
            templateUrl:'partials/notifications.html',
            resolve: {
              loginRequired: loginRequired
            }
        }).
        state('home',{
            url:'/home',
            templateUrl:'partials/home.html',
            controller:'homeController',
            redirectTo: 'home.dashdoard',
            resolve: {
              loginRequired: loginRequired
            }
        }).
        state('home.dashdoard',{
            url:'/dashboard',
            templateUrl:'partials/home/Dashboard.html',
            controller:'dashController',
            resolve: {
              loginRequired: loginRequired
            }
        }).
        state('home.tasks',{
            url:'/tasks',
            templateUrl:'partials/home/Tasks.html',
            controller:'taskController',
            resolve: {
              loginRequired: loginRequired
            }
        }).
        state('home.project',{
            url:'/project',
            templateUrl:'partials/home/Projectpass.html',
            redirectTo:'home.project.view',
            resolve: {
              loginRequired: loginRequired
            }
        }).
        state('home.newProject',{
            url:'/new',
            templateUrl:'partials/home/nProject.html',
            controller:'projectController',
            resolve: {
              loginRequired: loginRequired
            }
        }).
        state('home.project.view',{
            url:'/view',
            templateUrl:'partials/home/Projects.html',
            controller:'projectsController',
            resolve: {
              loginRequired: loginRequired
            }
        }).
        state('home.project.edit',{
            url:'/edit',
            templateUrl:'partials/home/eProject.html',
            controller:'editController',
            resolve: {
              loginRequired: loginRequired
            }
        }).
        state('home.notifications',{
            url:'/notifications',
            templateUrl:'partials/home/notifications.html',
            controller:'notifController',
            resolve: {
              loginRequired: loginRequired
            }
        });
        // Error handler and athentication toekn setter
        $httpProvider.interceptors.push(function ($q, $location, $localStorage,growl) {
                return {
                    'request': function (config) {
                        config.headers = config.headers || {};
                        if ($localStorage.token)
                            config.headers.Authorization = 'Bearer ' + $localStorage.token;
                        return config;
                    },
                    'responseError': function (response) {
                        switch (response.status) {
                          case 403 :
                            growl.warning(response.data.error,{title:response.status});
                            delete $localStorage.token;
                            break ;
                          case 400 :
                            console.log("Not logged");
                            break ;
                          default :
                            growl.warning(response.data.error,{title:response.status});
                        }
                        return $q.reject(response);
                    }
                };
        });

    }
);
