myApp.directive('existedEmail',function(Authentication,$q){
    return {
        require: 'ngModel',
        link: function(scope, element, attr, controllers) {
            function validateEmail(email) {
                var deferred = $q.defer();
                Authentication.checkEmail(email).then(
                    function(response){
                        if(response.toString()  == attr.existedEmail) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    }
                );
                return deferred.promise;
            }
            controllers.$asyncValidators.uniqueEmail = validateEmail ;
        }
    };
});
myApp.directive('existedUsername',function(Authentication,$q){
    return {
        require: 'ngModel',
        link: function(scope, element, attr, controllers) {
            function validateUsername(username) {
                var deferred = $q.defer();
                Authentication.ckeckUsername(username).then(
                    function(response){
                        //window.console.log(response.toString(),attr.existedUsername)
                        if(response.toString() == attr.existedUsername) {
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    }
                );
                return deferred.promise;
            }
            controllers.$asyncValidators.uniqueUsername = validateUsername ;
        }
    };
});

