/**
 * Created by Ghaith on 10/08/2016.
 */
myApp.directive('typeahead', function() {
  return {
    restrict: 'E',
    scope: {
            updateFn: '&',
            ngModel: '=',
            ngDisabled:'='
    },
    link: function(scope, elem, attrs) {
        scope.placeHolder = attrs.placeHolder ;
        scope.iClass = attrs.iClass;
        scope.items = [];
        scope.loading = false ;
        scope.searchFn = function(msg){

            scope.loading = true ; 
            scope.updateFn({msg : msg}).then(function(data){
                scope.loading = false ;
                scope.items = data ;
            })
        }
    },
    templateUrl: 'partials/search.html'
  };
});

