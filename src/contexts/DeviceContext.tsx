import React, { useEffect, useState, createContext, ReactNode } from "react";
import { useAlertContext } from "../contexts/AlertContext";

interface WebSocketContextType {
  devicesData: DeviceData[];
  alerts: Alert[];
}

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null
);

export interface DeviceData {
  id: number;
  name: string;
  runtime: number;
  temperature: number;
  power: number;
  productionRate: number;
  errorRate: number;
}

interface Alert {
  deviceId: number;
  message: string;
}

interface WebSocketProviderProps {
  children: ReactNode;
}

const DeviceContext: React.FC<WebSocketProviderProps> = ({ children }) => {
  const [devicesData, setData] = useState<DeviceData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { getAlerts } = useAlertContext();

  const checkForAlerts = (devices: DeviceData[]) => {
    const newAlerts: Alert[] = [];

    devices.forEach((device) => {
      if (device.temperature > 70) {
        newAlerts.push({
          deviceId: device.id,
          message: `Device ${device.name} has high temperature: ${device.temperature}°C`,
        });
      }

      if (device.errorRate > 5) {
        newAlerts.push({
          deviceId: device.id,
          message: `Device ${device.name} has a high error rate: ${device.errorRate}%`,
        });
      }

      if (device.power > 70) {
        newAlerts.push({
          deviceId: device.id,
          message: `Device ${device.name} has high power (>${device.power}).`,
        });
      }
    });
    getAlerts();
    setAlerts(newAlerts);
  };

  useEffect(() => {
    const fetchCachedData = async () => {
      try {
        const cache = await caches.open("device-data-cache-v1");
        const cachedResponse = await cache.match("/api/devices");
        if (cachedResponse) {
          const data = await cachedResponse.json();
          setData(data);

          checkForAlerts(data);
        }
      } catch (error) {
        console.error("Failed to fetch cached data:", error);
      }
    };

    fetchCachedData();
    const apiUrl = process.env.REACT_APP_API_URL;

    const ws = new WebSocket("ws://localhost:3001/machine");

    ws.onmessage = (event) => {
      try {
        const devicesData = JSON.parse(event.data);
        setData(devicesData);
        checkForAlerts(devicesData);

        // 通知 Service Worker 缓存新数据
        if (navigator.serviceWorker && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: "SAVE_DEVICE_DATA",
            devicesData: devicesData,
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ devicesData, alerts }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default DeviceContext;
