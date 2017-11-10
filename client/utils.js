const toPixels = number => `${number}px`;

function getRelative(evt, element) {
    var rect = element.getBoundingClientRect();
    var scrollTop = document.documentElement.scrollTop ? 
        document.documentElement.scrollTop : document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft ? 
        document.documentElement.scrollLeft : document.body.scrollLeft;
    
    var elementLeft = rect.left + scrollLeft;  
    var elementTop = rect.top + scrollTop;
    
    const x = evt.pageX - elementLeft;
    const y = evt.pageY - elementTop;
    return {x: x, y: y};
}

module.exports = {
    toPixels: toPixels,
    getRelative: getRelative
};