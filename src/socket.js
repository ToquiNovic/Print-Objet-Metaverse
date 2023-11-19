const mysqlConnection = require("./db");

module.exports = function(io) {
    let previousData;

    io.on('connection', (socket) => {
      console.log('Un cliente se ha conectado');
  
      setInterval(() => {
        let sqlQuery = `SELECT speed_a, speed_B FROM speed_car`;
        mysqlConnection.query(sqlQuery, (err, rows) => {
          if (!err) {
            // Compara los datos actuales con los datos anteriores
            if (JSON.stringify(rows) !== JSON.stringify(previousData)) {
              // Si los datos han cambiado, emite los nuevos datos
              socket.emit('speedData', {
                msg: rows
              });
              // Imprime los nuevos datos
              console.log('Nuevos datos:', rows);
              // Actualiza los datos anteriores
              previousData = rows;
            }
          } else {
            console.log(err);
            socket.emit('speedData', {
              msg: "Error al cargar La Velocidad",
              error: err
            });
          }
        });
      }, 100);  // Consulta la base de datos cada 5 segundos

      socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
      });
    });
}
