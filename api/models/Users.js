/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	created_at: {
            type: 'datetime'
        },
        updated_at: { 
            type: 'datetime'
        },
        username: { 
            type: 'string', required: true, unique: true, alphanumericdashed: true
        },
        email: {
            type: 'email', required: true, uniqueEmail: true
        },
        password: {
            type: 'string', required: true, password: true
        },
        phone: {
            type: 'string', required: true, phone: true, unique: true
        },
        fullname:{
        	type:'string', required: true
        },


        // We don't wan't to send back encrypted password either
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        }
  }
};

