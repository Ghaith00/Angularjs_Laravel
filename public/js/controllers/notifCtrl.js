myApp.controller('notifController', function($scope,$interval,dataUp){
	$scope.notifList = [] ;
	if(angular.isUndefined($scope.count)){
		$scope.count = 0 ;
	}
	
	var getNotif = function(){
		dataUp.getNotif().then(function(response){
			$scope.notifList = response ;
		});
		$scope.count += 1;
	};
	getNotif();
	$interval(getNotif,5000);
});