const express = require("express");
const routeObjects = express.Router();
const { v4: uuidv4 } = require('uuid');
const mysqlConnection = require("../db");

/**
 * @swagger
 * /api/object:
 *   post:
 *     summary: Establecer la posición de los obstaculos
 *     tags: [Object]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 x_object:
 *                   type: number
 *                 y_object:
 *                   type: number
 *                 centroidx_object:
 *                   type: number
 *                 centroidy_object:
 *                   type: number
 *                 w_object:
 *                   type: number
 *                 h_object:
 *                   type: number
 *             example:
 *               - x_object: 1
 *                 y_object: 2
 *                 centroidx_object: 3
 *                 centroidy_object: 4
 *                 w_object: 5
 *                 h_object: 6
 *     responses:
 *       200:
 *         description: Obstáculos cargados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Obstáculos cargados"
 *       500:
 *         description: Error al cargar los obstáculos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 error:
 *                   type: object
 *             example:
 *               msg: "Error al cargar los obstáculos"
 *               error: {}
 */

routeObjects.post("/", async (req, res) => {
  const objects = req.body;

  const promises = objects.map((object) => {
    const idObjects = uuidv4();
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
      res.status(500).json({ msg: "Error al cargar Obstaculos", error: error });
    });
});

/**
 * @swagger
 * /api/object:
 *   get:
 *     summary: Obtener los Obstaculos de la Pista
 *     tags: [Object]
 *     responses:
 *       200:
 *         description: Datos del Carro obtenidos exitosamente
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

routeObjects.get("/", async (req , res) => {
  let sqlQuery = `SELECT * FROM object`;

  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      res.json({
        msg: rows
      })
    } else {
      res.status(500).json({msg: "Error al Obtener los datos de los Obstaculos"})
    }
  });
});

/**
 * @swagger
 * /api/object:
 *   delete:
 *     summary: Eliminar todos los Obstáculos de la Pista
 *     tags: [Object]
 *     responses:
 *       200:
 *         description: Obstáculos eliminados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Error al eliminar los obstáculos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al Obtener los datos del meta"
 */

routeObjects.delete("/", async (req , res) => {
  let sqlQuery = `TRUNCATE object`;

  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      res.json({
        msg: rows
      })
    } else {
      res.status(500).json({msg: "Error al Obtener los datos de los Obstaculos"})
    }
  });
});

module.exports = routeObjects;