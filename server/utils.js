const _ = require('lodash');
const random = _.random;

const randomByte = () => random(0, 255);

let currentId = 0;
function getUniqueId() {
    return currentId++;
}

function randomColor() {
    const r = randomByte();
    const g = randomByte();
    const b = randomByte();
    return `rgb(${r}, ${g}, ${b})`;
}


module.exports = {
    getUniqueId: getUniqueId,
    randomColor: randomColor
}