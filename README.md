# Node.js MySQL Connection Demo

This repository demonstrates how to connect a Node.js backend application with MySQL using the `mysql2` package.

## Features

- MySQL Database Connection
- Connection Pooling
- Async/Await Queries
- Express.js API
- Environment Variables Support
- SQL Injection Prevention

---

## Installation

```bash
npm install
```

---

## Install Required Packages

```bash
npm install express mysql2 dotenv
```

---

## Project Structure

```plaintext
nodejs-mysql-connection-demo/
│
├── db.js
├── server.js
├── .env
├── package.json
└── README.md
```

---

## Create Database

```sql
CREATE DATABASE testdb;

USE testdb;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);
```

---

## Environment Variables

Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=testdb
PORT=3000
```

---

## db.js

```javascript
require('dotenv').config();

const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();
```

---

## server.js

```javascript
const express = require('express');
const db = require('./db');

const app = express();

app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000');
});
```

---

## Start Server

```bash
node server.js
```

Open:

```plaintext
http://localhost:3000/users
```

---

## Technologies Used

- Node.js
- Express.js
- MySQL
- mysql2
- dotenv

---

