'use strict';
/**
 * @ngdoc function
 * @name betApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the betApp
 */
angular.module('htxApp')
  .controller('MainCtrl', function($auth,$scope,$position,  $rootScope, $state, ngDialog) {
        // token = localStorage.getItem('satellizer_token');
        var user = JSON.parse(localStorage.getItem('userHtx'));

        if(user) {
            // var data1 ={
            //     msgtype:'check_logged',
            //     session: localStorage.getItem('satellizer_token'),
            //     user    : user.username
            // }
            // $socket.emit('message', data1);
            console.log('ss'+user);
            // $rootScope.authenticated = true;
            // $rootScope.currentUser = user;
            // $state.go('dashboard.home');
        }
        else
        {
            console.log(2);
            $state.go('login');
        }
        // $scope.selectedMenu = 'dashboard';
        // $scope.collapseVar = 0;
        // $scope.multiCollapseVar = 0;

        // $scope.check = function(x){

        //     if(x==$scope.collapseVar)
        //         $scope.collapseVar = 0;
        //     else
        //         $scope.collapseVar = x;
        // };

        // $scope.multiCheck = function(y){

        //     if(y==$scope.multiCollapseVar)
        //         $scope.multiCollapseVar = 0;
        //     else
        //         $scope.multiCollapseVar = y;
        // };
        // //============================ logout ===================================
        //  $rootScope.$on("LOGOUT", function(){
        //      if(typeof ($rootScope.currentUser)!='undefined')
        //      {
        //          var credentials = {
        //              username : $rootScope.currentUser.username
        //          };

        //          $socket.emit('auth.logout', credentials);
        //          $auth.logout().then(function () {

        //              // Remove the authenticated user from local storage
        //              localStorage.removeItem('userAdmin');

        //              // Flip authenticated to false so that we no longer
        //              // show UI elements dependant on the user being logged in
        //              $rootScope.authenticated = false;

        //              // Remove the current user info from rootscope
        //              $rootScope.currentUser = null;
        //              $state.go('login');
        //          });
        //      }
        // });
        // //=================================================================
        // var offCallMeFn = $rootScope.$on("INSUFFICIENT_PERMISSIONS", function(){

        //     $scope.loginErrorText = 'You are not authorized to access this resource !';
        //     ngDialog.open({

        //         // Config dialog
        //         template: 'app/views/dialog/popupTmpl.html',
        //         className: 'ngdialog-theme-flat ngdialog-theme-custom',
        //         scope: $scope
        //     });
        // });
        // $scope.$on('$destroy', function() {
        //     offCallMeFn();
        // });

    });
