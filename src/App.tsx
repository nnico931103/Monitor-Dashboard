import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import Dashboard from "./pages/Dashboard";
import DeviceContext from "./contexts/DeviceContext";
import { AlertProvider } from "./contexts/AlertContext";

const App: React.FC = () => {
  useEffect(() => {
    // 檢查通知權限
    if (Notification.permission === "denied") {
      console.log("Notification permissions denied");
    } else if (Notification.permission === "granted") {
      console.log("Notification permissions granted");
    } else {
      // 請求通知權限
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permissions granted");
        } else {
          console.log("Notification permissions denied or dismissed");
        }
      });
    }
  }, []);
  return (
    <AlertProvider>
      <DeviceContext>
        <Router>
          <div className="App">
            <HeaderComponent />
            <Routes>
              <Route path="/" element={<Dashboard />} />
            </Routes>
          </div>
        </Router>
      </DeviceContext>
    </AlertProvider>
  );
};

export default App;
