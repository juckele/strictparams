var Mocha = require('mocha');

console.log("Starting manual mocha tests 你好");

var mocha = new Mocha;
mocha.addFile('test/params');

mocha.run(function(failures) {
	process.on('exit', function () {
		process.exit(failures);
	});
});