# Network

## cors

La partie cors de focus a pour vocation de créer une requête [CROSS-origin](https://developer.mozilla.org/fr/docs/HTTP/Access_control_CORS)
Cette fonction ne doit pas ou rarement être utilisé.

## fetch

La fonction fetch a pour but d'appeller l'api côté serveur. Elle retourne une promesse. Elle parse la réponse http et retourne du `JSON`.
- `obj` permet de définir les data à fournir
  - `method` Le verbe HTTP (GET, POST, DELETE)
  - `url` L'url à appeller
  - `data` Les data à envoyer au serveur
- `options` permet de reféfinir le parseur de la requête http.

## cancellablePromiseBuilder

La fonction cancellablePromiseBuilder construit une Promise avec une méthode `cancel` qui appelle un `cancelHandler` spécifié lors de la construction de l'objet.
La fonction prend donc la forme :

```javascript
var cp = cancellablePromiseBuilder(function promiseFn(success, failure) {
    // Contenu de la promesse
  }, function cancelHandler() {
    // Fonction appellée par p.cancel()
  });

cp.then(function cpResolvedHandler(data) {
    // Handler de la résolution de la promesse p
  });

// Pour une quelconque raison, on veut arrêter la promesse p
p.cancel();

```

## Exemple

```javascript
fetch({
  url: "http://api.focus.com",
  verb: "POST",
  data: {pierre: "besson"}
});
```
