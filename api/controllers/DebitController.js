/**
 * DebitController
 *
 * @description :: Server-side logic for managing debits
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	add: function(req, res) {
		console.log('hello');
	},

	save: function(req, res) {
		console.log('wut')
		//console.log(req);
		//console.log(req.body.tags);
		//console.log(typeof req.body.tags)

		console.log(req.body);
		console.log(req.body.tags)
		console.log(typeof req.body.tags)
		console.log('save');
	}


};
