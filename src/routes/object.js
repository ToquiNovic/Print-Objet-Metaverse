const express = require("express");
const routeObjects = express.Router();

/**
 * @swagger
 * /object:
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
 *                   type: string
 *                 y_object:
 *                   type: string
 *                 centroidx_object:
 *                   type: string
 *                 centroidy_object:
 *                   type: string
 *                 w_object:
 *                   type: string
 *                 h_object:
 *                   type: string
 *             example:
 *               - x_object: "valor1"
 *                 y_object: "valor2"
 *                 centroidx_object: "valor3"
 *                 centroidy_object: "valor4"
 *                 w_object: "valor5"
 *                 h_object: "valor6"
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
