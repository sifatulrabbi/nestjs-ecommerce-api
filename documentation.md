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
```

## Test

```bash
# unit tests
$ yarn run test
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
interface IResultData<T> {
    statusCode: number;
    message: string;
    data?: T;
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
    const url = 'https://exp-e-commerce-api.vercel.app/api/v1/users/sign-up';
    const res = await axios.post(url, {
        username,
        email,
        password,
    });

    const { data } = res.data;
    return data;
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
): Promise<User> => {
    const uri = 'https://exp-e-commerce-api.vercel.app/api/v1/users/login';
    const res = await axios.post(url, {
        username,
        email,
        password,
    });

    const { data } = res.data;
    return data;
};
```
