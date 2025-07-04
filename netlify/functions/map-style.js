const fetch = require('node-fetch');

// Netlifyの関数は必ずこの形式で定義します
exports.handler = async function (event, context) {
  // 環境変数からAPIキーを安全に読み込む
  const apiKey = process.env.MAPTILER_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'APIキーがサーバーに設定されていません。' }),
    };
  }

  // MapTilerのスタイルURLを構築
  const styleUrl = `https://api.maptiler.com/maps/jp-mierune-streets/style.json?key=${apiKey}`;

  try {
    // MapTilerにリクエストを転送
    const response = await fetch(styleUrl);
    const data = await response.json();

    // クライアント（ブラウザ）に地図データを返す
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};