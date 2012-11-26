var exec = require('child_process').exec;
var renderer = require('twig');
var fs = require('fs');
var querystring = require('querystring');

function form(response, postData) {
	console.log("form");
	fs.readFile('views/post.twig',"utf-8", function (err, content) {
		if (err) throw err;
		response.writeHead(200, {"Content-Type":"text/html"});
		var template = renderer.twig({
			data : content
		})
		response.write(template.render({title:"Post"}));
		response.end();
	});
}

function start(response, postData) {
	console.log("start");
	exec("find /", {timeout:10000, maxBuffer:20000*1024}, function(error, stdout, stderr) {
		response.writeHead(200, {"Content-Type":"text/plain"});
		response.write(stdout);
		response.end();
	});
}

function upload(response, postData) {
	console.log("upload");
	response.writeHead(200, {"Content-Type":"text/plain"});
	response.write(querystring.parse(postData).email);
	response.end();
}

exports.start = start;
exports.upload = upload;
exports.form = form;
