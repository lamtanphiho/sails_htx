/**
 * Bao_duong.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	id:{
    	type:'integer', required: true, unique: true, primaryKey: true
    }, 
    km_xe_chay_trong_thang:{
    	type:'text', required: true
    }, 
    km_xe_chay_luy_ke:{
    	type:'text', required: true
    }, 
    so_chuyen_trong_thang:{
    	type:'text', required: true
    }, 
    so_chuyen_xe_luy_ke:{
    	type:'text', required: true
    }, 
    noi_dung:{
    	type:'text', required: true
    }, 
    thoi_gian:{
    	type:'text', required: true
    }, 
    dia_diem:{
    	type:'text', required: true
    }, 
    
  }
};

