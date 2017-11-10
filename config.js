const path = require('path');

module.exports = {
    SERVER_NAME: process.env.IP,
    PORT: process.env.PORT,
    DIST_DIR: path.join(__dirname, "dist"),  
    CLIENT_DIR: path.join(__dirname, "client"),
    worldWidth: 1024,
    worldHeight: 768
};