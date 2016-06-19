'use strict';
/**
 * @ngdoc overview
 * @name htxApp
 * @description
 * # htxApp
 *
 * Main module of the application.
 */
var htxApp = angular
  .module('htxApp', [
        'ngSocket',
        'satellizer',
    'oc.lazyLoad',
    'ui.router',
        'ngDialog',
        'ngAudio',
    'ui.bootstrap',
    'angular-loading-bar',
  ])
    .constant('API_URL', url.API_URL)
    .run(function($state,  $socket, $rootScope){
        var user = JSON.parse(localStorage.getItem('userAdmin'));

        if(user) {
            var data1 ={
                msgtype:'check_logged',
                session: localStorage.getItem('satellizer_token'),
                user    : user.username
            };
            $socket.emit('message', data1);
            //console.log('ss'+user);
            $rootScope.authenticated = true;
            $rootScope.currentUser = user;
            $state.go('dashboard.home');
        }
        else
        {
            //console.log(2);
            $state.go('login');
        }
    })
    .config(function( $stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, API_URL ) {
// Set up loading default when
        $httpProvider.interceptors.push(function($rootScope, $q) {

            return {

                request: function(config) {

                    $rootScope.$broadcast('loading:show')
                    return config
                },
                response: function(response) {
                    $rootScope.$broadcast('loading:hide')
                    return response
                },

                'responseError': function(rejection) {
                    $rootScope.$broadcast('loading:hide');

                    if(rejection.status ==401 && rejection.data.error.code == 'INSUFFICIENT_PERMISSIONS')
                    {
                        console.log(rejection);
                        $rootScope.$emit('INSUFFICIENT_PERMISSIONS');
                        //$rootScope.$broadcast('INSUFFICIENT_PERMISSIONS');
                    }
                    else if(rejection.status ==400 ||(typeof (rejection.data.error) != 'undefined' && rejection.data.error == 'token_not_provided'))
                    {
                        $rootScope.$emit('LOGOUT');
                    }
                    return $q.reject(rejection);
                }
            }
        })
        $authProvider.loginUrl = API_URL + 'api/authenticate';
        function redirectWhenLoggedOut($q, $injector) {
            return {
                responseError: function (rejection) {
                    var $state = $injector.get('$state');
                    var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];

                    angular.forEach(rejectionReasons, function (value, key) {
                        if (rejection.data.error === value) {
                            localStorage.removeItem('userAdmin');
                            $state.go('login');
                        }
                    });

                    return $q.reject(rejection);
                }
            }
        }

        $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);

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
        // templateUrl: 'app/views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'htxApp',
                    files:[

                    //     'app/scripts/service/DateTimeModule.js',
                        'scripts/controllers/main.js',
                    // 'app/scripts/directives/header/header.js',
                    // 'app/scripts/directives/header/header-notification/header-notification.js',
                    // 'app/scripts/directives/sidebar/sidebar.js',
                    // 'app/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["app/bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "app/bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['app/bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['app/bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['app/bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['app/bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['app/bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
       .state('dashboard.winLoseReport',{
        url:'/win-lose',
        controller: 'winLoseReportCtrl',
        templateUrl:'app/views/report/winLoseReport.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'htxApp',
              files:[
              'app/scripts/controllers/winLoseReportCtrl.js'
              ]})
          }
        }
      })
        .state('dashboard.transactionBet',{
        url:'/ticket',
        controller: 'transactionBetCtrl',
        templateUrl:'app/views/report/transactionBet.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'htxApp',
              files:[
              'app/scripts/controllers/transactionBetCtrl.js'
              ]})
          }
        }
      })
        .state('dashboard.reportTransfer',{
        url:'/transfer',
        controller: 'reportTransferCtrl',
        templateUrl:'app/views/report/transfer.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'htxApp',
              files:[
              'app/scripts/controllers/reportTransferCtrl.js'
              ]})
          }
        }
      })
        .state('dashboard.reportRabat',{
        url:'/rabat-bonus',
        controller: 'reportRabatCtrl',
        templateUrl:'app/views/report/rabat.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'htxApp',
              files:[
              'app/scripts/controllers/reportRabatCtrl.js'
              ]})
          }
        }
      })
        .state('dashboard.reportExtra',{
        url:'/extra-bonus',
        controller: 'reportExtraCtrl',
        templateUrl:'app/views/report/extra.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'htxApp',
              files:[
              'app/scripts/controllers/reportExtraCtrl.js'
              ]})
          }
        }
      })
        .state('dashboard.reportWelcome',{
        url:'/welcome-bonus',
        controller: 'reportWelcomeCtrl',
        templateUrl:'app/views/report/welcome.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'htxApp',
              files:[
              'app/scripts/controllers/reportWelcomeCtrl.js'
              ]})
          }
        }
      })
        .state('dashboard.gameManagement',{
        url:'/management-games',
        controller: 'management_gamesCtrl',
        templateUrl:'app/views/management_games/management_games.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'htxApp',
              files:[
              'app/scripts/controllers/management_games.js',

              ]
            })
          }
        }
      })
      .state('dashboard.home',{
        url:'/home',
        controller: 'TransCtrl',
        templateUrl:'app/views/transaction/transaction.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'htxApp',
              files:[
              'app/scripts/controllers/transaction.js',
              //'app/bower_components/angular-audio/app/angular.audio.js',
              //'scripts/directives/notifications/notifications.js',
              'app/scripts/directives/datetime/datetime.js',
              //'scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
        .state('dashboard.deposit',{
            url:'/deposit',
            controller: 'DepositCtrl',
            templateUrl:'app/views/transaction/deposit.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'htxApp',
                        files:[
                            'app/scripts/controllers/transaction.js',
                            //'app/bower_components/angular-audio/app/angular.audio.js',
                            //'scripts/directives/notifications/notifications.js',
                            //'app/scripts/directives/datetime/datetime.js',
                            //'scripts/directives/dashboard/stats/stats.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.withdraw',{
            url:'/withdraw',
            controller: 'WithdrawCtrl',
            templateUrl:'app/views/transaction/withdraw.html',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'htxApp',
                        files:[
                            'app/scripts/controllers/transaction.js',
                            //'app/bower_components/angular-audio/app/angular.audio.js',
                            //'scripts/directives/notifications/notifications.js',
                            //'app/scripts/directives/datetime/datetime.js',
                            //'scripts/directives/dashboard/stats/stats.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.member', {
            url: 'member/list',
            templateUrl: 'app/views/member/manaMem.member.html',
            controller: 'memberCtrl',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'app/scripts/controllers/memberCtrl.js',
                            ]
                        })
                }
            }
        })
        .state('dashboard.memberadd', {
            url: 'member/create',
            templateUrl: 'app/views/member/manaMem.addUser.html',
            controller: 'addMemberCtrl',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'app/scripts/controllers/addMemberCtrl.js',
                            ]
                        })
                }
            }
        })
        .state('dashboard.profile', {
            url: 'profile',
            templateUrl: 'app/views/pages/profile.html',
            controller: 'profileCtrl',
            requireLogin: true,
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'htxApp',
                            files: [
                                'app/scripts/controllers/profileCtrl.js',
                            ]
                        })
                }
            }
        })


        //=======================================================================
        //=======================================================================
      .state('dashboard.form',{
        templateUrl:'app/views/form.html',
        url:'/form'
    })
      .state('dashboard.blank',{
        templateUrl:'views/pages/blank.html',
        url:'/blank'
    })
      .state('login',{
        templateUrl:'app/views/pages/login.html',
        url:'/login',
            controller: 'AuthController',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'htxApp',
                        files:[
                            'app/scripts/controllers/authController.js',
                        ]
                    })
                }
            }
    })
      .state('dashboard.chart',{
        templateUrl:'views/chart.html',
        url:'/chart',
        controller:'ChartCtrl',
        resolve: {
          loadMyFile:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'chart.js',
              files:[
                'app/bower_components/angular-chart.js/dist/angular-chart.min.js',
                'app/bower_components/angular-chart.js/dist/angular-chart.css'
              ]
            }),
            $ocLazyLoad.load({
                name:'htxApp',
                files:['scripts/controllers/chartContoller.js']
            })
          }
        }
    })
      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'app/views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);


    
