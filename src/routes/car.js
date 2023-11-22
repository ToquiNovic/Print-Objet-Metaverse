const express = require("express");
const routecar = express.Router();
const { v4: uuidv4 } = require("uuid");

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
 *     summary: Obtener la ruta con posicion incial y posicion final
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

routecar.get("/", async (req, res) => {
  const mysqlConnection = require("../db");
  let sqlQuery = `
  SELECT 
    orden,
    x_route,
    y_route,
    cm_route,
    degree_route
  FROM 
    route
  ORDER BY orden ASC`;

  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      let processedRows = [];
      let previousFinalPosition = null;
      for (let i = 0; i < rows.length; i++) {
        let initialPosition = previousFinalPosition || rows[i];
        let finalPosition = rows[i + 1];
        let routeSegment = {
          initialPosition: {
            "orden": initialPosition.orden,
            "x_route": initialPosition.x_route,
            "y_route": initialPosition.y_route
          },
          finalPosition: finalPosition
            ? {
                "orden": finalPosition.orden,
                "x_route": finalPosition.x_route,
                "y_route": finalPosition.y_route,
                "cm_route": finalPosition.cm_route,
                "degree_route": finalPosition.degree_route
              }
            : null,
        };
        processedRows.push(routeSegment);
        previousFinalPosition = finalPosition;
      }
      res.json({
        msg: processedRows,
      });
    } else {
      res.status(500).json({ msg: "Error al Obtener los datos de la ruta para el carro" });
    }
  });
});

/**
 * @swagger
 * /api/car/points:
 *   get:
 *     summary: Obtener la cantidad de puntos de la ruta
 *     tags: [Car]
 *     responses:
 *       200:
 *         description: Datos de la cantidad de puntos de la ruta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Error al Obtener la cantidad de puntos de la ruta
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

routecar.get("/points", async (req, res) => {
  const mysqlConnection = require("../db");
  let sqlQuery = `
  SELECT 
    orden AS points
  FROM 
    route
  ORDER BY orden DESC`;

  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      res.json({
        msg: rows[0],
      });
    } else {
      res.status(500).json({ msg: "Error al Obtener la cantidad de puntos de la ruta" });
    }
  });
});

module.exports = routecar;