/**
 * Taixe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
  	
        username: { 
            type: 'string', required: true, unique: true, alphanumericdashed: true
        },
        date_born: { 
             type: 'date', required: true
        },
        quoctich: {
            type: 'string', required: true
        },
        address: {
            type: 'string', required: true
        },
        fullname:{
        	type:'string', required: true
        },
        cmnd:{
        	type:'string', required: true
        },
        noicap_cmnd:{
        	type:'string', required: true
        },
        ngaycap_cmnd:{
        	type:'date', required: true
        },
        so_giayphep_laixe:{
        	type:'string', required: true
        },
        hang:{
        	type:'string', required: true
        },
        loaixe_duoclai:{
        	type:'string', required: true
        },
        ngay_gplx:{
        	type:'date', required: true
        },
        ngayhet_gplx:{
        	type:'date', required: true
        },
        noicap_gplx:{
        	type:'string', required: true
        }, 
        so_cnthnv:{
        	type:'string', required: true
        }, 
        ngay_cnthnv:{
        	type:'date', required: true
        }, 
        ngayhet_cnthnv:{
        	type:'date', required: true
        }, 
        noicap_cnthnv:{
        	type:'string', required: true
        }, 
        ngaykham_suckhoe:{
        	type:'date', required: true
        }, 
        ngayhet_suckhoe:{
        	type:'date', required: true
        }, 
        ghichu:{
        	type:'text'
        }
  }
};

