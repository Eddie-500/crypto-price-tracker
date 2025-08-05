const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.static('public'));

app.get('/api/prices', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
      params: {
        ids: 'bitcoin,ethereum,dogecoin',
        vs_currencies: 'usd'
      }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener precios' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor activo en http://localhost:${PORT}`));
