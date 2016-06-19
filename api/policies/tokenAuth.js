module.exports = function(req, res, next) {
    var token;
console.log('conket');
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;console.log(token);
            }
        } else {
            return res.json(401, { error: 'Format is Authorization: Bearer [token]' });
        }
    } else if (req.param('token')) {
        token = req.param('token');
        // We delete the token from param to not mess with blueprints
        delete req.query.token;
    } else {
        return res.json(401, { error: 'No Authorization header was found' });
    }
    tokenService.parse(req)
            .then(function(user) {console.log(user);
                session.role = user.role;
                next();
            })
            .catch(function(err) {console.log(err);
                return res.json(401, { error: 'token_invalid' });
            })
    
    tokenService.verify(token, function(err, token) {
        if (err) return res.json(401, { error: 'token_invalid' });

        req.token = token;

        next();
    })
};
