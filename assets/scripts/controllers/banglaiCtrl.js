

app.controller('banglaiCtrl', function(Excel, $timeout, $http, $scope,$General) {
	$scope.init = function(){
	var req = {
            method: 'GET',
            url: 'banglai'
        };
        $http(req)
        .then(function(response) {
            $scope.banglais = response.data;
            // console.log(response.data)
         }, function(error) {
            console.log(error);
        });
    }
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            $scope.exportHref= Excel.tableToExcel(tableId,'sheet name');
            $timeout(function(){location.href=$scope.exportHref;},100); // trigger download
        }
    $scope.delete_banglai = function(x){
		
    	var req = {
            method: 'DELETE',
            url: 'banglai/'+x
        };
		 $http(req)
        .then(function(response) {
        	
            $scope.init()
        }, function(error) {
            console.log(error);
        });
	    
	}
	$scope.add_banglai = function(){
		var banglai={
			hang : $('#new-hang').val(),
			decription : $('#new-decription').val()
		}
		var listRequirebanglai ='hang decription';
		var checkRequire = $General.checkRequire(banglai, listRequirebanglai);
	    if(checkRequire.result == true){
	    	var req = {
	            method: 'POST',
	            url: 'banglai/create',
	            data: banglai
	        };
			 $http(req)
	        .then(function(response) {
	        	$('#new-hang').val('');
				$('#new-decription').val('');
	        	$('#new-tr-input').hide();
	            $scope.init()
	        }, function(error) {
	            console.log(error);
	        });
	    }
	}
    $scope.show_add_banglai = function(){
    	$('#new-tr-input').show();
    }
    $scope.update_banglai = function(x){
    	var banglai ={
    		id: $('#id-'+x).attr('value'),
    		hang: $('#hang-'+x).text(),
    		decription: $('#decription-'+x).text()
    	}
    	var req = {
            method: 'POST',
            url: 'banglai/'+x,
            data: banglai
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