'use strict';
/**
 * @ngdoc function
 * @name htxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the htxApp
 */
app
  .controller('xeCtrl', function($scope, $http ) {
     $scope.init = function() {
        $scope.child = '';
        $http({
            url: 'xe',
            method: "GET"
        }).success(function (data) {
            $scope.xe = data;
            console.log(data)
        }).error(function (response) {
            console.log(response.error);
            if (response.error == 'token_not_provided')
                $state.go('login');
        });
    };
    $scope.init();
});