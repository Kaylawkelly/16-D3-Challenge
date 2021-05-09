// @TODO: YOUR CODE HERE!
var svgWidth, svgHeight;
var chartMargin = {
    top: 20,
    left: 100,
    right: 20,
    bottom: 100
};

var chartWidth, chartHeight;
var xDefault = "poverty",
    yDefault = "obesity";
var axis_values = { x: xDefault, y: yDefault };
var svg, chartGroup;

function makeResponsive() {
    svgWidth = 800;
    svgHeight = 600;
    chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
    refreshChart();
}

function createSVG() {
    svg = d3.select("#scatter").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    chartGroup = svg.append("g")
        .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
}
