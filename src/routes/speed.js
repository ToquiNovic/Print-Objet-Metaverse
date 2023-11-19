const express = require("express");
const routeSpeed = express.Router();
const mysqlConnection = require("../db");

/**
 * @swagger
 * /api/speed:
 *   get:
 *     summary: Obtener Velocidad de los motores
 *     tags: [Speed]
 *     responses:
 *       200:
 *         description: Obtener Velocidad de los motores
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *       500:
 *         description: Error al cargar La Velocidad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al cargar La Velocidad"
 */


routeSpeed.get("/", async (req , res) => {
  let sqlQuery = `SELECT speed_a, speed_B FROM speed_car`;
  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      res.json({
        msg: rows
      })
    } else {
      res.status(500).json({msg: "Error al cargar La Velocidad"})
    }
  });
});

/**
 * @swagger
 * /api/speed:
 *   put:
 *     summary: Establecer Velocidad de los motores
 *     tags: [Speed]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               speed_a:
 *                 type: number
 *               speed_b:
 *                 type: number
 *             example:
 *               speed_a: 1
 *               speed_b: 2
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
 *               msg: "Velocidad de los motores A: valor1, B: valor2"
 *       500:
 *         description: Error al cargar La Velocidad
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al cargar La Velocidad"
 */

routeSpeed.put("/", async (req, res) => {
  const idspeed = "dda36c2b-879a-4114-bbf9-db59475e3bda";
  const { speed_a, speed_b } = req.body;

  let mysqlquery = `
  UPDATE
    speed_car
  SET 
    speed_a = '${speed_a}', 
    speed_b = '${speed_b}'
  WHERE 
    id_speed = '${idspeed}'
  `;

  mysqlConnection.query(mysqlquery, (err, rows) => {
    if (!err) {
      res.json({
        msg: `Velocidad de los motores A: ${speed_a}, B: ${speed_b}`,
      });
    } else {
        console.log(err);
      res.status(500).json({ msg: "Error al cargar La Velocidad" });
    }
  });
});



module.exports = routeSpeed;