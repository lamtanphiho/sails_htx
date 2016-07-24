

app.controller('hieuxeCtrl', function(Excel, $timeout, $http, $scope,$General) {
	$scope.init = function(){
	var req = {
            method: 'GET',
            url: 'hieuxe'
        };
        $http(req)
        .then(function(response) {
            $scope.hieuxes = response.data;
            // console.log(response.data)
         }, function(error) {
            console.log(error);
        });
    }
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            $scope.exportHref= Excel.tableToExcel(tableId,'sheet name');
            $timeout(function(){location.href=$scope.exportHref;},100); // trigger download
        }
    $scope.delete_hieuxe = function(x){
		
    	var req = {
            method: 'DELETE',
            url: 'hieuxe/'+x
        };
		 $http(req)
        .then(function(response) {
        	
            $scope.init()
        }, function(error) {
            console.log(error);
        });
	    
	}
	$scope.add_hieuxe = function(){
		var hieuxe={
			hieu_xe : $('#new-hieu_xe').val(),
			ghichu : $('#new-ghichu').val()
		}
		var listRequirehieuxe ='hieu_xe ghichu';
		var checkRequire = $General.checkRequire(hieuxe, listRequirehieuxe);
	    if(checkRequire.result == true){
	    	var req = {
	            method: 'POST',
	            url: 'hieuxe/create',
	            data: hieuxe
	        };
			 $http(req)
	        .then(function(response) {
	        	$('#new-hieu_xe').val('');
				$('#new-ghichu').val('');
	        	$('#new-tr-input').hide();
	            $scope.init()
	        }, function(error) {
	            console.log(error);
	        });
	    }
	}
    $scope.show_add_hieuxe = function(){
    	$('#new-tr-input').show();
    }
    $scope.update_hieuxe = function(x){
    	var hieuxe ={
    		id: $('#id-'+x).attr('value'),
    		hieu_xe: $('#hieu_xe-'+x).text(),
    		ghichu: $('#ghichu-'+x).text()
    	}
    	var req = {
            method: 'POST',
            url: 'hieuxe/'+x,
            data: hieuxe
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