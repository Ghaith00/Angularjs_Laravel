myApp.service('dataUp',['$http','$location','$sce',
    function($http,$location,$sce){
        // stats handling
        this.projectStats = function(){
            return $http.
            get("script/projectstats.php").
            then(
                function (response) {
                    return  response.data;
                },
                function(response){
                    return response.data;
                }
            );
        };
        this.taskStats = function(){
            return $http.
            get("script/taskstats.php").
            then(
                function (response) {
                    return response.data;
                },
                function(response){
                    return response.data ;
                }
            );
        };
        // get may tasks
        this.getMytasks = function(){
            return $http.get("script/getmytasks.php").then(
                function(response){
                    return response.data;
                },
                function(response){
                    return response.data ;
                }
            );
        };
        // project Download
        this.getProjects = function() {
            return $http.get("script/projects.php").then(
                            function (response) {
                                return response.data;
                            }
                        );
        };
        // username list download
        this.searchUsername = function(username){
            return $http({
                url :'script/searchusername.php',
                method:'POST',
                data: $.param({username: username}),
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
            }).then(
                function(response){
                    return ['ali','hammdi','farid'] ;
                },function(response){
                    alert('error');
                    return ['ali','hammdi','farid'] ;
                }
            );
        };
        // get notification
        this.getNotif = function(){
            return $http.get('script/getnotif.php').then(function(response){
                return response.data ;
            })
        };

        // html string rendering
        this.renderHtml  = function(html_code){
                return $sce.trustAsHtml(html_code);
        };

    }
]);
