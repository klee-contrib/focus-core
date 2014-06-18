# 
## Server side

![RESTFULL API](/images/tuto/restfull.gif)

## Controller, ROUTE, Structure

In order to expose an API, you have to map _url_ to route wich trigger specific actions.
We assume that our application is RESTFULL.
It means a route is able to CREATE, RETRIEVE, UPDATE, DELETE  an object: **CRUD**

- A controller should match a simple route with the following actions
-  **GET** => Should load an object (somtimes with a __param__)
-  **POST** => Should create an object or be use in order to load.
-  **PUT** => Should update an object.
-  **DELETE** => Delete an object (often take an __id__ paramater)

## [Example](http://localhost:8080/contact)
- In order to have a controller for a contact: (CRUD)

## POST
http://domainName/contact** => **CREATE** a contact <br />
![POST one element](/images/api/POST_Contact.png)

## **GET**
**http://domainName/contact/1** => **RETRIEVE** all contacts<br />
![GET one element](/images/api/GET_Contact.png)

## **GET**
**http://domainName/contact/1** => **RETRIEVE** a contact with an id **1** <br />

![GET action](/images/api/GET_Contact_1.png)

## **PUT** : 
**http://domainName/contact/1** => **UPDATE** a contact with an id **1** <br />
![PUT action](/images/api/PUT_Contact.png)

## **DELETE** 
**http://domainName/contact/1** => **DELETE** a contact with an id **1** <br />
![DELETE action](/images/api/DELETE_Contact.png)

## TOOLS (1/2)

In order to easily test web apis, you can use two tools:

### The network tab of the chrome dev tools (it means you have to write JS code in order to perform ajax requests for other request than _GET_ and visualize them).

![Chrome Network Devtools](/images/api/CHROME_Network.png)

## TOOLS (2/2)

### The [POSTMAN](http://www.getpostman.com/) chrome extension.
![POSTMAN Extension](/images/api/POSTMAN.png)

[next](/server-side/service.md)