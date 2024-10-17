// 檢查當前是否是本地運行或本地伺服器（開發模式）
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] 是 IPv6 localhost 地址
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 是 IPv4 localhost 地址
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// 註冊 Service Worker
export function register(config?: any) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // 確保公共 URL 正確地映射到 service-worker.js 的位置
    const publicUrl = new URL(process.env.PUBLIC_URL!, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // 本地運行時檢查 Service Worker 是否能夠工作
        checkValidServiceWorker(swUrl, config);

        // 添加日誌來顯示 localhost 伺服器正在使用 Service Worker
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "This web app is being served cache-first by a service " +
              "worker. To learn more, visit https://cra.link/PWA"
          );
        });
      } else {
        // 非 localhost 的生產環境，直接註冊 Service Worker
        registerValidSW(swUrl, config);
      }
    });
  }
}

// 註冊有效的 Service Worker
function registerValidSW(swUrl: string, config?: any) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker) {
          installingWorker.onstatechange = () => {
            if (installingWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // 當新內容可用時，提醒用戶
                console.log(
                  "New content is available and will be used when all tabs for this page are closed."
                );

                // 這裡可以提供回調來觸發用戶行動，例如提示他們更新
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                // 內容已經被快取以供離線使用
                console.log("Content is cached for offline use.");

                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        }
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

// 檢查 Service Worker 是否存在，並正確註冊
function checkValidServiceWorker(swUrl: string, config?: any) {
  // 檢查 Service Worker 是否存在並且正確加載
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // 沒有找到 Service Worker 或返回錯誤，嘗試重新加載頁面
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // 如果找到有效的 Service Worker，進行註冊
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

// 取消註冊 Service Worker
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
