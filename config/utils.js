const networkInterfaces = require('os').networkInterfaces

function getLocalIP() {
  const nets = networkInterfaces()
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal && net.address !== '127.0.0.1') {
        return net.address
      }
    }
  }
}

exports.getLocalIP = getLocalIP
