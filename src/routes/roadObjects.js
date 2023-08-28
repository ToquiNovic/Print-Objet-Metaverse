const express = require('express');
const fs = require('fs');
const path = require('path');

const routerroadobjects = express.Router();

routerroadobjects.get('/', (req, res) => {
  try {
    // Obtener la ruta completa al archivo 'contornos.json'
    const filePath = path.join(__dirname, '..', 'data', 'contornos.json');
    
    // Leer el contenido del archivo JSON
    const jsonData = fs.readFileSync(filePath, 'utf8');
    
    // Convertir el contenido JSON en un objeto JavaScript
    const data = JSON.parse(jsonData);
    
    // Enviar la respuesta con los datos obtenidos
    res.send(data);
  } catch (error) {
    console.error('Error al leer el archivo JSON:', error);
    res.status(500).send('Error al leer el archivo JSON');
  }
});

// Ruta POST para actualizar los datos en 'contornos.json'
routerroadobjects.post('/', (req, res) => {
    try {
      // Obtener la ruta completa al archivo 'contornos.json'
      const filePath = path.join(__dirname, '..', 'data', 'contornos.json');
  
      // Leer el contenido actual del archivo JSON
      const jsonData = fs.readFileSync(filePath, 'utf8');
  
      // Convertir el contenido JSON en un objeto JavaScript
      const data = JSON.parse(jsonData);
  
      // Acceder a los datos enviados desde Python
      const nuevosDatos = req.body;
  
      // Actualizar los datos en el objeto JavaScript
      data.push(nuevosDatos);
  
      // Convertir los datos actualizados en formato JSON
      const newDataJson = JSON.stringify(data);
  
      // Escribir los datos actualizados en 'contornos.json'
      fs.writeFileSync(filePath, newDataJson);
  
      // Enviar una respuesta indicando el éxito de la actualización
      res.send('Datos actualizados correctamente');
    } catch (error) {
      console.error('Error al actualizar el archivo JSON:', error);
      res.status(500).send('Error al actualizar el archivo JSON');
    }
  });

module.exports = routerroadobjects;