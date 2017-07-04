myApp.controller('loginController',
    function($scope,Authentication,growl){
        $scope.login = function() {
          Authentication.login($scope.user)
            .then(function(response){
                growl.success('Log In successful !',{});
            })
            .catch(function(response){
                growl.warning('Invalid login',{title:response.data.error});
            });
        };
    }
);
