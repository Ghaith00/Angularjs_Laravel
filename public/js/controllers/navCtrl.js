myApp.controller('navController', function($scope,Authentication,$location,$anchorScroll,$state){
    $scope.logOut = function(){
        Authentication.logOut();
    };
    $scope.gotoContact = function() {
            $state.go('main');
            $location.hash('contact');
			$anchorScroll();
    };
	$scope.gotoAboutus = function() {
        $state.go('main');
        $location.hash('aboutus');
		$anchorScroll();
    };
});
