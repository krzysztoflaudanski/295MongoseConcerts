const express = require('express');
const cors = require('cors');
const path = require('path')
const socketIo = require('socket.io');

const app = express();
app.use(cors());

const testimonialsRouter = require('./routes/testimonials.routes'); // Importuj router
const concertsRouter = require('./routes/concerts.routes');
const seatsRouter = require('./routes/seats.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api/testimonials', testimonialsRouter); // add post routes to server
app.use('/api/concerts', concertsRouter);
app.use('/api/seats', seatsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Klient podłączony');

});