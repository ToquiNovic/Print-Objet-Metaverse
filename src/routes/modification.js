const express = require("express");
const routemodification = express.Router();

/**
 * @swagger
 * /api/modification:
 *   get:
 *     summary: Saber si la Pista fue Modificada
 *     tags: [Modification]
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
      const status = rows[0].status_racetrack;
      console.log(status);
      res.json({
        msg: status === 0 ? "false" : "true",
      });
    } else {
      res.status(500).json({ msg: "Error al Obtener los datos" });
    }
  });
});

/**
 * @swagger
 * /api/modification/{status}:
 *   put:
 *     summary: Modificar el estado de la Pista
 *     tags: [Modification]
 *     parameters:
 *       - in: path
 *         name: status
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         required: true
 *         description: El nuevo estado de la pista
 *     responses:
 *       200:
 *         description: Estado de la pista modificado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       400:
 *         description: Error, el parámetro status debe ser 'true' o 'false'
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "El parámetro status debe ser 'true' o 'false'"
 *       500:
 *         description: Error al modificar la pista de carreras
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

routemodification.put("/:status", async (req, res) => {
  const mysqlConnection = require("../db");
  const idRacetrack = "f7f47c83-489a-458c-b7f3-68d6f6377995";

  // Obtener el parámetro status de la ruta
  const status = req.params.status;

  // Verificar si status es "true" o "false"
  if (status !== "true" && status !== "false") {
    return res
      .status(400)
      .json({ msg: "El parámetro status debe ser 'true' o 'false'" });
  }

  // Convertir status a un valor booleano para la consulta SQL
  const statusValue = status === "true" ? 1 : 0;

  let sqlQuery = ` UPDATE racetrack SET status_racetrack = ${statusValue} WHERE id_racetrack = '${idRacetrack}'`;

  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      res.json({
        msg: status === "true" ? "true" : "false",
      });
      console.log(statusValue);

    } else {
      res.status(500).json({ msg: "Error al obtener los datos" });
    }
  });
});

module.exports = routemodification;