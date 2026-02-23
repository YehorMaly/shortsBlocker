// ShortsBlocker — popup script

const STORAGE_KEY = "shortsBlockerEnabled";
const toggle = document.getElementById("toggle");
const status = document.getElementById("status");

function updateUI(enabled) {
  toggle.checked = enabled;
  status.textContent = enabled ? "Enabled" : "Disabled";
}

// Load current state
browser.storage.sync.get({ [STORAGE_KEY]: true }).then(function (result) {
  updateUI(result[STORAGE_KEY]);
});

// Handle toggle change
toggle.addEventListener("change", function () {
  const enabled = toggle.checked;
  browser.storage.sync.set({ [STORAGE_KEY]: enabled });
  updateUI(enabled);
});
