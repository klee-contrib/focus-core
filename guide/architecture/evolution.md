## Previous application model

![Standard application](/images/ppt/FMK_HTML5/Slide07.png)

## The server side have:

+ All the  business logic (database access, service layer)
+ Routing
+ Security
+ Page rendering (HTML construction, css serving, assets)

## The  browser side have:

+ A fragment of the UI, for interactions
+ That's all ...

## Applcation lifecycle

1. The user request a page
2. The server treat the request, it makes one or sevral database requests
3. The server construct the pages (_html_, _js_ , _css_, _images_, ...)
4. The server return the page to the server inside an http response
5. The user request another page
6. The server perform again the 2,3,4

## A necessary evolution

The application architecture is a model which has to evolve in order to be able to benefit form all new technologies:

+ JavaScript performance improvements
+ HTML5 APIs (Cache, JS, CSS3)

![JS,HTML,CSS](/images/ppt/FMK_HTML5/Slide11.png)

[next](/architecture/spa.md)

