// ShortsBlocker — background service worker

// Set default enabled state on install
browser.runtime.onInstalled.addListener(function () {
  browser.storage.sync.get({ shortsBlockerEnabled: null }).then(function (result) {
    if (result.shortsBlockerEnabled === null) {
      browser.storage.sync.set({ shortsBlockerEnabled: true });
    }
  });
});
