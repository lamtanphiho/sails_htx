var htxApp = angular
  .module('htxApp', [
        
        'satellizer',
    'oc.lazyLoad',
    'ui.router',
        'ngDialog',
        
    'ui.bootstrap',
    'angular-loading-bar',
  ])
    .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ( $stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
      debug:false,
      events:true
    });
  $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
            controller: 'MainCtrl',
        // templateUrl: 'templates/dashboard/main.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'htxApp',
              files:[
              'scripts/controllers/main.js'
              ]})
          }
        }
        
    })
      .state('login',{
        templateUrl:'templates/pages/login.html',
        url:'/login',
            controller: 'AuthController',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'htxApp',
                        files:[
                            'scripts/controllers/authController.js',
                        ]
                    })
                }
            }
    })
       }]);
