const _ = require('lodash');
const Player = require('./player.js');
const Vector = require('./vector.js');
const utils = require('./utils.js');

const getUniqueId = utils.getUniqueId;
const isUndefined = _.isUndefined;
const random = _.random;
const every = _.every;
const forIn = _.forIn;
const map = _.map;

class World {
    constructor(width, height) {
        this.height = height;
        this.width = width;
        
        this.players = {};
        
        this.bindMethods()
    }
    
    bindMethods() {
        this.addPlayer = this.addPlayer.bind(this);
        this.playerExists = this.playerExists.bind(this);
        this.applyToPlayer = this.applyToPlayer.bind(this);
        this.checkCollisions = this.checkCollisions.bind(this);
        this.playersColliding = this.playersColliding.bind(this);
        this.destroyPlayer = this.destroyPlayer.bind(this);
        this.addNPC = this.addNPC.bind(this);
        this.randomPosition = this.randomPosition.bind(this);
        this.tick = this.tick.bind(this);
        this.toPlainObject = this.toPlainObject.bind(this);
        this.playersExists = this.playersExists.bind(this);
    }
    
    addPlayer(name) {
        const position = this.randomPosition();
        console.log(this.players)
        this.players[name] = new Player(position);
    }
    
    playersExists(players) {
        return every(players, this.playerExists);
    }
    
    playerExists(name) {
        return !isUndefined(this.players[name]);
    }
    
    applyToPlayer(name, fn) {
        const player = this.players[name];
        if (!isUndefined(player)) {
            this.players[name] = fn(player);   
        }
    }
    
    checkCollisions() {
        const players = this.players;
        forIn(players, (player, name) =>
            forIn(players,
                this.playersColliding(player, name)
            )
        );
    }
    
    playersColliding(player, name) {
        return (enemy, enemyName) => {
            const playersExists = this.playersExists([
                name,
                enemyName
            ]);
            
            if (!playersExists) {
                return;
            }
            
            if (!player.collides(enemy)) {
                return;
            }
            
            if (player.isBiggerThan(enemy)) {
                this.players[name].feedWith(enemy);
                this.destroyPlayer(enemyName);
                return;
            }
            
            if (enemy.isBiggerThan(player)) {
                this.players[enemyName].feedWith(player);
                this.destroyPlayer(name);
                return;
            }
        };
    }
    
    destroyPlayer(name) {
        console.log(`Killing player ${name}`);
        delete this.players[name];
    }
    
    addNPC() {
        const position = this.randomPosition();
        const name = getUniqueId();
        this.players[name] = Player.createNPC(position);
    }
    
    randomPosition() {
        const x = random(0, this.width);
        const y = random(0, this.height);
        return new Vector(x, y);
    }
    
    tick() {
        forIn(this.players, (player, name) => 
            this.players[name] = player
                .tick()
                .constraint(this.width, this.height)
        );
        
        return this;
    }
    
    toPlainObject() {
        const players = map(this.players, player =>
            player.toPlainObject()
        );
        
        return players;
    }
}

module.exports = World;