## Introduction

The application was built with NestJs to perform a simple crud on creating a user and also wallet address,

THe end points available are listed below
All Write Request Parameters are to be sent in JSON String and responses are in JSON also.

Postgre SQL
```bash

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE WalletAddress (
    id SERIAL PRIMARY KEY,
    userId INT NOT NULL,
    address VARCHAR(100) UNIQUE NOT NULL,
    FOREIGN KEY (userId) REFERENCES Users(id)
);

```


Create User: POST /users
Params:
```bash

{
    "username":"Lilian Analoh",
    "email": "misterMdoses2@gmail.com",
    "password": "12345678er89uffu"
}
```

Response 
```bash

{
  status: "success",
  messsage: "User Created Successfully"
}
```

Get All Users: GET /users 
Response
{
  [
list of users
  ]
}

Get One User: GET /users/:id
Query Params: User_id as id
Response:
```bash

{
    "id": 6,
    "username": "Lilian Analoh",
    "email": "misterMdoses2@gmail.com",
    "password": "$2b$10$sBAcoljcA0HmFmGV.ReMj.hBCWyfGvMxGtsGUKjAkvBN2QnEoCxg.",
    "created_at": "2024-06-04T20:50:39.987Z"
}
```

Update User: PATCH /users/:id
Same Params as /users Posr

Delete User: DELETE /users/:id


Create WalletAddress: POST /wallet-address
```bash

{
    "message": "Wallet created successfully",
    "status": "success",
    "data": {
        "user_id": "5",
        "address": "New wakdderg",
        "id": 17,
        "created_at": "2024-06-04T21:26:14.912Z"
    }
}
```

Get All WalletAddresses: GET /wallet-address

List of Wallets

Get One WalletAddress: GET /wallet-address/:id
```bash

{
    "message": "Wallet details fetched successfully",
    "status": "success",
    "data": {
        "id": 2,
        "user_id": 2,
        "address": "iqfakfafnamnvkjvksadgjagjadg",
        "created_at": "2024-06-04T19:38:33.418Z"
    }
}
```

Update WalletAddress: PATCH /wallet-address/:id

```bash
{
    "user_id": "5",
    "address": "NAdkfakfafaaafafafafkjfalfkalfafg"
}
```
Delete WalletAddress: DELETE /wallet-address/:id

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
