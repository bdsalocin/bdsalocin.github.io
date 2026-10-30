/* UI Rendering, Focus, Hero Card, Toast and Modal Management */

let focusedIndex = 0;
    let ambilightTimer = null;
    let cardElements = [];
    let sectionElements = [];
    let isModalOpen = false;

    const rowsTrack = document.getElementById("rows-track");
    const navTabs = document.querySelectorAll("#nav-tabs .nav-tab");

    navTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetRow = Number(tab.dataset.row || 0);
        setFocus(targetRow * 6);
      });
    });

    function buildFallbackContent(app) {
      const fb = document.createElement("div");
      fb.className = "app-fallback";
      if (app.svgIcon) {
        fb.innerHTML = app.svgIcon;
      }
      const txt = document.createElement("span");
      txt.textContent = app.name;
      fb.appendChild(txt);
      return fb;
    }

    function renderGrid() {
      syncCustomTileData();
      rowsTrack.innerHTML = "";
      cardElements = [];
      sectionElements = [];

      SECTIONS.forEach((sec, rowIdx) => {
        const block = document.createElement("div");
        block.className = "section-block";

        const header = document.createElement("div");
        header.className = "section-header";
        header.textContent = sec.title;

        const surface = document.createElement("div");
        surface.className = "row-surface" + (sec.isDock ? " dock-surface" : "");

        const rowApps = APPS.slice(rowIdx * 6, rowIdx * 6 + 6);
        rowApps.forEach((app, colIdx) => {
          const idx = rowIdx * 6 + colIdx;
          const card = document.createElement("div");
          card.tabIndex = -1;
          card.className = "app-card" + (idx === focusedIndex ? " focused" : "");

          const tile = document.createElement("div");
          tile.className = "app-tile";
          tile.style.background = app.bg;

          if (app.img) {
            const img = document.createElement("img");
            img.decoding = "async";
            img.src = app.img;
            img.alt = app.name;
            img.addEventListener("error", () => {
              tile.innerHTML = "";
              tile.appendChild(buildFallbackContent(app));
            });
            tile.appendChild(img);
          } else {
            tile.appendChild(buildFallbackContent(app));
          }

          const label = document.createElement("div");
          label.className = "app-label";
          label.textContent = app.name;

          card.appendChild(tile);
          card.appendChild(label);

          card.addEventListener("click", (e) => {
            e.preventDefault();
            setFocus(idx);
            triggerApp(APPS[idx]);
          });

          cardElements.push(card);
          surface.appendChild(card);
        });

        block.appendChild(header);
        block.appendChild(surface);
        rowsTrack.appendChild(block);
        sectionElements.push(block);
      });

      updateHero();
      updateScrollPosition();
      scheduleAmbilight();
    }

    function updateScrollPosition() {
      const currentRow = Math.floor(focusedIndex / 6);
      navTabs.forEach((t, i) => t.classList.toggle("active", i === currentRow));

      if (currentRow === 0) {
        rowsTrack.style.transform = "translate3d(0, 0, 0)";
      } else if (sectionElements[currentRow]) {
        const offsetTop = sectionElements[currentRow].offsetTop;
        rowsTrack.style.transform = `translate3d(0, -${Math.max(0, offsetTop - 10)}px, 0)`;
      }
    }

    function setFocus(idx) {
      if (idx < 0 || idx >= APPS.length || idx === focusedIndex) return;

      if (cardElements[focusedIndex]) {
        cardElements[focusedIndex].classList.remove("focused");
      }
      focusedIndex = idx;
      if (cardElements[focusedIndex]) {
        cardElements[focusedIndex].classList.add("focused");
      }

      updateHero();
      updateScrollPosition();
      scheduleAmbilight();
    }

    function scheduleAmbilight() {
      if (!IS_LOCAL_BRIDGE) return;
      if (ambilightTimer) clearTimeout(ambilightTimer);
      ambilightTimer = setTimeout(() => {
        const app = APPS[focusedIndex];
        fetch("/api/ambilight", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(app.ambilight)
        }).catch(() => {});
      }, 350);
    }

    function updateHero() {
      const app = APPS[focusedIndex];
      document.getElementById("hero-badge").textContent = app.badge;
      document.getElementById("hero-title").textContent = app.name;
      document.getElementById("hero-desc").textContent = app.desc;
      const bd = document.getElementById("backdrop");
      bd.style.setProperty("--glow-1", app.glow1);
      bd.style.setProperty("--glow-2", app.glow2);
      const heroBg = document.getElementById("hero-bg");
      if (app.heroBg) {
        heroBg.style.backgroundImage = `url('${app.heroBg}')`;
        heroBg.style.opacity = "0.42";
      } else {
        heroBg.style.backgroundImage = "none";
        heroBg.style.opacity = "0";
      }
    }

    function showToast(msg) {
      const t = document.getElementById("toast");
      t.textContent = msg;
      t.classList.add("visible");
      setTimeout(() => t.classList.remove("visible"), 2600);
    }

    /* Custom Shortcut Modal Logic */
    const customModal = document.getElementById("custom-modal");
    const customNameInput = document.getElementById("custom-name-input");
    const customUrlInput = document.getElementById("custom-url-input");

    function openCustomModal() {
      const saved = loadCustomShortcut();
      customNameInput.value = saved ? saved.name : "";
      customUrlInput.value = saved ? saved.url : "https://";
      isModalOpen = true;
      customModal.classList.add("open");
      setTimeout(() => customNameInput.focus(), 50);
    }

    function closeCustomModal() {
      isModalOpen = false;
      customModal.classList.remove("open");
    }

    document.getElementById("modal-cancel-btn").addEventListener("click", closeCustomModal);

    document.getElementById("modal-reset-btn").addEventListener("click", () => {
      try {
        localStorage.removeItem(CUSTOM_STORAGE_KEY);
      } catch (e) {}
      closeCustomModal();
      renderGrid();
      showToast("Raccourci réinitialisé");
    });

    document.getElementById("modal-save-btn").addEventListener("click", () => {
      const rawUrl = customUrlInput.value.trim();
      const rawName = customNameInput.value.trim();
      try {
        const parsed = new URL(rawUrl);
        if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
          showToast("Seules les adresses http:// ou https:// sont autorisées");
          return;
        }
        const entry = {
          name: rawName ? rawName.slice(0, 28) : parsed.hostname,
          url: parsed.href
        };
        localStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(entry));
        closeCustomModal();
        renderGrid();
        showToast(`Raccourci ${entry.name} enregistré`);
      } catch (e) {
        showToast("Veuillez saisir une adresse URL valide");
      }
    });

function updateClock() {
      const now = new Date();
      const dateStr = now.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
      const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
      document.getElementById("clock").textContent = `${dateStr}  ${timeStr}`;
    }
