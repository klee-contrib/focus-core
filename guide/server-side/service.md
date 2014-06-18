
## Server service layer

- No major changes
- The service layer of the applications stays the same as before. As the database access layer.


## Security

- As the client is a completetly different application than the server. The **server** must be security proof.
-  All services must guaranty the security. Because they can be called through any client of the webservice.
-  It is also important to set up **unit test** on services in order to have a clear **separation** between the **client** and the **server**.

## Service: READ

- Objects can be structured or not really
- Objects can be soft, composition of service call with  properties
- Objects can have additional metadatas (sort, page, ...)

## Servie: WRITE

- The entry type must be an object strongly type 
- Must be safe
