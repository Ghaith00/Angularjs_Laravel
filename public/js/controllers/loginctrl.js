myApp.controller('loginController',
    function($scope,Authentication,$rootScope){
        $scope.login = function() {
          Authentication.login($scope.user).then(
            function(response){
              // save the token in localStorage
              Authentication.setToken(response.data.token);
              growl.success('Log In successful !',{});
              // change the state of user
              Authentication.loggedIn().then(function(response){
                Authentication.authorize();
              },null);
            },null);
        };
    }
);
