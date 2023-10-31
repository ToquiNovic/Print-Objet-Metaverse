const express = require("express");
const routerroadobjects = express.Router();
const { v4: uuidv4 } = require("uuid");

/**
 * @swagger
 * /api/alldata:
 *   get:
 *     summary: Obtener todos los datos en una sola ruta
 *     tags: [All Data]
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         PosicionCarrito:
 *                           type: array
 *                           items:
 *                             type: string
 *                         PosicionMeta:
 *                           type: array
 *                           items:
 *                             type: string
 *                         whcm:
 *                           type: array
 *                           items:
 *                             type: string
 *                         whpx:
 *                           type: array
 *                           items:
 *                             type: string
 *                         pxporcm:
 *                           type: string
 *                     objects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           centroide:
 *                             type: array
 *                             items:
 *                               type: string
 *                           xywh:
 *                             type: array
 *                             items:
 *                               type: string
 *             example:
 *               msg:
 *                 data:
 *                   PosicionCarrito: ["valor1", "valor2"]
 *                   PosicionMeta: ["valor3", "valor4"]
 *                   whcm: ["valor5", "valor6"]
 *                   whpx: ["valor7", "valor8"]
 *                   pxporcm: "valor9"
 *                 objects:
 *                   - centroide: ["valor10", "valor11"]
 *                     xywh: ["valor12", "valor13", "valor14", "valor15"]
 *       500:
 *         description: Error al obtener los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *             example:
 *               error: {}
 */

