/**
 * Created by lamtanphiho on 3/30/2016.
 */
app.controller('addMemberCtrl', function($socket, $auth, $state, $http, $rootScope, $scope, ngDialog) {
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

        $http({
            url:  'api/public/member/getRole',
            method: "POST"
        }).success(function (data) {
            $scope.member.roles = data;
            $scope.member.role = data[0].name;

        }).error(function(response){
            console.log(response.error);
            if( response.error == 'token_not_provided')
                $state.go('login');
        });


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