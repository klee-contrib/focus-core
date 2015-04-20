# Message

La partie message de focus a vocation à être très simple d'utilisation.

## store (built-in)

Elle fournit un store (singleton) via le built-in store.

On peut agir de deux manière ce store:
- __Pusher__ un message
- __Vider__ la pile de message

On peut donc s'enregistrer sur ces évènements via les méthodes `add**Listener`.

Le store fournit également une méthode permettant de récupérer un message  via son identifiant (qui est lui envoyé avec l'évènement de push auquel on peut s'enregistrer).

## méthodes

On de pouvoir ajouter des messages dans la pile la partie message de focus fournit des méthodes simples d'ajout:

- `addMessage`: Ajoute un message dans la pile de message typée par son type dans l'objet fournit.
- `addWarningMessage`: Ajoute un message dans la pile de message typée **Warning**.
- `addInformationMessage`: Ajoute un message dans la pile de message typée **Information**.
- `addErrorMessage`: Ajoute un message dans la pile de message typée **Error**.
- `addSuccessMessage`: Ajoute un message dans la pile de message typée **Success**.
- `clearMessages`: Vide la pile de message.
