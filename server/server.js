const io = require('socket.io')()

io.on('connection', socket => { 

    console.log('Connexion d\'un utilisateur: ' + socket.id)

    socket.on('hello', data => {
        socket.broadcast.emit('hello', null)
    })

    socket.on('move', data => {
        if (typeof(data) !== "object") return
        
        data.id = socket.id
        socket.broadcast.emit('move', data)
    })
    
    socket.on('disconnect', () => {
        socket.broadcast.emit('remove', {
            id: socket.id
        })
        console.log('Déconnexion d\'un utilisateur: ' + socket.id)
    })
    
    socket.on('text', data => {
        socket.broadcast.emit('text', {
            id: socket.id,
            text: data,
        })
    })

})

io.listen(3021)