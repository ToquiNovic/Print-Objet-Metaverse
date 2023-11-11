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
  const idCar = "be64f5e5-8d08-4cd9-9805-2e8ccb3206f6";
  const idMeta = "a95de7b3-96fb-451e-b9bb-142c7321e344";
  const idRacetrack = "f7f47c83-489a-458c-b7f3-68d6f6377995";

  try {
    const queries = [
      mysqlConnection
        .promise()
        .query(
          ` UPDATE car SET x_car = 0, y_car = 0, centroidx_car = 0, centroidy_car = 0 WHERE id_car = '${idCar}' `
        ),
      mysqlConnection
        .promise()
        .query(
          ` UPDATE meta SET x_meta = 0, y_meta = 0 WHERE id_meta = '${idMeta}'`
        ),
      mysqlConnection.promise().query("TRUNCATE object"),
      mysqlConnection
        .promise()
        .query(
          ` UPDATE racetrack SET whcmx_racetrack = 0, whcmy_racetrack = 0, whpxx_racetrack = 0, whpxy_racetrack = 0, pxporcm_racetrack = 0, status_racetrack = 0 WHERE id_racetrack = '${idRacetrack}'`
        ),
      mysqlConnection.promise().query("TRUNCATE route"),

    ];
    const results = await Promise.all(queries);

    res.json({ msg: "Tablas vaciadas correctamente" });
  } catch (error) {
    res.status(500).send({ msg: error });
  }
});

module.exports = routeReset;
