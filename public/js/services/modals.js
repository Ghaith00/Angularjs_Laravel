/**
 * Created by Ghaith on 09/08/2016.
 */
myApp.service('modals',function ($uibModal){
    this.confirmation = function(model_data){
        return $uibModal.open({
            animation : true,
            size : 'sm',
            templateUrl : 'partials/modal.html',
            controller : 'ModalInstanceCtrl',
            windowClass : 'centered-window',
            resolve : {
                model_data: function () {
                    return model_data;
                }
            }
        });
    };
    this.alert  = function(model_data){
        return $uibModal.open({
            animation : true,
            size : 'sm',
            templateUrl : 'partials/modal.html',
            controller : 'ModalInstanceCtrl',
            windowClass : 'centered-window',
            resolve : {
                model_data: function () {
                    return model_data;
                }
            }
        });
    }

});

myApp.controller('ModalInstanceCtrl',function ($scope, $uibModalInstance, model_data) {
    $scope.model_data = model_data ;

    $scope.modalType = 0 ;
    if($scope.model_data.alert){
        $scope.modalType = 1
    }
    $scope.ok = function () {
        $uibModalInstance.close();
    };
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
});