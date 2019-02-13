
const express = require("express");
const numCPUs = require('os').cpus().length;
const cluster = require('cluster');


const app = express();

console.log("TOTAL CPUS ", numCPUs);

app.get("/proc", function(req, res){
   const data = {
     process_id: process.pid,
     random: Math.random()
   }

   res.json(data);
})

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    // cluster.fork() // to span the new process
  });
} else {
    var server = require('http').Server(app);
    

    server.listen(8080, function (err) {
        if (!err) {
            console.log('JSON Server is running  at ', 8080)
        } else {
            console.log("Error in starting REST API Server ", err);
        }
    })
}