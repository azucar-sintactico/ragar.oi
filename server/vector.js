const sqrt = Math.sqrt;
const pow = Math.pow;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    translate(v) {
        return new Vector(
            this.x + v.x,
            this.y + v.y
        );
    }
    
    minus(v) {
        return this.translate(
            v.negate()
        );
    }
    
    scale(c) {
        return new Vector(
            this.x * c,
            this.y * c
        );
    }
    
    negate() {
        return new Vector(
            -this.x,
            -this.y
        );
    }
    
    magnitude() {
        const x = this.x;
        const y = this.y;
        return sqrt(
            pow(x, 2) + pow(y, 2)
        );
    }
    
    static zero() {
        return new Vector(0, 0);
    }
}

module.exports = Vector;