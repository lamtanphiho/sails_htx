/**
 * Created by lamtanphiho on 3/14/2016.
 */
(function() {

    'use strict';

    angular
        .module('betApp').controller('reportExtraCtrl',
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
                    url: 'api/public/index.php/bonus/getListBonus',
                    method: "POST"
                }).success(function (data) {
                    $scope.bonus = data;
                }).error(function (response) {
                    console.log(response);
                });
            };
            $scope.confirm = function (content, data, callback) {
                $scope._content = content;
                $scope.bonu = data;
                $scope.callback = function () {
                    callback();
                };
                ngDialog.open({
                    template: 'app/views/dialog/confirm.html',
                    className: 'ngdialog-theme-flat ngdialog-theme-custom',
                    scope: $scope
                });
            }
            $scope.acceptBonus = function () {
                angular.element('.ngdialog-close').trigger('click');
                    var filter = "";
                    var start_date = $('#input-date1').val();
                    var end_date = $('#input-date2').val();
                    $("[name='check_group']:checked").each(function (_key, _val) {
                        if (filter == '')
                            filter = $(this).val();
                        else
                            filter += '-' + $(this).val();
                    });
                    var data1 = {
                        bonusData: $scope.bonu,
                        filter: filter,
                        start_date: start_date,
                        end_date: end_date
                    }

                    $http({
                        url: 'api/public/index.php/bonus/acceptBonus',
                        method: "POST",
                        data: data1,
                    }).success(function (data) {
                    $scope.bonus = data.bonus;
                    $socket.emit('credit:updated', {username:$scope.bonu.username} );
                });
            }
            $scope.rejectBonus = function () {
                angular.element('.ngdialog-close').trigger('click');
                angular.element('.ngdialog-close').trigger('click');
                var filter = "";
                var start_date = $('#input-date1').val();
                var end_date = $('#input-date2').val();
                $("[name='check_group']:checked").each(function (_key, _val) {
                    if (filter == '')
                        filter = $(this).val();
                    else
                        filter += '-' + $(this).val();
                });
                var data1 = {
                    bonusData: $scope.bonu,
                    filter: filter,
                    start_date: start_date,
                    end_date: end_date
                }

                $http({
                    url: 'api/public/index.php/bonus/rejectBonus',
                    method: "POST",
                    data: data1,
                }).success(function (data) {
                    $scope.bonus = data.bonus;
                });
            }
            $scope.close_confirm = function () {
                angular.element('.ngdialog-close').trigger('click');
            }
            $scope.searchBonus = function () {
                var filter = "";
                var start_date = $('#input-date1').val();
                var end_date = $('#input-date2').val();
                var username = $('#search-id').val();
                var admin_name = $('#search-admin-id').val();
                $("[name='check_group']:checked").each(function (_key, _val) {

                    if (filter == '')
                        filter = $(this).val();
                    else
                        filter += '-' + $(this).val();
                });
                var data1 = {
                    filter: filter,
                    start_date: start_date,
                    end_date: end_date,
                    username: username,
                    admin_name: admin_name
                }

                $http({
                    url: 'api/public/index.php/bonus/searchBonus',
                    method: "POST",
                    data: data1,
                }).success(function (data) {
                    //console.log(data);
                    $scope.bonus = data;
                })
            }
            $scope.init();
        })
})();



