import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AlertDisplay from "./AlertDisplay";

const HeaderWrapper = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
`;

const NotificationButton = styled.button`
  background: #61dafb;
  color: #282c34;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background: #21a1f1;
  }

  &:disabled {
    background: #aaa;
    cursor: not-allowed;
  }
`;

const pushPublicKey =
  "BD5zJc0hfgjoxT-445UVOUjcYUDPjMQkbwzYcdt92SMDzw325KUO_o2NNLmTfFWW3XXv2knnA-VoWXNbWRfXSBw";

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

const HeaderComponent = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered");
        registration.pushManager.getSubscription().then((subscription) => {
          if (subscription) {
            // 取消訂閱
            subscription
              .unsubscribe()
              .then(function (successful) {
                console.log(
                  "Unsubscribed from push notifications:",
                  successful
                );
                // 在這裡重新訂閱
              })
              .catch(function (error) {
                console.error("Unsubscription failed:", error);
              });
          }
        });
      })
      .catch((error) =>
        console.error("Service Worker registration failed:", error)
      );
  }, []);

  const subscribeUser = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("Push messaging is not supported");
      return;
    }

    setIsSubscribing(true);

    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(pushPublicKey),
      });

      // 獲取 keys
      const p256dhKey = subscription.getKey("p256dh");
      const authKey = subscription.getKey("auth");
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          endpoint: subscription.endpoint,
          expirationTime: subscription.expirationTime,
          keys: {
            p256dh: p256dhKey
              ? btoa(String.fromCharCode(...new Uint8Array(p256dhKey)))
              : null,
            auth: authKey
              ? btoa(String.fromCharCode(...new Uint8Array(authKey)))
              : null,
          },
        }),
      });

      if (response.ok) {
        console.log("Subscription was successful!");
        setIsSubscribed(true);
      } else {
        throw new Error("Failed to subscribe on the server");
      }
    } catch (error) {
      console.error(
        "Service Worker registration or subscription failed:",
        error
      );
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <HeaderWrapper>
      <h1>Smart Dashboard</h1>

      <AlertDisplay />
      <NotificationButton
        onClick={subscribeUser}
        disabled={isSubscribed || isSubscribing}
      >
        {isSubscribing
          ? "Subscribing..."
          : isSubscribed
            ? "Subscribed"
            : "Enable Notifications"}
      </NotificationButton>
    </HeaderWrapper>
  );
};

export default HeaderComponent;
