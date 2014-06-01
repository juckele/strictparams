var param = require('../params');
var util = require('util');
var assert = require('chai').assert;

function required0 (p) {
    param.required(p, []);
}

function required1 (p) {
    param.required(p, ["req1"]);
}

function required2 (p) {
    param.required(p, ["req1", "req2"]);
}

function required5 (p) {
    param.required(p, ["req1", "req2", "req3", "req4", "req5"]);
}

function optional1 (p) {
    param.optional(p, ["opt1"]);
}

function optional2 (p) {
    param.optional(p, ["opt1", "opt2"]);
}

function req1opt1 (p) {
    param.check(p, ["req1"], ["opt1"]);
}

function req3opt3 (p) {
    param.check(p, ["req1", "req2", "req3"], ["opt1", "opt2", "opt3"]);
}

function req2opt0 (p) {
    param.check(p, ["req1", "req2"], []);
}

function req2optU (p) {
    param.check(p, ["req1", "req2"]);
}

function req0opt2 (p) {
    param.check(p, [], ["opt1", "opt2"]);
}

describe('required', function () {
    it('allows required parameter', function (done) {
	assert.doesNotThrow(function () {
	    required1({
		req1: 10,
	    });
	});
	done();
    });

    it('disallows missing parameter', function (done) {
	assert.throw(function () {
	    required2({
		req1: 10,
	    });
	});
	done();
    });

    it('allows missing parameter blocks if required is empty', function (done) {
	assert.doesNotThrow(function () {
	    required0();
	});
	done();
    });

    it('allows extra parameters', function (done) {
	assert.doesNotThrow(function () {
	    required2({
		req1: 10,
		req2: 3,
		req3: 7,
	    });
	});
	done();
    });

    it('allows falsey values', function (done) {
	assert.doesNotThrow(function () {
	    required5({
		req1: 0,
		req2: undefined,
		req3: null,
		req4: '',
		req5: NaN,
	    });
	});
	done();
    });
});

describe('optional', function () {
    it('allows valid parameter', function (done) {
	assert.doesNotThrow(function () {
	    optional1({
		opt1: 'true',
	    });
	});
        done();
    });

    it('allows multiple valid parameter', function (done) {
	assert.doesNotThrow(function () {
	    optional2({
		opt1: 'true',
		opt2: 'true',
	    });
	});
        done();
    });

    it('disallows invalid parameter', function (done) {
	assert.throw(function () {
	    optional2({
		opt3: 'true',
	    });
	}, "not expected");
        done();
    });

    it('disallows falsey invalid parameter', function (done) {
	assert.throw(function () {
	    optional2({
		opt3: undefined,
	    });
	}, "not expected");
        done();
    });

    it('allows missing parameter', function (done) {
	assert.doesNotThrow(function () {
	    optional2({
	    });
	});
        done();
    });

    it('allows missing parameters block', function (done) {
	assert.doesNotThrow(function () {
	    optional1();
	});
        done();
    });
});

describe('check', function () {
    it('allows required parameter', function (done) {
	assert.doesNotThrow(function () {
	    req1opt1({
		req1: 'true',
	    });
	});
        done();
    });

    it('allows optional parameter', function (done) {
	assert.doesNotThrow(function () {
	    req1opt1({
		req1: 'true',
		opt1: 0,
	    });
	});
        done();
    });

    it('disallows invalid parameter', function (done) {
	assert.throw(function () {
	    req1opt1({
		req1: 'true',
		opt2: -1,
	    });
	});
        done();
    });

    it('undefined optinal works with valid params', function (done) {
	assert.doesNotThrow(function () {
	    req2optU({
		req1: false,
		req2: false,
	    });
	});
        done();
    });

    it('undefined optinal doesn\'t allow unexpected params', function (done) {
	assert.throw(function () {
	    req2optU({
		req1: false,
		req2: false,
		opt1: 'fail'
	    });
	});
        done();
    });    
});

describe('get', function () {
    it('allows get of required parameter', function (done) {
	var localfunction = function (p) {
	    var sp = param.required(p, ['req1', 'req2']);
	    var req1 = sp.get('req1');
	};
	assert.doesNotThrow(function () {
	    localfunction({
		req1: 2,
		req2: 4,
	    });
	});
        done();
    });

    it('allows get of optional parameter', function (done) {
	var localfunction = function (p) {
	    var sp = param.optional(p, ['opt1', 'opt2']);
	    var opt2 = sp.get('opt2');
	};
	assert.doesNotThrow(function () {
	    localfunction({
		opt1: 2,
		opt2: 4,
	    });
	});
        done();
    });

    it('allows get of optional parameter after check', function (done) {
	var localfunction = function (p) {
	    var sp = param.check(p, ['req1'], ['opt1', 'opt2']);
	    var opt2 = sp.get('opt2');
	};
	assert.doesNotThrow(function () {
	    localfunction({
		req1: "taco",
		opt1: 2,
		opt2: 4,
	    });
	});
        done();
    });

    it('doesn\'t allow getting field not in either field', function (done) {
	var localfunction = function (p) {
	    var sp = param.check(p, ['req1', 'req2'], ['opt1']);
	    var opt2 = sp.get('opt2');
	};
	assert.doesNotThrow(function () {
	    localfunction({
		req1: 2,
		req2: 4,
	    });
	});
        done();
    });

    it('allows get of falsey optional values', function (done) {
	var localfunction = function (p) {
	    var sp = param.check(p, ['req1'], ['opt1', 'opt2']);
	    var opt2 = sp.get('opt2');
	};
	assert.doesNotThrow(function () {
	    localfunction({
		req1: "burger",
		opt1: 1,
		opt2: undefined,
	    });
	});
        done();
    });

});
