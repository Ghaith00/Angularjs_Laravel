myApp.controller('projectsController',function($scope,$state) {
	$scope.statusTheme = ["yellow","green","red"];
    $scope.getStatus = function(status){
        switch(status) {
            case 0:
                return "On going";
                break;
            case 1:
                return "finished";
                break;
            case 2:
                return "Late";
                break;
            default:
                return -1;
        }
    };
    $scope.getState  = function(project){
    	var finishedTask = 0 ;
    	if(angular.isDefined(project.Tasks)){	
	    	angular.forEach(project.Tasks,function(task){
	    		if(task.Status == 2 ){
	    			finishedTask += 1;
	    		}	
	    	});
	    	return (finishedTask / project.Tasks.length)*100 ;
    	}
    };
    $scope.editProject = function(project){
    	$scope.selectiveProject($scope.projectList.indexOf(project));
    	$state.go('home.project.edit');
    }
});