//import or pull express from node module
const { Socket } = require('engine.io');
const express=require('express');

//Make an express App
const app=express();

//Integrete Express app on http server
const server=require('http').Server(app);

//It will pick index.html file inside Public folder to work
app.use(express.static('Public'));

const io=require('socket.io')(server);
io.on('connection',(socket)=>{
    console.log('Connection Made',socket.id);
    socket.on('message',(data)=>{
        io.emit('message',data); //emtting this msg to all other sockets
    })
    socket.on('disconnect',()=>{
        console.log(socket.id,'User left the chat');
    })
})
//Server is running on this port
const Port=9000;
server.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})

