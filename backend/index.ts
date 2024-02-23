const express = require('express')
import cors from "cors"
const userRoutes = require('./routes/users')
const tourRoutes = require('./routes/tours')
const searchTourRoutes = require('./routes/toursearch')
const cookierParser = require("cookie-parser")
const chatRoutes = require('./routes/chat')
const messageRoutes = require('./routes/message')
import { v2 as cloudinary } from "cloudinary"
import morgan from 'morgan'
const bookingRoutes = require('./routes/bookings')
const app = express();

require('dotenv').config()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

cloudinary.config({
  cloud_name : process.env.ClOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET,
})

const PORT = process.env.PORT || 5000

require('./config/db')

app.use(morgan("dev"))
app.use(cookierParser())
app.use(express.json());
app.use(express.urlencoded({ extended : true}))

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true,
// }))




app.get('/api', (req, res) => {
  res.send({
    msg: "Home Page"
  });
});

app.use('/api/users',userRoutes)
app.use('/api/my-package',tourRoutes)
app.use('/api/search-tour', searchTourRoutes)
app.use('/api/booking',bookingRoutes)

// for chating features
app.use('/chat',chatRoutes)
app.use('/message',messageRoutes)

const server =app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


// socket connect garne features backend ma


const io = require("socket.io")(server, {
  pingTimeout: 50000,
  cors: {
    origin: "http://localhost:5173",
  }
})

io.on("connection",(socket)=>{
  console.log("Connected sucessfully to socket.io");

  socket.on("setup", (userData)=>{
    socket.join(userData._id)
    console.log(userData._id)
    socket.emit("connected!")
  })

  socket.on("join chat", (room)=>{
    socket.join(room)
    console.log("User joined room" + room);
  })

  socket.on("new message",(newMessageReceived)=>{
    let chat = newMessageReceived.chat
    if(!chat.users) return console.log("chat.users is not defined");

    chat.users.forEach((user) =>{
      if(user._id === newMessageReceived.sender._id) return

      socket.in(user._id).emit("message received", newMessageReceived)
    })
  })
})

