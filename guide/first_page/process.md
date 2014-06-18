
#

## Create a simple page

In order to be able to display your first page you need to perform differents actions:

- Create a [model](http://backbonejs.org/#Model) which represents the data you want to display and the actions you might want to perform.
- Create a [view](http://backbonejs.org/#View) for your page which use your model
- Create a template for your view. The templating language we will use is [Handlebars](http://handlebarsjs.com/)

We will take as an example the problem of displaying a contact on a screen, and a list of contact.
A contact has the following attributes: 

- FirstName
- LastName
- Email

## Model: Define the model
A model has to extend an existing **Backbone.Model** which could be the default **Backbone.Model**.
```
var ContactModel = Backbone.Model.extend({
  default: {
    firstName: undefined,
    lastName: undefined,
    email: undefined
  },
  name: function displayFirstNameLastName(){
    return this.get('firstName') + ' ' + this.get('lastName');
  }
});
```

##Model : Using the model

Now that you have a model, you can try to create a model and play with it.
```
var contact = new ContactModel({firstName: "Robert", lastName: "Dupont", email: "robert@dupont.com"});
console.log(contact.get('firstName')); //Display: Robert
console.log(contact.name()); // Display: Robert Dupont
//Update the firstName and set its address (a new field)
contact.set({firstName: "Roberto", address: "12 rue des fleurs 75000 Paris"});
console.log(contact.get('firstName'), contact.get('address')); //Display: Roberto, 12 rue des fleurs 75000 Paris
```

## Template: data
A template is written in a template language. This template consume data which are pass to it by th view.  The data which are passed to the template are [JSON](http://www.json.org/).
 Usally, the data passed to the template are a json representation of the model. 
Here our data would be : 
```
{
  "firstName": "Robert",
  "lastName": "Dupont",
  "email" : "robert@dupont.com"
}
```

## Template: file

A template has a *.hbs* extension. Inside a template you can write plain HTML and when you need to access the value of the data passed inside the view you just have to type a `{{propertyName}}`.
As an example: `{{firstName}}`.
```:handlebars
<p> Mr {{firstName}}  {{lastName}} has the following email: {{email}}.</p>
```
A template will be _compiled_ as a JavaScript function by the [brunch](http://brunch.io/) tool.
Il will be use as follows: `templateFunction(jsonData);`<br/>
it will display:
```:html
<p> Mr Robert  Dupont has the following email: robert@dupont.com.</p>
```

## View: define

A **view** has to extend an existing view or a default Backbone view. The model is not "linked" to the view it has to be pass to the view when instaciated.

```:javascript
//We load the template which has been defined in the template part. 
//This template is (or will be ) compiled as a javascript function.
var template = require('./template/contact'); 
var ContactView = Backbone.View.extend({
  template: template,
  render: function renderContactView(){
    this.$el.html(this.template(this.model.toJSON())); 
    // The model will be pass to the view in the next part.
    // Here we inject the json into the template function associated to the template.
    return this;
  }
});
```

All view has an [el](http://backbonejs.org/#View-el) element which contains all the DOM element of it. 

## View: using

```:JavaScript
var contact = new ContactModel({firstName: "Robert", lastName: "Dupont", email: "robert@dupont.com"});
var contactView = new ContactView({model: contact});
console.log(contactView.render().el);
//Will display : <p> Mr Robert  Dupont has the following email: robert@dupont.com.</p>
```

## View