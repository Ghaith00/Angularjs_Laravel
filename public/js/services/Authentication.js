/**
 * Authentication methods
 * loggedIn , login , register ,logout , checkEmail , checkUsername
 */
myApp.service('Authentication',
  function(growl,$http,$state,$localStorage,BASE_API,API,$q) {
    var self = this ;
    // Get the authenticated user data
    this.authenticatedUser = function(){
      return $localStorage.user ;
    };
    this.setUser = function(user){
      $localStorage.user = user ;
    };
    // Check if the token is valid localy
    this.isAuthenticated = function(){
      var token = $localStorage.token ;
      if (token) {
          if (token.split('.').length === 3) {
              try {
                  var base64Url = token.split('.')[1];
                  var base64 = base64Url.replace('-', '+').replace('_', '/');
                  var exp = JSON.parse(window.atob(base64)).exp;
                  if (typeof exp === 'number') {
                      return Math.round(new Date().getTime() / 1000) < exp;
                  }
              }
              catch (e) {
                  return true; // Pass: Non-JWT token that looks like JWT
              }
          }
          return true; // Pass: All other tokens
      }
      return false; // Fail: No token at all
    };

    // Set the JWT token
    this.setToken = function(token){
        $localStorage.token = token ;
    };
    // Delete the token and set the offline state
    this.unauthorize = function(){
        delete $localStorage.token ;
        $state.go('main');
    };
    // Grant access to the app
    this.authorize = function(user){
        this.setUser(user) ;
        $state.go('home');
    };
    // check and configure if the user is logged in
    this.state = function(){
        return $http.post( BASE_API + API.state);
    };
    // Login promise function
    this.login  = function(user){
        return $http.post(BASE_API + API.logIn,user)
            .then(function(response){
                // Save the token
                if (typeof response.data.error === 'undefined')
                    self.setToken(response.data.token);
                else return $q.reject(response);
            })
            .then(function(response){
                // Save user data in storage
                return self.state().then(function(response){
                    if(typeof response.data.error === 'undefined')
                        self.authorize(response.data);
                    else return $q.reject(response);
                });
            });
    };
    //logout
    this.logOut = function(){
        return $http.post(BASE_API +API.logOut);
    };
    // signup
    this.register = function(user){
        return $http.post( BASE_API + API.signup,user)
            .then(function(response){
                // If registeration is fine we 
                if(typeof response.data.error === 'undefined')
                    return self.login(user);
                else return $q.reject(response);
            });
    };
    // Check email if exist
    this.checkEmail = function(email){
        return $http.post(BASE_API + API.checkEmail,{email: email});
    };
    // Check username if exist
    this.ckeckUsername = function(username){
        return $http.post(BASE_API + API.checkUsername,{username:username});
    };
  }
);
