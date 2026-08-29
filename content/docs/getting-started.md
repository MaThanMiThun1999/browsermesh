---
title: Getting Started with BrowserMesh Platform
description: Welcome to the BrowserMesh documentation. Learn how to install the native desktop/mobile apps or headless node script and connect to the Web Console.
order: 1
category: Introduction
---

BrowserMesh is a decentralized web automation and stealth scraping ecosystem. It allows you to run headless browsers directly on your own devices (Linux, Windows, or Android) while controlling all scraping jobs, marketplace plugins, and extracted data centrally from the **[Web Console](https://console.browsermesh.in)**.

---

## 1. Access the Web Console

All platform management and telemetry are handled through our centralized dashboard:

- **Web Console Link:** [https://console.browsermesh.in](https://console.browsermesh.in)
- Log in or create an account to view active devices, execute marketplace plugins, and monitor job queues.

---

## 2. Platform Installation Methods

BrowserMesh supports both **Desktop & Mobile Applications (GUI)** and **Headless Node Scripts (CLI/Server)**.

### Option A: Desktop & Mobile Applications (GUI Apps)

If you prefer graphical user interfaces, download the dedicated native app for your device:

- **Windows Desktop App:** Install our native Windows installer. Read the **[Windows Installation Guide](/docs/install-windows)**.
- **Linux Desktop App:** Install via `.deb` package or AppImage (`chmod +x BrowserMesh-linux.AppImage`). Read the **[Linux Installation Guide](/docs/install-linux)**.
- **Android Mobile App:** Download the `BrowserMesh-v1.0.apk` for mobile IP proxy scraping (Android 10+). Read the **[Android Installation Guide](/docs/install-android)**.

---

### Option B: Headless Terminal Node Scripts (CLI / Server Setup)

For background servers, cloud VPS, or headless environments, use our automated one-line setup scripts:

#### Linux / Cloud VPS (One-Command Setup)

Open your terminal and execute:

```bash
curl -sSL https://raw.githubusercontent.com/MaThanMiThun1999/browsermesh/refs/heads/main/install-headless.sh | bash
```

_Alternative using `wget`:_

```bash
wget -qO- https://raw.githubusercontent.com/MaThanMiThun1999/browsermesh/refs/heads/main/install-headless.sh | bash
```

#### Windows Headless Setup (PowerShell)

Open **PowerShell as Administrator** and execute:

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/MaThanMiThun1999/browsermesh/refs/heads/main/install-headless.ps1" -OutFile "install-headless.ps1"; .\install-headless.ps1
```

---

## 3. Managing & Connecting Your Node

Once installed (via GUI app or Headless CLI daemon), connect your device to your account:

### Linking to Your Account

1. Open the **[Web Console](https://console.browsermesh.in)**.
2. Copy your Device Auth Token from **Console Dashboard -> Active Devices**.
3. **If using GUI App:** Enter your token or log in directly under the **Cloud Sync** tab.
4. **If using Headless CLI:** Link your node by running in your terminal:
    ```bash
    mesh link <YOUR_DEVICE_TOKEN>
    ```
5. Your device will immediately appear under the **Active Devices** tab on [console.browsermesh.in](https://console.browsermesh.in).

### CLI Management Commands (Headless Nodes)

- `mesh status`: Check memory, CPU, and connection status.
- `mesh logs`: View live scraping activity logs.
- `mesh restart`: Reboot the background scraping daemon.
- `mesh stop`: Pause the node daemon.
