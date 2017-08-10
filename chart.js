let bodySelection = d3.select('body');

//---------------------------------------------------------------------------------------------------//

let svgSelection = bodySelection.append('svg').attr('width', 250).attr('height', 50);

let circleSelection = svgSelection
    .append('circle')
    .attr('cx', 25)
    .attr('cy', 25)
    .attr('r', 25)
    .style('fill', 'purple');

let svgSelection2 = bodySelection.append('svg').attr('width', 250).attr('height', 50);

let circleSelection2 = svgSelection2
    .append('circle')
    .attr('cx', 25)
    .attr('cy', 25)
    .attr('r', 25)
    .style('fill', 'green');

//---------------------------------------------------------------------------------------------------//
// text element
let theData = [
    { "x": 20, "y": 20 },
    { "x": 30, "y": 30 },
    { "x": 40, "y": 40 },
];
let svgTextArea = bodySelection.append('svg').attr('width', 250).attr('height', 50);
let text = svgTextArea.selectAll('text').data(theData).enter().append('text');
let textLabels = text
        .attr("x", data => data.x)
        .attr("y", data => data.y)
        .text(data => "(" + data.x + ", " + data.y + ")")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "red");

//---------------------------------------------------------------------------------------------------//

let circleRadii = [40, 20, 10];
let svgContainer = bodySelection.append('svg').attr('width', 250).attr('height', 200);
let circles = svgContainer.selectAll('circle').data(circleRadii).enter().append('circle');
let circlesAttributes = circles
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', radius => radius)
    .style('fill', function(radius) {
        return (radius === 40) ? "green"
            : (radius === 20) ? "purple"
                : (radius === 10) ? "red"
                    : "pink";
    });

//---------------------------------------------------------------------------------------------------//

let spaceCircles = [30, 70, 110];
let svgContainer2 = bodySelection.append("svg")
                    .attr("width", 250)
                    .attr("height", 200)
                    .style("border", "1px solid black");
let circles2 = svgContainer2.selectAll("circle")
                .data(spaceCircles)
                .enter()
                .append("circle")
let circleAttributes2 = circles2
                .attr("cx", (xPos) => xPos)
                .attr("cy", (yPos) => yPos)
                .attr("r", 20)
                .style('fill', function(position) {
                    return (position === 30) ? "green"
                        : (position === 70) ? "purple"
                            : (position === 110) ? "red"
                                : "pink";
                });

//---------------------------------------------------------------------------------------------------//

let jsonCircles = [
    {
        "x_axis": 30,
        "y_axis": 30,
        "radius": 20,
        "color" : "green"
    }, {
        "x_axis": 70,
        "y_axis": 70,
        "radius": 20,
        "color" : "purple"
    }, {
        "x_axis": 110,
        "y_axis": 100,
        "radius": 20,
        "color" : "red"
    }
];

let svgContainer3 = bodySelection.append("svg").attr("width", 250).attr("height", 200);

let circles3 = svgContainer3.selectAll("circle")
            .data(jsonCircles)
            .enter()
            .append("circle");

// no more multi-ternary
let circleAttributes3 = circles3
            .attr("cx", (data) => data.x_axis)
            .attr("cy", (data) => data.y_axis)
            .attr("r", (data) => data.radius)
            .style("fill", (data) => data.color);

//---------------------------------------------------------------------------------------------------//
// line chart
let lineData = [ { "x": 1,   "y": 5},  { "x": 20,  "y": 20},
                 { "x": 40,  "y": 10}, { "x": 60,  "y": 40},
                 { "x": 80,  "y": 5},  { "x": 100, "y": 60},
                 { "x": 120,  "y": 8},  { "x": 140, "y": 65}];

let lineFunction = d3.line()
            .x((data) => data.x)
            .y((data) => data.y)
            .curve(d3.curveBasis); //default = d3.curveLinear

let svgContainer4 = bodySelection.append("svg").attr("width", 250).attr("height", 200);

let lineGraph = svgContainer4.append("path")
            .attr("d", lineFunction(lineData))
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("fill", "red");

//---------------------------------------------------------------------------------------------------//
// dynamic svg viewing area
let jsonRectangles = [
    { "x": 10, "y": 10, "h": 20, "w":20, "color" : "green" },
    { "x": 160, "y": 40, "h": 20, "w":20, "color" : "purple" },
    { "x": 70, "y": 70, "h": 20, "w":20, "color" : "red" }
];

let maxX = 0;
let maxY = 0;
jsonRectangles.forEach((item) => {
    if ((item.x + item.w) > maxX) {
        maxX = (item.x + item.w);
    }
    if ((item.y + item.h) > maxY) {
        maxY = (item.y + item.h);
    }
});

let svgContainer5 = bodySelection.append("svg").attr("width", maxX).attr("height", maxY); // width:180  height:90

let rectangles = svgContainer5.selectAll("rect").data(jsonRectangles).enter().append("rect");

let rectangleAttributes = rectangles
            .attr("x", (data) => data.x)
            .attr("y", (data) => data.y)
            .attr("height", (data) => data.h)
            .attr("width", (data) => data.w)
            .style("fill", (data) => data.color)

