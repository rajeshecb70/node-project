// server.js
const osUtils = require('os-utils');
const express = require('express');
const app = express();
const port = 3000;

// Helper function to format uptime in HH:MM:SS format
function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600); // Get hours
  const minutes = Math.floor((seconds % 3600) / 60); // Get minutes
  const remainingSeconds = Math.floor(seconds % 60); // Get remaining seconds
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Endpoint to get system uptime in HH:MM:SS format
app.get('/uptime', (req, res) => {
  const uptimeInSeconds = osUtils.sysUptime(); // System uptime in seconds
  const formattedUptime = formatUptime(uptimeInSeconds); // Format uptime to HH:MM:SS
  res.json({ uptime: formattedUptime });
}); 

// Endpoint to get CPU usage
app.get('/cpu', (req, res) => {
  osUtils.cpuUsage(function (v) {
    res.json({ cpuUsage: (v * 100).toFixed(2) }); // Convert to percentage and round to 2 decimal places
  });
});

// Start the server and export the server instance
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Export the app and the server instance for testing purposes
module.exports = app;
module.exports.server = server; // Export the server instance
