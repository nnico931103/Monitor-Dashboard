import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface Alert {
  id: string;
  message: string;
  status: string;
}

interface AlertContextProps {
  alertList: Alert[];
  getAlerts: () => void;
  updateAlert: (id: string, status: string) => Promise<void>;
  deleteAlert: (id: string) => Promise<void>;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlertContext must be used within an AlertProvider");
  }
  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alertList, setAlertList] = useState<Alert[]>([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  console.log("apiUrl", apiUrl);
  // 獲取警報列表
  const getAlerts = async () => {
    try {
      const response = await axios.get(`${apiUrl}/alarms`);
      setAlertList(response.data);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    }
  };

  // 更新警報狀態
  const updateAlert = async (id: string, status: string) => {
    try {
      await axios.put(`${apiUrl}/alarms/${id}`, { status });
      getAlerts(); // 更新警報列表
    } catch (error) {
      console.error("Failed to update alert:", error);
    }
  };

  // 刪除警報
  const deleteAlert = async (id: string) => {
    try {
      await axios.delete(`${apiUrl}/alarms/${id}`);
      getAlerts(); // 刪除後重新獲取警報列表
    } catch (error) {
      console.error("Failed to delete alert:", error);
    }
  };

  useEffect(() => {
    console.log("Component mounted, calling getAlerts");
    getAlerts(); // 組件掛載時獲取警報列表
  }, []);

  return (
    <AlertContext.Provider
      value={{ alertList, getAlerts, updateAlert, deleteAlert }}
    >
      {children}
    </AlertContext.Provider>
  );
};
