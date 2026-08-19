# API Admin Dispute Guide

This document contains all Admin Dispute API endpoints and sample payloads.

## 1) Get Escalation Levels

- **Method:** `GET`
- **Endpoint:** `/api/v1/admin/disputes/escalation-levels`
- **Description:** Returns the available escalation level options for the dispute escalation form.
- **Access:** Admin only
- **Auth:** Required (admin role)
- **Parameters:** None

### Success Response

- **Status:** `200 OK`
- **Body:**

```json
{
  "message": "Escalation levels retrieved successfully",
  "data": [
    {
      "level": 1,
      "value": "level_1_senior_admin_review",
      "label": "Level 1 - Senior Admin Review"
    },
    {
      "level": 2,
      "value": "level_2_department_head",
      "label": "Level 2 - Department Head"
    },
    {
      "level": 3,
      "value": "level_3_legal_team",
      "label": "Level 3 - Legal Team"
    },
    {
      "level": 4,
      "value": "level_4_executive",
      "label": "Level 4 - Executive"
    },
    {
      "level": 5,
      "value": "level_5_external_mediation",
      "label": "Level 5 - External Mediation"
    }
  ]
}
```

### Notes

- Use the `data[].value` field when submitting escalation requests.
- Intended usage includes `POST /admin/disputes/{disputeId}/escalate`.

## 2) Get Escalation Reasons

- **Method:** `GET`
- **Endpoint:** `/api/v1/admin/disputes/escalation-reasons`
- **Description:** Returns the available escalation reason options for the dispute escalation form.
- **Access:** Admin only
- **Auth:** Required (admin role)
- **Parameters:** None

### Success Response

- **Status:** `200 OK`
- **Body:**

```json
{
  "message": "Escalation reasons retrieved successfully",
  "data": [
    {
      "value": "high_financial_value",
      "label": "High financial value",
      "requiresOtherText": false
    },
    {
      "value": "legal_complexity",
      "label": "Legal complexity",
      "requiresOtherText": false
    },
    {
      "value": "platform_policy_conflict",
      "label": "Platform policy conflict",
      "requiresOtherText": false
    },
    {
      "value": "repeat_disputer",
      "label": "Repeat disputer",
      "requiresOtherText": false
    },
    {
      "value": "vendor_performance_concerns",
      "label": "Vendor performance concerns",
      "requiresOtherText": false
    },
    {
      "value": "customer_service_risk",
      "label": "Customer service risk",
      "requiresOtherText": false
    },
    {
      "value": "other",
      "label": "Other: Specify…",
      "requiresOtherText": true
    }
  ]
}
```

### Notes

- Use the `data[].value` field when submitting escalation requests.
- If `requiresOtherText` is `true`, the client should collect and submit `otherReason` in the escalation request.
- Intended usage includes `POST /admin/disputes/{disputeId}/escalate`.

## 3) Escalate Dispute

- **Method:** `POST`
- **Endpoint:** `/api/v1/admin/disputes/{disputeId}/escalate`
- **Description:** Creates an escalation record for a dispute and sets the dispute status to `escalated`.
- **Access:** Admin only
- **Auth:** Required (admin role)

### Path Parameters

- `disputeId` (string, required): The MongoDB ObjectId of the dispute to escalate.

### Request Body

- **Content-Type:** `application/json`
- **Required fields:** `escalationLevel`, `escalationReason`, `urgencyLevel`

```json
{
  "escalationLevel": "level_3_legal_team",
  "escalationReason": "legal_complexity",
  "additionalContext": "Vendor alleges extenuating circumstances; needs higher-level decision.",
  "urgencyLevel": "high"
}
```

### Valid Values

- `escalationLevel`:
  - `level_1_senior_admin_review`
  - `level_2_department_head`
  - `level_3_legal_team`
  - `level_4_executive`
  - `level_5_external_mediation`
- `escalationReason`:
  - `high_financial_value`
  - `legal_complexity`
  - `platform_policy_conflict`
  - `repeat_disputer`
  - `vendor_performance_concerns`
  - `customer_service_risk`
  - `other` (requires `otherReason` in request body)
