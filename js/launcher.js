/* Application launcher logic and system APIs */

const IS_LOCAL_BRIDGE = window.location.protocol === "http:" && (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.startsWith("192.168.") ||
      window.location.hostname.startsWith("10.")
    );

async function triggerApp(app) {
      if (app.isCustom && !app.url) {
        openCustomModal();
        return;
      }

      showToast(`Ouverture de ${app.name}...`);
      const targetUrl = app.url || app.fallbackUrl;

      /* 1. Fonctions natives directes Titan OS et NetTV pour téléviseurs connectés */
      try {
        if (app.id === "netflix" && typeof window.GotoNetflix === "function") {
          window.GotoNetflix("", "launcher");
          return;
        }
        if (app.id === "prime" && typeof window.GotoAIV === "function") {
          window.GotoAIV("", "PrimeVideo");
          return;
        }
        if (app.id === "youtube") {
          if (typeof window.GotoYouTube === "function") {
            window.GotoYouTube();
            return;
          }
          if (typeof window.loadApp === "function") {
            window.loadApp("https://www.youtube.com/tv?launch=menu", "YouTube", "NetTVSpecial", "720p");
            return;
          }
        }
        if (app.id === "disney" && typeof window.loadApp === "function") {
          window.loadApp("disneyplus", "Disney+", "NetTVSpecial", "1080p");
          return;
        }
        if (app.localUI && typeof window.loadLocalUI === "function") {
          window.loadLocalUI(app.localUI);
          return;
        }
        if (app.url && typeof window.loadApp === "function") {
          window.loadApp(app.url, app.appName || app.name, app.appType || "NetTV", "1080p");
          return;
        }
      } catch (e) {}

      /* 2. Communication avec le conteneur hôte (Media Station X) */
      try {
        if (window.parent && window.parent !== window) {
          if (app.id === "youtube") {
            window.parent.postMessage({ type: "interactionPlugin", action: "launch:youtube" }, "*");
            window.parent.postMessage({ type: "interactionPlugin", action: "link:https://www.youtube.com/tv?launch=menu" }, "*");
          } else if (targetUrl) {
            window.parent.postMessage({ type: "interactionPlugin", action: `link:${targetUrl}` }, "*");
          }
        }
      } catch (e) {}

      /* 3. Relais pont local si le serveur Python local est actif */
      if (IS_LOCAL_BRIDGE) {
        fetch("/api/launch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: app.id, url: targetUrl })
        }).catch(() => {});
      }

      /* 4. Navigation plein écran vers l'application */
      if (targetUrl) {
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 120);
      }
    }
