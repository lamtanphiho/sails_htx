'use strict';
/**
 * @ngdoc function
 * @name htxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the htxApp
 */
angular.module('htxApp')
    .controller('profileCtrl', function($socket, $auth, $state, $http, $rootScope, $scope, ngDialog) {

        // Run this function at initial
        $scope.init = function() {

            $scope.user = {
                old_password : '',
                password    : '',
                password_confirmation : '',
            }

        }

        $scope.reset = function () {
            $scope.error = {
                old_password : '',
                password    : '',
                password_confirmation : '',
            }
        }

        // Change password
        $scope.changePassword = function() {

            $scope.reset();

            var req = {
                method: 'post',
                url: 'api/public/index.php/authenticate/password/reset',
                data: $scope.user
            }

            $http(req)
                .then(function(response) {
                    $scope.message = response.data.result;
                    ngDialog.open({

                        // Config dialog
                        template: 'app/views/dialog/popupSuccess.html',
                        className: 'ngdialog-theme-flat ngdialog-theme-custom',
                        scope: $scope
                    });

                }, function(error) {
                    console.log(error);
                    angular.forEach(error.data.data, function(value, key) {
                        $scope.error[key] = value[0];

                    })
                });
        }

        // Run function config initial
        $scope.init();
    })