/**
 * Created by Ghaith on 13/08/2016.
 */
myApp.service('notify',function($rootScope){
    
});

myApp.directive('notifyBar',function(){
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
        },
        template: '<div class="error" ng-repeat="c in notifyList track by $index">{{c}}</div>'
    }
});
