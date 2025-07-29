const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { lat, lon } = event.queryStringParameters;

  if (!lat || !lon) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'lat, lonが必要です' })
    };
  }

  const targetUrl = `https://cyberjapandata2.gsi.go.jp/general/elevation?lat=${lat}&lon=${lon}&outtype=JSON`;

  try {
    const resp = await fetch(targetUrl);
    if (!resp.ok) {
      return { statusCode: resp.status, body: resp.statusText };
    }
    const data = await resp.json();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};