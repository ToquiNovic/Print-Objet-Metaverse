const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const path = require("path"); 

// Swagger definition
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Print Object Metaverse",
        version: "0.1.0",
        description: "This API is responsible for communicating a robot with metaverses",
      },
    },
    // Path to the API docs
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
  };
  
  // Initialize swagger-jsdoc -> returns validated swagger spec in json format
  const specs = swaggerJsdoc(options);
  const swaggerDocs = (app, port) => {
    app.use(
        "/",
        swaggerUI.serve,
        swaggerUI.setup(specs)
      );
      app.use(
        "/api",
        swaggerUI.serve,
        swaggerUI.setup(specs)
      );
  };

  module.exports = {swaggerDocs};