const express = require('express');
const db = require('../db');
const { generateRandomId } = require('./../utils/helpers');

const router = express.Router();

router.get('/', (req, res) => {
    res.json(db.concerts);
});

router.get('/:id', (req, res) => {
    const concertId = parseInt(req.params.id);
    const concert = db.concerts.find(concert => concert.id === concertId);
    if (concert) {
        res.json(concert);
    } else {
        res.status(404).json({ error: 'Concert not found' });
    }
});

router.post('/', (req, res) => {
    const { performer, genre, price, day, image } = req.body;

    if (performer && genre && price && day && image) {
        const newId = generateRandomId();
        const newConcert = { id: newId, performer, genre, price, day, image };
        db.concerts.push(newConcert);
        res.status(201).json({ message: 'OK' });
    } else {
        res.status(400).json({ error: 'Invalid data format' });
    }
});

router.delete('/:id', (req, res) => {
    const concertId = parseInt(req.params.id);
    const concertIndex = db.concerts.findIndex(concert => concert.id === concertId);

    if (concertIndex !== -1) {
        db.concerts.splice(concertIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ error: 'Concert not found' });
    }
});

router.put('/:id', (req, res) => {
    const concertId = parseInt(req.params.id);
    const { performer, genre, price, day, image } = req.body;

    if (performer && genre && price && day && image) {
        const concertIndex = db.concerts.findIndex(concert => concert.id === concertId);

        if (concertIndex !== -1) {
            db.concerts[concertIndex] = { id: concertId, performer, genre, price, day, image };
            res.json({ message: 'OK' });
        } else {
            res.status(404).json({ error: 'Concert not found' });
        }
    } else {
        res.status(400).json({ error: 'Invalid data format' });
    }
});

module.exports = router;