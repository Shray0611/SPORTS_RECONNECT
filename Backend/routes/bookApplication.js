const express = require('express');
const router = express.Router();
const BookApplication = require('../models/BookApplication');

router.post('/', async (req, res) => {
    try {
        const bookApplication = new BookApplication({ ...req.body, userId: req.user.id });
        await bookApplication.save();
        res.status(201).json(bookApplication);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
