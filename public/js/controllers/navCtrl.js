myApp.controller('navController', function($scope,Authentication,$location,$anchorScroll,$state){
    $scope.logOut = function(){
        Authentication.logOut();
    };
    $scope.isLoggedIn = function(){
        return Authentication.isAuthenticated();
    };
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
