/**
 * Bao_duongController
 *
 * @description :: Server-syeare logic for managing bao_duongs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Promise = require('bluebird');

module.exports = {
	
	updateOrCreate: function ( req, res) {
        var data = req.body;
        updateOrCreate1(data)
         .then(function(bao_duong) {
         	// console.log(bao_duong);
                return res.json(bao_duong);
            })
            .catch(function(err) {
                return res.json(err);
            })
    },
	get_baoduong_by_year : function(  req, res) {
		data = req.body;
		get_baoduong_by_year(data)
		.then(function(bao_duong){
 			return res.json(bao_duong);
		})
		.catch(function(err) {
            return res.json(err);
        })
	}
	
};
var get_baoduong_by_year = function( data) {
    	
    	 return new Promise(function(resolve, reject) {
    	  	Baoduong.findOne({
                        year: data.year, bien_so: data.bien_so
                    })
                    .then(function(bao_duong) {
                    	return resolve(bao_duong);
                    })
             })
        .catch(function(err) {
            return reject(new Error({error: err}));
        })
        
    }
var updateOrCreate1= function ( data) {
        
        return new Promise(function(resolve, reject) {
          Baoduong.findOne({
                         year: data.year, bien_so: data.bien_so
                    })
                    .then(function(bao_duong) {
                    	 if (bao_duong) {
				          // bao_duong exists. Update.
				            
				            	Baoduong.update(
				            	{year: data.year},{
						      	bien_so: data.bien_so,
						      	km_xe_chay_trong_thang: data.km_xe_chay_trong_thang,
						      	km_xe_chay_luy_ke: data.km_xe_chay_luy_ke,
						      	so_chuyen_trong_thang: data.so_chuyen_trong_thang,
						      	so_chuyen_xe_luy_ke: data.so_chuyen_xe_luy_ke,
						      	noi_dung: data.noi_dung,
						      	thoi_gian: data.thoi_gian,
						      	dia_diem: data.dia_diem})
				            .then(function(){
				             	return resolve({result: 'updated'});
				             })
				            .catch(function(err) {
			                    return reject(new Error({error: err}));
			                })
				        } else {
				              // bao_duong does not exist. Create.
				              // console.log(data.bien_so);
				            
				             Baoduong.create(
				            	{year: data.year,
						      	bien_so: data.bien_so,
						      	km_xe_chay_trong_thang: data.km_xe_chay_trong_thang,
						      	km_xe_chay_luy_ke: data.km_xe_chay_luy_ke,
						      	so_chuyen_trong_thang: data.so_chuyen_trong_thang,
						      	so_chuyen_xe_luy_ke: data.so_chuyen_xe_luy_ke,
						      	noi_dung: data.noi_dung,
						      	thoi_gian: data.thoi_gian,
						      	dia_diem: data.dia_diem})
				             .then(function(){
				             	return resolve({result: 'inserted'});
				             })
				            }
                        // return resolve({'ccdcdc':baoduong});
                })
                .catch(function(err) {
                    return reject(new Error({error: err}));
                })
                })
    }

