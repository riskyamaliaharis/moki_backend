<h1 align='center'>ExpressJS - MOKI FOOD AND BEVERAGE</h1>
  <p align="center">
    <a href="https://github.com/riskyamaliaharis/moki_backend/issues">Report Bug</a>
    ·
    <a href="https://github.com/riskyamaliaharis/moki_backend/pulls">Request Feature</a>
  </p>

## About The Project

Moki Food and Beverage is online foods and beverages ordering application.
This is a web based application, so that you do not need to download it first.
You could access the application everywhere and everytime on your browser.
It would be easier. The Backend of Moki Food an Beverage Project is built using Node JS framework, that is express JS.
[More about Express](https://en.wikipedia.org/wiki/Express.js)

## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/13454431/TVsoGpzz)

```

DB_HOST=localhost // Database host
DB_USER=root // Database Username
DB_PASS= // Database Password
DB_NAME=moki_food_beverage // Table Name
DB_TIMEZONE=UTC // Database Timezone
port=3000 // Port
URL_FE =http://localhost:8080/
```

5. Type `npm run serve`

## License

© [Risky Amalia Haris](https://github.com/riskyamaliaharis)<br>
