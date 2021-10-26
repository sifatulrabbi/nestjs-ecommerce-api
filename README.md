<h1 align="center" style="font-weight: bold">EXP Online Shop API</h1>
<br/>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

This is an E-Commerce API with modern features. This API is fast and secure. It's built with TypeScript, nextjs and MongoDB. This API can be used with any front-end frameworks (Angular, React, Vue). To use this API either **contact me** for an API secret or **clone** this repo star this repository before cloning or forking.

## Features

- User login
- Shop creation
- Products upload
- Adding new product tags
- Updating products price and details
- Getting all uploaded products data
- Finding products by tags
- Finding products by category

## Installation

```bash
$ yarn install
# or
$ npm install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Usage

```typescript
/*
 * get all products
 */
```

```typescript
/*
 * user login
 * @route /users/login
 * @method POST
 */

import axios from 'axios';

interface User {
  _id: string;
  username: string;
  full_name: string;
  password: string;
}

interface ILoginData {
  statusCode: number;
  message: string;
  user?: User;
  error?: string;
}

const login = async (
  password: string,
  username?: string,
  email?: string,
): Promise<ILoginData> => {
  const res = await axios.post(`${url}/user/login`, {
    username,
    email,
    password,
  });

  const { user } = res.data;
};
```

```typescript
/*
 * user sign up
 */
```

```typescript
/*
 * update user info
 */
```

```typescript
/*
 * create shop
 */
```

```typescript
/*
 * update shop info
 */
```

```typescript
/*
 * add product to the shop
 */
```

```typescript
/*
 * delete product from the shop
 */
```

```typescript
/*
 * update shop product
 */
```

```typescript
/*
 * find product by category
 */
```

```typescript
/*
 * find product by category
 */
```

```typescript
/*
 * add product to the cart
 */
```

```typescript
/*
 * remove product from the cart
 */
```

```typescript
/*
 * checkout
 */
```

## Support

This API is an MIT-licensed open source project. If you'd like to join me in this project then fell free to submit your pull request.

## Stay in touch

- Author - [temujins](https://github.com/temujins)
- Website - [https://temujins.github.io](https://temujins.github.io)
- Twitter - [@nestframework](https://twitter.com/sifatul_rabbi)

## License

Nest is [MIT licensed](LICENSE).  
This project is also [MIT licensed](LICENSE).
