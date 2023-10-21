const express = require("express");
const routeObjects = express.Router();

routeObjects.post("/", async (req, res) => {
  const mysqlConnection = require("../db");

  const objects = req.body;

  const promises = objects.map((object) => {
    const idObjects = crypto.randomUUID();
    const {
      x_object,
      y_object,
      centroidx_object,
      centroidy_object,
      w_object,
      h_object,
    } = object;

    let mysqlquery = `
      INSERT INTO object (id_object, x_object, y_object, centroidx_object, centroidy_object, w_object, h_object) VALUES ('${idObjects}','${x_object}', '${y_object}', '${centroidx_object}', '${centroidy_object}', '${w_object}', '${h_object}')`;
    return new Promise((resolve, reject) => {
      mysqlConnection.query(mysqlquery, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });

  Promise.all(promises)
    .then(() => {
      res.json({
        msg: `Obstaculos Cargados`,
      });
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error al cargar Car", error: error });
    });
});

module.exports = routeObjects;
