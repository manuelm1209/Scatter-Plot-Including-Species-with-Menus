export const scatterPlot = () => {
    let width;
    let height;
    let data;
    let xValue;
    let yValue;
    let xType;
    let yType;
    let margin;

    const my = (selection) => {
        // X scale
        const x = xType === 'categorical'
        ? d3.scalePoint().domain(data.map(xValue)).range([margin.left, width - margin.right])
        : d3.scaleLinear() 
        // Use next line to start the axis from the minimum value.
        .domain(d3.extent(data, xValue))
        // // Use next line to start the axis from 0.
        // .domain([0, d3.max(data, xValue)])
        .range([margin.left, width - margin.right]);

        // Y scale        
        const y = (yType === 'categorical'
        ? d3.scalePoint().domain(data.map(yValue)).padding(0.5)
        : d3.scaleLinear().domain(d3.extent(data, yValue)))
        .range([height - margin.bottom, margin.top]);

        const marks = data.map(d => ({
            x: x(xValue(d)),
            y: y(yValue(d)),
        }));

        // Transition instance
        const t = d3.transition()
        .duration(1500)
        // .ease(d3.easeLinear);

        selection
            .selectAll('circle')
            .data(marks)
            .join(
                enter => enter.append('circle')
                    .attr('cx', d => d.x)
                    .attr('cy', d => d.y)
                    .attr('r', 0)
                    .call(enter => enter.transition(t).attr('r', 5)),
                update => update
                    .call(enter => enter.transition(t).delay((d, i) => i * 10).attr('cx', d => d.x).attr('cy', d => d.y)),   
                    
                exit => exit.remove()

            )

        // Left axis
        selection
            .selectAll('g.y-axis')
            .data([null])
            .join('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${margin.left},0)`)
            .transition(t)
            .call(d3.axisLeft(y));

        // Bottom axis
        selection
            .selectAll('g.x-axis')
            .data([null])
            .join('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${height - margin.bottom})`)
            .transition(t)
            .call(d3.axisBottom(x));
    };

    my.width = function (_) {
        return arguments.length
        ? ((width = +_), my)
        : width;
    }

    my.height = function (_) {
        return arguments.length
        ? ((height = +_), my)
        : height;
    }

    my.data = function (_) {
        return arguments.length
        ? ((data = _), my)
        : data;
    }

    my.xValue = function (_) {
        return arguments.length
        ? ((xValue = _), my)
        : xValue;
    }

    my.yValue = function (_) {
        return arguments.length
        ? ((yValue = _), my)
        : yValue;
    }
    
    my.xType = function (_) {
        return arguments.length
        ? ((xType = _), my)
        : xType;
    }

    my.yType = function (_) {
        return arguments.length
        ? ((yType = _), my)
        : yType;
    }

    my.margin = function (_) {
        return arguments.length
        ? ((margin = _), my)
        : margin;
    }

    return my;
};