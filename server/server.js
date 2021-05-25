const io = require('socket.io')();

// À CHAQUE CHANGEMENT, ON DOIT REDÉMARRER LE SERVEUR AVEC node server.js

io.on('connection', (socket) => {
    console.log("Un client s'est connecté");

    socket.on('cercle', (e) => {
        //console.log(e);
        socket.broadcast.emit('cercleAutre', e);
    });

    socket.on('ligne', (e) => {
        //console.log(e);
        socket.broadcast.emit('ligneAutre', e);
    });
});

io.listen(3010);