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
    // svgWidth = window.innerWidth;
    // svgHeight = window.innerHeight;
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

function refreshChart(journalismData) {
    createSVG();
    createAxisLabels();
    d3.csv("assets/data/data.csv").then(journalismData => {

        boldUnboldAxisLabel();

        console.log(journalismData);

        journalismData.forEach(row => {
            row.id = +row.id;
            row.poverty = +row.poverty;
            row.healthcare = +row.healthcare;
            row.age = +row.age;
            row.income = +row.income;
            row.obesity = +row.obesity;
            row.smokes = +row.smokes;
        })

        var xList = journalismData.map(row => row[axis_values.x]);
        var yList = journalismData.map(row => row[axis_values.y]);
        var xDiff = d3.max(xList) - d3.min(xList);
        var yDiff = d3.max(yList) - d3.min(yList);
        console.log(xList, yList);

        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(xList) - xDiff * 0.1, d3.max(xList) + xDiff * 0.1])
            .range([0, chartWidth]);
        var yLinearScale = d3.scaleLinear()
            .domain([d3.min(yList) - yDiff * 0.1, d3.max(yList) + yDiff * 0.1])
            .range([chartHeight, 0]);
        var xBottomAxis = d3.axisBottom(xLinearScale);
        var yLeftAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(xBottomAxis);
        chartGroup.append("g").
        call(yLeftAxis);


        //
        // Method 1 but can not add tool tip successfully
        //
        // var toolTip = d3.select("body").append("div").attr("class", "tooltip");
        // for (i = 0; i < journalismData.length; i++) {
        //     chartGroup.append("circle")
        //         .attr("cx", xLinearScale(journalismData[i][axis_values.x]))
        //         .attr("cy", yLinearScale(journalismData[i][axis_values.y]))
        //         .attr("r", 12)
        //         .attr("fill", "#009999")
        //         .attr("opacity", 0.7);
        //     chartGroup.append("text")
        //         .attr("x", xLinearScale(journalismData[i][axis_values.x]))
        //         .attr("y", yLinearScale(journalismData[i][axis_values.y]) + 3)
        //         .attr("text-anchor", "middle")
        //         .attr("stroke", "white")
        //         .attr("stroke-width", 1)
        //         .attr("class", "state_label")
        //         .text(journalismData[i].abbr);
        // }


        // Method 2 from solution

        var toolTip = d3.tip().attr("class", "tooltip").offset([80, -60])
            .html(d => `<strong>${(d.abbr)}</strong><br>${axis_values.x}: ${d[axis_values.x]} ${axis_values.y}: ${d[axis_values.y]}`);
        svg.call(toolTip);

        // var theCircles = chartGroup.selectAll("g theCircles").data(journalismData).enter();
        // theCircles.append("circle")
        //     .attr("cx", d => xLinearScale(d[axis_values.x]))
        //     .attr("cy", d => yLinearScale(d[axis_values.y]))
        //     .attr("r", 12)
        //     .attr("fill", "#009999")
        //     .attr("opacity", 0.7)
        //     .on("mouseover", function(d) {
        //         toolTip.show(d, this);
        //     })
        //     .on("mouseout", function(d) {
        //         toolTip.hide(d);
        //     });

        // theCircles.append("text")
        //     .text(d => d.abbr)
        //     .attr("x", d => xLinearScale(d[axis_values.x]))
        //     .attr("y", d => yLinearScale(d[axis_values.y]) + 3)
        //     .attr("text-anchor", "middle")
        //     .attr("stroke", "white")
        //     .attr("stroke-width", 1)
        //     .attr("class", "state_label")
        //     .on("mouseover", function(d) {
        //         toolTip.show(d, this);
        //     })
        //     .on("mouseout", function(d) {
        //         toolTip.hide(d);
        //     });

        // Method 3 after looking at Tara's solution
        chartGroup.selectAll("circle").data(journalismData).enter().append("circle")
            .attr("cx", d => xLinearScale(d[axis_values.x]))
            .attr("cy", d => yLinearScale(d[axis_values.y]))
            .attr("r", 12)
            .attr("fill", "#009999")
            .attr("opacity", 0.7)
            .on("mouseover", function(d) {
                toolTip.show(d, this);
            })
            .on("mouseout", function(d) {
                toolTip.hide(d);
            });

            chartGroup.append("g").selectAll("text").data(journalismData).enter().append("text")
            .text(d => d.abbr)
            .attr("x", d => xLinearScale(d[axis_values.x]))
            .attr("y", d => yLinearScale(d[axis_values.y]) + 3)
            .attr("text-anchor", "middle")
            .attr("stroke", "white")
            .attr("stroke-width", 1)
            .attr("class", "state_label")
            .on("mouseover", function(d) {
                toolTip.show(d, this);
            })
            .on("mouseout", function(d) {
                toolTip.hide(d);
            });


    }).catch(error => console.log(error));
}

// When the browser loads, makeResponsive() is called.
makeResponsive();

d3.select(window).on("resize", makeResponsive);

