
/**
 * Created by Ghaith on 25/07/2016.
 */
myApp.factory('Authentication',['growl','$rootScope', '$http','$state','$localStorage','BASE_API',
    function(growl,$rootScope, $http,$state,$localStorage,BASE_API) {
        $rootScope.logedIn = false ;
        $rootScope.mainuser = {};
       
        // factory services    
        var factoryObject = {
            loggedIn :function(){
                return $http.get( BASE_API +'/user_info').then(
                    function(response){
                      $rootScope.logedIn = true ;
                      $rootScope.mainuser = response.data ;
                      $state.go('home');
                      return response ;  
                    }
                );
            },
            login : function(user){
              return $http({
                  url : BASE_API + '/login' ,
                  method:'POST',
                  data: $.param(
                  		        {
                      					'email': user.email,
                      					'password' : user.pwd 				
                      				}			
			            ),
                  headers:{'Content-Type':'application/x-www-form-urlencoded'}
                  }).then(
                    function(response){
                      $localStorage.token = response.data.token ;
                      if (response.data[0] == 'token'){
                        growl.success('Log In successful !',{});
                        //factoryObject.loggedIn();  
                      } else {
                        growl.error(response.data.error,{})  
                      }
			                return response;
                    }	
                  );

                //put http post
            },//login
            logOut : function(){
                $http.post(BASE_API +'/logout').then(
                  function(response){
                    $rootScope.logedIn = false ;
                    delete $localStorage.token ; 
                    $state.go('main');
                  },
                  function(){
                    //
                    window.console.log('logout fail');
                  }
                );
            },//logout
            register : function(user){
                var suc = false
                $http({
                  url : BASE_API + '/signup' ,
                  method:'POST',
                  data: $.param(
                              {
                                'name': user.name,
                                'lastname': user.lastname,
                                'email': user.email,
                                'username': user.username,
                                'password' : user.pwd         
                              }     
                  ),
                  headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }).then(
                    function(response){
                      if (response.data[0] == 'success'){
                        suc = true
                        growl.success('Registation is successfull !',{});  
                      } else {
                        window.console.log(response.data.error);
                        for (var i = 0 ;i <response.data.error.length; i++ ){
                          growl.error(response.data.error[i],{})  
                        }
                      }
                    } 
                  ).then(function(){
                    if (suc){
                      factoryObject.login(user);
                    }  
                  })
                //put http post
                
            },
            checkEmail : function(email){
                return $http({
                    url:BASE_API + '/emailcheck',
                    method:'POST',
                    data: $.param({email: email}),
                    headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }).then(
                    function(response){
                        return response.data;
                    }
                );
            },
            ckeckUsername : function(username){
                return $http({
                    url: BASE_API + '/usercheck',
                    method:'POST',
                    data: $.param({username:username}),
                    headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }).then(
                    function(response){
                        return response.data;
                    }
                );
            }
        };
        return factoryObject ;
    }
]);

