---
title: Getting Started with BrowserMesh Platform
description: Welcome to the BrowserMesh documentation. Learn how to install the native desktop/mobile apps or headless node script and connect to the Web Console.
order: 1
category: Introduction
---

BrowserMesh is a decentralized web automation and stealth scraping ecosystem. It allows you to run headless browsers directly on your own devices (Linux, Windows, or Android) while controlling all scraping jobs, marketplace plugins, and extracted data centrally from the **[Web Console](https://studio-browsermesh.vercel.app)**.

---

## 1. Access the Web Console

All platform management and telemetry are handled through our centralized dashboard:

- **Web Console Link:** [https://studio-browsermesh.vercel.app](https://studio-browsermesh.vercel.app)
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

#### Linux & macOS (Bash / Terminal)

Open your terminal and execute:

```bash
curl -sSL https://browsermesh-one.vercel.app/scripts/install-headless.sh | bash
```

_Alternative using `wget`:_

```bash
wget -qO- https://browsermesh-one.vercel.app/scripts/install-headless.sh | bash
```

#### Windows Headless Setup (PowerShell / CMD / Double-Click)

**Option 1: One-Line PowerShell Command**

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr -useb https://browsermesh-one.vercel.app/scripts/install-headless.ps1 | iex"
```

**Option 2: One-Line CMD Command**

```cmd
curl -sL https://browsermesh-one.vercel.app/scripts/install-headless.cmd -o install.cmd && install.cmd
```

**Option 3: Double-Click Installer File**

1. Download **[`install-headless.cmd`](https://browsermesh-one.vercel.app/scripts/install-headless.cmd)** directly to your computer.
2. Double-click **`install-headless.cmd`** in Windows File Explorer to launch the automated setup window.

---

## 3. Managing Your Node

Once installed (via GUI app or Headless CLI script), your node automatically connects to the BrowserMesh Cloud network:

### Automated Cloud Registration

1. The installer automatically configures your background daemon to communicate with the BrowserMesh Cloud network.
2. Log in with your BrowserMesh account on the **[Web Console](https://studio-browsermesh.vercel.app)**.
3. Your machine will immediately appear under the **Active Devices** tab on [studio-browsermesh.vercel.app](https://studio-browsermesh.vercel.app).

### CLI Management Commands (Headless Nodes)

- `mesh status` : Check memory, CPU, and connection status of the daemon.
- `mesh logs`   : View live scraping activity logs.
- `mesh restart`: Reboot the background scraping node.
- `mesh stop`    : Pause the node daemon.
- `mesh start`   : Resume the node daemon.
