
module.exports = {
	authenticate: function(req, res) {
        var ticket = req.body;

        if (!ticket.username || !ticket.password) {
            return res.json(401, { error: 'username and password required' });
        }

        Users.findOne({
            username: ticket.username
        }).exec(function(err, user) {

            if (!user) {
                return res.json(401, { error: 'invalid username, cannot find ' + ticket.username });
            }

            Users.comparePassword(ticket.password, user, function(err, valid) {

                if (!valid) {
                    return res.json(401, { error: 'invalid username or password' });
                } else {
                    res.json({ token: tokenService.generate({ sid: user.id }) });
                }

            });
        });
    },
     user: function(req, res) {

        tokenService.parse(req)
            .then(function(user) {
                return res.json(200, { user: user });
            })
            .catch(function(err) {
                return res.json(401, { error: 'token_invalid' });
            })
    },
    
};

