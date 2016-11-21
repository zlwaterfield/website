import React from 'react';

import tags from '../../data/words';

var w = window.innerWidth - 500,
    h = window.innerHeight - 50,
    fontSize= null;

export default class Interests extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fill: d3.scale.category20b(),
      layout: this.genLayout()
    }
  }

  componentDidMount () {
    this.update()

    window.onresize = (event) => {
      this.update();
    };
  }

  genLayout () {
    return d3.layout.cloud()
      .timeInterval(Infinity)
      .size([w, h])
      .fontSize((d) => {
          return fontSize(+d.value);
      })
      .text((d) => {
          return d.key;
      })
      .on("end", this.draw.bind(this));
  }

  draw (data, bounds) {
    var w = window.innerWidth - 500,
        h = window.innerHeight - 50;

    var svg = d3.select("#vis").append("svg")
        .attr("width", w)
        .attr("height", h);

    var vis = svg.append("g").attr("transform", "translate(" + [w >> 1, h >> 1] + ")");

    svg.attr("width", w).attr("height", h);

    var scale = bounds ? Math.min(
            w / Math.abs(bounds[1].x - w / 2),
            w / Math.abs(bounds[0].x - w / 2),
            h / Math.abs(bounds[1].y - h / 2),
            h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

    var text = vis.selectAll("text")
            .data(data, (d) => {
                return d.text.toLowerCase();
            });
    text.transition()
            .duration(1000)
            .attr("transform", (d) => {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", (d) => {
                return d.size + "px";
            });
    text.enter().append("text")
            .attr("text-anchor", "middle")
            .attr("transform", (d) => {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", (d) => {
                return d.size + "px";
            })
            .style("opacity", 1e-6)
            .transition()
            .duration(1000)
            .style("opacity", 1);
    text.style("font-family", (d) => {
        return d.font;
    })
    .style("fill", (d) => {
        return this.state.fill(d.text.toLowerCase());
    })
    .text((d) => {
        return d.text;
    });

    vis.transition().attr("transform", "translate(" + [w >> 1, h >> 1] + ")scale(" + scale + ")");
  }

  update() {
    this.state.layout.font('impact').spiral('archimedean');
    fontSize = d3.scale['sqrt']().range([10, 100])
    if (tags.length){
      fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
    }
    this.state.layout.stop().words(tags).start();
  }

  render() {
    return (
      <div className="interests-container">
        <div id="vis"></div>
        <div className="disclaimer">~ Words being added as inspiration is discovered ~</div>
      </div>
    );
  }
}
