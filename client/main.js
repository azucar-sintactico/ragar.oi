const config = require('../config.js');
const io = require('socket.io-client');
const Screen = require('./screen.js');

const gameScreen = new Screen(
    config.worldWidth,
    config.worldHeight
);

gameScreen.prepare();

const socket = io();

socket.on('tick', gameScreen.draw)

let playerName = undefined;

document.querySelector('button').addEventListener('click', () => {
    playerName = document.querySelector('input').value;
    socket.emit('playerJoined', playerName);
    document.querySelector('.modal').classList.remove('open');
});

document.querySelector(Screen.containerClass).addEventListener('mousemove', event => {
    const x = event.clientX;
    const y = event.clientY;
    
    socket.emit('playerMoving', {
        x: x,
        y: y,
        name: playerName
    });
});