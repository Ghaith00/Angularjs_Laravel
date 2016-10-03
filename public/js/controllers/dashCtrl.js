/**
 * Created by Ghaith on 04/08/2016.
 */
myApp.controller('dashController',function($scope, dataUp){
    // dir 
    $scope.searchUser = function(msg) {  
        return dataUp.searchUsername().then(function(data) {
            return $scope.item = data;
        });
    }


    // Tasks stats
    $scope.taskstatReq = {data:[],error:""};
    $scope.taskType = ["On going","Submited","Completed","Late"];
    $scope.taskTypeTheme = ["on-going","submited","completed","late"];
    dataUp.taskStats().then(
        function(response){
            if (response.constructor.toString().indexOf("Array") != -1) {
                $scope.taskstatReq.data = response;
                $scope.maxTask = Math.max(...$scope.taskstatReq.data[0].concat($scope.taskstatReq.data[1]));
            } else {
                $scope.taskstatReq.error = response;
            }
        }
    );

    // Projects stats
    $scope.projectstatReq = {data:"",error:""};
    $scope.projectType = ["on going","finished","late"];
    dataUp.projectStats().then(
        function(response){
            if (response.constructor.toString().indexOf("Array") != -1) {
                $scope.projectstatReq.data = response;
            } else {
                $scope.projectstatReq.error = response;
            }
        }
    );
    //stats view
    $scope.maxTask = 1 ;
    $scope.getSt = function (number) {
        return (number / $scope.maxTask)*100 ;
    }

    // html render
    $scope.renderHtml = dataUp.renderHtml;
});
