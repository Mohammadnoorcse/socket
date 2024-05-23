import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 3000;
const app = express();

const server = createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
      },
});

app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );

io.on("connection",(socket)=>{
   console.log("User Connected");
//    console.log("Id",socket.id);
   socket.emit("welcome",`Welcome to the server,${socket.id}`);

//    socket.on("message",(data)=>{
//     //  console.log(data)
//     socket.broadcast.emit("receive-message",data); // emit->send data
//    });

//    socket.on("object-message",(data)=>{
//     //  console.log(data)
//     socket.broadcast.emit("receive-message",data); // emit->send data
//    });

   socket.on("object-message",({room,message})=>{
    //  console.log(data)
    socket.to(room).emit("receive-message",message); 
   });

   socket.on("disconnect",()=>{
    console.log("User Disconnected.",socket.id)
   })
})
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

//  emit-> send data
// on->receive data
// broadcast->nije send kora data nijer kache show korbe na
// to(Id)->one to one send message . apni jake sms tar id to  er bitore send korte hobe
