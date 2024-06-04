## Introduction

The application was built with NestJs to perform a simple crud on creating a user and also wallet address,

THe end points available are listed below

To return JSON instead of the user objects directly, you can create Data Transfer Objects (DTOs) and use these DTOs to transform your entities into the desired JSON format. This approach helps in separating the internal entity representation from the API response structure.

Step 1: Create DTOs
Create DTO classes for User and WalletAddress.

User DTO (src/users/dto/user.dto.ts):

typescript
Copy code
export class UserDto {
  id: number;
  name: string;
  email: string;
}
WalletAddress DTO (src/wallet-address/dto/wallet-address.dto.ts):

typescript
Copy code
export class WalletAddressDto {
  id: number;
  address: string;
  userId: number;
}
Step 2: Modify the Services to Use DTOs
Update your service methods to return DTOs instead of entities.

User Service (src/users/users.service.ts):

typescript
Copy code
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<UserDto> {
    const newUser = await this.usersRepository.save(user);
    return this.toUserDto(newUser);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return users.map(user => this.toUserDto(user));
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne(id);
    return this.toUserDto(user);
  }

  async update(id: number, user: User): Promise<UserDto> {
    await this.usersRepository.update(id, user);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  private toUserDto(user: User): UserDto {
    const { id, name, email } = user;
    return { id, name, email };
  }
}
WalletAddress Service (src/wallet-address/wallet-address.service.ts):

typescript
Copy code
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAddress } from './wallet-address.entity';
import { WalletAddressDto } from './dto/wallet-address.dto';

@Injectable()
export class WalletAddressService {
  constructor(
    @InjectRepository(WalletAddress)
    private walletAddressRepository: Repository<WalletAddress>,
  ) {}

  async create(walletAddress: WalletAddress): Promise<WalletAddressDto> {
    const newWalletAddress = await this.walletAddressRepository.save(walletAddress);
    return this.toWalletAddressDto(newWalletAddress);
  }

  async findAll(): Promise<WalletAddressDto[]> {
    const walletAddresses = await this.walletAddressRepository.find();
    return walletAddresses.map(walletAddress => this.toWalletAddressDto(walletAddress));
  }

  async findOne(id: number): Promise<WalletAddressDto> {
    const walletAddress = await this.walletAddressRepository.findOne(id);
    return this.toWalletAddressDto(walletAddress);
  }

  async update(id: number, walletAddress: WalletAddress): Promise<WalletAddressDto> {
    await this.walletAddressRepository.update(id, walletAddress);
    const updatedWalletAddress = await this.findOne(id);
    return updatedWalletAddress;
  }

  async remove(id: number): Promise<void> {
    await this.walletAddressRepository.delete(id);
  }

  private toWalletAddressDto(walletAddress: WalletAddress): WalletAddressDto {
    const { id, address, userId } = walletAddress;
    return { id, address, userId };
  }
}
Step 3: Modify the Controllers to Use DTOs
Update your controllers to return DTOs instead of entities.

User Controller (src/users/users.controller.ts):

typescript
Copy code
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() user: User): Promise<UserDto> {
    return this.usersService.create(user);
  }

  @Get()
  findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() user: User): Promise<UserDto> {
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
WalletAddress Controller (src/wallet-address/wallet-address.controller.ts):

typescript
Copy code
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { WalletAddressService } from './wallet-address.service';
import { WalletAddress } from './wallet-address.entity';
import { WalletAddressDto } from './dto/wallet-address.dto';

@Controller('wallet-address')
export class WalletAddressController {
  constructor(private readonly walletAddressService: WalletAddressService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() walletAddress: WalletAddress): Promise<WalletAddressDto> {
    return this.walletAddressService.create(walletAddress);
  }

  @Get()
  findAll(): Promise<WalletAddressDto[]> {
    return this.walletAddressService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<WalletAddressDto> {
    return this.walletAddressService.findOne(+id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  update(@Param('id') id: string, @Body() walletAddress: WalletAddress): Promise<WalletAddressDto> {
    return this.walletAddressService.update(+id, walletAddress);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.walletAddressService.remove(+id);
  }
}

Test the API endpoints again to ensure the responses are in JSON format.
All Write Request Parameters are to be sent in JSON String and responses are in JSON also.

Create User: POST /users
Params:
{
    "username":"Lilian Analoh",
    "email": "misterMdoses2@gmail.com",
    "password": "12345678er89uffu"
}
Response 
{
  status: "success",
  messsage: "User Created Successfully"
}

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
{
    "id": 6,
    "username": "Lilian Analoh",
    "email": "misterMdoses2@gmail.com",
    "password": "$2b$10$sBAcoljcA0HmFmGV.ReMj.hBCWyfGvMxGtsGUKjAkvBN2QnEoCxg.",
    "created_at": "2024-06-04T20:50:39.987Z"
}

Update User: PATCH /users/:id

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
