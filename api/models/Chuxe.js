/**
 * Chuxe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	username: { 
            type: 'string', required: true, unique: true, alphanumericdashed: true
        },
        donvi: { 
             type: 'string', required: true
        },
        chu_dautu: {
            type: 'string', required: true
        },
        ngaysinh: {
            type: 'date', required: true
        },
        quoctich: {
            type: 'string', required: true
        },
        hktt:{
        	type:'string', required: true
        },
        cmnd:{
        	type:'string'
        },
        noicap_cmnd:{
        	type:'string'
        },
        ngaycap_cmnd:{
        	type:'date'
        },
        cancuoc:{
        	type:'string'
        },
        ngaycap_cancuoc:{
        	type:'date'
        },
        noicap_cancuoc:{
        	type:'string'
        },
        hochieu:{
        	type:'string'
        },
        ngaycap_hochieu:{
        	type:'date'
        },
        noicap_hochieu:{
        	type:'string'
        },
        dt_ban:{
        	type:'string'
        },
        dtdd:{
        	type:'string', required: true
        },
        ghichu:{
        	type:'text'
        }
  }
};

