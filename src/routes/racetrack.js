const express = require("express");
const routeracetrack = express.Router();
const { v4: uuidv4 } = require('uuid');


/**
 * @swagger
 * /api/racetrack:
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
 *                 type: number
 *               whcmy_racetrack:
 *                 type: number
 *               whpxx_racetrack:
 *                 type: number
 *               whpxy_racetrack:
 *                 type: number
 *               pxporcm_racetrack:
 *                 type: number
 *             example:
 *               whcmx_racetrack: 1
 *               whcmy_racetrack: 2
 *               whpxx_racetrack: 3
 *               whpxy_racetrack: 3
 *               pxporcm_racetrack: 4
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
  const idRacetrack = uuidv4();
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

/**
 * @swagger
 * /api/racetrack:
 *   get:
 *     summary: Obtener los datos de la pista de carreras
 *     tags: [Racetrack]
 *     responses:
 *       200:
 *         description: Pista de carreras obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Error al obtener la pista de carreras
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al cargar los datos"
 */

routeracetrack.get("/", async (req, res) => {
  const mysqlConnection = require("../db");
  let sqlQuery = `SELECT * FROM racetrack`;
  
  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      res.json({
        msg: rows
      })
    }else {
      res.status(500).json({msg: "Error al Obtener los datos"})
    }
  });
});

module.exports = routeracetrack;