// ShortsBlocker — content script (runs at document_start)

(function () {
  "use strict";

  const STORAGE_KEY = "shortsBlockerEnabled";
  const BODY_CLASS = "shorts-blocker-enabled";

  // Cached state — updated only via storage reads/changes
  var enabled = true;

  // --- Redirect /shorts/ URLs to /watch?v= ---

  function redirectShortsURL() {
    var match = location.pathname.match(/^\/shorts\/([A-Za-z0-9_-]+)/);
    if (match) {
      var videoId = match[1];
      var params = new URLSearchParams(location.search);
      params.set("v", videoId);
      window.location.replace("/watch?" + params.toString());
    }
  }

  // --- Toggle body class based on cached state ---

  function applyState() {
    if (!document.body) return;
    if (enabled) {
      document.body.classList.add(BODY_CLASS);
    } else {
      document.body.classList.remove(BODY_CLASS);
    }
  }

  // Called on navigation — uses cached state, no storage read
  function onNavigate() {
    applyState();
    if (enabled) redirectShortsURL();
  }

  // Read storage once, cache result, then apply
  function readAndApply() {
    browser.storage.sync.get({ [STORAGE_KEY]: true }).then(function (result) {
      enabled = result[STORAGE_KEY];
      onNavigate();
    }, function () {
      // Extension context invalidated — ignore
    });
  }

  // Listen for storage changes (e.g. popup toggle) — update cache
  browser.storage.onChanged.addListener(function (changes, area) {
    if (area === "sync" && changes[STORAGE_KEY]) {
      enabled = changes[STORAGE_KEY].newValue;
      onNavigate();
    }
  });

  // --- Wait for <body> to exist (we run at document_start) ---

  if (document.body) {
    readAndApply();
  } else {
    var observer = new MutationObserver(function () {
      if (document.body) {
        observer.disconnect();
        readAndApply();
      }
    });
    observer.observe(document.documentElement, { childList: true });
  }

  // --- SPA navigation handling (debounced) ---

  var navTimer = 0;

  function scheduleNavigate() {
    clearTimeout(navTimer);
    navTimer = setTimeout(onNavigate, 0);
  }

  // YouTube fires this custom event on client-side navigations
  document.addEventListener("yt-navigate-finish", scheduleNavigate);

  // Monkey-patch pushState / replaceState to catch programmatic navigations
  var originalPushState = history.pushState;
  var originalReplaceState = history.replaceState;

  history.pushState = function () {
    originalPushState.apply(this, arguments);
    scheduleNavigate();
  };

  history.replaceState = function () {
    originalReplaceState.apply(this, arguments);
    scheduleNavigate();
  };

  window.addEventListener("popstate", scheduleNavigate);
})();