- `urgencyLevel`:
  - `normal` (target response: ~48 hours)
  - `high` (target response: ~24 hours)
  - `critical` (target response: ~4 hours)

### Success Response

- **Status:** `200 OK`
- **Body:**

```json
{
  "message": "Dispute escalated successfully",
  "data": {
    "_id": "69a9803c274d78007dc80abe",
    "disputeId": {
      "_id": "69a4855fbc9a9ed597126933",
      "caseId": "D-565358",
      "status": "escalated",
      "priority": "medium",
      "amountInDisputeMinor": 5000,
      "currency": "GBP",
      "filedAt": "2026-03-01T18:28:47.672Z",
      "windowEndsAt": "2026-03-03T18:28:47.672Z",
      "client": {
        "userId": "69792b0476acd54b12489ae4",
        "nameSnapshot": "Dengimo-owei Alex",
        "memberSince": "2026-01-27T21:15:48.520Z",
        "previousDisputes": 0
      },
      "vendor": {
        "vendorId": "698d6a77acc41a090e1213cb",
        "nameSnapshot": "Kings Landing",
        "ratingSnapshot": 0,
        "previousDisputes": 0
      },
      "booking": {
        "bookingId": "6999822db563c22ec3825318",
        "dateSnapshot": "2026-02-28T11:00:00.000Z",
        "locationSnapshot": "Lagos",
        "paymentModelSnapshot": "upfront_payout"
      },
      "reason": {
        "clientClaim": "You are opening a dispute for booking Sozins Coment. Once submitted, our resolution center will review your claim along with the vendor.",
        "requestedRefundPercent": 50,
        "currency": "GBP",
        "clientAttachments": [
          "69a48555bc9a9ed597126910",
          "69a4855bbc9a9ed597126918"
        ],
        "vendorAttachments": []
      },
      "timeline": [
        {
          "type": "created",
          "note": "Dispute created by client",
          "actorUserId": "69792b0476acd54b12489ae4",
          "createdAt": "2026-03-01T18:28:47.672Z"
        },
        {
          "type": "escalated",
          "note": "Level 3 - Legal Team: Legal complexity",
          "actorUserId": "69750103142ed772490ed5c1",
          "createdAt": "2026-03-05T13:08:13.199Z"
        }
      ],
      "createdAt": "2026-03-01T18:28:47.912Z",
      "updatedAt": "2026-03-05T13:08:13.202Z",
      "__v": 1
    },
    "requestedByAdminId": {
      "_id": "69750103142ed772490ed5c1",
      "firstName": "Johnson",
      "lastName": "Doeson",
      "email": "alexmorganigbanibo@gmail.com"
    },
    "escalationLevel": "level_3_legal_team",
    "escalationReason": "legal_complexity",
    "additionalContext": "Vendor alleges extenuating circumstances; needs higher-level decision.",
    "urgencyLevel": "high",
    "createdAt": "2026-03-05T13:08:12.957Z",
    "updatedAt": "2026-03-05T13:08:12.957Z",
    "__v": 0
  }
}
```

### Business Rules

- Cannot escalate a `closed` or `archived` dispute.
- When `escalationReason` is `other`, the `otherReason` field is required (2–200 chars).
- This action appends an `escalated` event to the dispute timeline.

## 4) Resolve a Dispute

- **Method:** `POST`
- **Endpoint:** `/api/v1/admin/disputes/{disputeId}/resolve`
- **Description:** Creates a dispute resolution record and sets the dispute status to `closed` (terminal action).
- **Access:** Admin only
- **Auth:** Required (admin role)

### Path Parameters

- `disputeId` (string, required): The MongoDB ObjectId of the dispute to resolve.

### Request Body

- **Content-Type:** `application/json`
- **Required fields:** `resolution`

```json
{
  "resolution": "partial_refund",
  "amountMinor": 32000,
  "currency": "GBP",
  "notes": "Approved partial refund after review."
}
```

### Valid Values

