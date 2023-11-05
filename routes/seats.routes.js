const express = require('express');
const db = require('../db');
const { generateRandomId } = require('./../utils/helpers');

const router = express.Router();
router.get('/', (req, res) => {
    res.json(db.seats);
});

// Dla GET /seats/:id
router.get('/:id', (req, res) => {
    const seatId = parseInt(req.params.id);
    const seat = db.seats.find(seat => seat.id === seatId);
    if (seat) {
        res.json(seat);
    } else {
        res.status(404).json({ error: 'Seat not found' });
    }
});

router.post('/', (req, res) => {
    const { day, seat, client, email } = req.body;

    if (day && seat && client && email) {
        // Sprawdź, czy miejsce w dniu jest już zajęte
        const isSeatTaken = db.seats.some(existingSeat => existingSeat.day === day && existingSeat.seat === seat);

        if (isSeatTaken) {
            res.status(409).json({ error: 'Seat is already taken' });
        } else {
            const newId = generateRandomId();
            const newSeat = { id: newId, day, seat, client, email };
            db.seats.push(newSeat);
            res.status(201).json({ message: 'OK' });
            req.io.emit('seatsUpdate', db.seats)
        }
    } else {
        res.status(400).json({ error: 'Invalid data format' });
    }
});

// Dla DELETE /seats/:id
router.delete('/:id', (req, res) => {
    const seatId = parseInt(req.params.id);
    const seatIndex = db.seats.findIndex(seat => seat.id === seatId);

    if (seatIndex !== -1) {
        db.seats.splice(seatIndex, 1);
        res.json({ message: 'OK' });
    } else {
        res.status(404).json({ error: 'Seat not found' });
    }
});

// Dla PUT /seats/:id
router.put('/:id', (req, res) => {
    const seatId = parseInt(req.params.id);
    const { day, seat, client, email } = req.body;

    if (day && seat && client && email) {
        const seatIndex = db.seats.findIndex(seat => seat.id === seatId);

        if (seatIndex !== -1) {
            db.seats[seatIndex] = { id: seatId, day, seat, client, email };
            res.json({ message: 'OK' });
        } else {
            res.status(404).json({ error: 'Seat not found' });
        }
    } else {
        res.status(400).json({ error: 'Invalid data format' });
    }
});

module.exports = router;