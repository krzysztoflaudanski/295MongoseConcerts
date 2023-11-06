const mongoose = require('mongoose');

const seatsSchema = new mongoose.Schema({
  client: { type: String, required: true },
  email: { type: String, required: true },
  seat: { type: Number, required: true },
  day: { type: Number, required: true },
});

module.exports = mongoose.model('Seat', seatsSchema);