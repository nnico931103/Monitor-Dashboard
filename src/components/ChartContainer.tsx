import React from "react";
import ChartComponent from "./ChartComponent";
import styled from "styled-components";
import { DeviceData } from "../contexts/DeviceContext";

interface ChartContainerProps {
  deviceData: DeviceData[];
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  gap: 20px;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const ChartWrapper = styled.div`
  min-width: 300px;
  margin: 10px;
  flex: 1 1 calc(50% - 40px);
`;

const ChartContainer: React.FC<ChartContainerProps> = ({ deviceData }) => {
  return (
    <div>
      <Container>
        <ChartWrapper>
          <ChartComponent
            data={deviceData}
            chartType="bar"
            dataKey="runtime"
            label="Runtime (hours)"
          />
        </ChartWrapper>
        <ChartWrapper>
          <ChartComponent
            data={deviceData}
            chartType="line"
            dataKey="temperature"
            label="Temperature (°C)"
            maxValue={70}
          />
        </ChartWrapper>
        <ChartWrapper>
          <ChartComponent
            data={deviceData}
            chartType="bar"
            dataKey="power"
            label="Power Consumption (kWh)"
            maxValue={70}
          />
        </ChartWrapper>
        <ChartWrapper>
          <ChartComponent
            data={deviceData}
            chartType="line"
            dataKey="productionRate"
            label="Production Rate (%)"
          />
        </ChartWrapper>
        <ChartWrapper>
          <ChartComponent
            data={deviceData}
            chartType="bar"
            dataKey="errorRate"
            label="Error Rate (%)"
            maxValue={5}
          />
        </ChartWrapper>
      </Container>
    </div>
  );
};

export default ChartContainer;
