import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import styled from "styled-components";

interface ChartComponentProps {
  data: any[];
  chartType: "bar" | "line" | "area" | "scatter" | "radar";
  dataKey: string;
  label: string;
  width?: number;
  height?: number;
  maxValue?: number;
}

const ChartWrapper = styled.div`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
  text-align: center;
  overflow: hidden;
  max-width: 100%;
`;

const ChartTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
`;

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  chartType,
  dataKey,
  label,
  width = 700,
  height = 350,
  maxValue = Infinity,
}) => {
  const chartRef = useRef<SVGSVGElement | null>(null);
  const [containerSize, setContainerSize] = useState({
    width,
    height,
  });

  const handleResize = () => {
    if (chartRef.current?.parentElement) {
      setContainerSize({
        width: chartRef.current.parentElement.offsetWidth,
        height: height,
      });
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const svg = d3.select<SVGSVGElement, unknown>(chartRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 50, left: 60 };
    const chartWidth = containerSize.width - margin.left - margin.right;
    const chartHeight = containerSize.height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const colorScale = d3
      .scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(data, (d) => d[dataKey]) || 0]);

    const average = d3.mean(data, (d) => d[dataKey]);

    if (chartType === "bar") {
      const x = d3
        .scaleBand()
        .range([0, chartWidth])
        .domain(data.map((d) => d.name))
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(data, (d) => d[dataKey]) || 0])
        .nice();

      g.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", chartWidth < 600 ? "11px" : "12px");

      g.append("g").call(d3.axisLeft(y));

      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => x(d.name)!)
        .attr("y", (d) => y(d[dataKey]))
        .attr("width", x.bandwidth())
        .attr("height", (d) => chartHeight - y(d[dataKey]))
        .attr("fill", (d) =>
          d[dataKey] > maxValue ? "red" : colorScale(d[dataKey])
        )
        .attr("opacity", 0.9);

      g.selectAll(".text")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d) => x(d.name)! + x.bandwidth() / 2)
        .attr("y", (d) => y(d[dataKey]) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", chartWidth < 600 ? "11px" : "12px")
        .text((d) => d[dataKey]);

      if (average !== undefined) {
        g.append("line")
          .attr("x1", 0)
          .attr("x2", chartWidth)
          .attr("y1", y(average))
          .attr("y2", y(average))
          .attr("stroke", "green")
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", "5,5");
      }
    }

    if (chartType === "line") {
      const x = d3
        .scalePoint()
        .range([0, chartWidth])
        .domain(data.map((d) => d.name));

      const y = d3
        .scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(data, (d) => d[dataKey]) || 0])
        .nice();

      g.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", chartWidth < 600 ? "11px" : "12px");

      g.append("g").call(d3.axisLeft(y));

      const line = d3
        .line()
        .x((d) => x((d as any).name)!)
        .y((d) => y((d as any)[dataKey]))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#8884d8")
        .attr("stroke-width", 2)
        .attr("d", line)
        .attr("opacity", 0.7);

      g.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => x(d.name)!)
        .attr("cy", (d) => y(d[dataKey]))
        .attr("r", 5)
        .attr("fill", (d) => (d[dataKey] > maxValue ? "red" : "#8884d8"));

      if (average !== undefined) {
        g.append("line")
          .attr("x1", 0)
          .attr("x2", chartWidth)
          .attr("y1", y(average))
          .attr("y2", y(average))
          .attr("stroke", "green")
          .attr("stroke-width", 2)
          .attr("stroke-dasharray", "5,5");
      }
    }
  }, [data, chartType, dataKey, label, containerSize, maxValue]);

  return (
    <ChartWrapper>
      <ChartTitle>{label}</ChartTitle>
      <svg
        ref={chartRef}
        width="100%"
        height={containerSize.height}
        viewBox={`0 0 ${containerSize.width} ${containerSize.height}`}
      />
    </ChartWrapper>
  );
};

export default ChartComponent;
