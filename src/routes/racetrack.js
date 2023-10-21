const express = require("express");
const routeracetrack = express.Router();

/**
 * @swagger
 * /racetrack:
 *   post:
 *     summary: Crear una nueva pista de carreras
 *     tags: [Racetrack]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               whcmx_racetrack:
 *                 type: string
 *               whcmy_racetrack:
 *                 type: string
 *               whpxx_racetrack:
 *                 type: string
 *               whpxy_racetrack:
 *                 type: string
 *               pxporcm_racetrack:
 *                 type: string
 *             example:
 *               whcmx_racetrack: "valor1"
 *               whcmy_racetrack: "valor2"
 *               whpxx_racetrack: "valor3"
 *               whpxy_racetrack: "valor4"
 *               pxporcm_racetrack: "valor5"
 *     responses:
 *       200:
 *         description: Pista de carreras creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Datos de la pista: valor1, valor2, valor3, valor4, valor5"
 *       500:
 *         description: Error al crear la pista de carreras
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al cargar racetrack"
 */
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