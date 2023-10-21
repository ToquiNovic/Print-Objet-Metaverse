const express = require("express");
const routeMeta = express.Router();

/**
 * @swagger
 * /api/meta:
 *   post:
 *     summary: Ubicar el Carro en el Metaverso
 *     tags: [Meta]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               x_meta:
 *                 type: string
 *               y_meta:
 *                 type: string
 *             example:
 *               x_meta: "valor1"
 *               y_meta: "valor2"
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
 *               msg: "Car en Meta ubicado en las coordenadas x: valor1, y: valor2"
 *       500:
 *         description: Error al cargar META
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *             example:
 *               msg: "Error al cargar META"
 */

routeMeta.post("/", async (req, res) => {
  const mysqlConnection = require("../db");
  const idMeta = crypto.randomUUID();
  const { x_meta, y_meta } = req.body;

  let mysqlquery = `
  INSERT INTO meta (id_meta, x_meta, y_meta) VALUES ('${idMeta}','${x_meta}', '${y_meta}')
  `;

  mysqlConnection.query(mysqlquery, (err, rows) => {
    if (!err) {
      res.json({
        msg: `Car en Meta ubicado en las coordenadas x: ${x_meta}, y: ${y_meta}`,
      });
    } else {
      res.status(500).json({ msg: "Error al cargar META" });
    }
  });
});

module.exports = routeMeta;