const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
    const { content, date, metadata} = req.body;

    res.json({ message: 'Journal entry created successfully' });
});

router.get('/', (req,res) => {

    res.json({ entries });
});

module.exports = router;