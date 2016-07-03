/**
 * XeController
 *
 * @description :: Server-side logic for managing xes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getXe: function(req, res){

        var users = {};
		var query = '';
		 tokenService.parse(req)
          .then(function(user) {
              if(user.role == 'admin'){
              	query = 'SELECT * FROM xe';
                }else if(user.role == 'agent'){
					query = 'SELECT * FROM xe where chu_xe="'+user.username+'"';
                }else if(user.role == 'user'){
					query = 'SELECT * FROM xe where tai_xe="'+user.username+'"';
                }
                Users.query(query, function(err, results) {
        		  			if (err) return res.serverError(err);
        						xe = results;
        						return res.ok(xe);
        					});
            })
            .catch(function(err) {
              console.log(err);
                return res.json(401, { error: 'token_invalid', position: 5 });
            })
    }
};

