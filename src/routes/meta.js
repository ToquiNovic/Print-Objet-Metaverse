const express = require("express");
const routeMeta = express.Router();

routeMeta.post("/", async (req, res) => {
  const mysqlConnection = require("../db");
  const idMeta = crypto.randomUUID();
  const { x_meta, y_meta } = req.body;

  let mysqlquery = `
  INSERT INTO meta (id_meta, x_meta, y_meta) VALUES ('${idMeta}','${x_meta}', '${y_meta}')
  `;

  mysqlConnection.query(mysqlquery, (err, rows) => {
    if (!err) {
      res.json({
        msg: `Car en Meta ubicado en las coordenadas x: ${x_meta}, y: ${y_meta}`,
      });
    } else {
      res.status(500).json({ msg: "Error al cargar META" });
    }
  });
});

module.exports = routeMeta;
