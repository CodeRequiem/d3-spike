var bodySelection = d3.select('body');

var svgSelection = bodySelection.append('svg').attr('width', 50).attr('height', 50);

var circleSelection = svgSelection
    .append('circle')
    .attr('cx', 25)
    .attr('cy', 25)
    .attr('r', 25)
    .style('fill', 'purple');

var svgSelection2 = bodySelection.append('svg').attr('width', 50).attr('height', 50);

var circleSelection2 = svgSelection2
    .append('circle')
    .attr('cx', 25)
    .attr('cy', 25)
    .attr('r', 25)
    .style('fill', 'green');

var theData = [1, 2, 3];

var p = bodySelection.selectAll('p').data(theData).enter().append('p').text(value => value);

var circleRadii = [40, 20, 10];

var svgContainer = bodySelection.append('svg').attr('width', 200).attr('height', 200);

var circles = svgContainer.selectAll('circle').data(circleRadii).enter().append('circle');

var circlesAttributes = circles
    .attr('cx', 50)
    .attr('cy', 50)
    .attr('r', radius => radius)
    .style('fill', function(d) {
        // (radius === 40) ? return "green" : (radius === 20) ? return "purple" : (radius === 10) ? return "red" : return "pink";
        var returnColor;
        if (d === 40) {
            returnColor = 'green';
        } else if (d === 20) {
            returnColor = 'purple';
        } else if (d === 10) {
            returnColor = 'red';
        }
        return returnColor;
    });
