/**
 * Created by lamtanphiho on 3/14/2016.
 */
(function() {

    'use strict';

    angular
        .module('betApp').controller('TransCtrl',
        function ($auth,
                  $state,
                  $http,
                  $rootScope,
                  $scope,
                  API_URL,
                  ngDialog,
                  $socket,
                  $DateTime,
                  ngAudio) {

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
                url: 'api/public/index.php/trans/view',
                method: "POST"
            }).success(function (data) {
                $rootScope.transactions = data.transactions;
                // console.log($scope.transactions);
            }).error(function (response) {
                console.log(response);


                if (response.error == 'token_not_provided')
                    $state.go('login');
                else
                {

                }

            });
            //======================= function deposit ====================================
            $scope.showDetailDepo = function (data) {
                var html = '<table id="modal-tran"  width="100%" class="table table-striped table-bordered table-hover">' +
                    '<tr>' +
                    '<th>Username</th>' +
                    '<td>' + data.username + '</td>' +
                    '<th>Payment method</th>' +
                    '<td>' + data.payment_method + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Bank account name</th>' +
                    '<td>' + data.bank_account_name + '</td>' +

                    '<th>Bank account no</th>' +
                    '<td>' + data.bank_account_number + '</td>' +
                    '</tr>' +

                    '<tr>' +
                    '<th>From bank</th>' +
                    '<td>' + data.from_bank + '</td>' +

                    '<th>To bank</th>' +
                    '<td>' + data.to_bank + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Deposit amount</th>' +
                    '<td>' + data.amount + '</td>' +
                    '<th>Bonus amount</th>' +
                    '<td>' + data.bonus_amount + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Currency</th>' +
                    '<td>' + data.currency + '</td>' +

                    '<th>Date time</th>' +
                    '<td>' + data.created_at + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Messages</th>' +
                    '<td>' + data.messages + '</td>' +

                    '<th>process by</th>' +
                    '<td>' + data.update_by + '</td>' +
                    '</tr>';

                $('#myModal .modal-body').html(html);
                $('#myModal').modal('show');
            }
            $scope.confirm = function (_content, data, callback) {
                //console.log(data);
                $scope._content = _content;
                $scope.tranData = data;
                $scope.callback = function () {
                    callback();
                };
                ngDialog.open({

                    // Config dialog
                    template: 'app/views/dialog/confirm.html',
                    className: 'ngdialog-theme-flat ngdialog-theme-custom',
                    scope: $scope
                });
            }

            $scope.close_confirm = function () {
                angular.element('.ngdialog-close').trigger('click');
            }
            $scope.acceptDeposit = function () {
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
                var user = JSON.parse(localStorage.getItem('userAdmin'));
                var data1 = {
                    depositData: $scope.tranData,
                    admin: user.username,
                    filter: filter,
                    start_date: start_date,
                    end_date: end_date
                }

                $http({
                    url: 'api/public/index.php/trans/acceptTransactionDepo',
                    method: "POST",
                    data: data1,
                }).success(function (data) {
                    data1.result = true;
                    data1.msg = 'Deposit success !';
                    $rootScope.transactions = data.transactions;
                    $socket.emit('transaction.acceptDeposit', $scope.tranData);
                });
            }
            $scope.rejectDeposit = function () {
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
                var user = JSON.parse(localStorage.getItem('userAdmin'));
                var data1 = {
                    depositData: $scope.tranData,
                    admin: user.username,
                    filter: filter,
                    start_date: start_date,
                    end_date: end_date
                }

                $http({
                    url: 'api/public/index.php/trans/rejectTransactionDepo',
                    method: "POST",
                    data: data1,
                    //dataType: 'json'
                }).success(function (data) {
                    data1.result = false;
                    data1.msg = 'Deposit failed, please contact admin for more details !';
                    $rootScope.transactions = data.transactions;
                    $socket.emit('transaction.rejectDeposit', $scope.tranData);
                });
            }
            $scope.searchTransaction = function () {
                var filter = "";
                var start_date = $('#input-date1').val();
                var end_date = $('#input-date2').val();
                var username = $('#search-id').val();
                var admin_name = $('#search-admin-id').val();
                var type_trans = $('#select-type').val();
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
                    admin_name: admin_name,
                    type_trans:type_trans
                }
//console.log(data1);return;
                $http({
                    url: 'api/public/index.php/trans/searchTransaction',
                    method: "POST",
                    data: data1,
                }).success(function (data) {
                    //console.log(data);
                    $rootScope.transactions = data.transactions;
                })
                }
            //========================== function withdraw ===================================
            $scope.showDetailWith = function (data) {
                var html = '<table id="modal-tran"  width="100%" class="table table-striped table-bordered table-hover">' +
                    '<tr>' +
                    '<th>Username</th>' +
                    '<td>' + data.username + '</td>' +
                    '<th>Payment method</th>' +
                    '<td>' + data.payment_method + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Bank account name</th>' +
                    '<td>' + data.bank_account_name + '</td>' +

                    '<th>Bank account no</th>' +
                    '<td>' + data.bank_account_number + '</td>' +
                    '</tr>' +

                    '<tr>' +
                    '<th>Bank name</th>' +
                    '<td>' + data.bank_name + '</td>' +

                    '<th>Amount</th>' +
                    '<td>' + data.amount + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Currency</th>' +
                    '<td>' + data.currency + '</td>' +

                    '<th>Date time</th>' +
                    '<td>' + data.created_at + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Messages</th>' +
                    '<td>' + data.messages + '</td>' +

                    '<th>process by</th>' +
                    '<td>' + data.update_by + '</td>' +
                    '</tr>';
                $('#myModal .modal-body').html(html);
                $('#myModal').modal('hide');
                $('#myModal').modal('show');
            }
            $scope.acceptWithdraw = function () {
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
                var user = JSON.parse(localStorage.getItem('userAdmin'));
                var data1 = {
                    depositData: $scope.tranData,
                    admin: user.username,
                    filter: filter,
                    start_date: start_date,
                    end_date: end_date
                }

                $http({
                    url: 'api/public/index.php/trans/acceptTransactionWith',
                    method: "POST",
                    data: data1,
                }).success(function (data) {
                    data1.result = true;
                    data1.msg = 'Withdraw success !';
                    $rootScope.transactions = data.transactions;
                    $socket.emit('transaction.acceptWithdraw', $scope.tranData);
                }).error(function (response) {
                    $scope.loginErrorText = response.error;
                    ngDialog.open({
                        template: 'dist/dialog/popupTmpl.html',
                        className: 'ngdialog-theme-flat ngdialog-theme-custom',
                        scope: $scope
                    });
                });
            }
            $scope.rejectWithdraw = function () {
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
                var user = JSON.parse(localStorage.getItem('userAdmin'));
                var data1 = {
                    depositData: $scope.tranData,
                    admin: user.username,
                    filter: filter,
                    start_date: start_date,
                    end_date: end_date
                }

                $http({
                    url: 'api/public/index.php/trans/rejectTransactionWith',
                    method: "POST",
                    data: data1,
                    //dataType: 'json'
                }).success(function (data) {
                    data1.result = false;
                    data1.msg = 'Withdraw failed, please contact admin for more details !';
                    $rootScope.transactions = data.transactions;
                    $socket.emit('transaction.rejectWithdraw', $scope.tranData);
                });
            }

        })
})();


