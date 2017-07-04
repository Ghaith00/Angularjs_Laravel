myApp.directive('existedEmail',function(Authentication,$q){
    return {
        require: 'ngModel',
        link: function(scope, element, attr, controllers) {
            // Async function calls the server
            function validateEmail(email) {
                return Authentication.checkEmail(email)
                  .then(function(response){
                      if(response.data) return $q.reject();
                  });
            };

            controllers.$asyncValidators.uniqueEmail = validateEmail ;
        }
    };
});
myApp.directive('existedUsername',function(Authentication,$q){
    return {
        require: 'ngModel',
        link: function(scope, element, attr, controllers) {
            function validateUsername(username) {
                return Authentication.ckeckUsername(username)
                  .then(function(response){
                      if(response.data) return $q.reject();
                  });
            };
            controllers.$asyncValidators.uniqueUsername = validateUsername ;
        }
    };
});
