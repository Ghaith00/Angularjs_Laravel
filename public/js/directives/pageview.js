/**
 * Created by Ghaith on 03/08/2016.
 */

myApp.directive('pageView', function() {
    return {
        restrict: 'E',
        replace: true,
        link: function(scope, element, attrs) {
            scope.getContentUrl = function() {
                return attrs.href ;
            }
        },
        template: '<div ng-include="getContentUrl()"></div>'
    }
});