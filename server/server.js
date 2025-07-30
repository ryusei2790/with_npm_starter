require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('✅ Dify中継サーバー起動中です');
  });
  

app.post('/send-to-dify', async (req, res) => {
  try {
    const response = await fetch('https://api.dify.ai/v1/workflows/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DIFY_API_KEY}`
      },
      body: JSON.stringify(req.body)
    });
    console.log("送信しました");


    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("バックエンドでのエラー:", err);

    if (err.response) {
        const errorText = await err.response.text();
        console.error("Difyからの応答エラー", errorText);
    }

    res.status(500).json({ error: 'Dify送信失敗', details: err.message });
  }
});

app.listen(3001, () => {
  console.log('Nodeサーバー起動： http://localhost:3001');
});
