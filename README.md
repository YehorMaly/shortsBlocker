# ShortsBlocker

A Safari Web Extension that removes YouTube Shorts from your browsing experience.

## What it does

- **Hides Shorts shelves** on the home page
- **Removes Shorts from search results** and video suggestions
- **Hides the Shorts sidebar link** (full and mini sidebar)
- **Removes the Shorts tab** on channel pages
- **Redirects `/shorts/` URLs** to the standard video player (`/watch?v=`)
- **Toggle on/off** via the toolbar popup — changes apply instantly

## Install

1. Clone the repo
   ```
   git clone https://github.com/YehorMaly/shortsBlocker.git
   ```
2. Open `ShortsBlocker/ShortsBlocker.xcodeproj` in Xcode
3. Set your signing team in the project settings
4. Build & Run (Cmd+R)
5. In Safari:
   - **Settings > Advanced** — check "Show features for web developers"
   - **Develop > Allow Unsigned Extensions**
   - **Settings > Extensions** — enable ShortsBlocker

## Project Structure

```
extension/                 # Web extension source (referenced by Xcode project)
  manifest.json            # Manifest V3
  content.css              # CSS rules to hide Shorts elements
  content.js               # URL redirect + SPA navigation handling
  background.js            # Sets default enabled state on install
  popup/                   # Toolbar popup (toggle switch)
  icons/                   # Extension icons
ShortsBlocker/             # Xcode project (generated via safari-web-extension-converter)
```

## Requirements

- macOS 10.14+
- Safari 14+
- Xcode 14+
