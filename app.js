const config = require('./config.js');
const path = require("path");

const express = require("express");

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const DIST_DIR = config.DIST_DIR;
const PORT = config.PORT;
const SERVER_NAME = config.SERVER_NAME;

app.use(express.static(DIST_DIR));

app.get("*", (request, response) => response
    .sendFile(path.join(DIST_DIR, "index.html"))
);

http.listen(PORT, SERVER_NAME);

console.log(`Server running at ${SERVER_NAME}:${PORT}`);

/*
    Runs the game
*/

const World = require('./server/world.js');
const Game = require('./server/game.js');

const width = config.worldWidth;
const height = config.worldHeight;

const world = new World(width, height);
const game = new Game(world, io);

game.run();