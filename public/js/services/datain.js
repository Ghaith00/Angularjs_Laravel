myApp.service('dataIn',
    function($http){
        this.handleTask = function(Tid,option){
            var URL ;
            switch (option) {
                case 0 :
                    URL = 'script/confirmtask.php' ;
                    break;
                case 1 :
                    URL = 'script/submittask.php';
                    break;
                default :
                    URL = 'script/deletetask.php';
            }
            return $http({
                url : URL ,
                method:'POST',
                data: $.param({Tid: Tid}),
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
            }).then(
                function(response){
                    alert(URL);
                    return response.data ;
                },
                function(response){
                    return response.data ;
                }
            );
        };
        this.saveTask = function(task){
            if(angular.isDefined(task.Tid)){
                return $http({
                    url : 'script/changetask.php',
                    method:'POST',
                    data: $.param({task: task}),
                    headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }).then(
                    function(response){ return response},
                    function(response){return response}
                );
            } else {
                return $http({
                    url : 'script/newtask.php' ,
                    method:'POST',
                    data: $.param({task: task}),
                    headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }).then(
                    function(response){return response},
                    function(response){return response}
                )
            }

        };
        this.addProject = function(project){
            return $http({
                    url : 'script/addproject.php',
                    method:'POST',
                    data: $.param({project: project}),
                    headers:{'Content-Type':'application/x-www-form-urlencoded'}
                }).then(
                    function(response){ return response},
                    function(response){return response}
                ); 
        }
});
