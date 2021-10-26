# Documentation

## Installation

_I'm using yarn but use npm if you like_

```bash
$ yarn install
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

## API interfaces

```typescript
/** user interface */
interface User {
  _id: string;
  username: string;
  full_name: string;
  password: string;
}

/** Login data interface */
interface ILoginData {
  statusCode: number;
  message: string;
  user?: User;
  error?: string;
}
```

_In these examples I'm using axios feel free use any technologies you want._

## User sign up

```typescript
/*
 * @route /users/sign-up
 * @method POST
 * @returns user data
 */

import axios from 'axios';

const userSignUp = async (user: User): Promise<User> => {
  const res = await axios.post(`${url}/user/sign-up`, {
    username,
    email,
    password,
  });

  const { user } = res.data;
};
```

## User login

```typescript
/*
 * @route /users/login
 * @method POST
 * @returns login data
 */

import axios from 'axios';

const userLogin = async (
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
