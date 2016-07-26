/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	getListUser: function(req, res){

        var users = {};
		
		 tokenService.parse(req)
          .then(function(user) {
              if(user.role == 'agent'){
              	Users.query('SELECT *, users.id as user_id FROM users, taixe WHERE users.username = taixe.username and users.parent_id = "'+user.username+'"', function(err, results) {
        		  			if (err) return res.serverError(err);
        						users = results;
        						return res.ok(users);
        					});
                }else if(user.role == 'admin'){
              	   Users.query('SELECT * FROM users, chuxe WHERE users.username = chuxe.username', function(err, results) {
        					  	if (err) return res.serverError(err);
        					  	users = results;
        					  	Users.query('SELECT  *, users.id as user_id  FROM users, taixe WHERE users.username = taixe.username', function(err, results) {
        						  	if (err) return res.serverError(err);
        						  	for(var i = 0; i< results.length; i++)
        						  		users.push(results[i]);
        						  	return res.ok(users);
        					     });
    					
					  
					         });
					
                }
                
            })
            .catch(function(err) {
              console.log(err);
                return res.json(401, { error: 'token_invalid', position: 5 });
            })
    }
};

