/**
 * Created by lamtanphiho on 3/14/2016.
 */
(function() {

    'use strict';

    angular
        .module('betApp').controller('reportWelcomeCtrl',
        function ($auth, $state, $http, $rootScope, $scope, API_URL, ngDialog, $socket, $DateTime, ngAudio) {
            $scope.init = function () {
                $scope.trans_datetime = {
                    date_from: $DateTime.getFirstDayOfMonth(),
                    date_to: $DateTime.getToday()
                }
                $scope.dt = $DateTime.getToday();
                $scope.open2 = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $scope.opened = true;
                };
                $http({
                    url: 'api/public/index.php/bonus/getListWelcomeBonus',
                    method: "POST"
                }).success(function (data) {
                    console.log(data);
                    $scope.bonus = data;
                }).error(function (response) {
                    console.log(response);
                });
            };
            $scope.searchBonus = function () {
                var start_date = $('#input-date1').val();
                var end_date = $('#input-date2').val();
                var username = $('#search-id').val();
                var data1 = {
                    start_date: start_date,
                    end_date: end_date,
                    username: username
                };

                $http({
                    url: 'api/public/index.php/bonus/searchWelcomeBonus',
                    method: "POST",
                    data: data1
                }).success(function (data) {
                    $scope.bonus = data;
                })
            };
            $scope.init();
        })
})();