//====================================== depositCtrl ===================================
app.controller('DepositCtrl',function ($auth, $state, $http, $rootScope, $scope, API_URL, ngDialog, $socket, $DateTime, ngAudio) {
    $scope.ini = function() {
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
            url: 'api/public/index.php/trans/depo/view',
            method: "POST"
        }).success(function (data) {
            $rootScope.transactions = data.transactions;
            //console.log($scope.transactions);
        }).error(function (response) {
            console.log(response);


            if (response.error == 'token_not_provided')
                $state.go('login');
            else
            {

            }

        });


    }
    $scope.ini();
    $scope.showDetailDepo = function (data) {
        var html = '<table id="modal-tran"  width="100%" class="table table-striped table-bordered table-hover">' +
            '<tr>' +
            '<th>Username</th>' +
            '<td>' + data.username + '</td>' +
            '<th>Payment method</th>' +
            '<td>' + data.payment_method + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Bank account name</th>' +
            '<td>' + data.bank_account_name + '</td>' +

            '<th>Bank account no</th>' +
            '<td>' + data.bank_account_number + '</td>' +
            '</tr>' +

            '<tr>' +
            '<th>From bank</th>' +
            '<td>' + data.from_bank + '</td>' +

            '<th>To bank</th>' +
            '<td>' + data.to_bank + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Deposit amount</th>' +
            '<td>' + data.amount + '</td>' +
            '<th>Bonus amount</th>' +
            '<td>' + data.bonus_amount + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Currency</th>' +
            '<td>' + data.currency + '</td>' +

            '<th>Date time</th>' +
            '<td>' + data.created_at + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Messages</th>' +
            '<td>' + data.messages + '</td>' +

            '<th>process by</th>' +
            '<td>' + data.update_by + '</td>' +
            '</tr>';

        $('#myModal .modal-body').html(html);
        $('#myModal').modal('show');
    }
    $scope.confirm = function (_content, data, callback) {
        //console.log(data);
        $scope._content = _content;
        $scope.tranData = data;
        $scope.callback = function () {
            callback();
        };
        ngDialog.open({

            // Config dialog
            template: 'app/views/dialog/confirm.html',
            className: 'ngdialog-theme-flat ngdialog-theme-custom',
            scope: $scope
        });
    }
    $scope.close_confirm = function () {
        angular.element('.ngdialog-close').trigger('click');
    }
    $scope.acceptDeposit = function () {
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
        var user = JSON.parse(localStorage.getItem('userAdmin'));
        var data1 = {
            depositData: $scope.tranData,
            admin: user.username,
            filter: filter,
            start_date: start_date,
            end_date: end_date
        }

        $http({
            url: 'api/public/index.php/trans/acceptDepo',
            method: "POST",
            data: data1,
        }).success(function (data) {
            data1.result = true;
            data1.msg = 'Deposit success !';
            $rootScope.transactions = data.transactions;
            $socket.emit('transaction.acceptDeposit', $scope.tranData);
        });
    }
    $scope.rejectDeposit = function () {
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
        var user = JSON.parse(localStorage.getItem('userAdmin'));
        var data1 = {
            depositData: $scope.tranData,
            admin: user.username,
            filter: filter,
            start_date: start_date,
            end_date: end_date
        }
console.log(data1);
        $http({
            url: 'api/public/index.php/trans/rejectDepo',
            method: "POST",
            data: data1,
            //dataType: 'json'
        }).success(function (data) {
            data1.result = false;
            data1.msg = 'Deposit failed, please contact admin for more details !';
            $rootScope.transactions = data.transactions;
            $socket.emit('transaction.rejectDeposit', $scope.tranData);
        });
    }
    $scope.searchTransaction = function () {
        var filter = "";
        var start_date = $('#input-date1').val();
        var end_date = $('#input-date2').val();
        var username = $('#search-id').val();
        $("[name='check_group']:checked").each(function (_key, _val) {

            if (filter == '')
                filter = $(this).val();
            else
                filter += '-' + $(this).val();
        });
        console.log(filter);
        var data1 = {
            filter: filter,
            start_date: start_date,
            end_date: end_date,
            username: username
        }

        $http({
            url: 'api/public/index.php/trans/searchDeposit',
            method: "POST",
            data: data1,
        }).success(function (data) {
            //console.log(data);
            $rootScope.transactions = data.transactions;
        })
    }


    })
