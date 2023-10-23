const express = require("express");
const routecar = express.Router();

/**
 * @swagger
 * /api/car:
 *   post:
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
 *                 type: string
 *               y_car:
 *                 type: string
 *               centroidx_car:
 *                 type: string
 *               centroidy_car:
 *                 type: string
 *             example:
 *               x_car: "valor1"
 *               y_car: "valor2"
 *               centroidx_car: "valor3"
 *               centroidy_car: "valor4"
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

routecar.post("/", async (req, res) => {
  const mysqlConnection = require("../db");
  const idCar = crypto.randomUUID();
  const { x_car, y_car, centroidx_car, centroidy_car } = req.body;

  let mysqlquery = `
    INSERT INTO car (id_car, x_car, y_car, centroidx_car, centroidy_car) VALUES ('${idCar}','${x_car}', '${y_car}', '${centroidx_car}', '${centroidy_car}')`;
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