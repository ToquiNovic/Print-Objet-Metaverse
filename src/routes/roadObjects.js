const express = require("express");
const routerroadobjects = express.Router();

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
      mysqlConnection.promise().query("SELECT * FROM route"),
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
      pxporcm: results[3][0].map((pxporcm) => pxporcm.pxporcm_racetrack),
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


module.exports = routerroadobjects;