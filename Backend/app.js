const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path"); // ✅ Require 'path' module
const { log } = require("console");


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

// ✅ Correct way to serve static files
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location", function(data){
        io.emit("receive-location",{id:socket.id, ...data});
    })
    // console.log("connected")

    socket.on("disconnect",function(){
    io.emit("user-disconnected",socket.id)
    })


} )
app.get("/", function (req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
