/**
 * Xe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
	bien_so: {
            type: 'string', required: true
        },
  hieu_xe: {
            type: 'string', required: true
        },
  loai_xe: {
            type: 'string', required: true
        },
  trong_tai: {
            type: 'string', required: true
        },
  nuoc_sx: {
            type: 'string', required: true
        },
  so_khung: {
            type: 'string', required: true
        },
  so_may: {
            type: 'string', required: true
        },
  nam_sx: {
            type: 'string', required: true
        },
  ngay_dang_kiem:{
        	type:'date', required: true
        },
  ngay_het_dk: {
        	type:'date', required: true
        },
  ngay_cap_bh_dan_su: {
        	type:'date', required: true
        },
  ngay_het_bh_dan_su: {
        	type:'date', required: true
        },
  ngay_cap_phu_hieu: {
        	type:'date', required: true
        },
  ngay_het_phu_hieu: {
        	type:'date', required: true
        },
  thiet_bi_gsht: {
            type: 'string', required: true
        },
  ngay_dk_gsht: {
        	type:'date', required: true
        },
  ngay_het_gsht: {
        	type:'date', required: true
        },
  km_hanh_trinh: {
            type: 'text'
        },
  chu_xe: {
            type: 'string', required: true
        },
  tai_xe: {
            type: 'string'
        },
  
  ghi_chu: {
            type: 'string'
        },
  }
};