- `resolution`:
  - `partial_refund`
  - `vendor_credit`
  - `full_refund`
  - `deny`
  - `mediated`

### Success Response

- **Status:** `200 OK`
- **Body:**

```json
{
  "message": "Dispute resolved successfully",
  "data": {
    "_id": "69a980a6274d78007dc80aca",
    "disputeId": {
      "_id": "69a4855fbc9a9ed597126933",
      "caseId": "D-565358",
      "status": "closed",
      "priority": "medium",
      "amountInDisputeMinor": 5000,
      "currency": "GBP",
      "filedAt": "2026-03-01T18:28:47.672Z",
      "windowEndsAt": "2026-03-03T18:28:47.672Z",
      "client": {
        "userId": "69792b0476acd54b12489ae4",
        "nameSnapshot": "Dengimo-owei Alex",
        "memberSince": "2026-01-27T21:15:48.520Z",
        "previousDisputes": 0
      },
      "vendor": {
        "vendorId": "698d6a77acc41a090e1213cb",
        "nameSnapshot": "Kings Landing",
        "ratingSnapshot": 0,
        "previousDisputes": 0
      },
      "booking": {
        "bookingId": "6999822db563c22ec3825318",
        "dateSnapshot": "2026-02-28T11:00:00.000Z",
        "locationSnapshot": "Lagos",
        "paymentModelSnapshot": "upfront_payout"
      },
      "reason": {
        "clientClaim": "You are opening a dispute for booking Sozins Coment. Once submitted, our resolution center will review your claim along with the vendor.",
        "requestedRefundPercent": 50,
        "currency": "GBP",
        "clientAttachments": [
          "69a48555bc9a9ed597126910",
          "69a4855bbc9a9ed597126918"
        ],
        "vendorAttachments": []
      },
      "timeline": [
        {
          "type": "created",
          "note": "Dispute created by client",
          "actorUserId": "69792b0476acd54b12489ae4",
          "createdAt": "2026-03-01T18:28:47.672Z"
        },
        {
          "type": "escalated",
          "note": "Level 3 - Legal Team: Legal complexity",
          "actorUserId": "69750103142ed772490ed5c1",
          "createdAt": "2026-03-05T13:08:13.199Z"
        },
        {
          "type": "resolved",
          "note": "Resolution: Partial Refund (GBP 32000)",
          "actorUserId": "69750103142ed772490ed5c1",
          "createdAt": "2026-03-05T13:09:58.460Z"
        }
      ],
      "createdAt": "2026-03-01T18:28:47.912Z",
      "updatedAt": "2026-03-05T13:09:58.711Z",
      "__v": 2,
      "closedAt": "2026-03-05T13:09:58.460Z"
    },
    "caseId": "D-565358",
    "vendorId": {
      "_id": "698d6a77acc41a090e1213cb",
      "userId": "698d6a77acc41a090e1213c9",
      "businessProfile": "698d6d05acc41a090e121433",
      "reviewCount": 5
    },
    "resolvedByAdminId": {
      "_id": "69750103142ed772490ed5c1",
      "firstName": "Johnson",
      "lastName": "Doeson",
      "email": "alexmorganigbanibo@gmail.com"
    },
    "resolution": "partial_refund",
    "amountMinor": 32000,
    "currency": "GBP",
    "resolvedAt": "2026-03-05T13:09:58.460Z",
    "notes": "Approved partial refund after review.",
    "createdAt": "2026-03-05T13:09:58.461Z",
    "updatedAt": "2026-03-05T13:09:58.461Z",
    "__v": 0
  }
}
```

### Business Rules

- Cannot resolve an `archived` dispute.
- Only one resolution is allowed per dispute (unique on `disputeId`).
- `amountMinor` is in minor currency units (example: `32000` = £320.00).
- Default currency is `GBP` if not specified.
- Resolution action is irreversible.

## 5) Get All Dispute Resolutions (Paginated)

- **Method:** `GET`
- **Endpoint:** `/api/v1/admin/dispute-resolutions`
- **Description:** Returns a paginated list of dispute resolutions across the platform with optional filtering.
- **Access:** Admin only
- **Auth:** Required (admin role)

