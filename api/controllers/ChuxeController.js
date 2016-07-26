/**
 * ChuxeController
 *
 * @description :: Server-side logic for managing chuxes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getChuxeByUsername: function(req, res){
		// console.log(req.body);return;
      	Chuxe.findOne({
		  username: req.body.username
		}).exec(function (err, chuxe){
		  if (err) {
		    return res.negotiate(err);
		  }
		  if (!chuxe) {
		    return res.notFound('Could not find chuxe, sorry.');
		  }

		  sails.log('Found "%s"', chuxe.username);
		  return res.json(chuxe);
		});
    }
};

