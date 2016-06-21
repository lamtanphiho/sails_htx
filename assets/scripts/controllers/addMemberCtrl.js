/**
 * Created by lamtanphiho on 3/30/2016.
 */
app.controller('addMemberCtrl', function( $auth, $state, $http, $rootScope, $scope, ngDialog) {
    // Run this function at initial
    $scope.ini = function() {
        $scope.member = {
            username : '',
            password    : '',
            password_confirmation    : '',
            email : '',
            phone : '',
            roles : {},
        }
        var user = JSON.parse(localStorage.getItem('userHtx'));
        if(user.role == 'admin')
            $scope.member.roles = {0:'agent', 1:'user'};
        else
            $scope.member.roles = {0:'user'};
    }
    $scope.reset = function () {
        $scope.error = {
            username : '',
            password    : '',
            password_confirmation    : '',
            email : '',
        }
    }
    $scope.add_User = function(){
        var req = {
            method: 'POST',
            url: 'api/public/member/create',
            data: $scope.member
        }
        $scope.reset();
        $http(req)
            .then(function(response) {
                console.log(response);
                $scope.message = response.data.msg;
                ngDialog.open({

                    // Config dialog
                    template: 'app/views/dialog/popupSuccess.html',
                    className: 'ngdialog-theme-flat ngdialog-theme-custom',
                    scope: $scope
                });

            }, function(error) {

                angular.forEach(error.data.error.data, function(value, key) {
                    $scope.error[key] = value[0];

                })




            });
    }




    // Run function config initial
    $scope.ini();
})