### Query Parameters

- `page` (integer, optional): Page number for pagination. Default: `1`.
- `limit` (integer, optional): Number of records per page. Default: `10`.
- `resolution` (string, optional): Filter by resolution type. Default: `all`.
  - Available values: `all`, `partial_refund`, `vendor_credit`, `full_refund`, `denied`, `mediated`
- `vendorId` (string, optional): Filter by vendor ObjectId.
- `from` (string date-time, optional): Start date filter (ISO 8601).
- `to` (string date-time, optional): End date filter (ISO 8601).

### Success Response

- **Status:** `200 OK`
- **Body:**

```json
{
  "message": "Dispute resolutions retrieved successfully",
  "data": {
    "data": [
      {
        "_id": "69a980a6274d78007dc80aca",
        "disputeId": {
          "_id": "69a4855fbc9a9ed597126933",
          "caseId": "D-565358",
          "status": "closed",
          "priority": "medium",
          "amountInDisputeMinor": 5000,
          "currency": "GBP",
          "filedAt": "2026-03-01T18:28:47.672Z",
          "windowEndsAt": "2026-03-03T18:28:47.672Z",
          "client": {
            "userId": "69792b0476acd54b12489ae4",
            "nameSnapshot": "Dengimo-owei Alex",
            "memberSince": "2026-01-27T21:15:48.520Z",
            "previousDisputes": 0
          },
          "vendor": {
            "vendorId": "698d6a77acc41a090e1213cb",
            "nameSnapshot": "Kings Landing",
            "ratingSnapshot": 0,
            "previousDisputes": 0
          },
          "booking": {
            "bookingId": "6999822db563c22ec3825318",
            "dateSnapshot": "2026-02-28T11:00:00.000Z",
            "locationSnapshot": "Lagos",
            "paymentModelSnapshot": "upfront_payout"
          },
          "reason": {
            "clientClaim": "You are opening a dispute for booking Sozins Coment. Once submitted, our resolution center will review your claim along with the vendor.",
            "requestedRefundPercent": 50,
            "currency": "GBP",
            "clientAttachments": [
              "69a48555bc9a9ed597126910",
              "69a4855bbc9a9ed597126918"
            ],
            "vendorAttachments": []
          },
          "timeline": [
            {
              "type": "created",
              "note": "Dispute created by client",
              "actorUserId": "69792b0476acd54b12489ae4",
              "createdAt": "2026-03-01T18:28:47.672Z"
            },
            {
              "type": "escalated",
              "note": "Level 3 - Legal Team: Legal complexity",
              "actorUserId": "69750103142ed772490ed5c1",
              "createdAt": "2026-03-05T13:08:13.199Z"
            },
            {
              "type": "resolved",
              "note": "Resolution: Partial Refund (GBP 32000)",
              "actorUserId": "69750103142ed772490ed5c1",
              "createdAt": "2026-03-05T13:09:58.460Z"
            }
          ],
          "createdAt": "2026-03-01T18:28:47.912Z",
          "updatedAt": "2026-03-05T13:09:58.711Z",
          "__v": 2,
          "closedAt": "2026-03-05T13:09:58.460Z"
        },
        "caseId": "D-565358",
        "vendorId": {
          "_id": "698d6a77acc41a090e1213cb",
          "userId": "698d6a77acc41a090e1213c9",
          "businessProfile": "698d6d05acc41a090e121433",
          "reviewCount": 5
        },
        "resolvedByAdminId": {
          "_id": "69750103142ed772490ed5c1",
          "firstName": "Johnson",
          "lastName": "Doeson",
          "email": "alexmorganigbanibo@gmail.com"
        },
        "resolution": "partial_refund",
        "amountMinor": 32000,
        "currency": "GBP",
        "resolvedAt": "2026-03-05T13:09:58.460Z",
        "notes": "Approved partial refund after review.",
        "createdAt": "2026-03-05T13:09:58.461Z",
        "updatedAt": "2026-03-05T13:09:58.461Z",
        "__v": 0
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  }
}
```
