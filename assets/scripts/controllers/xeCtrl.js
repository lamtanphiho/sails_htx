'use strict';
/**
 * @ngdoc function
 * @name htxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the htxApp
 */
app
  .controller('xeCtrl', function($scope, $http, $General ,$timeout, Excel) {
     $scope.init = function() {
        var today       = new Date();
        $scope.year     = today.getFullYear();
        $scope.month       = today.getMonth() + 1;
        $http({
            url: 'xe/list-xe',
            method: "GET"
        }).success(function (data) {
            $scope.xe = data;
            // console.log(data)
        }).error(function (response) {
            console.log(response.error);
            if (response.error == 'token_not_provided')
                $state.go('login');
        });
    };
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            $scope.exportHref= Excel.tableToExcel(tableId,'sheet name');
            $timeout(function(){location.href=$scope.exportHref;},100); // trigger download
        }
    $scope.update_km_hanh_trinh = function(){
        var today       = new Date();
        var year     = today.getFullYear();
        var month    = today.getMonth() + 1;
        // ---------------------------------------
        var xe       = $('#xeid').val();
        xe       = decodeURIComponent(atob(xe));
        xe = $.parseJSON(xe);
        // ---------------------------------
        var numDate     = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        var newYear     = true;
        if(xe.km_hanh_trinh == null){
            var data ={
                km_hanh_trinh:{
                    0:{
                        year: year,
                        month: month,
                        info:[]
                    }
                }
            };
            for(var i = 1; i<= numDate; i++){
                var obj ={
                    date:i,
                    km: $('#day-'+i).val()
                }
                data.km_hanh_trinh[0].info.push(obj);
            }
        }else{
             var km_hanh_trinh = $.parseJSON(xe.km_hanh_trinh);
            $.each(km_hanh_trinh, function(key, index){
                if(index.year == $scope.year && index.month == month){
                    newYear = false;
                    km_hanh_trinh[key].info = [];
                    for(var i = 1; i<= numDate; i++){
                        var obj ={
                            date:i,
                            km: $('#day-'+i).val()
                        }
                        km_hanh_trinh[key].info.push(obj);
                    }
                }
            });
            if(newYear){
                var newData = {
                        year: year,
                        month: month,
                        info:[]
                    };
                for(var i = 1; i<= numDate; i++){
                    var obj ={
                        date:i,
                        km: $('#day-'+i).val()
                    };
                    newData.info.push(obj);
                }
                km_hanh_trinh[key+1] =newData;
            }
            var data = {
                km_hanh_trinh:km_hanh_trinh
            }
        }
        data.km_hanh_trinh = JSON.stringify(data.km_hanh_trinh);
        $http({
            url: 'xe/'+xe.id,
            method: "PUT",
            data:data
        }).success(function (data) {
            $('#km_hanh_trinh').modal('hide');
            $http({
                url: 'xe/list-xe',
                method: "GET"
            }).success(function (data) {
                $scope.xe = data;
            })
        }).error(function (response) {
            console.log(response.error);
        });
    }
    $scope.update_bao_duong = function(){
        var bao_duong = {
            year: $scope.year,
            bien_so: $scope.currentXe,
            km_xe_chay_trong_thang: btoa(JSON.stringify($scope.km)),
            km_xe_chay_luy_ke: btoa(JSON.stringify($scope.kmlk)),
            so_chuyen_trong_thang: btoa(JSON.stringify($scope.sctt)),
            so_chuyen_xe_luy_ke: btoa(JSON.stringify($scope.sclk)),
            noi_dung: btoa(JSON.stringify($scope.ndbd)),
            thoi_gian: btoa(JSON.stringify($scope.tgbd)),
            dia_diem: btoa(JSON.stringify($scope.ddbd)),
        }
        console.log(bao_duong);

        $http({
            method: 'POST',
            url: 'baoduong/updateOrCreate',
            data:bao_duong
        }).success(function (data) {
            console.log(data);
            $('#bao_duong').modal('hide');
            $http({
                url: 'xe/list-xe',
                method: "GET"
            }).success(function (data) {
                $scope.xe = data;
            })
        }).error(function (response) {
            console.log(response.error);
        });
    }
    $scope.show_bao_duong = function(xe){

        $scope.km = {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0,
            7:0,
            8:0,
            9:0,
            10:0,
            11:0,
            12:0
        }
        $scope.kmlk = {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0,
            7:0,
            8:0,
            9:0,
            10:0,
            11:0,
            12:0
        }
        $scope.sctt = {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0,
            7:0,
            8:0,
            9:0,
            10:0,
            11:0,
            12:0
        }
        $scope.sclk = {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0,
            7:0,
            8:0,
            9:0,
            10:0,
            11:0,
            12:0
        } 
        $scope.tgbd = {
            1:0,
            2:0,
            3:0,
            4:0,
            5:0,
            6:0,
            7:0,
            8:0,
            9:0,
            10:0,
            11:0,
            12:0
        }
        $scope.ddbd = {
            1:'',
            2:'',
            3:'',
            4:'',
            5:'',
            6:'',
            7:'',
            8:'',
            9:'',
            10:'',
            11:'',
            12:''
        }
        $scope.ndbd = {
            1:'',
            2:'',
            3:'',
            4:'',
            5:'',
            6:'',
            7:'',
            8:'',
            9:'',
            10:'',
            11:'',
            12:''
        }
        
        
        $scope.currentXe= xe.bien_so;
         $http({
            method: 'POST',
            url: 'baoduong/byyear',
            data: {year: $scope.year, bien_so: $scope.currentXe}
            
        }).success(function (data) {
            if(typeof(data.year) != 'undefined'){
                $scope.kmlk = JSON.parse(atob(data.km_xe_chay_luy_ke));
                $scope.sctt = JSON.parse(atob(data.so_chuyen_trong_thang));
                $scope.sclk = JSON.parse(atob(data.so_chuyen_xe_luy_ke));
                $scope.tgbd = JSON.parse(atob(data.thoi_gian));
                $scope.ddbd = JSON.parse(atob(data.dia_diem));
                $scope.ndbd = JSON.parse(atob(data.noi_dung));
            // console.log( $scope.kmlk);
            }
        }).error(function (response) {
            console.log(response.error);
        });
        // return;
        var km_hanh_trinh = $.parseJSON(xe.km_hanh_trinh);
        $.each(km_hanh_trinh, function(key, index){
            if(index.year == $scope.year && index.month <= $scope.month){
                $.each(index.info, function(k, v){
                    $scope.km[index.month] += v.km*1;
                })
                
            }
        })
        $.each($scope.km, function(ke, va){
            if(ke > $scope.month){
                $('#kmlk-'+ke).attr('disabled', 'disabled');
                $('#sctt-'+ke).attr('disabled', 'disabled');
                $('#sclk-'+ke).attr('disabled', 'disabled');
                $('#ndbd-'+ke).attr('disabled', 'disabled');
                $('#tgbd-'+ke).attr('disabled', 'disabled');
                $('#ddbd-'+ke).attr('disabled', 'disabled');
            }
        })
        // console.log($scope.km);
        $('#bao_duong').modal();
    }
    $scope.show_km_hanh_trinh = function(xe){
        var today       = new Date();
        $scope.year     = today.getFullYear();
        $scope.currentXe= xe.bien_so;
        var month       = today.getMonth() + 1;
        var numDate     = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
        var disable     = '';
        var day         = today.getDate();
        var encodeXe    = JSON.stringify(xe);
        var html        ='';
        var newYear     = true;
            html +='<div class="form-group col-md-12">'+
                        '<div class="row"><label for="pass">Tháng '+month+'</label>'+
                        '<input type="hidden" id="xeid" value="'+btoa(encodeURIComponent(encodeXe))+'">'+
                        '</div>';
        if(xe.km_hanh_trinh == null){
            for(var i = 1; i<= numDate; i++){
                if(i > day)
                    disable = 'disabled';
                html += '<div class="form-group col-md-2"><input type="text" class="form-control" id="day-'+i+'" placeholder="Ngày '+i+'" '+disable+'></div>';
            }
            
        }else{
            var km_hanh_trinh = $.parseJSON(xe.km_hanh_trinh);
            
            $.each(km_hanh_trinh, function(key, index){
                if(index.year == $scope.year && index.month == month){
                    newYear = false;
                    $.each(index.info, function(k, ind){
                        if(ind.date > day)
                            disable = 'disabled';
                        html += '<div class="form-group col-md-2"><input type="text" value="'+ind.km+'" class="form-control" id="day-'+ind.date+'" placeholder="Ngày '+ind.date+'" '+disable+'></div>';
                        
                    })
                }
            })
        }
        html += '</div>';
        $('#km_content').html(html);
        // console.log(xe.km_hanh_trinh)
        $('#km_hanh_trinh').modal();
    }
    $scope.init();
});