'use strict';
/**
 * @ngdoc function
 * @name htxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the htxApp
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
            // console.log('ss',user);
            $rootScope.authenticated = true;
            $rootScope.currentUser = user;
            $state.go('dashboard.member');
        }
        else
        {
            // console.log(2);
            $state.go('login');
        }

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
        var offCallMeFn = $rootScope.$on("Forbidden", function(){

            $scope.loginErrorText = 'You are not authorized to access this resource !';
            ngDialog.open({

                // Config dialog
                template: 'templates/dialog/popupTmpl.html',
                className: 'ngdialog-theme-flat ngdialog-theme-custom',
                scope: $scope
            });
        });
        $scope.$on('$destroy', function() {
            offCallMeFn();
        });

    });
