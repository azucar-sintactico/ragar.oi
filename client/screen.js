const _ = require('lodash');
const utils = require('./utils.js');
const toPixels = utils.toPixels;

const each = _.each;

class Screen {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        
        this.bindHandlers();
    }
    
    bindHandlers() {
        this.prepare = this.prepare.bind(this);
        this.clear = this.clear.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.draw = this.draw.bind(this);
    }
    
    static get containerClassName() {
        return 'game-container';
    }
    
    static get containerClass() {
        return `.${Screen.containerClassName}`;
    }
    
    get container() {
        return document.querySelector(
            Screen.containerClass
        );
    }
    
    prepare() {
        const container = document
            .createElement('div');

        container.classList.add(
            Screen.containerClassName
        );
        
        document
            .querySelector('body')
            .appendChild(container);
            
        this.container.style.width = toPixels(this.width);
        this.container.style.height = toPixels(this.height);
    }
    
    clear() {
        this.container.innerHTML = '';
    }
    
    addPlayer(playerData, name) {
        const player = document.createElement('div');
        player.classList.add('player');
        player.style.width = toPixels(playerData.size);
        player.style.height = toPixels(playerData.size);
        player.style.left = toPixels(playerData.x);
        player.style.top = toPixels(playerData.y);
        player.id = name;
        this.container.appendChild(player);
    }
    
    draw(players) {
        this.clear();
        each(players, this.addPlayer);
    }
}

module.exports = Screen;