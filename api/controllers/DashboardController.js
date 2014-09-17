// Confus, ne fait pas partie de l'API : devrait s'appeller `WebappController` ?

/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	index: function(req, res) {

		console.log(req.user);

		res.view('app/app', {
			jwt: req.user.jwt
		});
	}

};

