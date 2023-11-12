const express = require("express");
const routePoints = express.Router();
const { v4: uuidv4 } = require("uuid");

/**
 * @swagger
 * /api/route:
 *   post:
 *     summary: Cargar la ruta generada por el GA
 *     tags: [Route]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 x_route:
 *                   type: number
 *                 y_route:
 *                   type: number
 *                 state:
 *                   type: boolean
 *             example:
 *               - x_route: 1
 *                 y_route: 2
 *                 state: true
 *     responses:
 *       200:
 *         description: Puntos cargados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Puntos cargados"
 *       500:
 *         description: Error al cargar los puntos
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
 *               msg: "Error al cargar los puntos"
 *               error: {}
 */

routePoints.post("/", async (req, res) => {
  const mysqlConnection = require("../db");

  const points = Array.isArray(req.body) ? req.body : [req.body];

  const promises = points.map((point, index) => {
    const idPonts = uuidv4();
    const { x_route, y_route } = point;
    const state = point.state ? 1 : 0;
    const order = index + 1;

    let mysqlquery = `
      INSERT INTO route (id_route, x_route, y_route, state, orden) 
      VALUES ('${idPonts}', '${x_route}', '${y_route}', '${state}', '${order}')`;

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
        msg: `Puntos Cargados`,
      });
    })
    .catch((error) => {
      res.status(500).json({ msg: "Error al cargar Puntos", error: error });
    });
});

/**
 * @swagger
 * /api/route:
 *   get:
 *     summary: Obtener TODOS los puntos de la Ruta
 *     tags: [Route]
 *     responses:
 *       200:
 *         description: Datos de los puntos de la Ruta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: object
 *       500:
 *         description: Error al los puntos de la Ruta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al cargar los puntos de la Ruta"
 */

routePoints.get("/", async (req, res) => {
  const mysqlConnection = require("../db");
  let sqlQuery = `
  SELECT 
    orden,
    x_route,
    y_route,
    state    
  FROM 
    route 
  ORDER BY orden DESC
`;

  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      const transformedRows = rows.map(row => ({
        orden: row.orden,
        x_route: row.x_route,
        y_route: row.y_route,
        state: row.state === 0 ? false : true
      }));

      res.json({
        msg: transformedRows,
      });
    } else {
      console.log(err);
      res.status(500).json({ msg: "Error al Obtener los datos del Carro" });
    }
  });
});

/**
 * @swagger
 * /api/route/end:
 *   get:
 *     summary: Obtener el PUNTO DE LLEGADA de la Ruta
 *     tags: [Route]
 *     responses:
 *       200:
 *         description: Datos de los puntos de la Ruta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: object
 *       500:
 *         description: Error al los puntos de la Ruta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al cargar los puntos de la Ruta"
 */

routePoints.get("/end", async (req, res) => {
  const mysqlConnection = require("../db");
  let sqlQuery = `
  SELECT 
    orden,
    x_route,
    y_route,
    state    
  FROM 
    route 
  ORDER BY orden DESC
`;

  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      const transformedRows = rows.map(row => ({
        orden: row.orden,
        x_route: row.x_route,
        y_route: row.y_route,
        state: row.state === 0 ? false : true
      }));

      res.json({
        msg: transformedRows[0],
      });
    } else {
      console.log(err);
      res.status(500).json({ msg: "Error al Obtener los datos del Carro" });
    }
  });
});

/**
 * @swagger
 * /api/route/start:
 *   get:
 *     summary: Obtener el PUNTO DE INICIO de la Ruta
 *     tags: [Route]
 *     responses:
 *       200:
 *         description: Datos de los puntos de la Ruta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: object
 *       500:
 *         description: Error al los puntos de la Ruta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al cargar los puntos de la Ruta"
 */

routePoints.get("/start", async (req, res) => {
  const mysqlConnection = require("../db");
  let sqlQuery = `
  SELECT 
    orden,
    x_route,
    y_route,
    state    
  FROM 
    route 
  ORDER BY orden ASC
`;

  mysqlConnection.query(sqlQuery, (err, rows) => {
    if (!err) {
      const transformedRows = rows.map(row => ({
        orden: row.orden,
        x_route: row.x_route,
        y_route: row.y_route,
        state: row.state === 0 ? false : true
      }));

      res.json({
        msg: transformedRows[0],
      });
    } else {
      console.log(err);
      res.status(500).json({ msg: "Error al Obtener los datos del Carro" });
    }
  });
});

/**
 * @swagger
 * /api/route:
 *   delete:
 *     summary: Eliminar todos los puntos de la Ruta
 *     tags: [Route]
 *     responses:
 *       200:
 *         description: Ruta eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: object
 *       500:
 *         description: Error al eliminar los puntos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al Obtener los puntos de la Ruta"
 */

routePoints.delete("/", async (req , res) => {
  const mysqlConnection = require("../db");
  let sqlQuery = `TRUNCATE route`;

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

module.exports = routePoints;