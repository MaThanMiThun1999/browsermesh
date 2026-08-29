---
title: How BrowserMesh Decentralized Network Works
description: Understanding the decentralized architecture of BrowserMesh nodes and the cloud dashboard.
order: 1
category: Architecture
---

BrowserMesh fundamentally rethinks web scraping by moving the heavy lifting off centralized servers and onto a distributed network of your own devices.

At its core, the platform is divided into two main components:

## 1. The Cloud Dashboard (Brain)

The web interface you log into is strictly for orchestration. It handles:

- **Job Scheduling:** Queueing up scraping tasks.
- **Marketplace:** Distributing plugins.
- **Billing & Subscriptions:** Validating limits using `LicenseCache`.
- **Data Aggregation:** Displaying usage metrics via `UsageTracker`.

_Crucially, the Cloud Dashboard does not execute any web scrapers itself._

## 2. The Local Nodes (Muscle)

The actual scraping engine (`scraper_backend`) runs on your local devices. It operates as a headless Node.js daemon across Android, Windows, and Linux.

When a Local Node connects to the internet:

1. **Device Sync:** The `DeviceSyncService` establishes a secure WebSocket connection to the Cloud Dashboard.
2. **Job Polling:** The local `JobQueue` subsystem continuously polls the cloud for pending tasks assigned to your account.
3. **Execution:** It spins up a highly-stealthy Chromium instance via the `BrowserPool` (using `cloakbrowser` to bypass Cloudflare and Datadome bot protections).
4. **Result Shipping:** Extracted data and logs are batched and shipped back to the cloud via the `CloudLogger`.

Because the requests originate from your local residential or mobile IP addresses, websites are exponentially less likely to block your scraping jobs.
