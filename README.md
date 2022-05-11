# Hubazar e-commerce

<p align="center">
  <img src="./hubazar-home.jpg" />
</p>

## 📝Deployed Demo:
<a href="https://hubazar.vercel.app/">Hubazar on Vercel</a>

## 📝Description:

As a team work we created a marketplace using Javascript from scratch to build the App. To achieve this we work shoulder to shoulder in a group of 6 people applying Scrum as an agile methodology and practicing the GIT workflow thoroughly. In the team I worked as Frotend Developer and strengthened my knowledge developing components in Javascript, applying pure CSS styles, working with Node packages, deploying the App, among others.

#### Used technologies:
- [ ] HTML
- [ ] Javascript
- [ ] React
- [ ] Redux
- [ ] CSS modules
- [ ] NodeJS
- [ ] ExpressJS
- [ ] Sequelize - PostgreSQL
- [ ] Heroku - Vercel

#### Running the App:

It has two folders: api and client. In these folders will be the back-end code and the front-end respectively. (In both urge NPM INSTALL).

To upload to your database In api you are going to have to create a file called: . env that has the following form:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=userPostgres
DB_PASSWORD=passwordPostgres
DB_DATABASE=pf
MERCADOPAGOACCESSTOKEN=tokenMercadopago
MERCAGOPAGOPUBLICKEY=publicKeyMercadopago
```

Using PGAdmin you will create your new "development" database.
You need to replace `userPostgres` and `passwordPostgres` with your own credentials to connect to postgres. Also, you need a Mercadopago credentials to replace `tokenMercadopago` and `publicKeyMercadopago`. This file will be ignored by github as it contains sensitive information (credentials).

#### Features:

#### Unauthenticated users

An anonymous Visitor should be able to browse your e-commerce, view and search for products.

###### As a Guest I want...

- PRODUCTS:
    + ...see the full list of products (catalog), to see everything available to buy.
    + ...refine the list by categories, so you can see the items I’m interested in.
    + ...looking for products, so you can quickly find the products I want to buy.
    + ...see the details of an individual product (including photos, descriptions, reviews, etc...), so you can determine if I want that product or not.

- SHOPPING CAR:
    + ...be able to add items to my shopping cart from the listing or from a product details page, so that I can purchase them later.
    + ...withdraw items from my cart, in case you decide on the want.
    + ...edit quantities of items in my cart, in case you want more or less amount of a particular item.
    + ...refresh the page, or go back and forth, and still have my shopping cart (without having created an account for me).
    + ...I can create an account, log in and continue editing that same cart, so I do not lose the selected items.
- CHECKOUT:
    + ...be able to buy all the items of a car.
    + ...specify a shipping address and an email when I checkout, then send me the purchase to the place I said.
    + ...receive a confirmation email that I made the purchase.
    + ...receive a notification email when the order was dispatched.
- ACCOUNT MANAGEMENT:
    + ...can create an account, so you can do other things like leave a review.
    + ...I can log in using Google or Github, so I don’t have to remember a new password.

##### Authenticated users

Users who have created their account will be able to do everything a guest user can do and also:

##### As an Authenticated User I can...

- ACCOUNT MANAGEMENT:
    + ...logout, so no one else can use my session.
    + ...see the history of previous orders, so you can reexamine the orders I made in the past.
    + ...see details of an order I made in the past, including:
        * Items purchased, with their quantities.
        * Links to the purchased product page.
        * Date and time of purchase.
- REVIEWS:
    + ...be able to leave reviews to products, including text and a five-star system.

#### Admin

Admin users can manage the site, the products that are listed and the items that are available.

##### As an administrator I can...

- PRODUCT MANAGEMENT:
    + ...be able to create and edit products, with name, description, price and one or more photos, so that visitors can see the latest information of what is sold.
    + ...create categories, so users can filter items.
    + ...being able to add or remove categories from items (items must be able to accept multiple categories).
    + ...manage the availability of an item. (an item that is not available, should not be listed on the page, but its detail should remain accessible from the purchase history or with its URL, but should mention that the item is not available).

- ORDER MANAGEMENT:
    + ...to be able to see a list of all the orders, to be able to see and review the orders.
    + ...be able to filter the orders by their status (created, processing, canceled, complete).
    + see the details of a specific order, so I can review it and update its status.
    + ...be able to change the status of an order (created => processing, processing => cancelled || complete).

- USER MANAGEMENT:
    + ...be able to make a user become an admin.
    + ...delete a user, so they can’t log in anymore.
    + ...force a password reset for a user.


## Screenshots:
- Products:
<p align="center">
  <img src="./hubazar.jpg" />
</p>

- Login:
<p align="center">
  <img src="./hubazar-login.jpg" />
</p>

- Admin Panel:
<p align="center">
  <img src="./hubazar-admin-panel.jpg" />
</p>

### Our Team
We are 6 fullstack developers graduated from [Soy Henry](https://www.soyhenry.com/). Here are our profiles: 

## Github
- [Juan Paraducha](https://github.com/jparaducha)
- [Guillermo Fernandez](https://github.com/Midorihtml)
- [Salvador Alejandro de la Colina](https://github.com/DeLaColinaSalvador)
- [Juan Carlos Goicochea](https://github.com/juangoicochea)
- [Christian Mejia](https://github.com/tenhitokiri)
- [David Augusto Bautista](https://github.com/davidbau22)
