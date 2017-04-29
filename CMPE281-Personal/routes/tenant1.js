/**
 * http://usejsdoc.org/
 */
var async = require("async");
var multer= require("multer");

var storage = multer.diskStorage({ // multers disk storage settings
	destination : function(req, file, cb) {
		cb(null, './uploads/')
	},
	filename : function(req, file, cb) {
		var datetimestamp = Date.now();
		cb(null,
				file.fieldname
						+ '.'
						+ file.originalname.split('.')[file.originalname
								.split('.').length - 1])
	}
});

var upload = multer({ // multer settings
	storage : storage
}).single('file');

exports.handleReq = function(req, resp) {

	async.series({
		getZipFile : function(callback) {
			upload(req, res, function(err) {
				if (err) {
					res.json({
						error_code : 1,
						err_desc : err
					});
					return;
				}
				res.json({
					error_code : 0,
					err_desc : null
				});
				callback(null, 1);
			});
		},
		generateImg : function(callback) {
			setTimeout(function() {
				callback(null, 2);
			}, 100);
		},
		sendResponse : function(callback) {
			setTimeout(function() {
				callback(null, 3);
			}, 100);
		}
	}, function(err, results) {
		// results is now equal to: {one: 1, two: 2}
	});

};