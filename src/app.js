const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const { swaggerDocs } = require("./swager")

//settings
app.set("port", process.env.BACK_PORT || 3000);

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
app.use("/api", require("./routes"));

//socket.io connection
require('./socket.js')(io);

//start server
server.listen(app.get("port"), () => {
  const port = app.get("port");
  console.log("😁 server en puerto", port);
  swaggerDocs(app, port);
});
