const getRandomBetween = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

const getRandomSign = () => {
    return Math.random() < 0.5 ? -1 : 1;
}

const layer = document.getElementById('layer');
const light = document.getElementById('light');

window.addEventListener('mousemove', e => {
    layer.style.top = `${e.pageY}px`;
    layer.style.left = `${e.pageX}px`;
    
    light.style.top = `${e.pageY}px`;
    light.style.left = `${e.pageX}px`;
});

const colors = ['#08f7fe', '#011ffd', '#f7ef8a'];
const outerWidth = 300;
const outerHeight = 300;
const margin = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
};
const innerWidth = outerWidth - margin.left - margin.right;
const innerHeight = outerHeight - margin.top - margin.bottom;
const originX = innerWidth / 2;
const originY = innerHeight / 2;
const circleOrigin = 140;
const particleRadius = 1;
const particleOriginX = originX + ((circleOrigin) * Math.sin(0));
const particleOriginY = originY - ((circleOrigin) * Math.cos(0));
const particles = new Array(1000).fill(null);
const spread = 10;
const tween = (d, i, a) => {
    return d3.interpolateString(`rotate(${getRandomSign() * getRandomBetween(0, 361)}, ${circleOrigin}, ${circleOrigin})`,
                                `rotate(${getRandomSign() * getRandomBetween(360, 721)}, ${circleOrigin}, ${circleOrigin})`);
}

const svg = d3.select('#canvas')
    .selectAll('.canvas')
        .data([null])
        .join('svg')
            .classed('canvas', true)
            .attr('width', outerWidth)
            .attr('height', outerHeight)
            .style('background', 'transparent')
    .selectAll('g')
        .data([null])
        .join('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

particles.forEach((element, index) => {
    const createParticles = () => {
        const originX = particleOriginX - particleRadius / 2;
        const originY = particleOriginY - particleRadius / 2;
    
        particle = svg.selectAll(`.particle${index}`)
        .data([null])
        .join('circle')
            .attr('class', `particle${index}`)
            .attr('cx', getRandomBetween(originX + spread, originX - spread))
            .attr('cy', getRandomBetween(originY + spread, originY - spread))
            .attr('r', Math.random())
            .style('fill', (d, i) => {
                if(Math.random() < 0.05) {
                    return colors[2];
                } else {
                    return colors[getRandomBetween(0,2)];
                }
            })
            .style('opacity', Math.random());
    
        particle
        .transition()
        .delay(0)
        .ease(d3.easeLinear)
        .duration(getRandomBetween(1000, 50000))
            .attrTween('transform', tween)
            .attr('r', Math.random())
        .on('end', createParticles)
    }
    createParticles();
});
