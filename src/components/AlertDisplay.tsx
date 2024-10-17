import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { WebSocketContext } from "../contexts/DeviceContext";

const AlertContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
`;

const AlertBox = styled.div<{ type: "success" | "error" | "warning" }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid;
  background-color: ${({ type }) =>
    type === "error" ? "#f8d7da" : type === "success" ? "#d1e7dd" : "#fff3cd"};
  border-color: ${({ type }) =>
    type === "error" ? "#f5c2c7" : type === "success" ? "#badbcc" : "#ffeeba"};
`;

const AlertMessage = styled.div`
  display: flex;
  align-items: center;
`;

const AlertText = styled.span`
  color: red;
  font-size: 13px;
`;

const DismissButton = styled.button`
  background: none;
  border: none;
  color: red;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: darkred;
  }
`;

const AlertDisplay: React.FC = () => {
  const context = useContext(WebSocketContext);
  const [localAlerts, setLocalAlerts] = useState(context?.alerts || []);

  useEffect(() => {
    setLocalAlerts(context?.alerts || []);
  }, [context?.alerts]);

  useEffect(() => {
    if (localAlerts.length > 0) {
      const timer = setTimeout(() => {
        setLocalAlerts([]); // 10 秒后清空所有警报
      }, 10000); // 10秒

      return () => clearTimeout(timer); // 清理定时器，防止内存泄漏
    }
  }, [localAlerts]);
  console.log("localAlerts", localAlerts);
  return (
    <AlertContainer>
      {localAlerts.map((alert, index) => (
        <AlertBox key={index} type={"error"}>
          <AlertMessage>
            <AlertText>{alert.message}</AlertText>
          </AlertMessage>
        </AlertBox>
      ))}
    </AlertContainer>
  );
};

export default AlertDisplay;
