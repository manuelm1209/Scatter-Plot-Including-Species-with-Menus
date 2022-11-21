import { scatterPlot } from './scatterPlot.js';
import { menu } from './menu.js';

const csvUrl = "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

// Adding a "+" before a string, will convert it into a number.
const parseRow = (d) => {
    d.sepal_length = +d.sepal_length;
    d.sepal_width = +d.sepal_width;
    d.petal_length = +d.petal_length;
    d.petal_width = +d.petal_width;
    return d;
}

const width = window.innerWidth;
const height = window.innerHeight;    

const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

const menuContainer = d3.select('body')
    .append('div')
    .attr('class', 'menu-container');
    
const xMenu = menuContainer.append('div');
const yMenu = menuContainer.append('div');
    
    // // The second argument is a funtion that takes as input a single row and replace it.  
// // First way to import data.
// d3.csv(csvUrl, parseRow).then(data => {
//     console.log(data);
// });

// This is a better way to import data.
const main = async () => {
    const data = await d3.csv(csvUrl, parseRow);
    const plot = scatterPlot()
    .width(width)
    .height(height)
    .data(data)
    // Columns for the range.
    .xValue((d) => d.petal_width)
    .yValue((d) => d.petal_width)
    // d3 margin convention.
    .margin({top: 20, right: 20, bottom: 40, left:50})
    svg.call(plot);

    const options = [
        { value: 'petal_width', text: 'Petal Width' },
        { value: 'sepal_width', text: 'Sepal Width' },
        { value: 'petal_length', text: 'Petal Lenght' },
        { value: 'sepal_length', text: 'Sepal Length' }
    ];


    // Menus
    xMenu.call(menu().id('x-menu').labelText('X:').options(options).on('change', column => {
        svg.call(plot.xValue(d => d[column]));
    } ));
    yMenu.call(menu().id('y-menu').labelText('Y:').options(options).on('change', column => {
        svg.call(plot.yValue(d => d[column]));
    } ));

};
main();
