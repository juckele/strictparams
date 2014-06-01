# strictparams

A strict parameter module

## Code Examples

```var params = require('strictparams');

function foobar(p) {
   // checks that p contains keys in the required array and doesn't contain keys not in the optional array
   params.check(p, ["requiredParam1", "requiredParam2"], ["optionalParam1"]);
}

function foo(p) {
   // checks just that p contains keys in the required array
   params.required(p, ["requiredParam1"]);
}

function bar(p) {
   // checks just that p doesn't contain keys not in the optional array
   params.optional(p, ["optionalParam1", "optionalParam2"]);
}

// all methods of params return a StrictParameter object which has one method, get
function cat(p) {
   sp = params.check(p, ["alpha"], ["beta"]);
   var alpha = sp.get(p, "alpha"); 
   var beta = sp.get(p, "beta"); // sp will remember that 'beta' was optional and return undef if the key is not defined
   var omega = sp.get(p, "omega"); // this line will fail because 'omega' is not a required or optional parameter
}
```

## Contributors

This module was written by John Uckele