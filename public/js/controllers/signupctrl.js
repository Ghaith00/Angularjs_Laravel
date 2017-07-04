myApp.controller('signupController',['$scope' , 'Authentication',function($scope,Authentication){
    $scope.register = function(){
        Authentication.register($scope.user)
          .then(function(response){
              growl.success('Registeration successful !',{});
          })
          .catch(function(response){
              growl.warning('Invalid login',{title:response.data.error});
          });
    };

}]);
