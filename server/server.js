require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// node-fetch の ESM 対応（動的 import）
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// ✅ 許可したいオリジン
const allowedOrigins = ['https://with-npm-starter.vercel.app/', 'http://localhost:3000']; // ローカル環境も許可するなら追加

// ✅ CORS 設定（ここが追加部分）
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORSポリシーによりアクセスが拒否されました'));
    }
  }
}));

app.use(express.json());

// 確認用ルート
app.get('/', (req, res) => {
  res.send('✅ Dify中継サーバー起動中です');
});

// DifyリレーAPI
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

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("バックエンドでのエラー:", err);
    res.status(500).json({ error: 'Dify送信失敗', details: err.message });
  }
});

// ポート起動
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Nodeサーバー起動： http://localhost:${PORT}`);
});
