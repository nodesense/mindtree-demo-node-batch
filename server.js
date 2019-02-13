
const express = require("express");

const app = express();


app.use('/node_modules', express.static('node_modules'));
    
app.use('/public', express.static('public'));
// express 

var server = require('http').Server(app);

var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user/browser connected');
   
  var handle = setInterval(function() {
      const id = Math.ceil(Math.random() * 10000);
      const product = {
          id,
          name: `Product ${id}`,
          price: Math.ceil(Math.random() * 100)
      }

    socket.emit("offer", product)
  }, 5000);

  socket.on('disconnect', function(){
    console.log('user disconnected');
    clearInterval(handle);
    handle = null;
  });

});


server.listen(8080, function (err) {
    if (!err) {
         console.log('JSON Server is running  at ', 8080)
    } else {
        console.log("Error in starting REST API Server ", err);
    }
})