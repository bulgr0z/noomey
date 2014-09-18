/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var jwt = require('jsonwebtoken');

// module.exports = function(req, res, next) {
// 	console.log('auth ?');
// 	console.log('HEADERS : ', req.headers);

// 	jwt.verify(req.user.jwt, "eyed-cribbage-littoral-gnomon-chez-bleat", function(err, decode) {
// 		console.log('DECODE JWT ?');
// 		console.log(err, decode);
// 	});

//   // User is allowed, proceed to the next policy, 
//   // or if this is the last policy, the controller
//   console.log(req.user);
//   console.log(req.session)
//   if (req.session.authenticated) {
//   	console.log('is auth !')
//     return next();
//   }

//   // User is not allowed
//   // (default res.forbidden() behavior can be overridden in `config/403.js`)
//   return res.forbidden('You are not permitted to perform this action.');
// };

module.exports = function(req, res, next) {

	// `foreignJwt` may come form different sources (headers / query / etc...)
	// for now assume a token sent into req.headers
	var foreignJwt = req.headers.jwt;
	
	function forbidden() {
		return res.forbidden('not allowed');
	}

	if (foreignJwt) {
		jwt.verify(foreignJwt, sails.config.jwt.secret, function(err, decode) {

			if (err) return forbidden(); // nope, bad token

			// find the user of the jwt
			User.findOne({ id: decode.user }).exec(function(err, user) {

				// if the jwt (headers vs db) match AND the token is not expired, user is auth
				if (user.jwt === foreignJwt && (decode.iat + sails.config.jwt.ttl) > new Date().getTime() ) return next();

				return forbidden(); // fake or expired token
			});

		});		
	} 

	return forbidden(); // no jwt found

};