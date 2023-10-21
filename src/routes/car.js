const express = require("express");
const routecar = express.Router();

routecar.post("/", async (req, res) => {
  const mysqlConnection = require("../db");
  const idCar = crypto.randomUUID();
  const { x_car, y_car, centroidx_car, centroidy_car } = req.body;

  let mysqlquery = `
    INSERT INTO car (id_car, x_car, y_car, centroidx_car, centroidy_car) VALUES ('${idCar}','${x_car}', '${y_car}', '${centroidx_car}', '${centroidy_car}')`;
  mysqlConnection.query(mysqlquery, (err, rows) => {
    if (!err) {
      res.json({
        msg: `Car Ubicado en las coordenadas x: ${x_car}, y: ${y_car}, centriode: [${centroidx_car}, ${centroidy_car}]`,
      });
    } else {
      res.status(500).json({ msg: "Error al cargar Car" });
    }
  });
});

module.exports = routecar;
