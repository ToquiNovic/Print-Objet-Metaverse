const express = require("express");
const routeracetrack = express.Router();

routeracetrack.post("/", async (req, res) => {
  const mysqlConnection = require("../db");
  const idRacetrack = crypto.randomUUID();
  const { whcmx_racetrack, whcmy_racetrack, whpxx_racetrack, whpxy_racetrack, pxporcm_racetrack } = req.body;

  let mysqlquery = `
  INSERT INTO racetrack (id_racetrack, whcmx_racetrack, whcmy_racetrack, whpxx_racetrack, whpxy_racetrack, pxporcm_racetrack) VALUES ('${idRacetrack}', '${whcmx_racetrack}', '${whcmy_racetrack}', '${whpxx_racetrack}', '${whpxy_racetrack}', '${pxporcm_racetrack}')
  `;

  mysqlConnection.query(mysqlquery, (err, rows) => {
    if (!err) {
      res.json({
        msg: `Datos de la pista: ${whcmx_racetrack}, ${whcmy_racetrack}, ${whpxx_racetrack}, ${whpxy_racetrack}, ${pxporcm_racetrack}`,
      });
    } else {
      res.status(500).json({ msg: "Error al cargar racetrack" });
    }
  });
});

module.exports = routeracetrack;
