const express = require("express");
const routeReset = express.Router();

/**
 * @swagger
 * /api/reset:
 *   delete:
 *     summary: Elimina todos los registros de las tablas
 *     tags: [Reset]
 *     responses:
 *       200:
 *         description: Tablas vaciadas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Tablas vaciadas correctamente"
 *       500:
 *         description: Error al vaciar las tablas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Error message"
 */

routeReset.delete("/", async (req, res) => {
  const mysqlConnection = require("../db");

  try {
    const queries = [
      mysqlConnection.promise().query("TRUNCATE car"),
      mysqlConnection.promise().query("TRUNCATE meta"),
      mysqlConnection.promise().query("TRUNCATE object"),
      mysqlConnection.promise().query("TRUNCATE racetrack"),
    ];
    const results = await Promise.all(queries);

    res.json({ msg: "Tablas vaciadas correctamente" });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
});

module.exports = routeReset;