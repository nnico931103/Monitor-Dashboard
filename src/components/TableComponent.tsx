import React from "react";
import styled from "styled-components";
import { FixedSizeList as List } from "react-window";
import { DeviceData } from "../contexts/DeviceContext";

interface TableComponentProps {
  deviceData: DeviceData[];
}

const TableContainer = styled.div`
  width: 100%;
  height: 600px;
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-bottom: 20px;
`;

const TableHeader = styled.div`
  display: flex;
  padding: 10px;
  font-weight: bold;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 8px;
  }
`;

const TableRow = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.2s;
  box-sizing: border-box;

  &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #f1f1f1;
  }

  @media (max-width: 768px) {
    font-size: 0.875rem;
    padding: 8px;
  }
`;

const Cell = styled.div`
  flex: 1;
  padding: 0 10px;
  word-break: break-word;
  box-sizing: border-box;

  &:first-child {
    flex: 0.5;
  }

  @media (max-width: 768px) {
    padding: 0 5px;
  }
`;

const TableComponent: React.FC<TableComponentProps> = ({ deviceData }) => {
  // Render each row of the table
  const Row = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    const row = deviceData[index];
    return (
      <TableRow style={{ ...style, display: "flex" }}>
        {" "}
        {/* Ensure rows display correctly */}
        <Cell>{row.id}</Cell>
        <Cell>{row.name}</Cell>
        <Cell>{row.runtime}</Cell>
        <Cell>{row.temperature}</Cell>
        <Cell>{row.power}</Cell>
        <Cell>{row.productionRate}</Cell>
        <Cell>{row.errorRate}</Cell>
      </TableRow>
    );
  };

  return (
    <TableContainer>
      {/* Table Header */}
      <TableHeader>
        <Cell>ID</Cell>
        <Cell>Name</Cell>
        <Cell>Runtime</Cell>
        <Cell>Temperature</Cell>
        <Cell>Power</Cell>
        <Cell>Production Rate</Cell>
        <Cell>Error Rate</Cell>
      </TableHeader>

      {/* Virtual scrolling with react-window */}
      <List
        height={600} // Scrollable height
        itemCount={deviceData.length} // Total number of items
        itemSize={50} // Height of each row
        width="100%" // Width of the table
      >
        {Row}
      </List>
    </TableContainer>
  );
};

export default TableComponent;
