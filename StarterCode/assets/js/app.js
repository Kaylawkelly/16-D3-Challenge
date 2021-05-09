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

function createAxisLabels() {
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth * 0.45}, ${chartHeight + chartMargin.top + 20})`)
        .attr("id", "poverty")
        .attr("class", "axis_label x_axis_label text")
        .text("In Poverty (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth * 0.45}, ${chartHeight + chartMargin.top + 40})`)
        .attr("id", "age")
        .attr("class", "axis_label x_axis_label text")
        .text("Age (Median)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth * 0.40}, ${chartHeight + chartMargin.top + 60})`)
        .attr("id", "income")
        .attr("class", "axis_label x_axis_label text")
        .text("Househole Income (Median)");

     chartGroup.append("text")
        .attr("transform", `translate(${chartMargin.left - 180}, ${chartHeight * 0.55}) rotate(270)`)
        .attr("id", "smokes")
        .attr("class", "axis_label y_axis_label text")
        .text("Smokes (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartMargin.left - 140}, ${chartHeight * 0.63}) rotate(270)`)
        .attr("id", "healthcare")
        .attr("class", "axis_label y_axis_label text")
        .text("Lacks Healthcare (%)");
    d3.selectAll(".axis_label").on("click", axisClickHandler);
    }
