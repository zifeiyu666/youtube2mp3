(function () {
  const PANEL_ID = "yt2mp3-extension-panel";
  const MODAL_ID = "yt2mp3-extension-modal";
  const STYLE_ID = "yt2mp3-extension-style";
  const STORAGE_KEY = "yt2mp3_extension_ui";

  let currentPageUrl = "";
  let mounted = false;
  let dragState = null;
  let miniPressState = null;
  const MINI_TAP_MAX_MS = 300;
  let uiState = {
    minimized: false,
    left: null,
    top: null,
  };

  function ensureStyles() {
    if (document.getElementById(STYLE_ID)) {
      return;
    }

    const link = document.createElement("link");
    link.id = STYLE_ID;
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL("content.css");
    document.head.appendChild(link);
  }

  function loadUiState() {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return;
      }

      const parsed = JSON.parse(stored);
      uiState = {
        minimized: Boolean(parsed.minimized),
        left: typeof parsed.left === "number" ? parsed.left : null,
        top: typeof parsed.top === "number" ? parsed.top : null,
      };
    } catch {
      uiState = {
        minimized: false,
        left: null,
        top: null,
      };
    }
  }

  function saveUiState() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(uiState));
    } catch {
      // ignore storage failures
    }
  }

  function getVideoId() {
    const url = new URL(window.location.href);

    if (url.pathname === "/watch") {
      return url.searchParams.get("v") || "";
    }

    if (url.pathname.startsWith("/shorts/")) {
      const [, , videoId] = url.pathname.split("/");
      return videoId || "";
    }

    return "";
  }

  function isVideoPage() {
    return Boolean(getVideoId());
  }

  function closeModal() {
    const modal = document.getElementById(MODAL_ID);
    if (modal) {
      modal.remove();
    }
  }

  function setStatus(status) {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) {
      return;
    }

    const trigger = panel.querySelector('[data-role="open"]');
    if (trigger) {
      trigger.setAttribute("title", status);
      trigger.setAttribute("aria-label", status);
    }
  }

  function clampPosition(left, top, panel) {
    const padding = 12;
    const maxLeft = Math.max(padding, window.innerWidth - panel.offsetWidth - padding);
    const maxTop = Math.max(padding, window.innerHeight - panel.offsetHeight - padding);

    return {
      left: Math.min(Math.max(left, padding), maxLeft),
      top: Math.min(Math.max(top, padding), maxTop),
    };
  }

  function applyPosition() {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) {
      return;
    }

    if (typeof uiState.left === "number" && typeof uiState.top === "number") {
      const next = clampPosition(uiState.left, uiState.top, panel);
      panel.style.left = `${next.left}px`;
      panel.style.top = `${next.top}px`;
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      uiState.left = next.left;
      uiState.top = next.top;
      return;
    }

    const padding = window.innerWidth <= 720 ? 12 : 24;
    const defaultLeft = window.innerWidth - panel.offsetWidth - padding;
    const defaultTop = window.innerHeight - panel.offsetHeight - padding;
    const next = clampPosition(defaultLeft, defaultTop, panel);
    panel.style.left = `${next.left}px`;
    panel.style.top = `${next.top}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
  }

  function persistCurrentPosition() {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) {
      return;
    }

    const rect = panel.getBoundingClientRect();
    const next = clampPosition(rect.left, rect.top, panel);
    uiState.left = next.left;
    uiState.top = next.top;
    saveUiState();
    applyPosition();
  }

  function setMinimized(minimized) {
    uiState.minimized = minimized;
    saveUiState();
    render();
  }

  function openModal() {
    const videoId = getVideoId();

    if (!videoId) {
      setStatus("This page is not a supported YouTube video URL.");
      return;
    }

    closeModal();

    const modal = document.createElement("div");
    modal.id = MODAL_ID;
    modal.innerHTML = `
      <div class="yt2mp3__modal-backdrop" data-role="close"></div>
      <div class="yt2mp3__modal-card" role="dialog" aria-modal="true" aria-label="youtube2mp3 converter">
        <div class="yt2mp3__modal-header">
          <p class="yt2mp3__modal-title">youtube2mp3 Converter</p>
          <button type="button" class="yt2mp3__modal-close" data-role="close" aria-label="Close converter">×</button>
        </div>
        <iframe
          src="https://y2jar.cc/?id=${videoId}&appearance=dark"
          class="yt2mp3__iframe"
          title="YouTube to MP3/MP4 Converter"
          sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
          loading="lazy"
        ></iframe>
      </div>
    `;

    modal.querySelectorAll('[data-role="close"]').forEach((element) => {
      element.addEventListener("click", closeModal);
    });

    document.body.appendChild(modal);
    setStatus("Converter opened for the current video.");
  }

  function resetForPageChange() {
    closeModal();
    render();
  }

  function handlePointerMove(event) {
    if (!dragState) {
      return;
    }

    const panel = document.getElementById(PANEL_ID);
    if (!panel) {
      return;
    }

    const next = clampPosition(
      event.clientX - dragState.offsetX,
      event.clientY - dragState.offsetY,
      panel,
    );

    panel.style.left = `${next.left}px`;
    panel.style.top = `${next.top}px`;
    panel.style.right = "auto";
    panel.style.bottom = "auto";
  }

  function stopDragging() {
    if (!dragState) {
      return;
    }

    if (miniPressState) {
      miniPressState.moved = true;
    }

    dragState = null;
    document.body.classList.remove("yt2mp3-dragging");
    persistCurrentPosition();
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", stopDragging);
  }

  function startDragging(event) {
    const panel = document.getElementById(PANEL_ID);
    if (!panel) {
      return;
    }

    const interactiveTarget = event.target.closest("button, a, iframe");
    const isMiniShell = event.target.closest(".yt2mp3__mini-shell");

    if (interactiveTarget && !isMiniShell) {
      return;
    }

    const rect = panel.getBoundingClientRect();
    dragState = {
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };

    document.body.classList.add("yt2mp3-dragging");
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);
  }

  function handleMiniPointerDown(event) {
    miniPressState = {
      pointerId: event.pointerId,
      moved: false,
      startedAt: Date.now(),
    };
  }

  function handleMiniPointerUp(event) {
    if (!miniPressState || miniPressState.pointerId !== event.pointerId) {
      return;
    }

    const wasMoved = miniPressState.moved;
    const duration = Date.now() - miniPressState.startedAt;
    miniPressState = null;

    if (!wasMoved && duration <= MINI_TAP_MAX_MS) {
      openModal();
    }
  }

  function handleMiniPointerCancel(event) {
    if (!miniPressState || miniPressState.pointerId !== event.pointerId) {
      return;
    }

    miniPressState = null;
  }

  function buildPanel() {
    const panel = document.createElement("section");
    panel.id = PANEL_ID;
    panel.innerHTML = `
      <div class="yt2mp3__card">
        <div class="yt2mp3__topbar">
          <a
            class="yt2mp3__topbar-brand"
            href="https://youtube2mp3.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            youtube2mp3.io
          </a>
          <button type="button" class="yt2mp3__toggle" data-role="toggle" aria-label="Minimize widget">−</button>
        </div>
        <div class="yt2mp3__body">
          <div class="yt2mp3__actions">
            <button type="button" class="yt2mp3__button yt2mp3__button--primary" data-role="open">Get MP3 / MP4</button>
          </div>
        </div>
      </div>
      <div class="yt2mp3__mini-shell" data-drag-handle="true">
        <button type="button" class="yt2mp3__mini" aria-label="Open download widget">
          <span class="yt2mp3__mini-icon" aria-hidden="true">
            <span class="yt2mp3__mini-arrow"></span>
            <span class="yt2mp3__mini-base"></span>
          </span>
        </button>
        <button type="button" class="yt2mp3__mini-expand" data-role="toggle" aria-label="Expand widget">+</button>
      </div>
    `;

    panel.addEventListener("pointerdown", startDragging);
    panel.querySelectorAll("button").forEach((element) => {
      element.addEventListener("pointerdown", (event) => {
        if (!event.currentTarget.classList.contains("yt2mp3__mini")) {
          event.stopPropagation();
        }
      });
    });
    const miniButton = panel.querySelector(".yt2mp3__mini");
    miniButton.addEventListener("pointerdown", handleMiniPointerDown);
    miniButton.addEventListener("pointerup", handleMiniPointerUp);
    miniButton.addEventListener("pointercancel", handleMiniPointerCancel);
    panel.querySelectorAll('[data-role="toggle"]').forEach((element) => {
      element.addEventListener("click", () => {
        setMinimized(!uiState.minimized);
      });
    });
    panel.querySelectorAll('[data-role="open"]').forEach((element) => {
      element.addEventListener("click", openModal);
    });

    return panel;
  }

  function render() {
    if (!mounted) {
      return;
    }

    const panel = document.getElementById(PANEL_ID);
    if (!panel) {
      return;
    }

    panel.classList.toggle("yt2mp3--hidden", !isVideoPage());
    panel.classList.toggle("yt2mp3--minimized", uiState.minimized);

    const toggle = panel.querySelector(".yt2mp3__toggle");
    if (toggle) {
      toggle.textContent = uiState.minimized ? "+" : "−";
      toggle.setAttribute("aria-label", uiState.minimized ? "Expand widget" : "Minimize widget");
      toggle.setAttribute("title", uiState.minimized ? "Expand" : "Minimize");
    }

    applyPosition();
  }

  function mount() {
    if (mounted) {
      return;
    }

    ensureStyles();
    loadUiState();

    const mountWhenReady = () => {
      if (!document.body) {
        window.requestAnimationFrame(mountWhenReady);
        return;
      }

      document.body.appendChild(buildPanel());
      mounted = true;
      currentPageUrl = window.location.href;
      resetForPageChange();
    };

    mountWhenReady();
  }

  function watchPageChanges() {
    window.setInterval(() => {
      if (window.location.href === currentPageUrl) {
        return;
      }

      currentPageUrl = window.location.href;
      resetForPageChange();
    }, 800);

    window.addEventListener("resize", () => {
      applyPosition();
      saveUiState();
    });
  }

  mount();
  watchPageChanges();
})();
