/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 */

module.exports = {
	
	index: function(req, res) {

		// if a jwt has just been set (-> redirect from successful login), provide
		// it to be saved in the browser's sessionStorage
		var jwt = null;
		if (req.user && req.user.jwt) jwt = req.user.jwt;
		
		res.view('app/app', {
			jwt: jwt,
			layout: 'layout-app'
		});

	}

};

