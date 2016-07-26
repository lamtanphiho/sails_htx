/**
 * Users.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcryptjs');
var Promise = require('bluebird');
var uniqueEmail = false;
module.exports = {
 schema: true,
  attributes: {
  	
        username: { 
            type: 'string', required: true, unique: true, alphanumericdashed: true
        },
        parent_id: { 
            type: 'string', required: true, alphanumericdashed: true
        },
        email: {
            type: 'email', required: true, uniqueEmail: true
        },
        password: {
            type: 'string', required: true, password: true
        },
        phone: {
            type: 'string', required: true, unique: true
        },
        
        role      : {
          type     : "string",
          required : true,
          enum     : ['user', 'agent', 'admin'] // or sails.config.acl.roles
        },



        // We don't wan't to send back encrypted password either
        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        },

  },
   types: {
        phone: function(value) {
            return _.isString(value) && value.length >= 6 && value.length < 15 && value.match(/[+]/) && value.match(/[0-9]/);
        },
        password: function(value) {
            return _.isString(value) && value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
        },
        uniqueEmail: function(value) {
            return uniqueEmail;
        }
    },
     /**
     * Model validation messages definitions
     */
    validationMessages: {
        email: {
            required: 'Email is required',
            email: 'Provide valid email address',
            uniqueEmail: 'Email đã tồn tại !!!',
            regex: 'Email does not match format'
        },
        username: {
            alphanumericdashed: 'Username is a string consisting of only letters, numbers, and/or dashes.',
            unique: 'Username is already taken',
            required: 'Username is required',
        },
        password: {
            required: 'Password is required',
            password: 'Password không đúng format (123123Aa) !!!'
        },
        phone: {
            required: 'Phone is required',
            // phone: 'Phone does not match format',
            unique: 'Phone number is already taken',
        }
    },

    beforeValidate: function(values, next) {
        Users.findOne({ email: values.email })
            .then(function (user) {
                uniqueEmail = !user;
                next();
            })
    },
    /*beforeUpdate: function (values, next) {
        CipherService.hashPassword(values);
        next();
    },*/
   beforeCreate: function(values, next) {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(values.password, salt, function(err, hash) {
                if (err) return next(err);
                values.password = hash;
                next();
            })
        });
        
    },
   comparePassword: function(password, user, callback) {
        bcrypt.compare(password, user.password, function(err, match) {

            if (err) callback(err);
            if (match) {
                callback(null, true);
            } else {
                callback(err);
            }
        })
    },
    
};

