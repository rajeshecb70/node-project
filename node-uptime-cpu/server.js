// server.js
const osUtils = require('os-utils');
const express = require('express');
const app = express();
const port = 3000;
module.exports = app; // Export app for testing purposes
app.get('/uptime', (req, res) => {
  const uptime = osUtils.sysUptime(); // System uptime in seconds
  res.json({ uptime: uptime });
});

app.get('/cpu', (req, res) => {
  osUtils.cpuUsage(function (v) {
    res.json({ cpuUsage: v });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
