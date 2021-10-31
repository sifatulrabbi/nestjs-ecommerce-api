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
interface IUser {
    _id?: string;
    name: string;
    fullName: string;
    email: string;
    password: string;
    photoURL?: string;
    shopId?: string;
    shopName?: string;
}

interface IShop {
    _id?: string;
    name: string;
    owner: string;
    ownerId: string;
    categories?: string[];
    desc?: string;
    items?: string[];
    coverURL?: string;
}

interface ICategory {
    _id?: string;
    name: string;
}

interface IProduct {
    _id?: string;
    name: string;
    desc: string;
    price: string;
    photoURL?: string;
    shopId: string;
    category: string;
    tags: string[];
}

interface ITag {
    _id?: string;
    name: string;
}
```

_In these examples I'm using axios feel free use any technologies you want._

## User sign up

```typescript
import * as axios from 'axios';
/**
 * @body { user: { name, fullName, email, password } }
 */
const user: IUser = await axios.post('url/users', {
    user: { name, fullName, email, password },
});
```

## User login

```typescript
/**
 * @body { username, password }
 * @redirects url/users/:userid
 */
const user: IUser = await axios.post('url/users/login', { username, password });
```

## Update user info

```typescript
/**
 * @body { password, user: { name, fullName, email }, newPassword }
 */
const user: IUser = await axios.post(`url/users/${userId}`, {
    password,
    user: { name, fullName, email },
    newPassword,
});
```

## Delete user

```typescript
/**
 * @body { username, password }
 */
await axios.delete(`url/users/${userId}`, { username, password });
```

## Create shop

```typescript
/**
 * @body { username, password, shop: { name, description, categories } }
 */
const shop: IShop = await axios.post(`url/shops`, {
    username,
    password,
    shop: { name, desc, categories },
});
```

## Update shop info

```typescript
/**
 * @body { username, password, shop: { name, description, categories } }
 */
const shop: IShop = await axios.post(`url/shops/${shopId}`, {
    username,
    password,
    shop: { name, desc, categories },
});
```

## Delete shop

```typescript
/**
 * @body { username, password }
 */
await axios.delete(`url/shops/${shopId}`, { username, password });
```
