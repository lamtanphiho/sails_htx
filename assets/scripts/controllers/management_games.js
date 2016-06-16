 app.controller('management_gamesCtrl', 
        function ($http,$scope, $sce) {
              
            $http({
                url: 'api/public/index.php/management_games',
                method: "POST"
            }).success(function (data) {
                  $scope.trustSrc = function(src) {
                return $sce.trustAsResourceUrl(src);
              }
            $scope.api_game = {src:"http://agc.winningft.com", title:"test aframe"};
                $scope.link = 'http://google.com';  
                // console.log(data);
            }).error(function (response) {
                console.log(response);


                if (response.error == 'token_not_provided')
                    $state.go('login');
                else
                {

                }

            });
        });