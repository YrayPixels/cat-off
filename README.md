## Introduction

The application was built with NestJs to perform a simple crud on creating a user and also wallet address,

THe end points available are listed below
All Write Request Parameters are to be sent in JSON String and responses are in JSON also.

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

Get All WalletAddresses: GET /wallet-address

Get One WalletAddress: GET /wallet-address/:id

Update WalletAddress: PATCH /wallet-address/:id

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
