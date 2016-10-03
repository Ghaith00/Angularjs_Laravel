myApp.controller('loginController',
    function($scope,Authentication){
        $scope.login = function() {
            Authentication.login($scope.user).then(function(response){
				window.console.log(response);
				// hundel error
			});
        }; //login
    }
);
