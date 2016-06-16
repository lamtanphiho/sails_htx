/**
 * Created by lamtanphiho on 3/14/2016.
 */
(function() {

    'use strict';

    angular
        .module('betApp').controller('reportRabatCtrl',
        function ($auth, $state, $http, $rootScope, $scope, API_URL, ngDialog, $socket, $DateTime) {
            var addDays = function(theDate, days) {
                var date = new Date(theDate);
                return new Date(date.getTime() + days*24*60*60*1000).toISOString();
            }       
            var monday = function(d) {
              d = new Date(d);
              var day = d.getDay(),
                  diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
              return new Date(d.setDate(diff)).toISOString();
            }
           
            $scope.mondays = {};
            $scope.init = function () {
                var day = 0;
                var date = new Date();
                var current_monday = monday(date);
                for(var i =0;i<5;i++)
                {

                    $scope.mondays[i] ={
                        From: current_monday.substr(0,10),
                        To  : addDays(current_monday,7).substr(0,10)
                    }
                    day -=7;
                    current_monday = addDays(monday(date),day);
                    
                }

                
                // $scope.trans_datetime = {
                //     date_from: $DateTime.getFirstDayOfMonth(),
                //     date_to: $DateTime.getToday()
                // };
                // $scope.dt = $DateTime.getToday();
                // $scope.open2 = function (event) {
                //     event.preventDefault();
                //     event.stopPropagation();
                //     $scope.opened = true;
                // };
                $http({
                    url: 'api/public/index.php/bonus/getListRabatBonus',
                    method: "POST",
                    
                }).success(function (data) {
                    $scope.bonus = data;
                }).error(function (response) {
                    console.log(response);
                });
            };
            $scope.init();
            


            $scope.close_confirm = function () {
                angular.element('.ngdialog-close').trigger('click');
            }
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
             $scope.acceptRabatBonus = function () {
                angular.element('.ngdialog-close').trigger('click');
                    var filter = "";
                    var date_value = JSON.parse($('#period-rabat').val());
                    
                    $("[name='check_group']:checked").each(function (_key, _val) {
                        if (filter == '')
                            filter = $(this).val();
                        else
                            filter += '-' + $(this).val();
                    });
                    var data1 = {
                        bonusData: $scope.bonu,
                        filter: filter,
                        start_date: date_value.dateFrom,
                        end_date: date_value.dateTo
                    }

                    $http({
                        url: 'api/public/index.php/bonus/acceptRabatBonus',
                        method: "POST",
                        data: data1,
                    }).success(function (data) {
                    $scope.bonus = data.bonus;
                    $socket.emit('credit:updated', {username:$scope.bonu.username} );
                });
            }
            $scope.rejectRabatBonus = function () {
                angular.element('.ngdialog-close').trigger('click');
                angular.element('.ngdialog-close').trigger('click');
                var filter = "";
                var date_value = JSON.parse($('#period-rabat').val());
                $("[name='check_group']:checked").each(function (_key, _val) {
                    if (filter == '')
                        filter = $(this).val();
                    else
                        filter += '-' + $(this).val();
                });
                var data1 = {
                    bonusData: $scope.bonu,
                    filter: filter,
                     start_date: date_value.dateFrom,
                    end_date: date_value.dateTo
                }

                $http({
                    url: 'api/public/index.php/bonus/rejectRabatBonus',
                    method: "POST",
                    data: data1,
                }).success(function (data) {
                    $scope.bonus = data.bonus;
                });
            }
             $scope.searchBonus = function () {
                var filter = "";
                var date_value = JSON.parse($('#period-rabat').val());
                
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
                     start_date: date_value.dateFrom,
                    end_date: date_value.dateTo,
                    username: username,
                    admin_name: admin_name
                }

                $http({
                    url: 'api/public/index.php/bonus/searchRabatBonus',
                    method: "POST",
                    data: data1,
                }).success(function (data) {
                    //console.log(data);
                    $scope.bonus = data;
                })
            }
        })
})();



