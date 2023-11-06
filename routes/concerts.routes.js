const express = require('express');
const router = express.Router();

const ConcertsController = require('../controllers/concerts.controller')

router.get('/concerts', ConcertsController.getAll);
router.get('/concerts/:id', ConcertsController.getById);
router.post('/concerts', ConcertsController.post);
router.put('/concerts/:id', ConcertsController.put);
router.delete('/concerts/:id', ConcertsController.delete);

module.exports = router;