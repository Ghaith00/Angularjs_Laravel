myApp.controller('editController',function ($scope,$state,dataIn){
    $scope.project = $scope.projectList[$scope.indexProject];
    if(!$scope.indexProject){
    	$state.go('home.project');
    }
})