routerroadobjects.get("/", async (req, res) => {
  const mysqlConnection = require("../db");

  try {
    const queries = [
      mysqlConnection
        .promise()
        .query(
          "SELECT car.x_car, car.y_car, car.centroidx_car, car.centroidy_car FROM car"
        ),
      mysqlConnection.promise().query("SELECT * FROM meta"),
      mysqlConnection
        .promise()
        .query(
          "SELECT object.x_object, object.y_object, object.w_object, object.h_object, object.centroidx_object, object.centroidy_object FROM object"
        ),
      mysqlConnection
        .promise()
        .query(
          "SELECT racetrack.whcmx_racetrack, racetrack.whcmy_racetrack, racetrack.whpxx_racetrack, racetrack.whpxy_racetrack, racetrack.pxporcm_racetrack FROM racetrack"
        ),
    ];

    const results = await Promise.all(queries);

    const data = {
      PosicionCarrito: results[0][0].map((car) => [car.x_car, car.y_car])[0],
      PosicionMeta: results[1][0].map((meta) => [meta.x_meta, meta.y_meta])[0],
      whcm: results[3][0].map((whcm) => [
        whcm.whcmx_racetrack,
        whcm.whcmy_racetrack,
      ])[0],
      whpx: results[3][0].map((whpx) => [
        whpx.whpxx_racetrack,
        whpx.whpxy_racetrack,
      ])[0],
      pxporcm: results[3][0].map((pxporcm) => pxporcm.pxporcm_racetrack)[0],
    };

    const objects = {
      centroide: results[2][0].map((centroid) => [
        centroid.centroidx_object,
        centroid.centroidy_object,
      ]),
      xywh: results[2][0].map((xywh) => [
        xywh.x_object,
        xywh.y_object,
        xywh.w_object,
        xywh.h_object,
      ]),
    };

    const formattedObjects = objects.centroide.map((centroide, index) => {
      return {
        centroide: centroide,
        xywh: objects.xywh[index],
      };
    });

    res.json({ msg: { data: data, objects: formattedObjects } });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

/**
 * @swagger
 * /api/alldata:
 *   post:
 *     summary: Cargar todos los datos en una sola ruta
 *     tags: [All Data]
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
 *               x_meta:
 *                 type: number
 *               y_meta:
 *                 type: number
 *               whcmx_racetrack:
 *                 type: number
 *               whcmy_racetrack:
 *                 type: number
 *               whpxx_racetrack:
 *                 type: number
 *               whpxy_racetrack:
 *                 type: number
 *               pxporcm_racetrack:
 *                 type: string
 *               objects:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     centroide:
 *                       type: array
 *                       items:
 *                         type: number
 *                     xywh:
 *                       type: array
 *                       items:
 *                         type: number
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         PosicionCarrito:
 *                           type: array
 *                           items:
 *                             type: number
 *                         PosicionMeta:
 *                           type: array
 *                           items:
 *                             type: number
 *                         whcm:
 *                           type: array
 *                           items:
 *                             type: number
 *                         whpx:
 *                           type: array
 *                           items:
 *                             type: number
 *                         pxporcm:
 *                           type: number
 *                     objects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           centroide:
 *                             type: array
 *                             items:
 *                               type: number
 *                           xywh:
 *                             type: array
 *                             items:
 *                               type: number
 *             example:
 *               msg:
 *                 data:
 *                   PosicionCarrito: ["valor1", "valor2"]
 *                   PosicionMeta: ["valor3", "valor4"]
 *                   whcm: ["valor5", "valor6"]
 *                   whpx: ["valor7", "valor8"]
 *                   pxporcm: "valor9"
 *                 objects:
 *                   - centroide: ["valor10", "valor11"]
 *                     xywh: ["valor12", "valor13", "valor14", "valor15"]
 *       500:
 *         description: Error al obtener los datos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *             example:
 *               error: {}
 */

routerroadobjects.post("/", async (req, res) => {
  const mysqlConnection = require("../db").promise();

  const numIds = 4;

  const ids = new Set();
  while (ids.size < numIds) {
    ids.add(uuidv4());
  }

  const [idCar, idMeta, idObjects, idRacetrack] = ids;

  const {
    x_car,
    y_car,
    centroidx_car,
    centroidy_car,
    x_meta,
    y_meta,
    whcmx_racetrack,
    whcmy_racetrack,
    whpxx_racetrack,
    whpxy_racetrack,
    pxporcm_racetrack,
    objects,
  } = req.body;

  const data = {
    x_car,
    y_car,
    centroidx_car,
    centroidy_car,
    x_meta,
    y_meta,
    whcmx_racetrack,
    whcmy_racetrack,
    whpxx_racetrack,
    whpxy_racetrack,
    pxporcm_racetrack,
  };

  try {
    // Consulta INSERT para la tabla "car"
    await mysqlConnection.query(
      "INSERT INTO car (id_car, x_car, y_car, centroidx_car, centroidy_car) VALUES (?, ?, ?, ?, ?)",
      [idCar, data.x_car, data.y_car, data.centroidx_car, data.centroidy_car]
    );

    // Consulta INSERT para la tabla "meta"
    await mysqlConnection.query(
      "INSERT INTO meta (id_meta, x_meta, y_meta) VALUES (?, ?, ?)",
      [idMeta, data.x_meta, data.y_meta]
    );

    // Consulta INSERT para la tabla "racetrack"
    await mysqlConnection.query(
      "INSERT INTO racetrack (id_racetrack, whcmx_racetrack, whcmy_racetrack, whpxx_racetrack, whpxy_racetrack, pxporcm_racetrack) VALUES (?, ?, ?, ?, ?, ?)",
      [
        idRacetrack,
        data.whcmx_racetrack,
        data.whcmy_racetrack,
        data.whpxx_racetrack,
        data.whpxy_racetrack,
        data.pxporcm_racetrack,
      ]
    );

    // Insertar objetos en la tabla "object"
    for (const obj of objects) {
      const { centroide, xywh } = obj;
      const [centroidx_object, centroidy_object] = centroide;
      const [x_object, y_object, w_object, h_object] = xywh;

      const idObject = uuidv4();

      await mysqlConnection.query(
        "INSERT INTO object (id_object, x_object, y_object, centroidx_object, centroidy_object, w_object, h_object) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          idObject,
          x_object,
          y_object,
          centroidx_object,
          centroidy_object,
          w_object,
          h_object,
        ]
      );
    }

    res.status(200).json({ msg: "Datos cargados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error al cargar los datos" });
  }
});

module.exports = routerroadobjects;