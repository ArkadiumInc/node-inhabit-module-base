# inhabit-module-base [![npm version](https://badge.fury.io/js/inhabit-module-base.svg)](https://badge.fury.io/js/inhabit-module-base) [![Inline docs](http://inch-ci.org/github/ArkadiumInc/node-inhabit-module-base.svg?branch=master)](http://inch-ci.org/github/ArkadiumInc/node-inhabit-module-base) [![Code Climate](https://codeclimate.com/github/ArkadiumInc/node-inhabit-module-base/badges/gpa.svg)](https://codeclimate.com/github/ArkadiumInc/node-inhabit-module-base)

A base module for building an InHabit Module.

###TOC
1. [Installation](#install)
2. [Usage](#usage)
3. [JQuery](#jquery)
4. [Handlebars](#handlebars)
5. [Semantic service](#semanticservice) 
    - [Taxonomy](#taxonomy)
    - [Entities](#enttities)    
    - [Keywords](#keywords)
6. [AB tests](#abtests)
7. [Logger](#logger)
8. [Events](#events)
    - [Ready](#ready)
    - [Error](#error)
    - [InteractionStart](#interactionstart)
    - [CycleStart](#cyclestart)
    - [CycleEnd](#cycleend)
    - [Custom](#custom)
9. [Modal popup](#modalpopup)

## Installation<a name="install"></a>
```sh
npm install --save-dev inhabit-module-base
```


## Usage <a name="usage"></a>
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

### JQuery <a name="jquery"></a>
````javascript
    this.$;
````

### Handlebars<a name="handlebars"></a>
````javascript
    this.handlebars;
````

### Semantic service <a name="semanticservice"></a>
This service allows you to grab contextual information about your page for later use.
````javascript
    this.textClassificationService; 
````
#### Taxonomy<a name="taxonomy"></a>
**getTaxonomy** method returns promise that results into the array of taxonomy information about this page.
````javascript
    this.textClassificationService.getTaxonomy().then(function(taxonomy){
        
    })
````
where "taxonomy" is array:
````javascript
[
    {
        "values": [
            "sports",
            "football"
        ],
        "score": 0.990101
    },
    {
        "values":[
            "business and industrial",
            "logistics",
            "freight train"
        ],
        "score":0.36197
    }
    ...
]
````
vales in this case are dependent from each other, you should read them like this sports->football; business and industrial->logistics->freight train
For full list of available taxonomy please look this document [Taxonomy reference](docs/taxonomy.csv)

#### Entities<a name="entities"></a>
**getEntities** - method returns promise that results into array of entities relevant to this page.
````javascript
    this.textClassificationService.getEntities().then(function(entities){
        
    })
````
where "entities" is array:
````javascript
    {
        "values": [
            "Matt Jones"
        ],
        "score": 0.82653,
        "type": "Person"
    },
    {
        "values": [
            "Coach Jay Gruden"
        ],
        "score": 0.668899,
        "type": "Person",
        "misc": {
            "subType": [
                "FootballPlayer",
                "SportsOfficial"
            ],
            "name": "Jay Gruden"
        }
    }
````
List of available [types](docs/entity-types.csv) and [sub types](docs/sub-types.csv)

#### Keywords<a name="keywords"></a>
**getKeywords** - method returns promise that results into array of keywords, keywords are broader view of text than entities and taxonomy based on words that 
could be used to describe meaning of the text
````javascript
    this.textClassificationService.getKeywords().then(function(keywords){
        
    })
````
where "keywords" is array:
````javascript
[
    {
        "values": [
            "Monday night"
        ],
        "score": 0.926018
    },
    {
        "values": [
            "Coach Jay Gruden"
        ],
        "score": 0.746022
    }
]
````

### AB tests<a name="abtests"></a>
````javascript
    this.abTestManager;
````
AB test manager allows you to extend your object properties and add AB test support for them
For example you have property:
````javascript
    var myTitle = this.configuration.title;
````
that you receive from json configuration delivered by Inhabit platform
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
### Logger<a name="logger"></a>
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

### Events<a name="events"></a>
````javascript
    this.events
````

#### Ready<a name="ready"></a>
Call this method when interactive loaded all required resources and ready to be displayed to the user
````javascript
    this.events.ready(message)
````
**message[optional]** - if you need any message attached to the ready event, this message can be later used in analytics dashboard for example

#### Error <a name="error"></a>
Call this method if any error appears in your application. This will help to track them down and make your application better
````javascript
    this.events.error(message)
````
**message[optional]** - if you need any message attached to the error event, this message can be later used in analytics dashboard for example

#### InteractionStart<a name="interactionstart"></a>
Call this method when user performs first interaction with application. This event should be called once per application lifetime
````javascript
    this.events.interactionStart(message)
````
**message[optional]** - if you need any message attached to the interactionStart event, this message can be later used in analytics dashboard for example

#### CycleStart<a name="cyclestart"></a>
Call this method when user starts iteration/cycle/sequence of logic in your application
````javascript
    this.events.cycleStart(message)
````
**message[optional]** - if you need any message attached to the cycleStart event, this message can be later used in analytics dashboard for example

#### CycleEnd<a name="cycleend"></a>
Call this method when user end iteration/cycle/sequence of logic in your application
````javascript
    this.events.cycleEnd(message)
````
**message[optional]** - if you need any message attached to the cycleEnd event, this message can be later used in analytics dashboard for example

#### Custom <a name="custom"></a>
You can use this event to propagate any custom messages for analytics purposes 
````javascript
    this.events.custom(name, message)
````
**name** - name of the event
**message[optional]** - if you need any message attached to the custom event, this message can be later used in analytics dashboard for example

Run method this.events.refreshAd() on user click if you want to refresh ad block inside the InHabit, it will fire event:
````javascript
this.events.refreshAd
````

### ModalPopup<a name="modalpopup"></a>
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
