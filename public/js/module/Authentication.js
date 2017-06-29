/**
 * Authentication methods
 * loggedIn , login , register ,logout , checkEmail , checkUsername
 */
angular.module('Auth',[]).service('Authentication',
  function(growl,$rootScope, $http,$state,$localStorage,BASE_API,API,$q) {


    var setToken = function(token){
              $localStorage.token = token ;
            };

            unauthorize : function(){
              $rootScope.logedIn = false ;
              delete $localStorage.token ;
              $state.go('main');
            },
            authorize : function(){
              $rootScope.isLoggedIn = true ;
              $rootScope.mainUser = response.data ;
              $state.go('home');
            },

            // check and configure if the user is logged in
            loggedIn :function(){
                return $http.post( BASE_API + API.state);
            },
            // Login promise function
            login : function(user){
                return $http.post(BASE_API + API.logIn,user);
            },
            //logout
            logOut : function(){
                return $http.post(BASE_API +API.logOut);
            },
            // signup
            register : function(user){
                return $http.post( BASE_API + API.signup,user);
            },
            // Check email if exist
            checkEmail : function(email){
                return $http.post(BASE_API + API.checkEmail,{email: email});
            },
            // Check username if exist
            ckeckUsername : function(username){
                return $http.post(BASE_API + API.checkUsername,{username:username});
            }
        };
        return factoryObject ;
    }
);
