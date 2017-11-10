const Vector = require('./vector.js');

class Game {
    constructor(world, io) {
        this.world = world;
        this.io = io;
        this.intervals = [];
        this.bindMethods();
    }
    
    bindMethods() {
        this.playerJoined = this.playerJoined.bind(this);
        this.playerMoving = this.playerMoving.bind(this);
        this.playerConnected = this.playerConnected.bind(this);
        this.tick = this.tick.bind(this);
        this.occasionalMechanics = this.occasionalMechanics.bind(this);
        this.recurrentMechanics = this.recurrentMechanics.bind(this);
        this.run = this.run.bind(this);
        this.close = this.close.bind(this);
    }
    
    playerJoined(name) {
        this.world
            .addPlayer(name);
            
        console.log(`Player ${name} has joined the game`);
            
        this.io.sockets
            .emit('playerJoined', name);
    }
    
    playerMoving(payload) {
        const name = payload.name;
        const x = payload.x;
        const y = payload.y;
        const velocity = new Vector(x,y);
        
        console.log(`Player ${name} started to move direction ${x}, ${y}`);
        
        this.world.applyToPlayer(name, player =>
            player.setVelocity(velocity)
        );
    }
    
    playerConnected(socket) {
        console.log(`Someone has launched the game!`);
        
        socket.on(
            'playerJoined',
            this.playerJoined
        );
        
        socket.on(
            'playerMoving',
            this.playerMoving
        );
    }
    
    tick() {
        const data = this.world
            .tick()
            .toPlainObject();

        this.io.sockets
            .emit('tick', data);
    }
    
    occasionalMechanics() {
        this.world.addNPC();
    }
    
    recurrentMechanics() {
        this.world.checkCollisions();
    }
    
    run() {
        const tickInterval = setInterval(this.tick, 40);
        const occasionalInterval = setInterval(this.occasionalMechanics, 5000);
        const recurrentInterval = setInterval(this.recurrentMechanics, 40);

        this.intervals = [
            tickInterval,
            occasionalInterval,
            recurrentInterval
        ];

        this.io.on(
            'connection',
            this.playerConnected
        );
    }
    
    close() {
        this.intervals.forEach(interval =>
            clearInterval(interval)
        );
    }
}

module.exports = Game;