app.controller('WithdrawCtrl',function ($auth, $state, $http, $rootScope, $scope, API_URL, ngDialog, $socket, $DateTime, ngAudio) {
    $scope.ini = function() {
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
            url: 'api/public/index.php/trans/with/view',
            method: "POST"
        }).success(function (data) {
            $rootScope.transactions = data.transactions;
            //console.log($scope.transactions);
        }).error(function (response) {
            console.log(response);


            if (response.error == 'token_not_provided')
                $state.go('login');
            else
            {

            }

        });


    }
    $scope.ini();
    $scope.confirm = function (_content, data, callback) {
        //console.log(data);
        $scope._content = _content;
        $scope.tranData = data;
        $scope.callback = function () {
            callback();
        };
        ngDialog.open({

            // Config dialog
            template: 'app/views/dialog/confirm.html',
            className: 'ngdialog-theme-flat ngdialog-theme-custom',
            scope: $scope
        });
    }
    $scope.close_confirm = function () {
        angular.element('.ngdialog-close').trigger('click');
    }
    $scope.showDetailWith = function (data) {
        var html = '<table id="modal-tran"  width="100%" class="table table-striped table-bordered table-hover">' +
            '<tr>' +
            '<th>Username</th>' +
            '<td>' + data.username + '</td>' +
            '<th>Payment method</th>' +
            '<td>' + data.payment_method + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Bank account name</th>' +
            '<td>' + data.bank_account_name + '</td>' +

            '<th>Bank account no</th>' +
            '<td>' + data.bank_account_number + '</td>' +
            '</tr>' +

            '<tr>' +
            '<th>Bank name</th>' +
            '<td>' + data.bank_name + '</td>' +

            '<th>Amount</th>' +
            '<td>' + data.amount + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Currency</th>' +
            '<td>' + data.currency + '</td>' +

            '<th>Date time</th>' +
            '<td>' + data.created_at + '</td>' +
            '</tr>' +
            '<tr>' +
            '<th>Messages</th>' +
            '<td>' + data.messages + '</td>' +

            '<th>process by</th>' +
            '<td>' + data.update_by + '</td>' +
            '</tr>';
        $('#myModal .modal-body').html(html);
        $('#myModal').modal('hide');
        $('#myModal').modal('show');
    }
    $scope.acceptWithdraw = function () {
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
        var user = JSON.parse(localStorage.getItem('userAdmin'));
        var data1 = {
            depositData: $scope.tranData,
            admin: user.username,
            filter: filter,
            start_date: start_date,
            end_date: end_date
        }

        $http({
            url: 'api/public/index.php/trans/acceptWith',
            method: "POST",
            data: data1,
        }).success(function (data) {
            data1.result = true;
            data1.msg = 'Withdraw success !';
            $rootScope.transactions = data.transactions;
            $socket.emit('transaction.acceptWithdraw', $scope.tranData);
        }).error(function (response) {
            $scope.loginErrorText = response.error;
            ngDialog.open({
                template: 'dist/dialog/popupTmpl.html',
                className: 'ngdialog-theme-flat ngdialog-theme-custom',
                scope: $scope
            });
        });
    }
    $scope.rejectWithdraw = function () {
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
        var user = JSON.parse(localStorage.getItem('userAdmin'));
        var data1 = {
            depositData: $scope.tranData,
            admin: user.username,
            filter: filter,
            start_date: start_date,
            end_date: end_date
        }

        $http({
            url: 'api/public/index.php/trans/rejectWith',
            method: "POST",
            data: data1,
            //dataType: 'json'
        }).success(function (data) {
            data1.result = false;
            data1.msg = 'Withdraw failed, please contact admin for more details !';
            $rootScope.transactions = data.transactions;
            $socket.emit('transaction.rejectWithdraw', $scope.tranData);
        });
    }
    $scope.searchTransaction = function () {
        var filter = "";
        var start_date = $('#input-date1').val();
        var end_date = $('#input-date2').val();
        var username = $('#search-id').val();
        $("[name='check_group']:checked").each(function (_key, _val) {

            if (filter == '')
                filter = $(this).val();
            else
                filter += '-' + $(this).val();
        });
        console.log(filter);
        var data1 = {
            filter: filter,
            start_date: start_date,
            end_date: end_date,
            username: username
        }

        $http({
            url: 'api/public/index.php/trans/searchWithdraw',
            method: "POST",
            data: data1,
        }).success(function (data) {
            //console.log(data);
            $rootScope.transactions = data.transactions;
        })
    }


    })


