const express = require("express");
const routecar = express.Router();

/**
 * @swagger
 * /api/car:
 *   put:
 *     summary: Establecer la posición del Carro en RealLife
 *     tags: [Car]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               x_car:
 *                 type: number
 *               y_car:
 *                 type: number
 *               centroidx_car:
 *                 type: number
 *               centroidy_car:
 *                 type: number
 *             example:
 *               x_car: 1
 *               y_car: 2
 *               centroidx_car: 3
 *               centroidy_car: 4
 *     responses:
 *       200:
 *         description: Car ubicado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Car ubicado en las coordenadas x: valor1, y: valor2, centroide: [valor3, valor4]"
 *       500:
 *         description: Error al cargar Car
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al cargar Car"
 */

routecar.put("/", async (req, res) => {
  const mysqlConnection = require("../db");
  const idCar = "be64f5e5-8d08-4cd9-9805-2e8ccb3206f6";
  const { x_car, y_car, centroidx_car, centroidy_car } = req.body;

  let mysqlquery = `
    UPDATE 
      car
    SET
       x_car = '${x_car}', 
       y_car = '${y_car}', 
       centroidx_car = '${centroidx_car}', 
       centroidy_car = '${centroidy_car}'
    WHERE
       id_car = '${idCar}'
    `;
  mysqlConnection.query(mysqlquery, (err, rows) => {
    if (!err) {
      res.json({
        msg: `Car ubicado en las coordenadas x: ${x_car}, y: ${y_car}, centroide: [${centroidx_car}, ${centroidy_car}]`,
      });
    } else {
      res.status(500).json({ msg: "Error al cargar Car" });
    }
  });
});

/**
 * @swagger
 * /api/car:
 *   get:
 *     summary: Obtener los datos de la Posicion del Carro
 *     tags: [Car]
 *     responses:
 *       200:
 *         description: Datos del Carro obtenida exitosamente
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

routecar.get("/", async (req , res) => {
  const mysqlConnection = require("../db");
  let sqlQuery = `SELECT * FROM car`;

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

module.exports = routecar;