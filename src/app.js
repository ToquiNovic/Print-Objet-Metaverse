const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

//settings
app.set("port", process.env.BACK_PORT || 3000);

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Swagger definition
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Print Object Metaverse",
      version: "0.1.0",
      description: "This API is responsible for communicating a robot with metaverses",
    },
    servers: [
      {
        url: `http://localhost:${app.get("port")}`,
      },
    ],
  },
  // Path to the API docs
  apis: ["./routes/*.js"],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const specs = swaggerJsdoc(options);
app.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

//routes
app.use("/api", require("./routes"));

//start server
app.listen(app.get("port"), () => {
  console.log("😁 server en puerto", app.get("port",));
});
