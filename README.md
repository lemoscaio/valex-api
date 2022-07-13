# projeto18-valex
Projeto desenvolvido para o curso de desenvolvimento fullstack da escola de programação Driven.

## :rocket: Routes

```yml
POST /cards
    - Route for creating a new card
    - headers: {"x-api-key": $apiKey}
    - body:{
        "employeeId": 1,
        "cardType": "transport"
}
```
    
```yml 
POST /activate-card
    - Route for activating a card by giving it a password
    - headers: {}
    - body: {
        "cardId": 1,
        "securityCode": "768",
        "password": "1234"
    }
```
    
```yml 
GET /card-statements?cardId=1
    - Rota for getting balance, payment and recharge  statements for a card
    - headers: {}
    - body: {}
```

```yml
GET /usuarios/:id (autenticada)
    - Rota para listar um usuário pelo id
    - headers: { "Authorization": "Bearer $token" }
    - body: {}
``` 

```yml
PUT /cards/block
    - Route for blocking a card
    - headers: {}
    - body: {
       "cardId": 1,
       "password": "1234"
    }
```

```yml
PUT /cards/unblock
    - Route for unblocking a card
    - headers: {}
    - body: {
       "cardId": 1,
       "password": "1234"
    }
```

```yml
POST /cards/recharge
    - Route for recharging a card
    - headers: {"x-api-key": $apiKey}
    - body: {
       "cardId": 1,
       "password": "1234"
    }
```

```yml
POST /payment
    - Route for a Point of Sale payment
    - headers: {}
    - body: {
      	"cardId": 1,
        "businessId": 2,
        "amount": 500,
        "password": "1234"
    }
```

```yml
POST /online-payment
    - Route for a Online payment
    - headers: {}
    - body: {
      	"cardNumber": "6771-8965-7905-9184",
        "cardholderName": "FULANO R DA SILVA",
        "cardExpirationDate": "07/27",
        "securityCode": "768",
        "businessId": 2,
        "amount": 300
    }
```


```yml
POST /virtual-cards
    - Route for creating a virtual card
    - headers: {}
    - body: {
      "cardId": 1,
      "password": "1234"
    }
```

```yml
DELETE /virtual-cards
    - Route for a deleting a virtual card
    - headers: {}
    - body: {
      "cardId": 1,
      "password": "1234"
    }
```
***
