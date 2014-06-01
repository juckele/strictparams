var assert = require('chai').assert;

function get (parameterName) {
    if ( ( this._required && this._required.indexOf(parameterName) != -1 )
	 || ( this._optional && this._optional.indexOf(parameterName) != -1 ) ) {
	return this._parameters[parameterName];
    }
}

module.exports = {
    check : function (parameters, required, optional) {
	if ( ! parameters ) {
	    parameters = {};
	}
	var parameterKeys = Object.keys(parameters);
	for ( var i = 0 ; i < required.length; i++ ) {
	    if ( ! ( required[i] in parameters ) ) {
		throw new Error("Parameter "+required[i]+" expected and not found");
	    }
	    else {
		var index = parameterKeys.indexOf(required[i]);
		parameterKeys.splice(index, 1);
	    }
	}
	for ( var i = 0; i < parameterKeys.length; i++ ) {
	    if ( optional.indexOf(parameterKeys[i]) == -1 ) {
		throw new Error("Parameter "+parameterKeys[i]+" not expected");
	    }
	}
	return {
	    get: get,
	    _parameters: parameters,
	    _required: required,
	    _optional: optional,
	};
    },

    required : function (parameters, required) {
	if ( ! parameters ) {
	    parameters = {};
	}
	for ( var i = 0 ; i < required.length; i++ ) {
	    if ( ! ( required[i] in parameters ) ) {
		throw new Error("Parameter "+required[i]+" expected and not found");
	    }
	}
	return {
	    get: get,
	    _parameters: parameters,
	    _required: required,
	};
    },

    optional : function (parameters, optional) {
	if ( ! parameters ) {
	    parameters = {};
	}
	var parameterKeys = Object.keys(parameters);
	for ( var i = 0; i < parameterKeys.length; i++ ) {
	    if ( optional.indexOf(parameterKeys[i]) == -1 ) {
		throw new Error("Parameter "+parameterKeys[i]+" not expected");
	    }
	}
	return {
	    get: get,
	    _parameters: parameters,
	    _optional: optional,
	};
    }
}
