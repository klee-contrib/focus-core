# SPA

## A simple idea

The application's paradigm has changed.
As browser gets faster and faster, it was time to move to JavaScript Applications and Web API.
<br />
![SPA Schema](/images/ppt/FMK_HTML5/Slide12.png)

##Schema

![SPA Schema](/images/ppt/FMK_HTML5/Slide08.png)

## The server side have:

- All the  business logic (database access, service layer)
- Routing API
- Security

## The  browser side have:

- All the browser routing
- Page rendering
- All UI interactions
- Eventually local databases
- The application logic is deported on the browser

## Application lifecycle

- **First connexion** : the server send  **html** file with **one** or two **JavaScript files**, all **assets** (images, fonts) and  one **CSS**. (The browser add it into its cache).
- Then the application exchange only via a **REST API** using **ajax**.
- An application can also communicate directly with many other webservices such as : Google maps, adress improvement, ...

## Schema
![SPA Schema](/images/ppt/FMK_HTML5/Slide09.png)


## Consequences:

- A lighter network traffic
- Faster applications (User interface complexity is delegated to the browser)
- Performance improvement with browser updates (1 time per two weeks for chrome)
- Asynchronous loading
- Server technology agnostic (only http)
[next](/architecture/json.md)