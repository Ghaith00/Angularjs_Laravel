myApp.controller('signupController',function($scope,growl,Authentication){
    $scope.register = function(){
        Authentication.register($scope.user)
          .then(function(response){
              growl.success('Registeration successful !',{});
          })
          .catch(function(response){
              growl.warning('Invalid Registeration',{title:response.data.error});
          });
    };

});
