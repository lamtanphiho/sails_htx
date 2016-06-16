/**
 * Created by lamtanphiho on 3/14/2016.
 */
(function() {

    'use strict';

    angular
        .module('betApp').controller('transactionBetCtrl',
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
                $scope.game = "WFT";
                    $http({
                        url: 'api/public/index.php/report/getListTicket',
                        method: "POST"
                    }).success(function (data) {
                        $scope.tickets = data;
                    }).error(function (response) {
                        console.log(response);
                    });

            };
            $scope.init();
             $scope.showDetail = function (data) {
                if(typeof data.res != 'undefined'){
                    data.result = (data.res == 'P') ? 'NotMatchOver' :((data.res == 'WA') ? 'WinAll':((data.res == 'LA') ? 'LostAll':((data.res == 'WH') ? 'WinHalf':((data.res == 'LH') ? 'LostHalf':((data.res == 'D') ? 'Draw':'')))));
                }
                else
                    data.result = '';
                if(typeof data.status == 'undefined')
                    data.status = '';
                data.halff = data.half == 0 ?  'Full Time' : 'First Half';
                var html = '<table id="modal-tran"  width="100%" class="table table-striped table-bordered table-hover">' +
                    '<tr>' +
                    '<th>Username</th>' +
                    '<td>' + data.username + '</td>' +
                    '<th>Bet amount</th>' +
                    '<td>' + data.bet_amount + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Win amount</th>' +
                    '<td>' + data.win_amount + '</td>' +

                    '<th>Valid turnover</th>' +
                    '<td>' + data.valid_turnover + '</td>' +
                    '</tr>' +

                    '<tr>' +
                    '<th>Sub commision</th>' +
                    '<td>' + data.sub_commission + '</td>' +

                    '<th>Game</th>' +
                    '<td>' + data.game + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Odds</th>' +
                    '<td>' + data.odds + '</td>' +
                    '<th>Site</th>' +
                    '<td>' + data.side + '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Info</th>' +
                    '<td>' + data.info + '</td>' +

                    '<th>Half</th>' +
                    '<td>' +data.halff+ '</td>' +
                    '</tr>' +
                    '<tr>' +
                    '<th>Tran Date</th>' +
                    '<td>' + data.trandate + '</td>' +

                    '<th>Match Date</th>' +
                    '<td>' + data.matchdate + '</td>' +
                    '</tr>'+
                    '<tr>' +
                    '<th>Status</th>' +
                    '<td>' + data.result+data.status+'</td>' +

                    '<th>Match Date</th>' +
                    '<td>' + data.matchdate + '</td>' +
                    '</tr>';

                $('#historyBetModal .modal-body').html(html);
                $('#historyBetModal').modal('show');
            };
        $scope.getBetList = function(){
            
            var data1 = {
                game: $('#select-game').val(),
                dateFrom: $('#input-date1').val()+ ' 00:00:00',
                dateTo: $('#input-date2').val() + ' 23:59:59',
                username    : $('#search-id').val(),
            }
            switch(data1.game){
                case 'wft':
                $http({
                        url: 'api/public/index.php/report/getListTicket',
                        method: "POST",
                        data: data1
                    }).success(function (data) {
                        $scope.tickets = data;
                        $scope.game = "WFT";
                        console.log(data);
                    }).error(function (response) {
                        console.log(response);
                    });
                break;
                case 'pt':
                $http({
                        url: 'api/public/index.php/callApi/postBetlistPT',
                        method: "POST",
                        data: data1
                    }).success(function (data) {
                        $scope.tickets = data;
                        $scope.game = "PlayTech";
                        console.log(data);
                    }).error(function (response) {
                        console.log(response);
                    });
                break;
                default:
                 $http({
                        url: 'api/public/index.php/callApi/postBetlistAllbet',
                        method: "POST",
                        data: data1
                    }).success(function (data) {
                        $scope.tickets = data;
                        $scope.game = "Allbet";
                        console.log(data);
                    }).error(function (response) {
                        console.log(response);
                    });
                break;

            }
        }
        
        });
})();



