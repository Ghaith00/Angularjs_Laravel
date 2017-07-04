/**
 * Created by Ghaith on 12/08/2016.
 */
myApp.controller('projectController',function($scope,dataIn,$state,Authentication){

    // New project navigation
    $scope.NewProjectMenu = {index:0,theme:["is-active","",""]};
    $scope.goUp = function(){
        if(!$scope.NewProjectMenu.index){
                $scope.NewProjectMenu.theme[0] = "is-passed";
            } else {
                $scope.NewProjectMenu.theme[$scope.NewProjectMenu.index] = "is-passed";
            }
        $scope.NewProjectMenu.index += 1 ;
        $scope.NewProjectMenu.theme[$scope.NewProjectMenu.index] = "is-active";
    };
    $scope.goDown = function(){
        $scope.NewProjectMenu.theme[$scope.NewProjectMenu.index] = "";
        $scope.NewProjectMenu.index -= 1 ;
        $scope.NewProjectMenu.theme[$scope.NewProjectMenu.index] = "is-active";
    };

    //new project data
    $scope.newProject = {Name:'',Summary:'',User:Authentication.getUser(),Deadline:'',Tasks:[]};
    $scope.taskSelect = {Name:'',User:'',Summary:'',Deadline:''};
    $scope.addTaskToProject = function(){
        $scope.newProject.Tasks.push($scope.taskSelect);
        $scope.taskSelect = {Name:'',User:'',Summary:'',Deadline:''};
        $scope.addPanel();
        $scope.editMode = false ;
        $scope.tasksForm.$setPristine();
    };
    $scope.deleteTask = function(index){
        $scope.panelStatus.splice(index,1);
        $scope.newProject.Tasks.splice(index,1);
    };
    $scope.editTask = function(index){
        $scope.taskSelect = $scope.newProject.Tasks[index];
        $scope.deleteTask(index);
        $scope.editMode = true ;
        $scope.tasksForm.$setPristine();
    };
    $scope.addProject =function(){
        dataIn.addProject($scope.newProject).then(function(){
        });
    };
    //panel collapse
    $scope.panelStatus = [];
    $scope.addPanel = function(){
        $scope.panelStatus.push(false);
    };
    $scope.openPanel = function(index){
        $scope.panelStatus[index] = $scope.panelStatus[index] ? false : true;
    };
    $scope.editMode = false ;
    if($scope.indexProject){
        $scope.selectProject(-2);
    }

});
