const express = require("express");
const routetrajectory = express.Router();
const { v4: uuidv4 } = require("uuid");

/**
 * @swagger
 * /api/trajectory:
 *   get:
 *     summary: Obtener los datos de la Posicion del Carro
 *     tags: [Trajectory]
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

routetrajectory.get("/", async (req, res) => {
  const mysqlConnection = require("../db");
  let sqlQuery = `
  SELECT 
    ROW_NUMBER() OVER (ORDER BY insert_time) AS orden,
    centroidx_car, 
    centroidy_car 
  FROM car
  ORDER BY insert_time ASC
  `;

  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      res.json({
        msg: rows,
      });
    } else {
      res.status(500).json({ msg: "Error al Obtener los datos del meta" });
    }
  });
});

/**
 * @swagger
 * /api/trajectory:
 *   post:
 *     summary: Establecer la posición del Carro / TRAYECTORIA
 *     tags: [Trajectory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               centroidx_car:
 *                 type: number
 *               centroidy_car:
 *                 type: number
 *             example:
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

routetrajectory.post("/", async (req, res) => {
  const mysqlConnection = require("../db");
  const idCar = uuidv4();
  const { x_car, y_car, centroidx_car, centroidy_car } = req.body;

  let mysqlquery = `
    INSERT INTO car(
       id_car,
       x_car, 
       y_car, 
       centroidx_car, 
       centroidy_car)
    VALUES
    ('${idCar}', 0, 0, '${centroidx_car}', '${centroidy_car}')
    `;
  mysqlConnection.query(mysqlquery, (err, rows) => {
    if (!err) {
      res.json({
        msg: `Car ubicado en las coordenadas x: ${x_car}, y: ${y_car}, centroide: [${centroidx_car}, ${centroidy_car}]`,
      });
    } else {
      res.status(500).json({ msg: "Error al cargar Car" });
      console.log(err);
    }
  });
});

/**
 * @swagger
 * /api/trajectory/current:
 *   get:
 *     summary: Obtener la posicion ACTUAL del carro
 *     tags: [Trajectory]
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

routetrajectory.get("/current", async (req, res) => {
  const mysqlConnection = require("../db");
  let sqlQuery = `
  SELECT 
    ROW_NUMBER() OVER (ORDER BY insert_time) AS orden,
    centroidx_car, 
    centroidy_car 
  FROM 
    car
  ORDER BY insert_time DESC
    `;

  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      res.json({
        msg: rows[0],
      });
    } else {
      res.status(500).json({ msg: "Error al Obtener los datos del meta" });
    }
  });
});

module.exports = routetrajectory;
