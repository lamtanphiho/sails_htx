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
    
       
    $scope.showDetailmember = function (data) {
        $http({
            url: 'chuxe',
            method: "GET"
            }).success(function (data_1) {
                $scope.chuxes = data_1;
            }).error(function (response) {
                console.log(response.error);
        });
        $scope.currentMember = data;
        if(data.role=='user'){
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
        console.log(data);
        $('#memberDetail').modal('show');
        
    }
       
    $scope.init();
})