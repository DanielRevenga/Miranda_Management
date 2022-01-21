import React, { useState, useEffect, useRef } from "react";
import * as d3 from 'd3';

export default function ReservationStatsGraph() {
  const [checkIn, setCheckIn] = useState([58, 35, 22, 45, 33, 38, 48]);
  const [checkOut, setCheckOut] = useState([24, 14, 28, 32, 25, 13, 20]);
  const [days, setDays] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  const ref = useRef();

  //Get day
  let date = new Date();
  let weekday = date.toLocaleString("en-EN", { weekday: "long" });

   function orderWeeks() {
      while (days[0] != weekday) {
         let movedDay = days.shift();
         setDays(days.push(movedDay));
      }
   }

   useEffect(() => {
      // orderWeeks();
      let width = "100%";
      let height = 420;
      let axisHeight = height - 30;
      let a = height - 10;
      let svg = d3
         .select(ref.current)
         .style("overflow", "auto")
         .style("width", "100%")
         .append("svg")
         .attr("width", width)
         .attr("height", height);

      //X and Y axis
      const xScale = d3
         .scaleBand()
         .domain(days)
         .range([26, 590]);
         
      svg
         .append("g")
         .call(d3.axisBottom(xScale))
         .style("font-size", "0.85em")
         .style("margin-top", "20px")
         .attr("transform", `translate (${0},${axisHeight})`);

      const maxYAxis = d3.max([...checkIn, ...checkOut]) + 12.72;
      const yScale = d3
         .scaleLinear()
         .domain([0, maxYAxis])
         .range([axisHeight, 10]);

      svg
         .append("g")
         .call(d3.axisLeft(yScale))
         .attr("transform", "translate (26,1)");

      const yRange = (axisHeight - 10) / maxYAxis;
      svg
         .append("g")
         .attr("class", "grid")
         .call(d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat(""))
         .attr("transform", "translate (26,1)")
         .attr("color", "#686868");

      var chartInfo = d3
         .select(ref.current)
         .append("div")
         .style("position", "relative")
         .style("visibility", "hidden")
         .style("background-color", "#292828")
         .style("color", "#EBEBEB")
         .style("width", "40px")
         .style("height", "30px")
         .style("text-align", "center")
         .style("border-radius", "5px")
         .style("border", "solid 1px #686868")
         .style('font-size', '14px')
         .style("padding", "5px 10px");

      var mouseover = function (d) {
         chartInfo.style("visibility", "visible");
         d3.select(this).style("stroke", "#686868");
      };

      var mouseleave = function (d) {
         chartInfo.style("visibility", "hidden");
         d3.select(this).style("stroke", "none");
      };

      svg
         .selectAll()
         .data(checkIn)
         .enter()
         .append("rect")
         // .attr("x", (d, i) => i * xScale.bandwidth() + xScale.bandwidth() / 2 + 8)
         .attr("x", (d, i) => i * 80 + xScale.bandwidth() / 2 + 8)
         .attr("y", (d) => axisHeight - d * yRange)
         .attr("width", 15)
         .attr("height", (d) => d * yRange)
         .attr("fill", "#135846")
         .on("mouseover", mouseover)
         .on("mousemove", (event, i) => {
         chartInfo.html("" + i)
            .style("visibility", "visible")
            .style("left", d3.pointer(event)[0] + "px")
            .style("top", d3.pointer(event)[1] - 460 + "px");
         })
         .on("mouseleave", mouseleave);

      svg
         .selectAll()
         .data(checkOut)
         .enter()
         .append("rect")
         // .attr("x", (d, i) => i * xScale.bandwidth() + xScale.bandwidth() / 2 + 29)
         .attr("x", (d, i) => i * 80 + xScale.bandwidth() / 2 + 29)
         .attr("y", (d) => axisHeight - d * yRange)
         .attr("width", 15)
         .attr("height", (d) => d * yRange)
         .attr("fill", "#E23428")
         .on("mouseover", mouseover)
         .on("mousemove", (event, i) => {
         chartInfo.html("" + i)
            .style("visibility", "visible")
            .style("display", "inline-block")
            .style("left", d3.pointer(event)[0] + "px")
            .style("top", d3.pointer(event)[1] - 460 + "px");
         })
         .on("mouseleave", mouseleave);
   }, [checkIn]);

  return <div ref={ref}></div>;
}