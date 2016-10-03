myApp.controller('signupController',['$scope' , 'Authentication',function($scope,Authentication){
    $scope.register = function(){
        Authentication.register($scope.user);
    };
    
}]);
