# Documentation

## Installation

```bash
$ yarn install
```

## Running the app

```bash
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
  email: string;
  password: string;
  name: string;
  shop_name?: string;
  shop_id?: string;
}
```

_In these examples I'm using axios feel free use other technologies._

## User sign up

```javascript
import axios from 'axios';

const signUp = async (userData) => {
  const res = await axios.post(`url/users`, {
    email: '', // put new email
    password: '', // put password
    name: '', // put new name
  });

  return res.data;
};
```

## User login

```javascript
import axios from 'axios';

const login = async (email, password) => {
  const res = await axios.post(`url/users/login`, {
    email: '', // put email
    password: '', // put password
  });

  return res.data;
};
```

## Update user info

```javascript
import axios from 'axios';

const updateUserInfo = async (userData) => {
  const res = await axios.put(`url/users/:id`, {
    password: '', // put password
    new_email: '', // put new email
    new_name: '', // put new name
    new_password: '', // put new password
    confirm_password: '', // put new password again to confirm
  });

  return res.data;
};
```

## Delete user

```javascript
import axios from 'axios';

const login = async (email, password) => {
  const res = await axios.delete(`url/users/login`, {
    email: '', // put email
    password: '', // put password
  });

  return res.data;
};
```
