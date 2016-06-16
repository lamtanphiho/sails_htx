'use strict';

//Datepicker
app

    .directive("mydatepicker", function($DateTime){
        return {
            restrict: "E",
            scope:{
                ngModel: "=",
                dateOptions: "=",
                opened: "=",
            },
            link: function($scope, element, attrs) {
                $scope.dt = $DateTime.getFirstDayOfMonth()
                $scope.open = function(event){
                    event.preventDefault();
                    event.stopPropagation();
                    $scope.opened = true;
                };

                $scope.clear = function () {
                    $scope.ngModel = null;
                };
            },
            templateUrl: 'app/scripts/directives/datetime/datetime.html'

        }
    })
 .directive("mydatepicker1", function($DateTime){
        return {
            restrict: "E",
            scope:{
                ngModel: "=",
                dateOptions: "=",
                opened: "=",
            },
            link: function($scope, element, attrs) {
                $scope.dt = $DateTime.getFirstDayOfMonth()
                $scope.open = function(event){
                    event.preventDefault();
                    event.stopPropagation();
                    $scope.opened = true;
                };

                $scope.clear = function () {
                    $scope.ngModel = null;
                };
            },
            templateUrl: 'app/scripts/directives/datetime/datetime.html'

        }
    })



