const express = require('express')
const app = express()
var path = require('path')

const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('usuario conectado')
    socket.on('disconnect', () => {
        console.log('usuario desconectado')
    })

    socket.on('chat', (msg) => {
        console.log('Mensaje: ' + msg)
        io.emit('chat', msg)
    })
})

app.get('/', (req, resp) => {
    resp.sendFile(`${__dirname}/index1.html`)
})
server.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000/')
})