---
title: Linux Node & VPS Installation Guide
description: Install the BrowserMesh application on Linux desktop or deploy headlessly on a VPS.
order: 4
category: Installation
---

BrowserMesh offers a dedicated Linux application for desktop environments (Ubuntu, Fedora, Arch, etc.), as well as a headless installation method for servers and VPS hosting.

## Desktop Application (GUI)

If you are running a Linux desktop environment, the easiest way to get started is by using our dedicated Linux application.

1. Navigate to the **Download** section of your Cloud Dashboard.
2. Download the latest Linux release (AppImage or .deb package).
3. **If using AppImage**:
    - Make the file executable: `chmod +x BrowserMesh-linux.AppImage`
    - Run the application: `./BrowserMesh-linux.AppImage`
4. **If using .deb**:
    - Install via dpkg: `sudo dpkg -i browsermesh-linux.deb`
    - Launch BrowserMesh from your application menu.
5. Log in using your BrowserMesh cloud account credentials to link your device.

---

## Headless Node Setup (CLI / VPS / Server)

For background servers, cloud VPS, or headless Linux environments:

1. Open your terminal.
2. Run the one-line installation script:

```bash
curl -sSL https://browsermesh-one.vercel.app/scripts/install-headless.sh | bash
```

_Alternative using `wget`:_

```bash
wget -qO- https://browsermesh-one.vercel.app/scripts/install-headless.sh | bash
```

### Managing Your Linux Node

The setup script creates a global command shortcut called `mesh`:

- `mesh status` : Check process status and CPU/RAM metrics.
- `mesh logs`   : View live tail of scraping activity logs.
- `mesh restart`: Reboot the background scraping daemon.
- `mesh stop`    : Pause the node daemon.
- `mesh start`   : Resume the node daemon.
