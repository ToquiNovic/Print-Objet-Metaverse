const express = require("express");
const routeMeta = express.Router();
const { v4: uuidv4 } = require('uuid');


/**
 * @swagger
 * /api/meta:
 *   post:
 *     summary: Ubicar el Carro en el Metaverso
 *     tags: [Meta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               x_meta:
 *                 type: number
 *               y_meta:
 *                 type: number
 *             example:
 *               x_meta: 1
 *               y_meta: 2
 *     responses:
 *       200:
 *         description: Car en Meta ubicado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Car en Meta ubicado en las coordenadas x: valor1, y: valor2"
 *       500:
 *         description: Error al cargar META
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al cargar META"
 */

routeMeta.post("/", async (req, res) => {
  const mysqlConnection = require("../db");
  const idMeta = uuidv4();
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

/**
 * @swagger
 * /api/meta:
 *   get:
 *     summary: Obtener los datos de la Posicion del META
 *     tags: [Meta]
 *     responses:
 *       200:
 *         description: Posicion del META obtenida exitosamente
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


routeMeta.get("/", async (req , res) => {
  const mysqlConnection = require("../db");
  let sqlQuery = `SELECT * FROM meta`;

  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      res.json({
        msg: rows
      })
    } else {
      res.status(500).json({msg: "Error al Obtener los datos del meta"})
    }
  });
});


module.exports = routeMeta;