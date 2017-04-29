var express = require("express");
var multer = require('multer');
var async = require("async");
var extract = require('extract-zip')

var app = express();

var tempFile = '';

var storage = multer.diskStorage({
	destination : function(req, file, callback) {
		callback(null, './uploads');
	},
	filename : function(req, file, callback) {
		// callback(null, file.fieldname + '.' + file.);
		tempFile = __dirname + "/uploads/" + file.originalname;
		callback(null, file.originalname);
	}
});
var upload = multer({
	storage : storage
}).single('userPhoto');

app.get('/', function(req, res) {
	res.sendfile(__dirname + "/index.html");
});

app.post('/api/photo', function(req, res) {
	async.waterfall([ function(callback) {
		upload(req, res, function(err) {
			if (err) {
				return res.end("Error uploading file.");
			}
			callback(null, tempFile);
			// res.end("File is uploaded");
			// extract();
		});
	}, function(arg1, callback) {
		console.log('Inside Extract');
		console.log(arg1);
		extract(arg1, {
			dir : './uploads'
		}, function(err) {
			// handle err
			if (err == typeof(undefined))
				return res.end("Error extracting file.");
			else
				res.end("File is extracted");
		})

	} ], function(err, result) {

	});
});

app.listen(3000, function() {
	console.log("Working on port 3000");
});
