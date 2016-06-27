/**
 * Created by lamtanphiho on 3/30/2016.
 */
 app.directive('onlyDigits', function () {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9]/g, '');

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseInt(digits,10);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});
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
            role  : ''
        }
        $scope.chuxe ={
            donvi:'',
            chu_dautu:'',
            ngaysinh:'',
            quoctich:'',
            hktt:'',
            cmnd:'',
            noicap_cmnd:'',
            ngaycap_cmnd:'',
            dtdd:''
        };
        $scope.taixe ={};
        $scope.error = {};
        var user = JSON.parse(localStorage.getItem('userHtx'));
        if(user.role == 'admin')
            $scope.member.roles = {0:'agent', 1:'user'};
        else
            $scope.member.roles = {0:'user'};


        var date = new Date();
        
        var currentDate = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() ;
            
         $('#datetimepicker_1').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                });
         $('#datetimepicker_2').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                });
         $('#datetimepicker_3').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                });
         $('#datetimepicker_4').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                });
         $('#datetimepicker_5').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                });
         $('#datetimepicker_6').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                });
         $('#datetimepicker_7').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                });
         $('#datetimepicker_8').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                }); 
                $('#datetimepicker_9').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                }); 
                $('#datetimepicker_10').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                }); 
                $('#datetimepicker_11').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                }); 
                $('#datetimepicker_12').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'YYYY-MM-DD'
                });
    }
    $scope.reset = function () {
        $.each($scope.error, function(k, v){
            $scope.error[k] = '';
        });
    }
    $scope.showInputMember = function(){
        $scope.reset();
        if($scope.member.role == 'agent'){
            $('#taixe').hide();
            $('#chuxe').show();
        }

        else{
            $('#chuxe').hide();
            $('#taixe').show();
        }

    }
     $scope.validate = {
        checkRequire : function(arr, fielt){
            var result = {
                result: true
            };
            $.each(arr, function(key, value){
                if(value == '' || fielt.indexOf(value) >-1){
                    result.result = false;
                    $scope.error[key] = 'Vui lòng nhập ' + key;
                }

            });
            return result;
        },
        validateEmail : function(email) {
          var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        },
        validatePass : function(pass, pass_confirm){
            return (pass == pass_confirm);
        }
    }
    
    $scope.add_User = function(){
        var listRequireUser = 'username password password_confirmation email phone role';
        var listRequireChuxe ='ngaysinh donvi chu_dautu quoctich hktt cmnd noicap_cmnd ngaycap_cmnd dtdd';
        
        var listRequireTaixe = 'fullname date_born quoctich cmnd noicap_cmnd ngaycap_cmnd so_giayphep_laixe hang loaixe_duoclai ngay_gplx ngayhet_gplx noicap_gplx so_cnthnv ngay_cnthnv ngayhet_cnthnv noicap_cnthnv ngaykham_suckhoe ngayhet_suckhoe';
            
        var req = {
            method: 'POST',
            url: 'api/public/member/create',
            data: $scope.member
        }
        $scope.reset();
        if($scope.validate.checkRequire($scope.member, listRequireUser).result == true){
            if($scope.validate.validateEmail($scope.member.email) == false){
                $scope.error.email = 'Email không hợp lệ !';
            }else{
                if($scope.validate.validatePass($scope.member.password, $scope.member.password_confirmation) == false)
                    $scope.error.password_confirmation = 'Mật khẩu không giống nhau !';

            }
            if($scope.member.role == 'agent'){
                $scope.validate.checkRequire($scope.chuxe, listRequireChuxe);
                
            }else{
                $scope.validate.checkRequire($scope.taixe, listRequireTaixe);

            }

        }
        else
        console.log($scope.member);
    //     $http(req)
    //         .then(function(response) {
    //             console.log(response);
    //             $scope.message = response.data.msg;
    //             ngDialog.open({

    //                 // Config dialog
    //                 template: 'app/views/dialog/popupSuccess.html',
    //                 className: 'ngdialog-theme-flat ngdialog-theme-custom',
    //                 scope: $scope
    //             });

    //         }, function(error) {

    //             angular.forEach(error.data.error.data, function(value, key) {
    //                 $scope.error[key] = value[0];

    //             })




    //         });
    }




    // Run function config initial
    $scope.ini();
})