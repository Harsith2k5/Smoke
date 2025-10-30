// /api/espdata.js
export default async function handler(req, res) {
  try {
    const response = await fetch("http://172.20.10.2/data"); // your ESP32
    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    // If ESP32 not reachable, send simulated values instead
    const simulated = {
      distance: (Math.random() * 100).toFixed(1),
      temperature: (20 + Math.random() * 10).toFixed(1),
      humidity: (40 + Math.random() * 30).toFixed(1),
      weather: "Simulated Clear Sky",
      aqi: Math.floor(Math.random() * 100),
    };

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(simulated);
  }
}
