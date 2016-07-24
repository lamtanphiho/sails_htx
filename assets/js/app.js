var app = angular
  .module('htxApp', [
        
        'satellizer',
    'oc.lazyLoad',
    'ui.router',
        'ngDialog',
        
    'ui.bootstrap',
    'angular-loading-bar',
  ])
  .config(function( $stateProvider, $urlRouterProvider, $authProvider, $httpProvider ) {
// Set up loading default when
        $httpProvider.interceptors.push(function($rootScope, $q) {

            return {

                // request: function(config) {

                //     $rootScope.$broadcast('loading:show')
                //     return config
                // },
                // response: function(response) {
                //     $rootScope.$broadcast('loading:hide')
                //     return response
                // },

                'responseError': function(rejection) {
                    // $rootScope.$broadcast('loading:hide');

                    if(rejection.status ==403 && rejection.statusText == 'Forbidden')
                    {
                        // console.log(rejection);
                        $rootScope.$emit('Forbidden');
                        //$rootScope.$broadcast('INSUFFICIENT_PERMISSIONS');
                    }

                    return $q.reject(rejection);
                }
            }
        })
        // $authProvider.loginUrl = API_URL + 'api/authenticate';
        // function redirectWhenLoggedOut($q, $injector) {
        //     return {
        //         responseError: function (rejection) {
        //             var $state = $injector.get('$state');
        //             var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

        //             angular.forEach(rejectionReasons, function (value, key) {
        //                 if (rejection.data.error === value) {
        //                     localStorage.removeItem('userAdmin');
        //                     $state.go('login');
        //                 }
        //             });

        //             return $q.reject(rejection);
        //         }
        //     }
        // }

        // $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

    })
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
       templateUrl: 'templates/dashboard/main.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'htxApp',
              files:[
                  'scripts/service/DateTimeModule.js',
                  
                  'scripts/directives/header/header.js',
                  'scripts/directives/header/header-notification/header-notification.js',
                  'scripts/directives/sidebar/sidebar.js',
                  'scripts/directives/sidebar/sidebar-search/sidebar-search.js',
                  'scripts/controllers/main.js',
                  'scripts/service/general.js',
              ]})
          }
        }
        
    })
      .state('dashboard.loaixe', {
            url: '/loai-xe',
            templateUrl: 'templates/config/loaixe.html',
            controller: 'loaixeCtrl',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'scripts/controllers/loaixeCtrl.js',

                            ]
                        })
                }
            }
        }) 
         .state('dashboard.hieuxe', {
            url: '/hieu-xe',
            templateUrl: 'templates/config/hieuxe.html',
            controller: 'hieuxeCtrl',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'scripts/controllers/hieuxeCtrl.js',

                            ]
                        })
                }
            }
        }) 
      .state('dashboard.banglai', {
            url: '/bang-lai',
            templateUrl: 'templates/config/banglai.html',
            controller: 'banglaiCtrl',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'scripts/controllers/banglaiCtrl.js',

                            ]
                        })
                }
            }
        }) 
      .state('dashboard.province', {
            url: '/tinh-thanh',
            templateUrl: 'templates/config/province.html',
            controller: 'provinceCtrl',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'scripts/controllers/provinceCtrl.js',

                            ]
                        })
                }
            }
        }) 
         .state('dashboard.country', {
            url: '/quoc-gia',
            templateUrl: 'templates/config/country.html',
            controller: 'countryCtrl',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'scripts/controllers/countryCtrl.js',

                            ]
                        })
                }
            }
        }) 
      .state('dashboard.xeadd', {
            url: '/xe/add',
            templateUrl: 'templates/xe/add.html',
            controller: 'xeAddCtrl',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'scripts/controllers/xeAddCtrl.js',

                            ]
                        })
                }
            }
        }) 
      .state('dashboard.xe', {
            url: '/xe',
            templateUrl: 'templates/xe/index.html',
            controller: 'xeCtrl',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'scripts/controllers/xeCtrl.js',

                            ]
                        })
                }
            }
        })
      .state('dashboard.member', {
            url: '/member/list',
            templateUrl: 'templates/member/Member.html',
            controller: 'memberCtrl',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'scripts/controllers/memberCtrl.js',

                            ]
                        })
                }
            }
        })
      .state('dashboard.memberadd', {
            url: 'member/create',
            templateUrl: 'templates/member/manaMem.addUser.html',
            controller: 'addMemberCtrl',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'scripts/controllers/addMemberCtrl.js',
                            ]
                        })
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
