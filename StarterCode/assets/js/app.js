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
        .attr("transform", `translate(${chartWidth * 0.4}, ${chartHeight + chartMargin.top + 60})`)
        .attr("id", "income")
        .attr("class", "axis_label x_axis_label text")
        .text("Household Income (Median)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartMargin.left - 180}, ${chartHeight * 0.55}) rotate(270)`)
        .attr("id", "obesity")
        .attr("class", "axis_label y_axis_label text")
        .text("Obese (%)");

    chartGroup.append("text")
        .attr("transform", `translate(${chartMargin.left - 160}, ${chartHeight * 0.56}) rotate(270)`)
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

function boldUnboldAxisLabel() {
    Object.entries(axis_values).forEach(([key, value]) => {
        d3.select(`#${value}`).classed("axis_label_selected", true);
    })
}
    function axisClickHandler() {
        var selected_id = d3.select(this).attr("id");
        console.log("selected_id=", selected_id);
        if (d3.select(this).classed("x_axis_label"))
            axis_values.x = selected_id;
        else if (d3.select(this).classed("y_axis_label"))
            axis_values.y = selected_id;
    
        console.log("axis_values=", axis_values);
        d3.select("svg").remove();
        refreshChart();
    }

    function refreshChart (journalismdata){
        createSVG();
        createAxisLabels();
        d3.csv("assets/data/data.csv").then(journalismdata => {

            boldUnboldAxisLabel();

            console.log(journalismdata);


        })

    }    
   
    
    
    
    
    
