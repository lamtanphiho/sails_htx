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
app.controller('addMemberCtrl', function( $auth, $state, $http, $rootScope, $scope, ngDialog,$General) {
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
        $scope.taixe ={
             fullname:'',
            date_born:'',
            address:'',
            quoctich:'',
            cmnd:'',
            noicap_cmnd:'',
            ngaycap_cmnd:'',
            so_giayphep_laixe:'',
            hang:'',
            loaixe_duoclai:'',
            ngay_gplx:'',
            ngayhet_gplx:'',
            noicap_gplx:'',
            so_cnthnv:'',
            ngay_cnthnv:'',
            ngayhet_cnthnv:'',
            noicap_cnthnv:'',
            ngaykham_suckhoe:'',
            ngayhet_suckhoe:'',
            
        };
        $scope.error = {};
        var user = JSON.parse(localStorage.getItem('userHtx'));
        $scope.member.parent_id = user.username;
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
         
         $('#datetimepicker_6').datetimepicker({
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

        $scope.getCountrys();
        $scope.getHangBanglai();
        $scope.getTinh();
    }
    $scope.getTinh = function(){
        var req = {
            method: 'GET',
            url: 'tinh'
        };
        $http(req)
        .then(function(response) {
            $scope.tinhs = response.data;
         }, function(error) {
            console.log(error);
        });
    }
    $scope.getHangBanglai = function(){
        var req = {
            method: 'GET',
            url: 'banglai'
        };
        $http(req)
        .then(function(response) {
            $scope.banglais = response.data;
         }, function(error) {
            console.log(error);
        });
    }
    $scope.getCountrys = function(){
        var req = {
            method: 'GET',
            url: 'country'
        };
        $http(req)
        .then(function(response) {
            $scope.countrys = response.data;
         }, function(error) {
            console.log(error);
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
     
    
    $scope.add_User = function(){
        var listRequireUser = 'username password password_confirmation email phone role address';
        var listRequireChuxe ='ngaysinh donvi chu_dautu quoctich hktt cmnd noicap_cmnd ngaycap_cmnd dtdd';
        
        var listRequireTaixe = 'fullname date_born quoctich cmnd noicap_cmnd ngaycap_cmnd so_giayphep_laixe hang loaixe_duoclai ngay_gplx ngayhet_gplx noicap_gplx so_cnthnv ngay_cnthnv ngayhet_cnthnv noicap_cnthnv ngaykham_suckhoe ngayhet_suckhoe';
         var check = {};   
        $scope.chuxe.ngaysinh           = $('#ngaysinh').val();
        $scope.chuxe.ngaycap_cmnd       = $('#ngaycap_cmnd-cx').val();
        // ------------------------------------------------------------------------------
        $scope.taixe.date_born          = $('#date_born').val();
        $scope.taixe.ngaycap_cmnd       = $('#ngaycap_cmnd').val();
        $scope.taixe.ngay_gplx          = $('#ngay_gplx').val();
        $scope.taixe.ngayhet_gplx       = $('#ngayhet_gplx').val();
        $scope.taixe.ngay_cnthnv        = $('#ngay_cnthnv').val();
        $scope.taixe.ngayhet_cnthnv     = $('#ngayhet_cnthnv').val();
        $scope.taixe.ngaykham_suckhoe   = $('#ngaykham_suckhoe').val();
        $scope.taixe.ngayhet_suckhoe    = $('#ngayhet_suckhoe').val();
       
        $scope.reset();
        var checkRequire = $General.checkRequire($scope.member, listRequireUser);
        if(checkRequire.result == true){
            if($General.validateEmail($scope.member.email) == false){
                $scope.error.email = 'Email không hợp lệ !';
            }else{
                if($General.validatePass($scope.member.password, $scope.member.password_confirmation) == false)
                    $scope.error.password_confirmation = 'Mật khẩu không giống nhau !';

            }
            if($scope.member.role == 'agent'){
                check = $General.checkRequire($scope.chuxe, listRequireChuxe);
                
            }else{
                check = $General.checkRequire($scope.taixe, listRequireTaixe);

            }
            if(! check.result){
                $.each(check.key, function(key, index){
                    $scope.error[index] = 'Vui lòng nhập '+ index;
                });
            }
        }
        if(check.result == true){
            var req = {
                method: 'POST',
                url: 'users/create',
                data: $scope.member
            }
            $http(req)
            .then(function(response) {
                var label = $scope.member.role == 'agent' ? 'chuxe' : 'taixe';
                $scope[label].username = $scope.member.username;
                var req = {
                    method: 'POST',
                    url: label+'/create',
                    data: $scope[label]
                }
                $http(req)
                .then(function(response) {
                    // console.log(response);
                    $scope.message = 'Tạo thành viên thành công !!!';
                    ngDialog.open({

                        // Config dialog
                        template: 'templates/dialog/popupSuccess.html',
                        className: 'ngdialog-theme-flat ngdialog-theme-custom',
                        scope: $scope
                    });
                 }, function(error) {

                    angular.forEach(error.data.Errors, function(value, key) {
                    $scope.error[key] = value[0].message;
                    console.log(key, value);
                })
                });
                

            }, function(error) {
                console.log(error.data.Errors);
                angular.forEach(error.data.Errors, function(value, key) {
                    $scope.error[key] = value[0].message;
                    console.log(key, value);
                })
            });
        }else
        console.log(check);
        
    }




    // Run function config initial
    $scope.ini();
})