'use strict';
/**
 * @ngdoc function
 * @name htxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the htxApp
 */
app
  .controller('xeCtrl', function($scope, $http) {
     $scope.init = function() {
        
        $http({
            url: 'xe/list-xe',
            method: "GET"
        }).success(function (data) {
            $scope.xe = data;
            console.log(data)
        }).error(function (response) {
            console.log(response.error);
            if (response.error == 'token_not_provided')
                $state.go('login');
        });
    };
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
            // if(newYear){
            //     for(var i = 1; i<= numDate; i++){
            //         if(i > day)
            //             disable = 'disabled';
            //         html += '<div class="form-group col-md-2"><input type="text" class="form-control" id="day-'+i+'" placeholder="Ngày '+i+'" '+disable+'></div>';
            //     }
            // }
        }
        html += '</div>';
        $('#km_content').html(html);
        // console.log(xe.km_hanh_trinh)
        $('#km_hanh_trinh').modal();
    }
    $scope.init();
});