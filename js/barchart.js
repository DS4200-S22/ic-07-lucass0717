/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// This appends a new svg canvas to the first div
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// This saves the max score value in the data
let maxY1 = d3.max(data1, function(d) { return d.score; });

// This creates a scale with domain [0, max score] and range [bottom, top]
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// This creates a scale with domain # of data entries, and range left to right
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// This creates a group element and translates it to the leftmost margin
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// This creates a group element and translates it to the bottom margin
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// This selects a div with id "hard-coded-bar"
// apends a new div with id "tooltip1" with opacity 0
// and sets the class of the inner div to "tooltip"
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// This updates tooltip1 to house this given item's name and score
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// This allows the tooltip to follow the cursor
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// When the cursor leaves an element, the tooltip disappears
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// this selects all elements with a class bar
// enters data from the Json data1
// appends a rectangle with class bar
// with position mapped using the scale functions
// with height determined by score data
// with width determined by the x scale
// with the event handlers previously described.
svg1.selectAll(".bar") 
  .data(data1) 
  .enter()  
  .append("rect") 
    .attr("class", "bar") 
    .attr("x", (d,i) => xScale1(i)) 
    .attr("y", (d) => yScale1(d.score)) 
    .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
    .attr("width", xScale1.bandwidth()) 
    .on("mouseover", mouseover1) 
    .on("mousemove", mousemove1)
    .on("mouseleave", mouseleave1);


// Create a new SVG canvas
const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


// read the csv data and visualize it
d3.csv("/data/barchart.csv").then((data) => {
  data2 = data;
  console.log("data2: ");
  console.log(data2);

    // This saves the max score value in the data
  let maxY2= d3.max(data2, function(d) { return d.score; });

  // This creates a scale with domain [0, max score] and range [bottom, top]
  let yScale2 = d3.scaleLinear()
              .domain([0,maxY2])
              .range([height-margin.bottom,margin.top]); 

  // This creates a scale with domain # of data entries, and range left to right
  let xScale2 = d3.scaleBand()
              .domain(d3.range(data2.length))
              .range([margin.left, width - margin.right])
              .padding(0.1);
              
  // This creates a group element and translates it to the leftmost margin
  svg2.append("g")
    .attr("transform", `translate(${margin.left}, 0)`) 
    .call(d3.axisLeft(yScale2)) 
    .attr("font-size", '20px'); 

  // This creates a group element and translates it to the bottom margin
  svg2.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale2) 
              .tickFormat(i => data2[i].name))  
      .attr("font-size", '20px'); 


  // This selects a div with id "csv-bar"
  // apends a new div with id "tooltip1" with opacity 0
  // and sets the class of the inner div to "tooltip"
  const tooltip2 = d3.select("#csv-bar") 
                  .append("div") 
                  .attr('id', "tooltip2") 
                  .style("opacity", 0) 
                  .attr("class", "tooltip"); 

  // This updates tooltip1 to house this given item's name and score
  const mouseover2 = function(event, d) {
    tooltip2.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
            .style("opacity", 1);  
  }

  // This allows the tooltip to follow the cursor
  const mousemove2 = function(event, d) {
    tooltip2.style("left", (event.x)+"px") 
            .style("top", (event.y + yTooltipOffset) +"px"); 
  }

  // When the cursor leaves an element, the tooltip disappears
  const mouseleave2 = function(event, d) { 
    tooltip2.style("opacity", 0); 
  }

  // this selects all elements with a class bar
  // enters data from the Json data1
  // appends a rectangle with class bar
  // with position mapped using the scale functions
  // with height determined by score data
  // with width determined by the x scale
  // with the event handlers previously described.
  svg2.selectAll(".bar") 
    .data(data2) 
    .enter()  
    .append("rect") 
      .attr("class", "bar") 
      .attr("x", (d,i) => xScale2(i)) 
      .attr("y", (d) => yScale2(d.score)) 
      .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
      .attr("width", xScale2.bandwidth()) 
      .on("mouseover", mouseover2) 
      .on("mousemove", mousemove2)
      .on("mouseleave", mouseleave2);
});

// Create a new SVG canvas
const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

d3.csv("/data/scatter.csv").then((data) => {
  data3 = data;
  console.log("data3:");
  console.log(data3);

  // This saves the max score value in the data
  let maxY3= d3.max(data3, function(d) { return d.score; });
  console.log("Max Data3: " + maxY3);

  // This creates a scale with domain [0, max score] and range [bottom, top]
  let yScale3 = d3.scaleLinear()
              .domain([0,maxY3])
              .range([height-margin.bottom,margin.top]); 

  // This creates a scale with domain # of data entries, and range left to right
  let xScale3 = d3.scaleBand()
              .domain(d3.range(data3.length))
              .range([margin.left, width - margin.right])
              .padding(0.1);

  // This creates a group element and translates it to the leftmost margin
  svg3.append("g")
    .attr("transform", `translate(${margin.left}, 0)`) 
    .call(d3.axisLeft(yScale3)) 
    .attr("font-size", '20px'); 

  // This creates a group element and translates it to the bottom margin
  svg3.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
      .call(d3.axisBottom(xScale3) 
              .tickFormat(i => data2[i].name))  
      .attr("font-size", '20px'); 

  // This selects a div with id "csv-bar"
  // apends a new div with id "tooltip1" with opacity 0
  // and sets the class of the inner div to "tooltip"
  const tooltip3 = d3.select("#csv-scatter") 
                  .append("div") 
                  .attr('id', "tooltip3") 
                  .style("opacity", 0) 
                  .attr("class", "tooltip"); 

  // This updates tooltip1 to house this given item's name and score
  const mouseover3 = function(event, d) {
    tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
            .style("opacity", 1);  
  }

  // This allows the tooltip to follow the cursor
  const mousemove3 = function(event, d) {
    tooltip3.style("left", (event.x)+"px") 
            .style("top", (event.y + yTooltipOffset) +"px"); 
  }

  // When the cursor leaves an element, the tooltip disappears
  const mouseleave3 = function(event, d) { 
    tooltip3.style("opacity", 0); 
  }

  // this selects all elements with a class bar
  // enters data from the Json data1
  // appends a rectangle with class bar
  // with position mapped using the scale functions
  // with height determined by score data
  // with width determined by the x scale
  // with the event handlers previously described.
  svg3.selectAll(".circle") 
    .data(data3) 
    .enter()  
    .append("circle") 
      .attr("class", "circle") 
      .attr("cx", (d,i) => xScale3(i)) 
      .attr("cy", (d) => yScale3(d.score)) 
      .attr("r", 20)
      .on("mouseover", mouseover3) 
      .on("mousemove", mousemove3)
      .on("mouseleave", mouseleave3);
});