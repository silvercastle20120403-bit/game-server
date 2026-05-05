const io = require('socket.io')(process.env.PORT || 3000, {
  cors: { origin: "*" }
});

let players = {};

io.on('connection', (socket) => {
  players[socket.id] = { x: 100, y: 100, color: "#" + Math.floor(Math.random()*16777215).toString(16) };
  io.emit('update', players);

  socket.on('move', (data) => {
    if (players[socket.id]) {
      players[socket.id].x += data.x;
      players[socket.id].y += data.y;
      io.emit('update', players);
    }
  });

  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('update', players);
  });
});
