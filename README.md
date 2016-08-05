# inhabit-module-base [![npm version](https://badge.fury.io/js/inhabit-module-base.svg)](https://badge.fury.io/js/inhabit-module-base) [![Inline docs](http://inch-ci.org/github/rand0me/node-inhabit-module-base.svg?branch=master)](http://inch-ci.org/github/rand0me/node-inhabit-module-base) [![Code Climate](https://codeclimate.com/github/rand0me/node-inhabit-module-base/badges/gpa.svg)](https://codeclimate.com/github/rand0me/node-inhabit-module-base)

A base module for building an InHabit Module.

## Installation
```sh
npm install --save-dev inhabit-module-base
```

## Usage ES5
```javascript
var InhabitModuleBase = require('inhabit-module-base');

function MyModule(configuration, dependencies) {
    InhabitModuleBase.call(this, configuration, dependencies);
    
    ...
}

MyModule.prototype = Object.create(InhabitModuleBase.prototype);
MyModule.prototype.constructor = MyModule;
...

InhabitModuleBase.publish(MyModule);
```