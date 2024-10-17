import React, { useState, Suspense, lazy, useEffect, useContext } from "react";
import styled from "styled-components";
import { WebSocketContext } from "../contexts/DeviceContext";
import { FaBell } from "react-icons/fa";
import AlertListComponent from "../components/AlertListComponent";
import { useAlertContext } from "../contexts/AlertContext";
// import LoadingScreen from "../components/LoadingScreen";
const ChartContainer = lazy(() => import("../components/ChartContainer"));
const TableComponent = lazy(() => import("../components/TableComponent"));

const DashboardWrapper = styled.div`
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 40px;
`;

const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  background-color: ${({ $active }) => ($active ? "#333" : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#333")};
  border: 2px solid #333;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 10px;
  font-size: 1rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#444" : "#eee")};
  }
`;

const AlertButton = styled.button`
  background-color: #fff;
  border: none;
  cursor: pointer;
  margin-left: 20px;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;
const NotificationButton = styled.button`
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 0.8rem;
  font-weight: bold;
`;

const Dashboard: React.FC = () => {
  const webSocketContext = useContext(WebSocketContext);
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");
  const [loading, setLoading] = useState(true);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const { getAlerts, alertList } = useAlertContext();

  useEffect(() => {
    const preloadTableComponent = () => {
      import("../components/TableComponent");
    };

    preloadTableComponent();
  }, []);

  useEffect(() => {
    if (webSocketContext && webSocketContext.devicesData.length > 0) {
      setLoading(false);
    }
  }, [webSocketContext]);

  if (!webSocketContext) {
    return <div>WebSocket connection is not available.</div>;
  }

  const { devicesData } = webSocketContext;

  if (loading) {
    return <div>數據加載中...</div>;
  }

  const handleSidebarToggle = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <DashboardWrapper>
      <TabsWrapper>
        <TabButton
          $active={activeTab === "chart"}
          onClick={() => setActiveTab("chart")}
        >
          Chart View
        </TabButton>
        <TabButton
          $active={activeTab === "table"}
          onClick={() => setActiveTab("table")}
        >
          Table View
        </TabButton>
        {/* 警報圖標按鈕 */}

        <NotificationButton title="查看所有通知" onClick={handleSidebarToggle}>
          <FaBell color="#333" />
          {alertList.length > 0 && (
            <NotificationBadge>{alertList.length}</NotificationBadge>
          )}
        </NotificationButton>
      </TabsWrapper>

      {/* 懶加載 Suspense */}
      <Suspense fallback={<div>載入中...</div>}>
        {activeTab === "chart" ? (
          <ChartContainer deviceData={devicesData} />
        ) : (
          <TableComponent deviceData={devicesData} />
        )}
      </Suspense>

      {/* 側邊欄 */}
      <AlertListComponent
        isVisible={isSidebarVisible}
        handleSidebarToggle={handleSidebarToggle}
      />
    </DashboardWrapper>
  );
};

export default Dashboard;
