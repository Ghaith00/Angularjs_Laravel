
myApp.controller('homeController',['$scope','dataUp','$state',function($scope,dataUp,$state){
    // projects
    $scope.indexProject = 0;
    $scope.projectList = [{Name:"General",Pid:"",Theme:"success"}];
    $scope.addedProjects = [];
    dataUp.getProjects().then(
        function(response) {
            angular.forEach(response, function(project){
                project.Theme = "default" ;
                $scope.projectList.push(project);
            });
        }
    );
    // My tasks
    dataUp.getMytasks().then(
        function(response){
            $scope.mytasksList = response ;
        }
    );


    // functions
    $scope.selectiveProject = function(index){
        if($scope.addedProjects.indexOf(index) == -1 )
        $scope.addedProjects.push(index);
        $scope.selectProject(index);
    };
    $scope.selectProject = function(index){
        if(index != -2){
            $scope.projectList[$scope.indexProject].Theme = "default";
            $scope.indexProject = index ;
            $scope.projectList[index].Theme = "success";
            $state.go('home.tasks');   
        } else {
            $scope.projectList[$scope.indexProject].Theme = "default";
            $scope.indexProject = 0 ;
            $scope.projectList[0].Theme = "success";
        }       
    };
    $scope.closeSelectiveProjects = function(){
        $scope.addedProjects = [];
        $scope.selectProject(0);
    };

}]);