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