//---------------------------------------------------------------------------------------------------//
// scaling data - dynamic min max
let initialScaleData = [0, 1000, 3000, 2000, 5000, 4000, 7000, 6000, 9000, 8000, 10000];
let linearScale = d3.scaleLinear()
           .domain(d3.extent(initialScaleData))
           .range([0,100]);

let newScaleData = initialScaleData.map(data => linearScale(data));
console.log('scaled data: ' + newScaleData);

//---------------------------------------------------------------------------------------------------//
// svg group <g> transform
let circleData = [
  { "x": 20, "y": 20, "r": 20, "color" : "green" },
  { "x": 70, "y": 70, "r": 20, "color" : "purple" }
];
let rectangleData = [
  { "x": 110, "y": 110, "h": 30, "w": 30, "color" : "blue" },
  { "x": 160, "y": 160, "h": 30, "w": 30, "color" : "red" }
];
let svgContainer6 = bodySelection.append("svg").attr("width", 250).attr("height", 200);
let svgCircleGroup = svgContainer6.append("g").attr("transform", "translate(80,0)"); // transform here
let circles4 = svgCircleGroup.selectAll("circle").data(circleData).enter().append("circle");
let circlesAttributes4 = circles4
            .attr("cx", (data) => data.x)
            .attr("cy", (data) => data.y)
            .attr("r", (data) => data.r)
            .style("fill", (data) => data.color);
let svgRectangleGroup = svgContainer6.append("g");
let rectangles2 = svgRectangleGroup.selectAll("rect").data(rectangleData).enter().append("rect");
let rectangleAttributes2 = rectangles2
            .attr("x", (data) => data.x)
            .attr("y", (data) => data.y)
            .attr("height", (data) => data.h)
            .attr("width", (data) => data.w)
            .style("fill", (data) => data.color);

//---------------------------------------------------------------------------------------------------//
// add text labels to circles in previous example
let text2 = svgCircleGroup.selectAll('text').data(circleData).enter().append('text');
let circleLabels = text2
        .attr("x", data => data.x)
        .attr("y", data => data.y)
        .text(data => "(" + data.x + ", " + data.y + ")")
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "red");


//---------------------------------------------------------------------------------------------------//
// Axes
// let svgContainer7 = bodySelection.append("svg").attr("width", 400).attr("height", 200);
// let axisScale = d3.scaleLinear().domain([0, 100]).range([0, 400]);
// let xAxis = d3.axisBottom().scale(axisScale);
// let xAxisGroup = svgContainer7.append("g").call(xAxis);

//---------------------------------------------------------------------------------------------------//
// make a chart
let data = [
    { date: '2014-01-01', amount: 10 },
    { date: '2014-02-01', amount: 20 },
    { date: '2014-03-01', amount: 40 },
    { date: '2014-04-01', amount: 80 }
];
let dataz = [
    { date: '2014-01-01', amount: 80 },
    { date: '2014-02-01', amount: 40 },
    { date: '2014-03-01', amount: 20 },
    { date: '2014-04-01', amount: 10 }
];

let y = d3.scaleLinear().domain(d3.extent(data, x => x.amount)).range([200, 0]);
let x = d3.scaleTime().domain([ new Date(Date.parse('2014-01-01')), new Date(Date.parse('2014-04-01')) ]).range([0, 300]);

let xAxis = d3.axisBottom(x).ticks(4);
let yAxis = d3.axisLeft(y).ticks(4);

let svgChartContainer = bodySelection.append("svg").attr("width", 400).attr("height", 250);
let chart = svgChartContainer.append("g").attr("class", "chart").attr("transform", "translate(20, 20)");
chart.append("g").attr("class", "x-axis").attr("transform", "translate(0, 200)").call(xAxis);
chart.append("g").attr("class", "y-axis").call(yAxis);

let lineFunction2 = d3.line()
            .x((data) => x(new Date(Date.parse(data.date))))
            .y((data) => y(data.amount))
            .curve(d3.curveBasis); //default = d3.curveLinear

let lineGraph2 = chart.append("path")
            .attr("d", lineFunction2(data))
            .attr("stroke", "blue")
            .attr("stroke-width", 4)
            .attr("fill", "none");

let lineGraph3 = chart.append("path")
            .attr("d", lineFunction2(dataz))
            .attr("stroke", "green")
            .attr("stroke-width", 4)
            .attr("fill", "none");

//---------------------------------------------------------------------------------------------------//
// bar chart
let barChartData = [40, 60, 80, 100, 70, 120, 100, 60, 70, 150, 120, 140];
let height = 200, width = 720, barWidth = 40, barOffset = 20;

let barChart = bodySelection.append('svg').attr('width', width).attr('height', height)
            .style('background', '#dff0d8')
            .selectAll('rect').data(barChartData).enter().append('rect')
                .attr('fill', '#3c763d')
                .attr('stroke', '#d6e9c6')
                .attr('stroke-width', '5')
                .attr('width', barWidth)
                .attr('height', data => data)
                .attr('x', (data, i) => i * (barWidth + barOffset))
                .attr('y', data => height - data);


//---------------------------------------------------------------------------------------------------//
