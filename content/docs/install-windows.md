---
title: Windows Installation (Headless)
description: Step-by-step guide to installing the background scraping node on Windows using PowerShell.
order: 2
category: Installation
---

# Windows Installation (Headless Node)

You can turn any Windows 10/11 machine into a powerful, background scraping node for BrowserMesh. The installation process is completely automated via PowerShell.

## Automated Setup

1. Open **PowerShell** as Administrator.
2. Run the following command to download and execute the official installation script:

```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/MaThanMiThun1999/browsermesh/main/install-headless.ps1" -OutFile "install-headless.ps1"; .\install-headless.ps1
```

## What the Script Does

Behind the scenes, the script performs a secure, 5-step automated setup:

1. **Validates Node.js:** Ensures the Node.js engine is installed.
2. **Installs PM2:** Sets up `pm2` globally to manage the background daemon.
3. **Downloads the Backend:** Fetches the latest `backend.tar.gz` and extracts it to `$HOME\browsermesh-node`.
4. **Configures the Environment:** Generates an optimized `.env` file pointing to the production Cloud API.
5. **Starts the Service:** Launches the Node silently and saves the state to survive system reboots.

## Managing Your Node

The installation script injects a global command shortcut called `mesh` into your PowerShell profile.

Open a new PowerShell window and use the following commands to control your node:

- `mesh logs`: View a live tail of the scraping activity.
- `mesh status`: Check the memory and CPU usage of the background daemon.
- `mesh stop`: Pause the node temporarily.
- `mesh start`: Resume the node.
- `mesh restart`: Reboot the node (useful after updating configurations).

Once running, return to your Cloud Dashboard. Your Windows machine will instantly appear under the **Active Devices** tab.
