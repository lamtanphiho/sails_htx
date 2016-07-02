
module.exports = function(req, res, next) {
    tokenService.parse(req)
            .then(function(user) {
               if(user.role == 'admin' || user.role == 'agent')
                    next();
                else
                    res.forbidden();

            })
            .catch(function(err) {console.log(err);
                return res.json(401, { error: 'token_invalid', position: 2 });
            })
};
