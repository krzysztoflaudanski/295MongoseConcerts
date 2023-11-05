const express = require('express');
const db = require('../db'); // Zaimportuj dane z odpowiedniego pliku lub ścieżki
const { generateRandomId } = require('./../utils/helpers');


const router = express.Router();

router.get('/', (req, res) => {
    res.json(db.testimonials);
});

router.get('/random', (req, res) => {
    if (db.testimonials.length === 0) {
        res.status(404).json({ error: 'No testimonials available' });
    } else {
        const randomIndex = Math.floor(Math.random() * db.testimonials.length);
        const randomTestimonial = db.testimonials[randomIndex];

        if (randomTestimonial) {
            res.json(randomTestimonial);
        } else {
            res.status(404).json({ error: 'No testimonials available' });
        }
    }
});

router.get('/:id', (req, res) => {
    const recordId = parseInt(req.params.id);
    const record = db.testimonials.find(record => record.id === recordId);
    if (record) {
        res.json(record);
    } else {
        res.status(404).json({ error: 'Record not found' });
    }
});

router.post('/', (req, res) => {
    const { author, text } = req.body;

    if (author && text) {
        const newId = generateRandomId();
        const newTestimonial = { id: newId, author, text };
        db.testimonials.push(newTestimonial);
        res.status(201).json({ message: 'OK' });
    } else {
        res.status(400).json({ error: 'Invalid data format' });
    }
});

router.put('/:id', (req, res) => {
    const recordId = parseInt(req.params.id);
    const { author, text } = req.body;

    if (author && text) {
        const recordIndex = db.testimonials.findIndex(record => record.id === recordId);

        if (recordIndex !== -1) {
            db.testimonials[recordIndex].author = author;
            db.testimonials[recordIndex].text = text;
            res.json({ message: 'OK' });
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } else {
        res.status(400).json({ error: 'Invalid data format' });
    }
});

router.delete('/:id', (req, res) => {
    const recordId = parseInt(req.params.id);
    const recordIndex = db.testimonials.findIndex(record => record.id === recordId);

    if (recordIndex !== -1) {
        db.testimonials.splice(recordIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ error: 'Record not found' });
    }
});

module.exports = router;