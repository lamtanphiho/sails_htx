'use strict';

app
  .controller('xeAddCtrl', function($scope, $http, $General, ngDialog, $state, $rootScope) {
    $scope.init = function() {
        var date = new Date();
        
        var currentDate = date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate() ;
            
         $('.datetimepicker_1').datetimepicker({
                    defaultDate: currentDate,
                    
                    format: 'DD-MM-YYYY'
                });
         
// ====================================================================================
		$scope.xe = {
			bien_so:"",
			hieu_xe:"",
			loai_xe:"",
			nuoc_sx:"",
			so_khung:"",
			so_may:"",
			thiet_bi_gsht:"",
			trong_tai:""
		}
        var user = JSON.parse(localStorage.getItem('userHtx'));
        $scope.xe.chu_xe = user.username;
		$scope.error = {};
        $scope.getThietBi_GSHT();
        $scope.getTrongtai();
        $scope.getCountrys();
        $scope.getLoaiXe();
        $scope.getHieuXe();
    }
    $scope.errorReset =function(){
    	$scope.error = {
			bien_so:"",
			hieu_xe:"",
			loai_xe:"",
			nuoc_sx:"",
			so_khung:"",
			so_may:"",
			thiet_bi_gsht:"",
			trong_tai:""
		}
    }
    $scope.addXe = function(){
    	var listRequire 				= 'bien_so hieu_xe	loai_xe	nuoc_sx	so_khung so_may	thiet_bi_gsht trong_tai';
    	$scope.xe.ngay_dang_kiem        = $General.formatDate($('#ngay_dang_kiem').val(), 'yyyy-MM-dd');
        $scope.xe.ngay_cap_phu_hieu 	= $General.formatDate($('#ngay_cap_phu_hieu').val(), 'yyyy-MM-dd');
        $scope.xe.ngay_cap_bh_dan_su    = $General.formatDate($('#ngay_cap_bh_dan_su').val(), 'yyyy-MM-dd');
        $scope.xe.ngay_het_bh_dan_su    = $General.formatDate($('#ngay_het_bh_dan_su').val(), 'yyyy-MM-dd');
        $scope.xe.ngay_het_dk        	= $General.formatDate($('#ngay_het_dk').val(), 'yyyy-MM-dd');
        $scope.xe.ngay_het_phu_hieu     = $General.formatDate($('#ngay_het_phu_hieu').val(), 'yyyy-MM-dd');
        $scope.xe.ngay_dk_gsht   		= $General.formatDate($('#ngay_dk_gsht').val(), 'yyyy-MM-dd');
        $scope.xe.ngay_het_gsht    		= $General.formatDate($('#ngay_het_gsht').val(), 'yyyy-MM-dd');
        var check = $General.checkRequire($scope.xe, listRequire);
		$scope.errorReset();

        if(check.result == true){
            var req = {
                    method: 'POST',
                    url: 'xe/create',
                    data: $scope.xe
                }
                $http(req)
                .then(function(response) {
                    // console.log(response);
                    $rootScope.message = 'Tạo xe thành công !!!';
                    ngDialog.open({

                        // Config dialog
                        template: 'templates/dialog/popupSuccess.html',
                        className: 'ngdialog-theme-flat ngdialog-theme-custom',
                        scope: $rootScope
                    })
                    
                    $state.go('dashboard.xe');
                 }, function(error) {

                    angular.forEach(error.data.Errors, function(value, key) {
                    $scope.error[key] = value[0].message;
                    console.log(key, value);
                })
                });
        }else{
        	$.each(check.key, function(key, index){
        		$scope.error[index] = 'Vui lòng nhập '+ index;
        	});
        }
    	
    }
    $scope.getTrongtai = function(){
        var req = {
            method: 'GET',
            url: 'trongtai'
        };
        $http(req)
        .then(function(response) {
            $scope.trongtais = response.data;
         }, function(error) {
            console.log(error);
        });
    } 
    $scope.getThietBi_GSHT = function(){
        var req = {
            method: 'GET',
            url: 'thietbi_gsht'
        };
        $http(req)
        .then(function(response) {
            $scope.thietbi_gshts = response.data;
         }, function(error) {
            console.log(error);
        });
    } 
    $scope.getHieuXe = function(){
        var req = {
            method: 'GET',
            url: 'hieuxe'
        };
        $http(req)
        .then(function(response) {
            $scope.hieuxes = response.data;
         }, function(error) {
            console.log(error);
        });
    }
    $scope.getLoaiXe = function(){
        var req = {
            method: 'GET',
            url: 'loaixe'
        };
        $http(req)
        .then(function(response) {
            $scope.loaixes = response.data;
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
            $scope.countries = response.data;
         }, function(error) {
            console.log(error);
        });
    }
    $scope.init();
});