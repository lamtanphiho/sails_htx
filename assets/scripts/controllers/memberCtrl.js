/**
 * Created by lamtanphiho on 3/30/2016.
 */
app.controller('memberCtrl', function( $auth, $state, $http, $rootScope, $scope, ngDialog ,$timeout, Excel) {
    $scope.init = function() {
        $scope.error = {};
        $scope.child = '';
        $http({
            url: 'users/list-user',
            method: "GET"
        }).success(function (data) {
            $scope.memberList = data;
            // console.log(data)
        }).error(function (response) {// ?�y nek
            console.log(response.error);
            if (response.error == 'token_not_provided')
                $state.go('login');
        });
    }
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            $scope.exportHref= Excel.tableToExcel(tableId,'sheet name');
            $timeout(function(){location.href=$scope.exportHref;},100); // trigger download
        }
    
    $scope.changeDonvi = function(){
        var data = {
            parent_id : $('#chon-donvi').val()
        }
        if(data.parent_id==''){
            $scope.error.donvi = 'Chọn đơn vị !';
            return;
        }
        $http({
            url: 'users/'+$scope.currentMember.user_id,
            method: "POST",
            data:data
        }).success(function (data) {
            $('#memberDetail').modal('hide');
            $scope.init();
        }).error(function (response) {
            console.log(response.error);
        });
    }

    $scope.confirm = function (_content, data, callback) {
                $scope._content = _content;
                $scope.currentMember = data;
                $scope.callback = function () {
                    callback();
                };
                ngDialog.open({
                    template: 'templates/dialog/confirm.html',
                    className: 'ngdialog-theme-flat ngdialog-theme-custom',
                    scope: $scope
                });
            }

    $scope.xoaMem = function(){
        $scope.close_confirm();
        var table = $scope.currentMember.role =='agent' ? 'chuxe' : 'taixe';
         $http({
            url: table+'/'+$scope.currentMember.id,
            method: "DELETE"
        }).success(function (data) {
           $http({
                url: 'users/'+$scope.currentMember.user_id,
                method: "DELETE"
            }).success(function (data) {
                $scope.init();
            }).error(function (response) {
                console.log(response.error);
            });
        }).error(function (response) {
            console.log(response.error);
        });
         
        
    }
       
    $scope.showDetailmember = function (data) {
       
        $scope.currentMember = data;
        // if(data.role=='agent'){
        //     $scope.currentAgent = {
        //         email: data.email,
        //         phone: data.phone
        //     } 
        //     $scope.currentChuxe = {
        //         chu_dautu: data.chu_dautu,
        //         ngaysinh: data.ngaysinh,
        //         quoctich: data.quoctich,
        //         hktt: data.hktt,
        //         cmnd: data.cmnd,
        //         donvi: data.donvi,
        //         dt_ban: data.dt_ban
        //     }
        //     console.log($scope.currentAgent, $scope.currentChuxe)
        // }
        if(data.role=='user'){
             $http({
                url: 'chuxe',
                method: "GET"
                }).success(function (data_1) {
                    $scope.chuxes = data_1;
                }).error(function (response) {
                    console.log(response.error);
            });
            $http({
            url: 'chuxe/by-username',
            method: "POST",
            data: {username: data.parent_id}
            }).success(function (data_2) {
                $scope.currentMember.donvi = data_2.donvi;
                console.log(data_2)
            }).error(function (response) {
                console.log(response.error);
            });
        }
        // console.log(data);
        $('#memberDetail').modal('show');
        
    }
    $scope.close_confirm = function () {
                angular.element('.ngdialog-close').trigger('click');
            }
    $scope.init();
})