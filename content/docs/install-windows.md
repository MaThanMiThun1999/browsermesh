---
title: Windows Node Installation Guide (Headless & GUI)
description: Step-by-step guide to installing the background scraping node on Windows using PowerShell.
order: 2
category: Installation
---

You can turn any Windows 10/11 machine into a powerful, background scraping node for BrowserMesh. The installation process is completely automated via PowerShell.

## Automated Setup Options

### Option 1: One-Line PowerShell Command

Open **PowerShell** and execute:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr -useb https://browsermesh-one.vercel.app/scripts/install-headless.ps1 | iex"
```

### Option 2: One-Line CMD Command

Run in **Windows Command Prompt (CMD)**:

```cmd
curl -sL https://browsermesh-one.vercel.app/scripts/install-headless.cmd -o install.cmd && install.cmd
```

### Option 3: Double-Click Batch File Installer

1. Download **[`install-headless.cmd`](https://browsermesh-one.vercel.app/scripts/install-headless.cmd)**.
2. Double-click **`install-headless.cmd`** in Windows File Explorer.
3. The command window will execute the background setup and remain open so you can confirm installation success.

## What the Script Does

Behind the scenes, the script performs a secure, 5-step automated setup:

1. **Validates Node.js:** Ensures Node.js engine (v18/v20+) is installed.
2. **Installs PM2:** Sets up `pm2` globally to manage the background daemon.
3. **Downloads the Backend:** Fetches `backend-latest.tar.gz` and extracts it to your User Home directory: `%USERPROFILE%\browsermesh-node` (e.g. `C:\Users\<YourUsername>\browsermesh-node`).
4. **Configures Environment:** Generates an optimized `.env` file pointing to the production Cloud API.
5. **Installs Stealth Browser & Starts Service:** Downloads anti-bot stealth binaries (`npx cloakbrowser install`) and launches the background daemon.

## Managing Your Node

The installation script configures a universal command shortcut called `mesh` inside your system PATH (`%APPDATA%\npm`).

You can run `mesh` commands directly from any terminal window (Command Prompt CMD, PowerShell, or Git Bash):

- `mesh status` : Check process status, memory, and CPU usage of the daemon.
- `mesh logs`   : View live tail of scraping activity logs.
- `mesh restart`: Reboot the background scraping node.
- `mesh stop`    : Pause the background node daemon.
- `mesh start`   : Resume the node daemon.

Once running, return to your Cloud Dashboard. Your Windows machine will instantly appear under the **Active Devices** tab.
