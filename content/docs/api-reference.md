---
title: API Reference
description: Complete REST API documentation for the BrowserMesh Cloud.
order: 7
category: Automation
---

# API Reference

The BrowserMesh REST API allows you to programmatically trigger scraping jobs, monitor device status, and retrieve extracted data without using the Cloud Dashboard.

> [!NOTE]
> We are currently migrating our OpenAPI specification to this documentation portal. In the meantime, you can interact with the API using standard HTTP requests.

## Authentication

All API requests require an API key passed in the Authorization header:

```bash
curl -X GET "https://api.browsermesh.com/v1/devices" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

You can generate an API key from the **Settings > Developer** tab in your Cloud Dashboard.

## Endpoints

### 1. List Devices

`GET /v1/devices`

Returns a list of all active Local Nodes connected to your account.

### 2. Create a Job

`POST /v1/jobs`

Triggers a new scraping task.

**Payload:**

```json
{
    "url": "https://example.com/products",
    "plugin": "ecommerce-extractor",
    "device_id": "optional-specific-device-id"
}
```

### 3. Fetch Job Results

`GET /v1/jobs/{id}/results`

Downloads the extracted `JSON` data from a completed job.
