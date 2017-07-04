myApp.controller('navController', function($scope,growl,Authentication,$location,$anchorScroll,$state){
    $scope.logOut = function(){
        Authentication.logOut()
          .then(function(response){
            $state.go('main');
            if (typeof response.data.error !== 'undefined')
                growl.warning('Logout problem',{title:response.data.error});
            else
                growl.success('Logout successful',{});
          });
    };
    $scope.isLoggedIn = function(){
        return Authentication.isAuthenticated();
    };
    $scope.mainUser = Authentication.authenticatedUser();
    $scope.goToContact = function() {
        $state.go('main');
        $location.hash('contact');
        $anchorScroll();
    };
    $scope.goToAboutUs = function() {
        $state.go('main');
        $location.hash('aboutus');
        $anchorScroll();
    };
});
