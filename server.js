const express = require('express');
const cors = require('cors');
const path = require('path')
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const testimonialsRouter = require('./routes/testimonials.routes'); // Importuj router
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/', testimonialsRouter); // add post routes to server
app.use('/api', concertsRouter);
app.use('/api/', seatsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

mongoose.connect('mongodb+srv://laudanskikrzysztof86:password100@cluster0.3qpkzhf.mongodb.net/ConcertsDB?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Klient podłączony');

});
