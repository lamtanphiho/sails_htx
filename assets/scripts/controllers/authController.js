/**
 * Created by lamtanphiho on 3/12/2016.
 */
htxApp.controller('AuthController',  function($auth, $state,$http,$rootScope, $scope, ngDialog) {

    $scope.username='';
    $scope.password='';
    // $scope.newUser={};
    // $scope.loginError=false;
    // $scope.loginErrorText='';

    $scope.login = function() {
        var credentials = {
            username: $scope.username,
            password: $scope.password
        };

        $auth.login(credentials).then(function() {
            $scope.loginError = false;
            return $http.get( 'api/authenticate/user');

        },  function(error) {
            //console.log(error);
            $scope.loginError = true;
            switch (error.data.error)
            {
                case 'invalid_credentials':
                    $scope.loginErrorText = 'Username or password invalid !'
            }

            ngDialog.open({

                // Config dialog
                template: 'app/views/dialog/popupTmpl.html',
                className: 'ngdialog-theme-flat ngdialog-theme-custom',
                scope: $scope
            });

        }).then(function(response) {

            if($scope.loginError == false)
            {

                token = localStorage.getItem('satellizer_token');
               
                var user = JSON.stringify(response.data.user);

                localStorage.setItem('userAdmin', user);

                $rootScope.authenticated = true;
                $rootScope.currentUser = response.data.user;
                $scope.loginError = false;
                $scope.loginErrorText = '';
                $state.go('dashboard');
                var credentials = {
                    username : $rootScope.currentUser.username,
                    session : localStorage.getItem('satellizer_token')
                };
                $socket.emit('auth.login', credentials);
            }

        });


    };
    // $scope.logout = function() {
    //     if(typeof ($rootScope.currentUser)!='undefined')
    //     {
    //         var credentials = {
    //             username : $rootScope.currentUser.username
    //         };

    //         $socket.emit('auth.logout', credentials);
    //         $auth.logout().then(function () {

    //             // Remove the authenticated user from local storage
    //             localStorage.removeItem('userAdmin');

    //             // Flip authenticated to false so that we no longer
    //             // show UI elements dependant on the user being logged in
    //             $rootScope.authenticated = false;

    //             // Remove the current user info from rootscope
    //             $rootScope.currentUser = null;
    //             $state.go('login');
    //         });
    //     }

    // };
    // $scope.logout();
    //         //socket --------------------------------------
    // $socket.on('connect', function(data) {
    //     $socket.emit('agMsg', 'Hello World i am admin');
    // });
    // $socket.on('auth.logout', function(data) {

    //     $auth.logout().then(function() {

    //         // Remove the authenticated user from local storage
    //         localStorage.removeItem('userAdmin');

    //         // Flip authenticated to false so that we no longer
    //         // show UI elements dependant on the user being logged in
    //         $rootScope.authenticated = false;

    //         // Remove the current user info from rootscope
    //         $rootScope.currentUser = null;

    //     });

    // });

});
