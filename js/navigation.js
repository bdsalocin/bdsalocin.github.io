/* Remote Control and D-Pad Navigation */

function initHbbTVKeys() {
  /* Register HbbTV / OIPF remote control navigation keys when running on a Smart TV WebView */
    try {
      const appMgr = document.getElementById("appmgr");
      if (appMgr && typeof appMgr.getOwnerApplication === "function") {
        const ownerApp = appMgr.getOwnerApplication(document);
        if (ownerApp) {
          ownerApp.show();
          if (ownerApp.privateData && ownerApp.privateData.keyset) {
            const ks = ownerApp.privateData.keyset;
            ks.setValue(ks.RED | ks.GREEN | ks.YELLOW | ks.BLUE | ks.NAVIGATION | ks.VCR | ks.NUMERIC);
          }
        }
      }
    } catch (e) {}
}

function initNavigation() {
  window.addEventListener("keydown", (e) => {
      const code = e.keyCode || e.which;
      const key = e.key || "";

      if (isModalOpen) {
        if (code === 27 || key === "Escape" || code === 461 || key === "Backspace" && document.activeElement.tagName !== "INPUT") {
          e.preventDefault();
          closeCustomModal();
        }
        return;
      }

      const row = Math.floor(focusedIndex / 6);
      const col = focusedIndex % 6;

      /* Key '0' or Options opens custom shortcut editor when focused on custom tile */
      if ((key === "0" || code === 48 || code === 457) && APPS[focusedIndex] && APPS[focusedIndex].isCustom) {
        e.preventDefault();
        openCustomModal();
        return;
      }

      if (code === 37 || key === "ArrowLeft" || code === 403) {
        e.preventDefault();
        setFocus(col > 0 ? focusedIndex - 1 : row * 6 + 5);
        return;
      }
      if (code === 39 || key === "ArrowRight" || code === 404) {
        e.preventDefault();
        setFocus(col < 5 ? focusedIndex + 1 : row * 6);
        return;
      }
      if (code === 38 || key === "ArrowUp") {
        e.preventDefault();
        if (row > 0) setFocus(focusedIndex - 6);
        return;
      }
      if (code === 40 || key === "ArrowDown") {
        e.preventDefault();
        if (row < SECTIONS.length - 1) setFocus(focusedIndex + 6);
        return;
      }
      if (code === 13 || key === "Enter" || code === 406) {
        e.preventDefault();
        triggerApp(APPS[focusedIndex]);
      }
    });
}
