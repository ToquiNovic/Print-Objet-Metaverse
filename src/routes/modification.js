const express = require("express");
const routemodification = express.Router();

/**
 * @swagger
 * /api/modification:
 *   get:
 *     summary: Saber si la Pista fue Modificada
 *     tags: [modification]
 *     responses:
 *       200:
 *         description: Estado de la pista obtenido correctamente
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

routemodification.get("/", async (req, res) => {
    const mysqlConnection = require("../db");
    let sqlQuery = `SELECT status_racetrack FROM racetrack`;
  
    mysqlConnection.query(sqlQuery, (err, rows) => {
      if (!err) {
        res.json({
          msg: rows.length > 0 ? "true" : "false",
        });
      } else {
        res.status(500).json({ msg: "Error al Obtener los datos" });
      }
    });
  });
  

module.exports = routemodification;
