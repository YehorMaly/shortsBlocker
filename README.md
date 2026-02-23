# ShortsBlocker — Block YouTube Shorts on Safari

A Safari Web Extension for macOS that completely removes YouTube Shorts from your browsing experience. No more Shorts cluttering your feed, sidebar, or search results.

Tired of YouTube Shorts? This extension hides them everywhere — home feed, search, suggestions, sidebar, channel pages — and redirects any `/shorts/` URL to the normal video player.

## Features

- **Block Shorts on the home page** — removes Shorts shelves and Shorts cards from your feed
- **Block Shorts in search results** — no more Shorts mixed into what you're looking for
- **Block Shorts in suggestions** — clean video recommendations without Shorts
- **Hide the Shorts sidebar link** — gone from both full and mini sidebar
- **Hide the Shorts tab on channels** — removes the tab entirely
- **Redirect Shorts URLs** — `/shorts/VIDEO_ID` automatically becomes `/watch?v=VIDEO_ID`
- **One-click toggle** — enable or disable instantly from the toolbar popup

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

## Keywords

safari extension, block youtube shorts, remove youtube shorts, hide youtube shorts, disable youtube shorts, youtube shorts blocker, safari youtube shorts, macos safari extension, no shorts, youtube distraction free, youtube shorts redirect, youtube shorts remover, content blocker youtube, safari web extension, youtube shorts filter, youtube feed cleaner
