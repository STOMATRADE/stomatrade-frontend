# Analytics API Documentation

## Overview

3 endpoints untuk mendapatkan data pertumbuhan (growth) projects, investors, dan users. Support filtering berdasarkan periode (daily/weekly/monthly/yearly) dengan optional custom limit atau date range.

**Base URL:** `/analytics`
**Auth:** Admin only - JWT token required
**Format:** JSON

---

## Endpoints

```
GET /analytics/projects/growth    - Project growth statistics
GET /analytics/investors/growth   - Investor growth statistics
GET /analytics/users/growth       - User growth statistics
```

---

## Request Parameters

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `period` | string | ✅ Yes | `daily` \| `weekly` \| `monthly` \| `yearly` | `monthly` |
| `limit` | number | ❌ No | Jumlah data points (1-365). Override default. | `7` |
| `startDate` | string | ❌ No | Start date (YYYY-MM-DD). Require `endDate`. | `2025-12-01` |
| `endDate` | string | ❌ No | End date (YYYY-MM-DD). Require `startDate`. | `2025-12-31` |

### Default Limits

| Period | Default | Range |
|--------|---------|-------|
| `daily` | 30 days | Last 30 days |
| `weekly` | 12 weeks | Last 12 weeks (~3 months) |
| `monthly` | 12 months | Last 12 months (1 year) |
| `yearly` | All years | No limit |

---

## Response Format

```typescript
{
  period: string;          // Period type yang digunakan
  total: number;           // Total count dalam result
  dataPoints: number;      // Jumlah data points
  appliedLimit: number;    // Limit yang applied
  dateRange: {
    start: string;         // Start date (YYYY-MM-DD)
    end: string;           // End date (YYYY-MM-DD)
  };
  data: [
    {
      label: string;       // Label untuk chart (format varies by period)
      value: number;       // Jumlah pertambahan di periode ini
    }
  ];
}
```

### Label Formats

| Period | Format | Example |
|--------|--------|---------|
| `daily` | YYYY-MM-DD | `2025-12-29` |
| `weekly` | MMM D-D, YYYY | `Jan 1-7, 2026` atau `Dec 30-Jan 5, 2026` |
| `monthly` | MMM YYYY | `Dec 2025` |
| `yearly` | YYYY | `2025` |

---

## Examples

### 1. Default Request (12 months)

```bash
GET /analytics/projects/growth?period=monthly
Authorization: Bearer <token>
```

**Response:**
```json
{
  "period": "monthly",
  "total": 48,
  "dataPoints": 12,
  "appliedLimit": 12,
  "dateRange": {
    "start": "2025-01-01",
    "end": "2025-12-31"
  },
  "data": [
    { "label": "Jan 2025", "value": 3 },
    { "label": "Feb 2025", "value": 5 },
    { "label": "Mar 2025", "value": 7 }
  ]
}
```

### 2. Custom Limit (7 days)

```bash
GET /analytics/projects/growth?period=daily&limit=7
Authorization: Bearer <token>
```

**Response:**
```json
{
  "period": "daily",
  "total": 12,
  "dataPoints": 7,
  "appliedLimit": 7,
  "dateRange": {
    "start": "2025-12-23",
    "end": "2025-12-29"
  },
  "data": [
    { "label": "2025-12-23", "value": 1 },
    { "label": "2025-12-24", "value": 2 },
    { "label": "2025-12-25", "value": 0 },
    { "label": "2025-12-26", "value": 3 },
    { "label": "2025-12-27", "value": 2 },
    { "label": "2025-12-28", "value": 1 },
    { "label": "2025-12-29", "value": 3 }
  ]
}
```

### 3. Custom Date Range

```bash
GET /analytics/investors/growth?period=weekly&startDate=2025-12-01&endDate=2025-12-31
Authorization: Bearer <token>
```

**Response:**
```json
{
  "period": "weekly",
  "total": 15,
  "dataPoints": 5,
  "appliedLimit": 5,
  "dateRange": {
    "start": "2025-12-01",
    "end": "2025-12-31"
  },
  "data": [
    { "label": "Dec 2-8, 2025", "value": 2 },
    { "label": "Dec 9-15, 2025", "value": 4 },
    { "label": "Dec 16-22, 2025", "value": 3 },
    { "label": "Dec 23-29, 2025", "value": 5 },
    { "label": "Dec 30-Jan 5, 2026", "value": 1 }
  ]
}
```

### 4. Weekly - Last Week Only

```bash
GET /analytics/users/growth?period=weekly&limit=1
Authorization: Bearer <token>
```

**Response:**
```json
{
  "period": "weekly",
  "total": 5,
  "dataPoints": 1,
  "appliedLimit": 1,
  "dateRange": {
    "start": "2025-12-23",
    "end": "2025-12-29"
  },
  "data": [
    { "label": "Dec 23-29, 2025", "value": 5 }
  ]
}
```

## Notes

- **Auth:** Semua request wajib include JWT token dengan role ADMIN
- **Sorting:** Data selalu sorted chronologically (oldest → newest)
- **Empty periods:** Jika tidak ada data di periode tertentu, period tersebut tidak muncul di response
- **Performance:** Default limits (30/12/12) sudah optimal untuk chart rendering
- **Date range priority:** Jika `startDate` & `endDate` provided, `limit` diabaikan
