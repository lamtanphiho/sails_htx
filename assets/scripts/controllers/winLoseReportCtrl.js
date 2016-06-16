/**
 * Created by lamtanphiho on 3/14/2016.
 */
(function() {

    'use strict';

    angular
        .module('betApp').controller('winLoseReportCtrl',
        function ($auth, $state, $http, $rootScope, $scope, API_URL, ngDialog, $socket, $DateTime, ngAudio) {
            $scope.init = function () {
                $scope.trans_datetime = {
                    date_from: $DateTime.getFirstDayOfMonth(),
                    date_to: $DateTime.getToday()
                };
                $('#datetimepicker1').datetimepicker({
                    defaultDate: $scope.trans_datetime.date_from,
                    disabledDates: [
                        moment("12/25/2013"),
                        new Date(2013, 11 - 1, 21),
                        "11/22/2013 00:53"
                    ],
                    format: 'YYYY-MM-DD HH:mm:ss'
                });
                $('#datetimepicker2').datetimepicker({
                    defaultDate: $scope.trans_datetime.date_to +' 12:00:00',
                    disabledDates: [
                        moment("12/25/2013"),
                        new Date(2013, 11 - 1, 21),
                        "11/22/2013 00:53"
                    ],
                    format: 'YYYY-MM-DD HH:mm:ss'
                });
            
                $http({
                    url: 'api/public/index.php/report/getWinLose',
                    method: "POST"
                }).success(function (data) {
                    $scope.agents       = data;
                    angular.forEach($scope.agents, function(value, key) {
                        $scope.agents[key].win_lose.wft.bet_amount            = $scope.agents[key].win_lose.wft.bet_amount != null ? $scope.agents[key].win_lose.wft.bet_amount :0;
                        $scope.agents[key].win_lose.playtech.totalBet         = $scope.agents[key].win_lose.playtech.totalBet != null ? $scope.agents[key].win_lose.playtech.totalBet :0;
                        $scope.agents[key].win_lose.allbet.totalBet           = $scope.agents[key].win_lose.allbet.totalBet != null ? $scope.agents[key].win_lose.allbet.totalBet :0;
                        $scope.agents[key].win_lose.wft.winlose               = $scope.agents[key].win_lose.wft.winlose != null ? $scope.agents[key].win_lose.wft.winlose :0;
                        $scope.agents[key].win_lose.playtech.winLose          = $scope.agents[key].win_lose.playtech.winLose != null ? $scope.agents[key].win_lose.playtech.winLose :0;
                        $scope.agents[key].win_lose.allbet.winLose            = $scope.agents[key].win_lose.allbet.winLose != null ? $scope.agents[key].win_lose.allbet.winLose :0;
                        $scope.agents[key].total_amount              = {};
                        $scope.agents[key].commbase                  = {};
                        $scope.agents[key].total_amount.wft          = $scope.agents[key].win_lose.wft.winlose*1 + $scope.agents[key].welcome.wft.bonus*1 + $scope.agents[key].rabat.wft.bonus*1;

                        $scope.agents[key].total_amount.playtech    = $scope.agents[key].win_lose.playtech.winLose*1 + $scope.agents[key].welcome.playtech.bonus*1 + $scope.agents[key].rabat.playtech.bonus*1;
                        $scope.agents[key].total_amount.allbet    = $scope.agents[key].win_lose.allbet.winLose*1 + $scope.agents[key].welcome.allbet.bonus*1 + $scope.agents[key].rabat.allbet.bonus*1;
                         $scope.agents[key].commbase.wft                =    $scope.agents[key].win_lose.wft.bet_amount - $scope.agents[key].draw.wft;
                         $scope.agents[key].commbase.playtech                =    $scope.agents[key].win_lose.playtech.totalBet - $scope.agents[key].win_lose.playtech.totalDraw;
                         $scope.agents[key].commbase.allbet                =    $scope.agents[key].win_lose.allbet.totalBet - $scope.agents[key].win_lose.allbet.totalDraw;
                        $scope.agents[key].share                    = {
                            wft             : 90,
                            playtech        : 84,
                            allbet          : 88,
                            totalWft        : $scope.agents[key].total_amount.wft *0.1,
                            totalPlaytech   : $scope.agents[key].total_amount.playtech *0.1,
                            totalAllbet     : $scope.agents[key].total_amount.allbet *0.1,
                        };
                        $scope.agents[key].net_profitWft                = -1*$scope.agents[key].total_amount.wft *($scope.agents[key].share.wft)/100;
                        $scope.agents[key].net_profitPlaytech           = -1*$scope.agents[key].total_amount.playtech *($scope.agents[key].share.playtech)/100;
                        $scope.agents[key].net_profitAllbet             = -1*$scope.agents[key].total_amount.allbet *($scope.agents[key].share.allbet)/100;
                        $scope.agents[key].total = {
                            bet_amount      : value.win_lose.wft.bet_amount*1 + value.win_lose.playtech.totalBet*1 + value.win_lose.allbet.totalBet*1,
                            wl_amount       : $scope.agents[key].win_lose.wft.winlose*1  + $scope.agents[key].win_lose.playtech.winLose*1 + $scope.agents[key].win_lose.allbet.winLose*1,
                            commbase        : $scope.agents[key].commbase.wft*1  + $scope.agents[key].commbase.playtech*1 + $scope.agents[key].commbase.allbet*1,
                            transferBonus   : value.welcome.wft.bonus*1 + value.welcome.playtech.bonus*1,
                            rabatBonus      : value.rabat.wft.bonus*1 + value.rabat.playtech.bonus*1,
                            total_amount    : $scope.agents[key].total_amount.wft*1 + $scope.agents[key].total_amount.playtech*1 + $scope.agents[key].total_amount.allbet*1,
                            share           : $scope.agents[key].share.wft,
                            shareTotal      : $scope.agents[key].share.totalWft*1 + $scope.agents[key].share.totalPlaytech*1 + $scope.agents[key].share.totalAllbet*1,
                            netProfit       : -1*$scope.agents[key].net_profitWft*1 + $scope.agents[key].net_profitPlaytech*1 + $scope.agents[key].net_profitAllbet*1,
                        }

                    });
                    console.log($scope.agents);
                    
                }).error(function (response) {
                    console.log(response);
                });

            
            };
            
            $scope.init();
            $scope.searchWinLose = function(){
                $('#winlose-member').css('display', 'none');
                var data = {
                    dateFrom: $('#datetimepicker1 input').val(),
                    dateTo: $('#datetimepicker2 input').val(),
                }
                
                $http({
                    url: 'api/public/index.php/report/getWinLose',
                    method: "POST",
                    data: data
                }).success(function (data) {
                    $scope.agents       = data;
                    angular.forEach($scope.agents, function(value, key) {
                        $scope.agents[key].win_lose.wft.bet_amount            = $scope.agents[key].win_lose.wft.bet_amount != null ? $scope.agents[key].win_lose.wft.bet_amount :0;
                        $scope.agents[key].win_lose.playtech.totalBet         = $scope.agents[key].win_lose.playtech.totalBet != null ? $scope.agents[key].win_lose.playtech.totalBet :0;
                        $scope.agents[key].win_lose.allbet.totalBet           = $scope.agents[key].win_lose.allbet.totalBet != null ? $scope.agents[key].win_lose.allbet.totalBet :0;
                        $scope.agents[key].win_lose.wft.winlose               = $scope.agents[key].win_lose.wft.winlose != null ? $scope.agents[key].win_lose.wft.winlose :0;
                        $scope.agents[key].win_lose.playtech.winLose          = $scope.agents[key].win_lose.playtech.winLose != null ? $scope.agents[key].win_lose.playtech.winLose :0;
                        $scope.agents[key].win_lose.allbet.winLose            = $scope.agents[key].win_lose.allbet.winLose != null ? $scope.agents[key].win_lose.allbet.winLose :0;
                        $scope.agents[key].total_amount              = {};
                        $scope.agents[key].commbase                  = {};
                        $scope.agents[key].total_amount.wft          = value.win_lose.wft.winlose*1 + value.welcome.wft.bonus*1 + value.rabat.wft.bonus*1;

                        $scope.agents[key].total_amount.playtech     = $scope.agents[key].win_lose.playtech.winLose*1 + value.welcome.playtech.bonus*1 + value.rabat.playtech.bonus*1;
                        $scope.agents[key].total_amount.allbet       = value.win_lose.allbet.winLose*1 + value.welcome.allbet.bonus*1 + value.rabat.allbet.bonus*1;
                         $scope.agents[key].commbase.wft             =    value.win_lose.wft.bet_amount - value.draw.wft;
                         $scope.agents[key].commbase.playtech        =    value.win_lose.playtech.totalBet - value.win_lose.playtech.totalDraw;
                         $scope.agents[key].commbase.allbet          =    value.win_lose.allbet.totalBet - value.win_lose.allbet.totalDraw;
                        $scope.agents[key].share                    = {
                            wft             : 90,
                            playtech        : 84,
                            allbet          : 88,
                            totalWft        :  $scope.agents[key].total_amount.wft *0.1,
                            totalPlaytech   :  $scope.agents[key].total_amount.playtech *0.1,
                            totalAllbet     :  $scope.agents[key].total_amount.allbet *0.1,
                        };
                        $scope.agents[key].net_profitWft                = -1*$scope.agents[key].total_amount.wft *($scope.agents[key].share.wft)/100;
                        $scope.agents[key].net_profitPlaytech           = -1*$scope.agents[key].total_amount.playtech *($scope.agents[key].share.playtech)/100;
                        $scope.agents[key].net_profitAllbet             = -1*$scope.agents[key].total_amount.allbet *($scope.agents[key].share.allbet)/100;
                        $scope.agents[key].total = {
                            bet_amount      : value.win_lose.wft.bet_amount*1 + value.win_lose.playtech.totalBet*1 + value.win_lose.allbet.totalBet*1,
                            wl_amount       : $scope.agents[key].win_lose.wft.winlose*1  + $scope.agents[key].win_lose.playtech.winLose*1 + $scope.agents[key].win_lose.allbet.winLose*1,
                            commbase        : $scope.agents[key].commbase.wft*1  + $scope.agents[key].commbase.playtech*1 + $scope.agents[key].commbase.allbet*1,
                            transferBonus   : value.welcome.wft.bonus*1 + value.welcome.playtech.bonus*1,
                            rabatBonus      : value.rabat.wft.bonus*1 + value.rabat.playtech.bonus*1,
                            total_amount    : $scope.agents[key].total_amount.wft*1 + $scope.agents[key].total_amount.playtech*1 + $scope.agents[key].total_amount.allbet*1,
                            share           : $scope.agents[key].share.wft,
                            shareTotal      : $scope.agents[key].share.totalWft*1 + $scope.agents[key].share.totalPlaytech*1 + $scope.agents[key].share.totalAllbet*1,
                            netProfit       : -1*$scope.agents[key].net_profitWft*1 + $scope.agents[key].net_profitPlaytech*1 + $scope.agents[key].net_profitAllbet*1,
                        }

                    });
                    
                    console.log($scope.agents);
                }).error(function (response) {
                    console.log(response);
                });
            }
            $scope.winloseMembers = function(game){
                $('#winlose-member').css('display', 'none');
                var data1 = {
                    dateFrom: $('#datetimepicker1 input').val(),
                    dateTo: $('#datetimepicker2 input').val() ,
                }
                 
                $scope.currentGame = game;
                switch($scope.currentGame){
                    case 'wft':
                    $http({
                        url: 'api/public/index.php/report/winlose-members',
                        method: "POST",
                        data: data1, 
                    }).success(function (data) {
                        console.log(data.members);
                        var total={
                            bet_amount      :0,
                            wl_amount       :0,
                            commbase        :0,
                            transferBonus   :0,
                            rabatBonus      :0,
                            total_amount    :0,
                            shareTotal      :0,
                            netProfit       :0
                        }
                        angular.forEach(data.members, function(value, key) {
                            data.members[key].total_amount         = value.winlose[0].winlose*1 + value.welcome*1 + value.rabat*1;
                            total.bet_amount    +=  value.winlose[0].bet_amount*1;
                            total.wl_amount     +=  value.winlose[0].winlose*1;
                            total.commbase      +=  value.winlose[0].bet_amount*1 - data.members[key].draw*1;
                            total.transferBonus +=  value.welcome*1;
                            total.rabatBonus    +=  value.rabat*1;
                            total.total_amount  +=  value.total_amount*1;
                            total.shareTotal    +=  0;
                            total.netProfit     +=  value.total_amount*1;
                        });
                        $scope.member_total = total;
                        $scope.members = data.members;
                        $('#winlose-member').css('display', 'block');
                    })
                    break;
                    case 'playtech':
                    $http({
                        url: 'api/public/index.php/callApi/winlose-members-pt',
                        method: "POST",
                        data: data1, 
                    }).success(function (data) {
                        console.log(data);
                       var total={
                            bet_amount      :0,
                            wl_amount       :0,
                            commbase        :0,
                            transferBonus   :0,
                            rabatBonus      :0,
                            total_amount    :0,
                            shareTotal      :0,
                            netProfit       :0
                        }
                        angular.forEach(data.members, function(value, key) {

                            data.members[key].winlose = {
                                0:{
                                    bet_amount  :0,
                                    winlose     :0
                                }
                            };
                            
                            data.members[key].winlose[0].bet_amount = value.winlose_pt.totalBet;
                            data.members[key].winlose[0].winlose = value.winlose_pt.winLose;
                            data.members[key].draw = value.winlose_pt.totalDraw;
                            data.members[key].total_amount         = value.winlose_pt.winLose*1 + value.welcome*1 + value.rabat*1;
                            total.bet_amount    +=  value.winlose_pt.totalBet*1;
                            total.wl_amount     +=  value.winlose_pt.winLose*1;
                            total.commbase      +=  value.winlose_pt.totalBet*1 - value.winlose_pt.totalDraw*1;
                            total.transferBonus +=  value.welcome*1;
                            total.rabatBonus    +=  value.rabat*1;
                            total.total_amount  +=  data.members[key].total_amount*1;
                            total.shareTotal    +=  0;
                            total.netProfit     +=  data.members[key].total_amount*1;
                        });
                        $scope.member_total = total;
                        $scope.members = data.members;
                        $('#winlose-member').css('display', 'block');
                    })
                    break;
                    default:
                    $http({
                        url: 'api/public/index.php/callApi/winlose-members-allbet',
                        method: "POST",
                        data: data1, 
                    }).success(function (data) {
                        console.log(data);
                       var total={
                            bet_amount      :0,
                            wl_amount       :0,
                            commbase        :0,
                            transferBonus   :0,
                            rabatBonus      :0,
                            total_amount    :0,
                            shareTotal      :0,
                            netProfit       :0
                        }
                        angular.forEach(data.members, function(value, key) {

                            data.members[key].winlose = {
                                0:{
                                    bet_amount  :0,
                                    winlose     :0
                                }
                            };
                            
                            data.members[key].winlose[0].bet_amount = value.winlose_pt.totalBet;
                            data.members[key].winlose[0].winlose = value.winlose_pt.winLose;
                            data.members[key].draw = value.winlose_pt.totalDraw;
                            data.members[key].total_amount         = value.winlose_pt.winLose*1 + value.welcome*1 + value.rabat*1;
                            total.bet_amount    +=  value.winlose_pt.totalBet*1;
                            total.wl_amount     +=  value.winlose_pt.winLose*1;
                            total.commbase      +=  value.winlose_pt.totalBet*1 - data.members[key].draw*1;
                            total.transferBonus +=  value.welcome*1;
                            total.rabatBonus    +=  value.rabat*1;
                            total.total_amount  +=  data.members[key].total_amount*1;
                            total.shareTotal    +=  0;
                            total.netProfit     +=  data.members[key].total_amount*1;
                        });
                        $scope.member_total = total;
                        $scope.members = data.members;
                        $('#winlose-member').css('display', 'block');
                    })
                    break;
                }
                
                
            }
        })
})();



