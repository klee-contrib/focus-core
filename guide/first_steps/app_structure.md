#

## Application structure
![Application](/images/tuto/app.jpg)

## Production structure (1/2)

![The bundled files](/images/tuto/files-bundled.png)

## Production structure (2/2)

In order to be efficient on the browser, we have to seve:

+ One or two JS files
+ One css file (or two)
+ All the assets
+ Cache them on the client



## Dev structure

In order to have a nice structure inside the project, a bundler is used. This bundler called [brunch](http://brunch.io) is built on the top of [Node.js](http://nodejs.org). The bundler role is to convert multiple files (whenever a file is modified) into a single one.
![The bundled files](/images/brunch.png)

## Bundle process

![The bundled process](/images/tuto/files-bundle-process.png)


## Client side organization

|**directory**|**meaning**|
|---|---|
| application.js  |  All the application initialization code |
| assets|  All application static ressources (images, fonts, favicon, ...) |
| lib |  Contains all application helpers, the application router(s), template helpers. |
| i18n  | All application text informations (label, messages, ...). Could contain multiple languages. |
| services  |  Client side service layer. (Ajax or local loading) |
| views  |  Contains all the views. Views in the backbone.js applications are more like controllers. They load their models using services and display the in their templates. Views are also responsible for handling user interactions with the page. |
|  models |  Modelization inside views, match api data. Can have special methods (sort, toJSON, ...). Contains both models and collections |
|views/templates|The templates of the views|

A additional level can be added in each directory if the application is complex and have many pages.

## Node.js (1/3)
![Node.js](/images/tuto/node.png)

## Node.js (2/3)

- **module.exports** and **require**
- search local, then relative then globals

## Node.js (3/3)

![CommonJS](/images/tuto/node-exports.jpeg)


[next](/first_steps)