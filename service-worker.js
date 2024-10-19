const CACHE_NAME = "device-data-cache-v1";
const urlsToCache = [
  // "/",
  // "/Smart-Dashboard", // 預加載的頁面
  // "/static/js/bundle.js", // 預加載的 JavaScript
];

// 安裝階段，快取靜態資源
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 攔截網絡請求，先從快取中獲取，沒有再從網絡請求
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// 處理 WebSocket 傳輸數據的快取
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SAVE_DEVICE_DATA") {
    caches.open(CACHE_NAME).then((cache) => {
      const devicesData = event.data.devicesData;
      const response = new Response(JSON.stringify(devicesData));
      cache.put("/api/devices", response);
    });
  }
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//  beforeinstallprompt 事件
let deferredPrompt;
self.addEventListener("beforeinstallprompt", (e) => {
  console.log("beforeinstallprompt");
  e.preventDefault();
  deferredPrompt = e;

  const installButton = document.getElementById("installButton");
  installButton.style.display = "block";

  installButton.addEventListener("click", () => {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("用户接受了安装提示");
      } else {
        console.log("用户拒绝了安装提示");
      }
      deferredPrompt = null;
    });
  });
});

self.addEventListener("push", function (event) {
  const data = event.data.json();
  console.log("pushdata:", data.title);
  const options = {
    body: data.body || "Default body text",
    icon: data.icon || "/icon/icon.png",
    badge: data.badge || "/icon/badge.png",
  };
  event.waitUntil(
    self.registration
      .showNotification(data.title || "Default Title", options)
      .catch(function (error) {
        console.error("Error showing notification:", error);
      })
  );
});
