
# 

## Fmk.js

![Practice](/images/tuto/fmk.jpg)

## Not only Backbone

The JavaScript framework contains many things. Some are build on the top of Backbone as said before (the views, models). But they are many more things.

- Helpers 
- Views 
- templates 
- Models

## Domain: definition

A domain has many attributes: 

- **type**: Javascript type _boolean_, _number_, _string_.
- **validation**: An array of the validation attributes with the following types: _regex_, _number_, _string_, _function_
- **decorator**: the name of a jQuery plugin use for the domain rendreing
- **formatter**: `{value: function(data, opts){//validate the data}, options: {isCool: true}}`

## Domain: Example
```:json
{
 "DO_LABEL_30": {
  "type": "string",
  "validation": [{
    "type": "string",
    "options": {
      "maxLength": 30
    } 
  }],
  style: "do_label_30",
  required: false
}
```

## Domain: validation:  Object structure
The validation has to have the following structure: 
```:javascript
{
 'type': 'validationType', /*number, string, date, function, string, regex.*/
 'value': valiationValue, //Optional but when need it is the value of the validator
 'options': {'opt1': opt1Value, 'opt2': opt2Value, label: "property.name"} //Optional as its name says.
}
```

## number
The number mean the property has to be a number, it will go through a `isNaN` function after a cast into a int value with the + operator.
This validation takes the following options

- **max**: The maximum value authorize
- **min**: The minimum value authorize.
```:javascript
{"type":"number", "options": {"min": 1, "max": 30}}
```

##string

The string validation will check that the property is a string.
It takes the following options:

- **minLength**: The minimum length options, has to be an integer.
- **maxLength**: The maximum length options, has to be an integer.
<br />
Example of declaration: 
```:json
{
  "type":"string", 
  "options": {"minLength": 1, "maxLength": 30}
}
```

## regex

This validation will takes the regex define into the **value** field and apply the following to test if the property value match the _Regex_: `regexValue.test(propertyValue)`.<br />
Note that regex takes no options.

Example of declaration: 
```:json
{
  "type":"regex", 
  "value": /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/ 
}
```


## function

```:javascript
//Define a function.
{
  "type":"function",
  "value": function(propertyValue, options){
    return prop === true;
  }
}
```

## Example

```:json
"DO_ENTIER": {
  "type": "number",
  "validation": [{
    "type": "regex",
    "value": "^\\d+$"
  }],
},
"DO_DATE": {
  "type": "date",
  "validation": [{
    "type": "date"
  }]
},
"DO_LABEL_30": {
  "type": "string",
  "validation": [{
    "type": "string",
    "options": {
      "maxLength": 30
    } 
  }]
},
"DO_CUSTOM": {
  "type": "date",
  "validation": [{
    "type": "function",
    "value": function(propertyValue, options){
      return prop === true;
    }
  }]
},
```

## Site decription (1/5)
jfncjdnvcjdnj

## Site description (2/5)
```:javascript
//Function use to build the site description from the 
var site = function (p) {
    return {
        headers: [{
            name: "home",
            url: "#home",
            roles: ['ADMIN_GENERAL_CONSULT']
        }, {
            name: "centerStructure",
            url: "#centerStructure/sites/siteList",
            roles: ['STRUCT_SITE_CONSULT'],
            headers: [{
                name: "sites",
                url: "#centerStructure/sites/siteList",
                roles: ['STRUCT_SITE_CONSULT'],
                requiredParams: ['sitId'],
                headers: [{
                    name: "site",
                    url: "#centerStructure/sites/siteDetail/" + p.sitId.value,
                    roles: ['STRUCT_SITE_CONSULT']
                }, {
                    name: "buildingList",
                    url: "#centerStructure/sites/siteDetail/" + p.sitId.value + "/buildingList",
                    roles: ['STRUCT_SITE_CONSULT'],
                    requiredParams: ['bldId'],
                    pages: [{
                        name: "building",
                        url: "#centerStructure/sites/siteDetail/" + p.sitId.value + "/buildingDetail/" + p.bldId.value,
                        roles: ['STRUCT_SITE_CONSULT']
                    }]
                }]}]}],
              pages: [
                //Test page 
                {
                    name: "domainTest",
                    url: "#administration/domainTest",
                    roles: ['ADMIN_GENERAL_CONSULT']
                }]
    };
};
```

## Site description (3/5)

```:javascript
//Container for the module exports.
var siteDescription = {};

//Default name and value parameters.
var defaultParams = {
    bldId: {
        name: 'bldId',
        value: ':bldId'
    },
    cslId: {
        name: 'cslId',
        value: ':cslId'
    },
    countryCode: {
        name: 'countryCode',
        value: ":countryCode"
    },
    vatCode: {
        name: 'vatCode',
        value: ":vatCode"
    },
    roleId: {
        name: 'roleId',
        value: ':roleId'
    },
    sitId: {
        name: 'sitId',
        value: ':sitId'
    },
    steId: {
        name: 'steId',
        value: ':steId'
    }
};
```

## Site description (4/5)

```:javascript
//Exports ther params for initialization.
siteDescription.params = defaultParams;

//Function to build the site description depending on parameters.
siteDescription.value = function (params) {

    //Extend the params.
    var p = _.extend({}, defaultParams, params);

    //Process the site description construction.
    return site(p);
};

//Export site description.
module.exports = siteDescription;
```

# Practice

## Improve the contact view and test it into a real case
![Practice](/images/tuto/practice.jpeg)


# Tools 

## Page templae builder (1/2)

- In order to be able to build an application page. You might need sevral files. One View, One Model, One Collection, One Service, Two Templates. 
- It can be pain to alwaws create the same file structure in order to build your application.
- That is why we build a tool in order to create "page" template
- It is based on the same template language as in the application views.

## Page templae builder (2/2)
![Template generator](/images/pattern/templateGenerator.png)


## Chrome Dev tools

Chrome provide us a really great dev tools, you have to get use to them.
![Chrome dev tools](/images/tuto/dev-tools.png)

## Console
You have to ge use to the fact that the console will be usefull.
![Console](/images/tuto/console.png)

## JSHINT
Quality tools:
![JSHINT](/images/tuto/jshint.png)