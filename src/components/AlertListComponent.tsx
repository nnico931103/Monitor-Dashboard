import React, { useState } from "react";
import styled from "styled-components";
import { useAlertContext } from "../contexts/AlertContext";
import { FaTrash, FaExclamationCircle, FaCheckCircle } from "react-icons/fa"; // 引入警告和打勾的圖示

const Sidebar = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ $isVisible }) => ($isVisible ? "0" : "-350px")};
  width: 300px;
  height: 100vh;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transition: right 0.3s ease-in-out;
  padding: 20px;
  z-index: 999;
`;

const SidebarTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
`;

const CloseButton = styled.button`
  background-color: #333;
  color: #fff;
  border: none;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: #555;
  }
`;

const AlertList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 80vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;

const AlertItem = styled.li<{ $isResolved: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid ${({ $isResolved }) => ($isResolved ? "green" : "red")};
  border-radius: 8px;
`;

const Checkbox = styled.input`
  margin-left: 10px;
`;

const Icon = styled.div<{ $isResolved: boolean }>`
  margin-right: 10px;
  font-size: 1.5rem;
  color: ${({ $isResolved }) => ($isResolved ? "green" : "red")};
`;

const Message = styled.span`
  flex-grow: 1;
  font-size: 1rem;
  color: #666;
`;

const DeleteIcon = styled(FaTrash)`
  cursor: pointer;
  color: #333;
  margin-left: 10px;

  &:hover {
    color: red;
  }
`;

const AlertListComponent: React.FC<{
  isVisible: boolean;
  handleSidebarToggle: () => void;
}> = ({ isVisible, handleSidebarToggle }) => {
  const { alertList, deleteAlert } = useAlertContext(); // 新增 deleteAlert 方法
  const [resolvedAlerts, setResolvedAlerts] = useState<{
    [key: string]: boolean;
  }>({});

  const handleCheckboxChange = (id: string) => {
    setResolvedAlerts((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  console.log("alertList", alertList);
  return (
    <Sidebar $isVisible={isVisible}>
      <SidebarTitle>
        Event List
        <CloseButton onClick={handleSidebarToggle}>X</CloseButton>
      </SidebarTitle>
      <AlertList>
        {alertList.map((alert) => (
          <AlertItem key={alert.id} $isResolved={resolvedAlerts[alert.id]}>
            <Icon $isResolved={resolvedAlerts[alert.id]}>
              {resolvedAlerts[alert.id] ? (
                <FaCheckCircle />
              ) : (
                <FaExclamationCircle />
              )}
            </Icon>
            <Message>{alert.message}</Message>
            <Checkbox
              type="checkbox"
              checked={resolvedAlerts[alert.id] || false}
              onChange={() => handleCheckboxChange(alert.id)}
            />
            <DeleteIcon onClick={() => deleteAlert(alert.id)} />
          </AlertItem>
        ))}
      </AlertList>
    </Sidebar>
  );
};

export default AlertListComponent;
