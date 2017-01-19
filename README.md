# inhabit-module-base [![npm version](https://badge.fury.io/js/inhabit-module-base.svg)](https://badge.fury.io/js/inhabit-module-base) [![Inline docs](http://inch-ci.org/github/ArkadiumInc/node-inhabit-module-base.svg?branch=master)](http://inch-ci.org/github/ArkadiumInc/node-inhabit-module-base) [![Code Climate](https://codeclimate.com/github/ArkadiumInc/node-inhabit-module-base/badges/gpa.svg)](https://codeclimate.com/github/ArkadiumInc/node-inhabit-module-base)

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

You have access to next features of Inhabit through base class:

##### JQuery
````javascript
    this.$;
````

##### Handlebars
````javascript
    this.handlebars;
````

##### Semantic service 
````javascript
    this.textClassificationService; 
````

##### AB tests
````javascript
    this.abTestManager;
````
AB test manager allows you to extend your object properties and add AB test support for them
For example you have property:
````javascript
    var myTitle = this.configuration.title;
````
that you recieve from json configuration delivered by Inhabit platform
````JSON
    {
      "modules": [
        {
          "id": "myModule",
          "title":"My Title"
        }
      ]
    }
````
If you want to AB test this property, simply change you json to this
````javascript
  {
      "modules": [
        {
          "id": "myModule",
          "title":{
          // id of abTest should be gloabally unique, it is good to 
          // name it according to what you test and add date when you added test
            "abTest":"testTitle-01/21/2017", 
            // experiment explanation, contains array of arrays with desired values and probability of their appearence for the use. 
            // at this case 50% time you will see "Click me" and another 50% "My Title"
            "experiment":[
              ["Click me!",0.5],
              ["My title",0.5]
            ],
            // if referesh property set to true, user will see new result each time he refresh the page. I false, 
            // user will always see value that he seen at first time. For example if he seen "Click me!" title he will 
            // see this title all the time during the test.
            "refresh":true
          }
        }
      ]
  }
````
And then at your code:
````javascript
    var myTitle = this.abTestManager.getSetting(this.configuration.title);
````
That's it now AB test will automatically set proper value based on you weights
If you will reveret your configration to the previous one without AB test in it, there no need to change code, it will 
still work properly. So next time you will need to run abTest, you will need just change configuration.

You can use ABTest manager for any javascript object if you want;
##### Logger
````javascript
    this.logger;
````
Logger - built-in logger can be enabled in production through specific configuration, allows you debug your application in production.
Logger logs to browser console and enabled by default in dev environment, while disabled in production. Using this logger allow you to keep
all your logging code and be silent in production environment

Usage:
````javascript
    this.logger("simple console log");
    this.logger({h: "header", c:'r', type: 'error'}, "console log with header");
    this.logger({h: "header", c:'r', type: 'error'}, "console log with header","some additional details can be provided here");
````

##### Events
````javascript
    this.events
````
Run method this.events.refreshAd() on user click if you want to refresh ad block inside the InHabit, it will fire event:
````javascript
this.events.refreshAd
````

##### ModalPopup
````javascript
    this.modalPopup
````

Open popup window with your custom url, use method:
````javascritp
this.modalPopup.open('your url')
````
Open terms of service popup window, use method: 
````javascritp
this.modalPopup.openTermsOfService()
````




