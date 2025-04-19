import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/data/entrenadores', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'entrenadores.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer entrenadores.json:', err);
      return res.status(500).send('Error del servidor');
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
