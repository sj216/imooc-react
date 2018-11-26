const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')

const app = express()
// work with express
const server = require('http').Server(app)

const io = require('socket.io')(server); // io 和 express 进行关联

io.on('connection', function (socket) {
  console.log('user login')
  socket.on('sendmsg', function (data) {
    console.log(data);
    io.emit('recvmsg', data)
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter); //开启一个中间件

server.listen(9093, function () {
  console.log('Node app start at port 9093')
})
