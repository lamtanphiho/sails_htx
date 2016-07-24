

app.controller('loaixeCtrl', function(Excel, $timeout, $http, $scope,$General) {
	$scope.init = function(){
	var req = {
            method: 'GET',
            url: 'loaixe'
        };
        $http(req)
        .then(function(response) {
            $scope.loaixes = response.data;
            // console.log(response.data)
         }, function(error) {
            console.log(error);
        });
    }
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            $scope.exportHref= Excel.tableToExcel(tableId,'sheet name');
            $timeout(function(){location.href=$scope.exportHref;},100); // trigger download
        }
    $scope.delete_loaixe = function(x){
		
    	var req = {
            method: 'DELETE',
            url: 'loaixe/'+x
        };
		 $http(req)
        .then(function(response) {
        	
            $scope.init()
        }, function(error) {
            console.log(error);
        });
	    
	}
	$scope.add_loaixe = function(){
		var loaixe={
			loai_xe : $('#new-loai_xe').val(),
			ghichu : $('#new-ghichu').val()
		}
		var listRequireloaixe ='loai_xe ghichu';
		var checkRequire = $General.checkRequire(loaixe, listRequireloaixe);
	    if(checkRequire.result == true){
	    	var req = {
	            method: 'POST',
	            url: 'loaixe/create',
	            data: loaixe
	        };
			 $http(req)
	        .then(function(response) {
	        	$('#new-loai_xe').val('');
				$('#new-ghichu').val('');
	        	$('#new-tr-input').hide();
	            $scope.init()
	        }, function(error) {
	            console.log(error);
	        });
	    }
	}
    $scope.show_add_loaixe = function(){
    	$('#new-tr-input').show();
    }
    $scope.update_loaixe = function(x){
    	var loaixe ={
    		id: $('#id-'+x).attr('value'),
    		loai_xe: $('#loai_xe-'+x).text(),
    		ghichu: $('#ghichu-'+x).text()
    	}
    	var req = {
            method: 'POST',
            url: 'loaixe/'+x,
            data: loaixe
        };
		 $http(req)
        .then(function(response) {
            
            // console.log(response.data)
         }, function(error) {
            console.log(error);
        });
    }
    $scope.init();
});