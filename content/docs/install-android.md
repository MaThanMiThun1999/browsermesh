---
title: Android Installation
description: Install the BrowserMesh background service on your Android smartphone.
order: 3
category: Installation
---

# Android Installation

BrowserMesh was heavily optimized to run on mobile architectures. By running a node on your Android device, you leverage your mobile carrier's IP address (4G/5G), which is virtually impossible for anti-bot systems to block.

## Setup Instructions

1. Navigate to the **Download** section of your Cloud Dashboard.
2. Download the `BrowserMesh-v1.0.apk`.
3. Open the downloaded file to install it. (You may need to allow "Install from Unknown Sources" in your Android settings).
4. Launch the BrowserMesh app.

## Permissions Required

On first launch, the app will request the following permissions:

- **Storage:** To cache scraping assets and save exported files (`JSON`, `CSV`, `XLSX`).
- **Ignore Battery Optimizations:** This is **critical**. Android aggressively kills background apps to save battery. You must allow BrowserMesh to run unrestricted in the background so it can process jobs while your screen is off.

## Cloud Syncing

Once the app is running and permissions are granted:

1. Tap the **Link Device** button.
2. Log in using your BrowserMesh cloud account credentials.
3. The app will initiate the `DeviceSyncService` and appear as "Online" in your web dashboard.

_Note: The Android app uses a highly efficient headless WebView and PRoot Node.js environment to execute jobs without draining your battery excessively._
