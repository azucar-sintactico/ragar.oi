const Vector = require('./vector.js');
const utils = require('./utils.js');
const randomColor = utils.randomColor;
const min = Math.min;

class Player {
    constructor(
        position,
        size = Player.defaultSize(),
        velocity = Player.defaultVelocity(),
        color = randomColor()
    ) {
        this.position = position;
        this.velocity = velocity;
        this.size = size;
    }
    
    tick() {
        const dP = this
            .velocity
            .scale(0.05);
            
        this.position = this
            .position
            .translate(dP);
            
        return this;
    }
    
    collides(enemy) {
        const radio = min(
            this.size,
            enemy.size
        );
        
        const distance = this.position
            .minus(enemy.position)
            .magnitude();

        return distance <= radio;
    }
    
    isBiggerThan(enemy) {
        const playerSize = this
            .size;
        
        const enemySize = enemy
            .size;

        return playerSize > enemySize;
    }
    
    setVelocity(v) {
        this.velocity = v
            .minus(this.position);
        return this;
    }
    
    feedWith(player) {
        this.size = this.size + player.size;
    }
    
    static defaultVelocity() {
        return Vector.zero();
    }
    
    static defaultSize() {
        return 15;
    }
    
    toPlainObject() {
        return {
            x: this.position.x,
            y: this.position.y,
            size: this.size,
            color: this.color
        }
    }
    
    constraint(width, height) {
        let x = this.position.x;
        let y = this.position.y;
        
        if (x < 0) x = 0;
        if (x > width) x = width;
        if (y < 0) y = 0;
        if (y > height) y = height;
        
        this.position = new Vector(x, y);
        
        return this;
    }
    
    static sizeOfNPC() {
        return 8;
    }
    
    static createNPC(position) {
        return new Player(
            position,
            Player.sizeOfNPC(),
            Vector.zero()
        );
    }
}

module.exports = Player;