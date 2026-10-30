/* Application Initialization and Entry Point */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof initHbbTVKeys === "function") {
    initHbbTVKeys();
  }
  if (typeof updateClock === "function") {
    updateClock();
    setInterval(updateClock, 10000);
  }
  if (typeof renderGrid === "function") {
    renderGrid();
  }
  if (typeof initNavigation === "function") {
    initNavigation();
  }
});
