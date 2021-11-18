# Documentation

Learn using the **[live api interface](https://exp-e-commerce-api.herokuapp.com/api)**  
or

<br/>

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

type IUserPreview = Pick<IUser, '_id' | 'email' | 'name' | 'shop_name'>;

interface IShop {
  _id?: string;
  email: string;
  name: string;
  desc: string;
  owner_id: string;
  owner_name: string;
  categories: string[];
  products?: string[];
}

export interface IProduct {
  _id?: string;
  name: string;
  desc: string;
  price: number;
  shop_id: string;
  category: string;
  tags?: string[];
}
```

_In these examples I'm using axios feel free use other technologies._

## Get All Users

```javascript
/**
 * @returns array of user [{name: string, email: string, _id: string}, {name: string, email: string, _id: string}]
 */

import axios from 'axios';

const getUsers = async () => {
  const res = await axios.get(`${url}/users`);

  return res.data;
};
```

## Get One User

```javascript
/**
 * @returns user with { name: string, email: string, _id: string } fields
 */

const getOneUser = async () => {
  const res = await axios.get(`${url}/users/:id`);

  return res.data;
};
```

## User sign up

```javascript
const url = 'https://exp-e-commerce-api.herokuapp.com/api/v1';

const signUp = async (userData) => {
  const res = await axios.post(`${url}/users`, {
    email: userData.email,
    password: userData.password,
    name: userData.name,
  });

  return res.data;
};
```

## User login

```javascript
const login = async (email, password) => {
  const res = await axios.post(`${url}/users/login`, {
    email: email,
    password: password,
  });

  return res.data;
};
```

## Update user info

```javascript
/**
 * @alert new_name = ''; do not do this!!
 * only provide new_* fields if you want to update them
 * if you do not provide new_* fields the filed will be left untouched
 * but if you provide empty string then the name field will be removed from the document
 */

const updateUserInfo = async (email, password, userData) => {
  const res = await axios.put(`${url}/users/:id`, {
    email: email,
    password: password,
    new_email: userData.email,
    new_name: userData.name,
    new_password: userData.password,
    confirm_password: userData.confirmPassword,
  });

  return res.data;
};
```

## Delete user

```javascript
const deleteUser = async (email, password) => {
  const res = await axios.delete(`${url}/users/:id`, {
    email: email,
    password: password,
  });

  return 'user deleted';
};
```

## Get All Shops

```javascript
const getShops = async () => {
  const res = await axios.get(`${url}/shops`);

  return res.data;
};
```

## Get One Shop

```javascript
const getOneShop = async () => {
  const res = await axios.get(`${url}/shops/:id`);

  return res.data;
};
```

## Create Shop

```javascript
/**
 * @categories this field should be an array @example ['clothes', 'shoes']
 */

const url = 'https://exp-e-commerce-api.herokuapp.com/api/v1';

const createShop = async (email, password, shopsData) => {
  const res = await axios.post(`${url}/shops`, {
    email: email,
    password: password,
    name: shopsData.name,
    desc: shopsData.desc,
    categories: shopData.categories,
  });

  return res.data;
};
```

## Update Shop

```javascript
/**
 * @alert new_name = ''; do not do this!!
 * only provide new_* fields if you want to update them
 * if you do not provide new_* fields the filed will be left untouched
 * but if you provide empty string then the name field will be removed
 * from the document also this will cost internal problem
 *
 * @products if you want to add new products and nothing else, then send the array of products ids
 * @example ['some_product_id', 'another_product_id']
 */

const updateShop = async (email, password, updateData, products) => {
  const res = await axios.post(`${url}/shops/:id`, {
    email: email,
    password: password,
    new_name: updateData.name,
    new_desc: updateData.desc,
    new_categories: updateData.categories,
    new_products: products,
  });

  return res.data;
};
```

## Delete Shop

```javascript
import axios from 'axios';

const deleteShop = async (email, password) => {
  const res = await axios.delete(`${url}/shops/:id`, {
    email: email,
    password: password,
  });

  return 'shop deleted';
};
```

## Add Product to the Shop

```javascript
/**
 * @tags this field should be an array @example ['clothes', 'shoes']
 */

const url = 'https://exp-e-commerce-api.herokuapp.com/api/v1';

const addAProduct = async (email, password, productData) => {
  const res = await axios.post(`${url}/shops`, {
    email: email,
    password: password,
    name: productData.name,
    desc: productData.desc,
    price: productData.price,
    category: productData.category,
    tags: productData.tags,
  });

  return res.data;
};
```

## Update a Product

```javascript
const url = 'https://exp-e-commerce-api.herokuapp.com/api/v1';

const reqUrl = `${url}/shops/:shopId/products/:productId`; // as shop owner
// or
const reqUrl = `${url}/products/:productId`; // as admin

const addAProduct = async (email, password, productData) => {
  const res = await axios.put(reqUrl, {
    email: email,
    password: password,
    new_name: productData.name,
    new_desc: productData.desc,
    new_price: productData.price,
    new_category: productData.category,
    new_tags: productData.tags,
  });

  return res.data;
};
```

## Remove a Product

```javascript
const url = 'https://exp-e-commerce-api.herokuapp.com/api/v1';

const reqUrl = `${url}/shops/:shopId/products/:productId`; // as shop owner
// or
const reqUrl = `${url}/products/:productId`; // as admin

const addAProduct = async (email, password, productData) => {
  const res = await axios.post(reqUrl, {
    email: email,
    password: password,
    new_name: productData.name,
    new_desc: productData.desc,
    new_price: productData.price,
    new_category: productData.category,
    new_tags: productData.tags,
  });

  return res.data;
};
```
