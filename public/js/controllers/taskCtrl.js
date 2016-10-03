var taskC = myApp.controller('taskController',function ($scope,dataIn,dataUp,modals,$rootScope){
    // data rendering
    $scope.statusTheme = ["yellow","blue","green","red"];
    $scope.getStatus = function(status){
        switch(status) {
            case 0:
                return "On going";
                break;
            case 1:
                return "Submited";
                break;
            case 2:
                return "Confirmed";
                break;
            case 3:
                return "Late";
                break;
            default:
                return -1;
        }
    };
    $scope.renderHtmla = dataUp.renderHtml;

    // select tasks
    $scope.allTasks = [] ;
    angular.forEach($scope.projectList,function(project){
        angular.forEach(project.Tasks,function(task){
            fullTask = {
                Pid : project.Pid ,
                Pname : project.Name,
                User : project.User,
                Tid : task.Tid,
                Name : task.Name,
                Status : task.Status,
                Summary : task.Summary,
                Deadline : task.Deadline,
                ExUser : task.ExUser
            };
            $scope.allTasks.push(fullTask);
        })
    });
    $scope.projectsTasks = $scope.allTasks ;
    $scope.allTasks = $scope.allTasks.concat($scope.mytasksList) ;

    $scope.selectedTask = {
        menuIndex : 0,
        status: ['','Information','Edit','Creation'],
        Tid : '445',
        Index : '',
        IndexFunc : function(){
            this.Index =  $scope.allTasks.findIndex(function(task){
                return $scope.selectedTask.Tid == task.Tid;
            });
        },
        Info: {},
        InfoFunc : function() {
            this.Info = $scope.allTasks[this.Index];
        },
        Init : function(){
            this.Tid = '' ;
            this.Index = '';
            this.Info = { };
        }
    };


    // confirm function
    // submit function
    // delete function
    $scope.handleTask = function (Tid,Name,option) {
        var Msg = {};
        switch (option) {
            case 0 :
                Msg = {
                    header:"Complete [ "+Name +" ] :",
                    body:"Are you sure you want to confirm this task ?"
                };
                break;
            case 1 :
                Msg = {
                    header:"Submit [ "+Name +" ] :",
                    body:"Are you sure you want to submit this task ?"
                };
                break;
            default :
                Msg = {
                    header:"Delete [ "+Name +" ] :",
                    body:"Are you sure you want to delete this task ?"
                };
        }
        modals.confirmation(Msg).result.then(function () {
            // when we hit Yes
                dataIn.handleTask(Tid,option).
                then(
                    function(response){
                        // receive  the response (no error handling)
                        $scope.msg = response ;
                    }
                ).
                then(function(){
                    // so we update data
                    dataUp.getProjects().
                    then(
                        function(response){
                            $scope.projectList = response;
                        }
                    );
                })
        },function () {
            // when we hit No
        });
    };
    // edit function
    $scope.editTask = function(Tid){
        $scope.selectedTask.Tid = Tid;
        $scope.selectedTask.IndexFunc();
        $scope.selectedTask.InfoFunc();
        window.console.log($scope.selectedTask);
        //noinspection JSUnresolvedVariable
        if($scope.selectedTask.Info.Status == 2){
            var alertMsg = {
                header:"Alert",
                body:"This task Is completed , you can't change it !",
                alert:'yes'
            };
            modals.alert(alertMsg);
        }else {
            $scope.selectedTask.menuIndex = 2;
        }
        $scope.taskForm.$setPristine();
    };
    $scope.isEdit = function(){
      return !$scope.mytasksList.findIndex(function(task){
          return task.Tid == $scope.selectedTask.Tid ;
      })
    };

    // view function
    $scope.viewTask = function(Tid){
        $scope.selectedTask.Tid = Tid;
        $scope.selectedTask.IndexFunc();
        $scope.selectedTask.InfoFunc();
        $scope.selectedTask.menuIndex = 1 ;
        $scope.taskForm.$setPristine();

    };

    // New task
    $scope.newTask = function(){
        $scope.selectedTask.Init();
        $scope.selectedTask.Info.Pname = $scope.projectList[$scope.indexProject].Name;
        $scope.selectedTask.Info.User = $rootScope.mainuser.username ;
        $scope.selectedTask.menuIndex = 3;
        $scope.taskForm.$setPristine();
    };

    // back to tasks view
    $scope.backTask = function(){
        $scope.selectedTask.menuIndex = 0;
        $scope.selectedTask.Init();
    };
    // send or save function
    $scope.saveTask = function(){
        dataIn.saveTask($scope.selectedTask.Info).then(function(response){
            alert('404');
            if(response){
                $scope.selectedTask.menuIndex = 0;
            }else{}
        });
    };
    // search username
    $scope.searchUsername = function(username){
        return dataUp.searchUsername(username).then(function(response){
           return response ;
        });
    };
});