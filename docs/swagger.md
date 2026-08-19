
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Momentiv API",
      "version": "1.0.0",
      "description": "Momentiv Backend API Documentation",
      "contact": {
        "name": "API Support",
        "email": "support@momentiv.com"
      }
    },
    "servers": [
      {
        "url": "http://localhost:5000",
        "description": "Development Server"
      },
      {
        "url": "https://momentev-be.onrender.com",
        "description": "Production Server"
      }
    ],
    "components": {
      "securitySchemes": {
        "BearerAuth": {
          "type": "http",
          "scheme": "bearer",
          "bearerFormat": "JWT",
          "description": "JWT Authorization header using the Bearer scheme."
        }
      },
      "schemas": {
        "RegisterInput": {},
        "LoginInput": {},
        "RefreshTokenInput": {},
        "UpdateUserInput": {},
        "PaginationQuery": {},
        "IdParam": {},
        "CreateServiceCategoryInput": {},
        "UpdateServiceCategoryInput": {},
        "CreateServiceSpecialtyInput": {},
        "UpdateServiceSpecialtyInput": {},
        "CreateCommissionInput": {},
        "UpdateCommissionInput": {},
        "CreateFaqInput": {},
        "UpdateFaqInput": {},
        "CreateAddressInput": {},
        "UpdateAddressInput": {},
        "UpdateVendorInput": {},
        "VendorSearchQuery": {},
        "VendorNearbyQuery": {},
        "VendorPaymentModelInput": {},
        "AddVendorPaymentMethodInput": {},
        "AcceptCommissionAgreementInput": {},
        "CreateBookingInput": {},
        "CreateBookingFromCustomerRequestBodyInput": {},
        "CustomerRequestIdParam": {},
        "BookingIdParam": {},
        "VendorBookingDecisionBodyInput": {},
        "CreateVendorStaffInput": {
          "example": {
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "jane.doe@momentiv.com",
            "permissions": [
              {
                "name": "manage_staff",
                "read": true,
                "write": true
              }
            ],
            "isActive": true
          }
        },
        "UpdateVendorStaffInput": {},
        "InviteVendorStaffInput": {},
        "CreateVendorServiceInput": {},
        "UpdateVendorServiceInput": {},
        "CreateVendorSpecialtyInput": {},
        "UpdateVendorSpecialtyInput": {},
        "SendChatMessageInput": {},
        "ListChatMessagesQuery": {},
        "ChatConversationIdParam": {},
        "ChatVendorIdParam": {},
        "CreateSupportRequestInput": {},
        "SupportRequestListQuery": {},
        "CreateDisputeInput": {},
        "DisputeListQuery": {},
        "DisputeIdParam": {},
        "EscalateDisputeInput": {},
        "ResolveDisputeInput": {},
        "DisputeResolutionListQuery": {},
        "DisputeResolutionVendorIdParam": {},
        "AdminAnalyticsOverviewQuery": {},
        "CreateRequestInput": {},
        "UpdateRequestInput": {},
        "UpdateDraftCustomerRequestInput": {},
        "SubmitNewRequestInput": {},
        "ApproveOrRejectCustomerRequestInput": {},
        "CreateNotificationInput": {},
        "BroadcastNotificationInput": {},
        "NotificationListQuery": {},
        "BulkNotificationActionInput": {},
        "Notification": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e901"
            },
            "recipientId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e111"
            },
            "title": {
              "type": "string",
              "example": "Booking confirmed"
            },
            "message": {
              "type": "string",
              "example": "The vendor confirmed your booking."
            },
            "type": {
              "type": "string",
              "enum": [
                "general",
                "system",
                "booking",
                "payment",
                "chat",
                "dispute",
                "promotion",
                "custom"
              ]
            },
            "origin": {
              "type": "string",
              "enum": [
                "admin",
                "system",
                "user",
                "transactional"
              ]
            },
            "priority": {
              "type": "string",
              "enum": [
                "low",
                "normal",
                "high",
                "urgent"
              ]
            },
            "redirectUrl": {
              "type": "string",
              "nullable": true,
              "example": "/bookings/64f0c2f7a2b6c1a9b3d2e999"
            },
            "sourceType": {
              "type": "string",
              "nullable": true,
              "enum": [
                "booking",
                "payment",
                "quote",
                "quote_request",
                "customer_request",
                "dispute",
                "dispute_resolution",
                "chat_conversation",
                "support_request",
                "review",
                "auth",
                "user",
                "vendor_staff",
                "admin_management",
                "system",
                "custom"
              ]
            },
            "sourceId": {
              "type": "string",
              "nullable": true,
              "example": "64f0c2f7a2b6c1a9b3d2e999"
            },
            "eventKey": {
              "type": "string",
              "nullable": true,
              "example": "booking.confirmed"
            },
            "actorUserId": {
              "type": "string",
              "nullable": true,
              "example": "64f0c2f7a2b6c1a9b3d2e222"
            },
            "metadata": {
              "type": "object",
              "additionalProperties": true,
              "nullable": true
            },
            "isRead": {
              "type": "boolean",
              "example": false
            },
            "readAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "isArchived": {
              "type": "boolean",
              "example": false
            },
            "archivedAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "NotificationResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Notification updated successfully"
            },
            "data": {
              "$ref": "#/components/schemas/Notification"
            }
          }
        },
        "NotificationCreateResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Notification created successfully"
            },
            "data": {
              "type": "object",
              "properties": {
                "campaignId": {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e900"
                },
                "recipientsCount": {
                  "type": "integer",
                  "example": 2
                },
                "notifications": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Notification"
                  }
                }
              }
            }
          }
        },
        "NotificationListResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Notifications retrieved successfully"
            },
            "data": {
              "type": "object",
              "properties": {
                "data": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Notification"
                  }
                },
                "total": {
                  "type": "integer",
                  "example": 12
                },
                "page": {
                  "type": "integer",
                  "example": 1
                },
                "limit": {
                  "type": "integer",
                  "example": 10
                }
              }
            }
          }
        },
        "NotificationUnreadCountResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Unread notification count retrieved successfully"
            },
            "data": {
              "type": "object",
              "properties": {
                "unreadCount": {
                  "type": "integer",
                  "example": 3
                }
              }
            }
          }
        },
        "NotificationBulkActionResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Notifications updated successfully"
            },
            "data": {
              "type": "object",
              "properties": {
                "matchedCount": {
                  "type": "integer",
                  "example": 2
                },
                "modifiedCount": {
                  "type": "integer",
                  "example": 2
                }
              }
            }
          }
        },
        "ChatConversation": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e901"
            },
            "vendorId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e555"
            },
            "userId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e111"
            },
            "user": {
              "description": "Lightweight user details for the counterparty (for vendor chat UI).",
              "type": "object",
              "nullable": true,
              "properties": {
                "firstName": {
                  "type": "string",
                  "example": "John",
                  "nullable": true
                },
                "lastName": {
                  "type": "string",
                  "example": "Doe",
                  "nullable": true
                },
                "avatar": {
                  "type": "string",
                  "example": "https://cdn.example.com/avatar.jpg",
                  "nullable": true
                }
              }
            },
            "counterpartyType": {
              "type": "string",
              "example": "customer",
              "enum": [
                "customer",
                "admin"
              ]
            },
            "status": {
              "type": "string",
              "example": "open",
              "enum": [
                "open",
                "closed",
                "archived"
              ]
            },
            "lastMessageId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e902",
              "nullable": true
            },
            "lastMessageAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "lastMessagePreview": {
              "type": "string",
              "example": "Hello, I want to book…",
              "nullable": true
            },
            "vendorLastReadAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "userLastReadAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "ChatAttachment": {
          "type": "object",
          "properties": {
            "fileId": {
              "description": "UploadedFile reference (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e777"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e777"
                    },
                    "originalName": {
                      "type": "string",
                      "example": "invoice.pdf"
                    },
                    "mimeType": {
                      "type": "string",
                      "example": "application/pdf"
                    },
                    "size": {
                      "type": "number",
                      "example": 123456
                    },
                    "url": {
                      "type": "string",
                      "example": "https://cdn.example.com/files/invoice.pdf"
                    },
                    "cloudId": {
                      "type": "string",
                      "example": "cloudinary_public_id_123",
                      "nullable": true
                    },
                    "extension": {
                      "type": "string",
                      "example": "pdf",
                      "nullable": true
                    },
                    "provider": {
                      "type": "string",
                      "example": "cloudinary",
                      "nullable": true
                    },
                    "metadata": {
                      "type": "object",
                      "additionalProperties": true,
                      "nullable": true
                    },
                    "createdAt": {
                      "type": "string",
                      "format": "date-time",
                      "nullable": true
                    },
                    "updatedAt": {
                      "type": "string",
                      "format": "date-time",
                      "nullable": true
                    }
                  }
                }
              ],
              "nullable": true
            }
          }
        },
        "ChatMessage": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e902"
            },
            "conversationId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e901"
            },
            "vendorId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e555"
            },
            "senderUserId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e111"
            },
            "senderSide": {
              "type": "string",
              "example": "user",
              "enum": [
                "user",
                "vendor"
              ]
            },
            "type": {
              "type": "string",
              "example": "text",
              "enum": [
                "text",
                "file",
                "system"
              ]
            },
            "text": {
              "type": "string",
              "example": "Hello, are you available next weekend?",
              "nullable": true
            },
            "attachments": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ChatAttachment"
              }
            },
            "replyToMessageId": {
              "type": "string",
              "nullable": true
            },
            "clientMessageId": {
              "type": "string",
              "example": "cmsg_01HQ…",
              "nullable": true
            },
            "editedAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "deletedAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "ChatConversationListResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Conversations retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ChatConversation"
              }
            }
          }
        },
        "ChatConversationResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Conversation ready"
            },
            "data": {
              "$ref": "#/components/schemas/ChatConversation"
            }
          }
        },
        "ChatMessageListResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Messages retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/ChatMessage"
              }
            }
          }
        },
        "ChatMessageResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Message sent successfully"
            },
            "data": {
              "$ref": "#/components/schemas/ChatMessage"
            }
          }
        },
        "ChatMarkReadResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Conversation marked as read"
            },
            "data": {
              "$ref": "#/components/schemas/ChatConversation"
            }
          }
        },
        "SupportRequest": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2eabc"
            },
            "firstName": {
              "type": "string",
              "example": "John"
            },
            "lastName": {
              "type": "string",
              "example": "Doe"
            },
            "email": {
              "type": "string",
              "example": "john.doe@example.com"
            },
            "message": {
              "type": "string",
              "example": "I need help with my booking"
            },
            "vendorId": {
              "description": "Vendor reference (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e555"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e555"
                    }
                  }
                }
              ],
              "nullable": true
            },
            "clientId": {
              "description": "Client/User reference (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e111"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e111"
                    }
                  }
                }
              ],
              "nullable": true
            },
            "archivedAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "archivedBy": {
              "description": "User who archived the request (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e222"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e222"
                    }
                  }
                }
              ],
              "nullable": true
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "PaginatedSupportRequests": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/SupportRequest"
              }
            },
            "total": {
              "type": "integer",
              "example": 42
            },
            "page": {
              "type": "integer",
              "example": 1
            },
            "limit": {
              "type": "integer",
              "example": 10
            }
          }
        },
        "SupportRequestResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Support request retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/SupportRequest"
            }
          }
        },
        "SupportRequestPaginatedResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Support requests retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/PaginatedSupportRequests"
            }
          }
        },
        "SupportRequestArchivedResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Support request archived successfully"
            },
            "data": {
              "$ref": "#/components/schemas/SupportRequest"
            }
          }
        },
        "SupportRequestDeletedResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Support request deleted successfully"
            }
          }
        },
        "PaymentQueueItem": {
          "type": "object",
          "properties": {
            "bookingId": {
              "type": "string",
              "example": "64f1c2a9b3d6f5a2c1e9a111"
            },
            "transactionId": {
              "type": "string",
              "example": "pi_3NQwq2LkKp0b5Z8A1abc123"
            },
            "paymentIntentId": {
              "type": "string",
              "example": "pi_3NQwq2LkKp0b5Z8A1abc123",
              "nullable": true
            },
            "transferId": {
              "type": "string",
              "example": "tr_1NQwrALkKp0b5Z8A2def456",
              "nullable": true
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "paidAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "releasedAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "amountMinor": {
              "type": "integer",
              "example": 183000
            },
            "currency": {
              "type": "string",
              "example": "GBP"
            },
            "status": {
              "type": "object",
              "properties": {
                "queue": {
                  "type": "string",
                  "enum": [
                    "success",
                    "pending",
                    "failed",
                    "refunded",
                    "unknown"
                  ],
                  "example": "success"
                },
                "booking": {
                  "type": "string",
                  "enum": [
                    "pending_payment",
                    "paid",
                    "confirmed",
                    "completed",
                    "cancelled",
                    "refunded"
                  ],
                  "example": "paid"
                },
                "payment": {
                  "type": "string",
                  "enum": [
                    "not_started",
                    "requires_payment_method",
                    "requires_confirmation",
                    "requires_action",
                    "requires_capture",
                    "processing",
                    "succeeded",
                    "canceled"
                  ],
                  "nullable": true,
                  "example": "succeeded"
                }
              }
            },
            "customer": {
              "type": "object",
              "nullable": true,
              "properties": {
                "_id": {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e111"
                },
                "firstName": {
                  "type": "string",
                  "example": "Ada",
                  "nullable": true
                },
                "lastName": {
                  "type": "string",
                  "example": "Lovelace",
                  "nullable": true
                },
                "email": {
                  "type": "string",
                  "example": "ada@example.com",
                  "nullable": true
                },
                "phoneNumber": {
                  "type": "string",
                  "example": "+447700900000",
                  "nullable": true
                }
              }
            },
            "vendor": {
              "type": "object",
              "nullable": true,
              "properties": {
                "_id": {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e555"
                },
                "businessName": {
                  "type": "string",
                  "example": "Momentiv Studios",
                  "nullable": true
                },
                "owner": {
                  "type": "object",
                  "nullable": true,
                  "properties": {
                    "_id": {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e222"
                    },
                    "firstName": {
                      "type": "string",
                      "example": "John",
                      "nullable": true
                    },
                    "lastName": {
                      "type": "string",
                      "example": "Vendor",
                      "nullable": true
                    },
                    "email": {
                      "type": "string",
                      "example": "vendor@example.com",
                      "nullable": true
                    },
                    "phoneNumber": {
                      "type": "string",
                      "example": "+447700900111",
                      "nullable": true
                    }
                  }
                }
              }
            },
            "actions": {
              "type": "object",
              "properties": {
                "canRefund": {
                  "type": "boolean",
                  "example": true
                },
                "canReleasePayout": {
                  "type": "boolean",
                  "example": true
                }
              }
            }
          }
        },
        "PaymentQueuePage": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/PaymentQueueItem"
              }
            },
            "total": {
              "type": "integer",
              "example": 1
            },
            "page": {
              "type": "integer",
              "example": 1
            },
            "limit": {
              "type": "integer",
              "example": 20
            }
          }
        },
        "PaymentQueueResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Payment queue retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/PaymentQueuePage"
            }
          }
        },
        "AdminReleasePayoutResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Payout released successfully"
            },
            "data": {
              "type": "object",
              "properties": {
                "bookingId": {
                  "type": "string",
                  "example": "64f1c2a9b3d6f5a2c1e9a111"
                },
                "transferId": {
                  "type": "string",
                  "example": "tr_1NQwrALkKp0b5Z8A2def456"
                },
                "amount": {
                  "type": "integer",
                  "example": 170000
                }
              }
            }
          }
        },
        "AdminRefundResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Refund created successfully"
            },
            "data": {
              "type": "object",
              "properties": {
                "bookingId": {
                  "type": "string",
                  "example": "64f1c2a9b3d6f5a2c1e9a111"
                },
                "refundId": {
                  "type": "string",
                  "example": "re_1NQx0bLkKp0b5Z8A9ghi789"
                },
                "amount": {
                  "type": "integer",
                  "example": 54900
                }
              }
            }
          }
        },
        "Dispute": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f1c2a9b3d6f5a2c1e9a999"
            },
            "caseId": {
              "type": "string",
              "example": "D-124"
            },
            "status": {
              "type": "string",
              "enum": [
                "mediation",
                "evidence",
                "review",
                "escalated",
                "closed",
                "archived"
              ],
              "example": "evidence"
            },
            "priority": {
              "type": "string",
              "enum": [
                "low",
                "medium",
                "high"
              ],
              "example": "high"
            },
            "amountInDisputeMinor": {
              "type": "integer",
              "example": 183000
            },
            "fundsHeldMinor": {
              "type": "integer",
              "nullable": true,
              "example": 91500
            },
            "currency": {
              "type": "string",
              "example": "GBP"
            },
            "filedAt": {
              "type": "string",
              "format": "date-time"
            },
            "windowEndsAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "assignedAdminId": {
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e222"
                },
                {
                  "$ref": "#/components/schemas/User"
                }
              ],
              "nullable": true
            },
            "client": {
              "type": "object",
              "properties": {
                "userId": {
                  "oneOf": [
                    {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e111"
                    },
                    {
                      "$ref": "#/components/schemas/User"
                    }
                  ]
                },
                "nameSnapshot": {
                  "type": "string",
                  "nullable": true,
                  "example": "Sarah Johnson"
                },
                "memberSince": {
                  "type": "string",
                  "format": "date-time",
                  "nullable": true
                },
                "bookingHistorySince": {
                  "type": "string",
                  "format": "date-time",
                  "nullable": true
                },
                "previousDisputes": {
                  "type": "integer",
                  "nullable": true,
                  "example": 0
                }
              }
            },
            "vendor": {
              "type": "object",
              "properties": {
                "vendorId": {
                  "oneOf": [
                    {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e555"
                    },
                    {
                      "$ref": "#/components/schemas/Vendor"
                    }
                  ]
                },
                "nameSnapshot": {
                  "type": "string",
                  "nullable": true,
                  "example": "Elegant Wedding Photography"
                },
                "vendorCodeSnapshot": {
                  "type": "string",
                  "nullable": true,
                  "example": "V-7891"
                },
                "ratingSnapshot": {
                  "type": "number",
                  "nullable": true,
                  "example": 4.9
                },
                "totalBookingsSnapshot": {
                  "type": "integer",
                  "nullable": true,
                  "example": 47
                },
                "previousDisputes": {
                  "type": "integer",
                  "nullable": true,
                  "example": 2
                }
              }
            },
            "booking": {
              "type": "object",
              "properties": {
                "bookingId": {
                  "type": "string",
                  "example": "64f1c2a9b3d6f5a2c1e9a111"
                },
                "serviceSnapshot": {
                  "type": "string",
                  "nullable": true,
                  "example": "Wedding Photography"
                },
                "dateSnapshot": {
                  "type": "string",
                  "format": "date-time",
                  "nullable": true
                },
                "locationSnapshot": {
                  "type": "string",
                  "nullable": true,
                  "example": "St. Paul's Cathedral, London"
                },
                "paymentModelSnapshot": {
                  "type": "string",
                  "nullable": true,
                  "example": "split_payout"
                }
              }
            },
            "reason": {
              "type": "object",
              "properties": {
                "clientClaim": {
                  "type": "string",
                  "example": "Photos were poorly lit and don't match portfolio quality."
                },
                "requestedRefundPercent": {
                  "type": "number",
                  "nullable": true,
                  "example": 30
                },
                "requestedRefundAmountMinor": {
                  "type": "integer",
                  "nullable": true,
                  "example": 54900
                },
                "currency": {
                  "type": "string",
                  "nullable": true,
                  "example": "GBP"
                },
                "clientAttachments": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "example": []
                },
                "vendorResponse": {
                  "type": "string",
                  "nullable": true,
                  "example": "Weather conditions affected lighting. Offered to re-edit."
                },
                "vendorAttachments": {
                  "type": "array",
                  "items": {
                    "type": "string"
                  },
                  "example": []
                }
              }
            },
            "timeline": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "type": {
                    "type": "string",
                    "example": "created"
                  },
                  "note": {
                    "type": "string",
                    "nullable": true,
                    "example": "Dispute created by client"
                  },
                  "actorUserId": {
                    "type": "string",
                    "nullable": true,
                    "example": "64f0c2f7a2b6c1a9b3d2e111"
                  },
                  "createdAt": {
                    "type": "string",
                    "format": "date-time"
                  }
                }
              }
            },
            "archivedAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "closedAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "PaginatedDisputes": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Dispute"
              }
            },
            "total": {
              "type": "integer",
              "example": 5
            },
            "page": {
              "type": "integer",
              "example": 1
            },
            "limit": {
              "type": "integer",
              "example": 10
            }
          }
        },
        "DisputeResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Dispute created successfully"
            },
            "data": {
              "$ref": "#/components/schemas/Dispute"
            }
          }
        },
        "DisputePaginatedResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Disputes retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/PaginatedDisputes"
            }
          }
        },
        "EscalateDispute": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f1c2a9b3d6f5a2c1e9b111"
            },
            "disputeId": {
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f1c2a9b3d6f5a2c1e9a999"
                },
                {
                  "$ref": "#/components/schemas/Dispute"
                }
              ]
            },
            "requestedByAdminId": {
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e222"
                },
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "currentHandlerAdminId": {
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e333"
                },
                {
                  "$ref": "#/components/schemas/User"
                }
              ],
              "nullable": true
            },
            "escalationLevel": {
              "type": "string",
              "enum": [
                "level_1_senior_admin_review",
                "level_2_department_head",
                "level_3_legal_team",
                "level_4_executive",
                "level_5_external_mediation"
              ],
              "example": "level_3_legal_team"
            },
            "escalationReason": {
              "type": "string",
              "enum": [
                "high_financial_value",
                "legal_complexity",
                "platform_policy_conflict",
                "repeat_disputer",
                "vendor_performance_concerns",
                "customer_service_risk",
                "other"
              ],
              "example": "legal_complexity"
            },
            "otherReason": {
              "type": "string",
              "nullable": true,
              "example": "Other: Please specify the unique circumstance",
              "description": "Required when escalationReason is other"
            },
            "additionalContext": {
              "type": "string",
              "nullable": true,
              "example": "Provide details for the next handler…"
            },
            "urgencyLevel": {
              "type": "string",
              "enum": [
                "normal",
                "high",
                "critical"
              ],
              "nullable": true,
              "example": "high"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "EscalationLevelOption": {
          "type": "object",
          "properties": {
            "level": {
              "type": "integer",
              "example": 3
            },
            "value": {
              "type": "string",
              "enum": [
                "level_1_senior_admin_review",
                "level_2_department_head",
                "level_3_legal_team",
                "level_4_executive",
                "level_5_external_mediation"
              ],
              "example": "level_3_legal_team"
            },
            "label": {
              "type": "string",
              "example": "Level 3 - Legal Team"
            }
          }
        },
        "EscalationReasonOption": {
          "type": "object",
          "properties": {
            "value": {
              "type": "string",
              "enum": [
                "high_financial_value",
                "legal_complexity",
                "platform_policy_conflict",
                "repeat_disputer",
                "vendor_performance_concerns",
                "customer_service_risk",
                "other"
              ],
              "example": "legal_complexity"
            },
            "label": {
              "type": "string",
              "example": "Legal complexity"
            },
            "requiresOtherText": {
              "type": "boolean",
              "example": false
            }
          }
        },
        "EscalationLevelsResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Escalation levels retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/EscalationLevelOption"
              }
            }
          }
        },
        "EscalationReasonsResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Escalation reasons retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/EscalationReasonOption"
              }
            }
          }
        },
        "EscalateDisputeResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Dispute escalated successfully"
            },
            "data": {
              "$ref": "#/components/schemas/EscalateDispute"
            }
          }
        },
        "DisputeResolution": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f1c2a9b3d6f5a2c1e9c111"
            },
            "disputeId": {
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f1c2a9b3d6f5a2c1e9a999"
                },
                {
                  "$ref": "#/components/schemas/Dispute"
                }
              ]
            },
            "caseId": {
              "type": "string",
              "example": "D-118"
            },
            "vendorId": {
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e555"
                },
                {
                  "$ref": "#/components/schemas/Vendor"
                }
              ]
            },
            "resolvedByAdminId": {
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e222"
                },
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "resolution": {
              "type": "string",
              "enum": [
                "partial_refund",
                "vendor_credit",
                "full_refund",
                "denied",
                "mediated"
              ],
              "example": "partial_refund"
            },
            "amountMinor": {
              "type": "integer",
              "minimum": 0,
              "example": 32000
            },
            "currency": {
              "type": "string",
              "example": "GBP"
            },
            "resolvedAt": {
              "type": "string",
              "format": "date-time"
            },
            "notes": {
              "type": "string",
              "nullable": true,
              "example": "Approved partial refund after review."
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "PaginatedDisputeResolutions": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/DisputeResolution"
              }
            },
            "total": {
              "type": "integer",
              "example": 5
            },
            "page": {
              "type": "integer",
              "example": 1
            },
            "limit": {
              "type": "integer",
              "example": 10
            }
          }
        },
        "DisputeResolutionResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Dispute resolved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/DisputeResolution"
            }
          }
        },
        "DisputeResolutionPaginatedResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Dispute resolutions retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/PaginatedDisputeResolutions"
            }
          }
        },
        "AdminAnalyticsOverviewResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Analytics overview retrieved successfully"
            },
            "data": {
              "type": "object",
              "properties": {
                "range": {
                  "type": "object",
                  "properties": {
                    "from": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "to": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                },
                "currency": {
                  "type": "string",
                  "example": "GBP"
                },
                "performance": {
                  "type": "object",
                  "properties": {
                    "totalRevenueMinor": {
                      "type": "integer",
                      "example": 24838200
                    },
                    "pendingPayoutMinor": {
                      "type": "integer",
                      "example": 4215000
                    },
                    "activeEscrowMinor": {
                      "type": "integer",
                      "example": 1568200
                    },
                    "platformCommissionMinor": {
                      "type": "integer",
                      "example": 2483800
                    },
                    "disputedFundsMinor": {
                      "type": "integer",
                      "example": 1845000
                    },
                    "disputedCases": {
                      "type": "integer",
                      "example": 26
                    }
                  }
                },
                "revenueAnalytics": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "name": {
                        "type": "string",
                        "example": "Wedding Service"
                      },
                      "pct": {
                        "type": "number",
                        "example": 45
                      },
                      "amountMinor": {
                        "type": "integer",
                        "example": 11177200
                      }
                    }
                  }
                },
                "byPaymentModel": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "model": {
                        "type": "string",
                        "example": "upfront_payout"
                      },
                      "pct": {
                        "type": "number",
                        "example": 68
                      },
                      "amountMinor": {
                        "type": "integer",
                        "example": 16890000
                      }
                    }
                  }
                },
                "revenueByRegion": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "region": {
                        "type": "string",
                        "example": "London"
                      },
                      "pct": {
                        "type": "number",
                        "example": 42
                      },
                      "amountMinor": {
                        "type": "integer",
                        "example": 10432000
                      }
                    }
                  }
                },
                "topVendors": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "vendorId": {
                        "type": "string",
                        "example": "64f0c2f7a2b6c1a9b3d2e555"
                      },
                      "vendorName": {
                        "type": "string",
                        "example": "Elegant Weddings"
                      },
                      "amountMinor": {
                        "type": "integer",
                        "example": 8920000
                      },
                      "bookings": {
                        "type": "integer",
                        "example": 15
                      },
                      "growthPct": {
                        "type": "number",
                        "example": 28
                      }
                    }
                  }
                },
                "todaysPayments": {
                  "type": "object",
                  "properties": {
                    "successful": {
                      "type": "object",
                      "properties": {
                        "count": {
                          "type": "integer"
                        },
                        "amountMinor": {
                          "type": "integer"
                        }
                      }
                    },
                    "failed": {
                      "type": "object",
                      "properties": {
                        "count": {
                          "type": "integer"
                        },
                        "amountMinor": {
                          "type": "integer"
                        }
                      }
                    },
                    "pending": {
                      "type": "object",
                      "properties": {
                        "count": {
                          "type": "integer"
                        },
                        "amountMinor": {
                          "type": "integer"
                        }
                      }
                    },
                    "successRatePct": {
                      "type": "number",
                      "example": 94.6
                    }
                  }
                },
                "paymentMethods": {
                  "type": "object",
                  "properties": {
                    "items": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "method": {
                            "type": "string"
                          },
                          "count": {
                            "type": "integer"
                          },
                          "pct": {
                            "type": "number"
                          }
                        }
                      }
                    },
                    "note": {
                      "type": "string"
                    }
                  }
                },
                "_meta": {
                  "type": "object",
                  "description": "Metadata about the response format and currency units",
                  "properties": {
                    "amountsInMinorUnits": {
                      "type": "boolean",
                      "example": true
                    },
                    "minorUnitDivisor": {
                      "type": "integer",
                      "example": 100
                    },
                    "currency": {
                      "type": "string",
                      "example": "GBP"
                    },
                    "note": {
                      "type": "string",
                      "example": "All fields whose names end in \"Minor\" are in minor currency units. Divide by minorUnitDivisor to get the major unit value."
                    }
                  }
                }
              }
            }
          }
        },
        "User": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e111"
            },
            "firstName": {
              "type": "string",
              "example": "John"
            },
            "lastName": {
              "type": "string",
              "example": "Doe"
            },
            "email": {
              "type": "string",
              "example": "john.doe@example.com"
            },
            "phoneNumber": {
              "type": "string",
              "example": "+15551234567",
              "nullable": true
            },
            "stripeCustomerId": {
              "type": "string",
              "example": "cus_123",
              "nullable": true
            },
            "gender": {
              "type": "string",
              "enum": [
                "male",
                "female",
                "other"
              ],
              "example": "other"
            },
            "dateOfBirth": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "avatar": {
              "description": "Avatar file reference (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e777"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e777"
                    }
                  }
                }
              ],
              "nullable": true
            },
            "addressId": {
              "description": "Address reference (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e444"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e444"
                    }
                  }
                }
              ],
              "nullable": true
            },
            "role": {
              "type": "string",
              "enum": [
                "admin",
                "customer",
                "user",
                "auditor",
                "vendor",
                "vendorstaff"
              ],
              "example": "customer"
            },
            "status": {
              "type": "string",
              "enum": [
                "active",
                "inactive",
                "banned",
                "pending_verification"
              ],
              "example": "active"
            },
            "emailVerified": {
              "type": "boolean",
              "example": true
            },
            "authProvider": {
              "type": "string",
              "enum": [
                "local",
                "google"
              ],
              "example": "google"
            },
            "googleId": {
              "type": "string",
              "example": "109876543210987654321",
              "nullable": true
            },
            "hasPassword": {
              "type": "boolean",
              "example": false,
              "description": "True if the user has set a login password (Google-only users start as false until they set one)."
            },
            "lastLoginAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true,
              "example": "2026-01-22T10:30:00.000Z",
              "description": "Timestamp of the user's last successful login."
            },
            "lastActiveAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true,
              "example": "2026-01-22T11:05:00.000Z",
              "description": "Timestamp of the user's last authenticated activity (throttled updates)."
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "SocialMediaLink": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "instagram",
              "description": "Social media platform name"
            },
            "link": {
              "type": "string",
              "example": "https://instagram.com/vendor",
              "description": "Profile link"
            }
          },
          "required": [
            "name",
            "link"
          ]
        },
        "Vendor": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e555"
            },
            "userId": {
              "description": "User who owns this vendor profile (may be populated) ",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e111"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string"
                    }
                  }
                }
              ]
            },
            "address": {
              "description": "Address (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e444"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string"
                    }
                  }
                }
              ],
              "nullable": true
            },
            "businessProfile": {
              "description": "Business profile (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e666"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string"
                    }
                  }
                }
              ],
              "nullable": true
            },
            "profilePhoto": {
              "description": "Profile photo file (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e777"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string"
                    },
                    "url": {
                      "type": "string"
                    }
                  }
                }
              ],
              "nullable": true
            },
            "coverPhoto": {
              "description": "Cover photo file (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e888"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string"
                    },
                    "url": {
                      "type": "string"
                    }
                  }
                }
              ],
              "nullable": true
            },
            "portfolioGallery": {
              "type": "array",
              "description": "Portfolio files (may be populated)",
              "items": {
                "oneOf": [
                  {
                    "type": "string",
                    "example": "64f0c2f7a2b6c1a9b3d2e999"
                  },
                  {
                    "type": "object",
                    "properties": {
                      "_id": {
                        "type": "string"
                      },
                      "url": {
                        "type": "string"
                      }
                    }
                  }
                ]
              }
            },
            "rate": {
              "type": "number",
              "example": 4.5,
              "minimum": 0,
              "maximum": 5
            },
            "socialMediaLinks": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/SocialMediaLink"
              }
            },
            "paymentAccountId": {
              "type": "string",
              "example": "acct_123",
              "nullable": true
            },
            "paymentAccountProvider": {
              "type": "string",
              "example": "stripe",
              "nullable": true
            },
            "isActive": {
              "type": "boolean",
              "example": false
            },
            "onBoardingStage": {
              "type": "number",
              "example": 0
            },
            "onBoarded": {
              "type": "boolean",
              "example": false
            },
            "onboardedAt": {
              "type": "string",
              "format": "date-time",
              "nullable": true
            },
            "reviewCount": {
              "type": "number",
              "example": 0,
              "description": "Virtual: number of reviews"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "PaginatedVendors": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Vendor"
              }
            },
            "total": {
              "type": "integer",
              "example": 42
            },
            "page": {
              "type": "integer",
              "example": 1
            },
            "limit": {
              "type": "integer",
              "example": 10
            }
          }
        },
        "VendorNearbyItem": {
          "allOf": [
            {
              "$ref": "#/components/schemas/Vendor"
            },
            {
              "type": "object",
              "properties": {
                "distanceKm": {
                  "type": "number",
                  "example": 2.34
                }
              },
              "required": [
                "distanceKm"
              ]
            }
          ]
        },
        "PaginatedVendorsNearby": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/VendorNearbyItem"
              }
            },
            "total": {
              "type": "integer",
              "example": 12
            },
            "page": {
              "type": "integer",
              "example": 1
            },
            "limit": {
              "type": "integer",
              "example": 10
            }
          }
        },
        "VendorResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Vendor updated successfully"
            },
            "data": {
              "$ref": "#/components/schemas/Vendor"
            }
          }
        },
        "VendorPermission": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string",
              "example": "manage_staff"
            },
            "read": {
              "type": "boolean",
              "example": true
            },
            "write": {
              "type": "boolean",
              "example": true
            }
          },
          "required": [
            "name",
            "read",
            "write"
          ]
        },
        "VendorStaff": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2eaaa"
            },
            "vendorId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e555"
            },
            "userId": {
              "description": "User assigned as staff (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e111"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e111"
                    },
                    "firstName": {
                      "type": "string",
                      "example": "Jane"
                    },
                    "lastName": {
                      "type": "string",
                      "example": "Doe"
                    },
                    "email": {
                      "type": "string",
                      "example": "jane.doe@momentiv.com"
                    }
                  }
                }
              ]
            },
            "permissions": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/VendorPermission"
              }
            },
            "isActive": {
              "type": "boolean",
              "example": true
            },
            "addedBy": {
              "description": "User who added this staff record (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e999"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string"
                    }
                  }
                }
              ],
              "nullable": true
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "VendorStaffResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Staff updated successfully"
            },
            "data": {
              "$ref": "#/components/schemas/VendorStaff"
            }
          }
        },
        "VendorStaffListResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Staff retrieved successfully"
            },
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/VendorStaff"
              }
            }
          }
        },
        "VendorStaffInviteResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Staff invited successfully"
            },
            "data": {
              "type": "object",
              "properties": {
                "staffId": {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2eaaa"
                },
                "userId": {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e111"
                },
                "email": {
                  "type": "string",
                  "example": "jane.doe@momentiv.com"
                }
              },
              "required": [
                "staffId",
                "userId",
                "email"
              ]
            }
          }
        },
        "PaginatedVendorsData": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/Vendor"
              }
            },
            "total": {
              "type": "number",
              "example": 120
            },
            "page": {
              "type": "number",
              "example": 1
            },
            "limit": {
              "type": "number",
              "example": 10
            }
          },
          "required": [
            "data",
            "total",
            "page",
            "limit"
          ]
        },
        "PaginatedVendorsResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Vendors retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/PaginatedVendorsData"
            }
          }
        },
        "ServiceCategory": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e111"
            },
            "name": {
              "type": "string",
              "example": "photography & videography"
            },
            "icon": {
              "type": "string",
              "example": "camera",
              "maxLength": 50,
              "description": "String representing the Lucide icon name for this service category"
            },
            "suggestedTags": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "example": [
                "weddingphotography",
                "portraitphotography",
                "dronephotography",
                "eventvideography"
              ],
              "description": "Array of suggested tags for this service category (lowercase)"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "ServiceSpecialty": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e222"
            },
            "serviceCategoryId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e111"
            },
            "name": {
              "type": "string",
              "example": "Wedding Photography"
            },
            "description": {
              "type": "string",
              "example": "Professional wedding photography services"
            },
            "commissionId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e222"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "VendorService": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2eabc"
            },
            "vendorId": {
              "description": "Vendor reference (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e111"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string"
                    }
                  }
                }
              ]
            },
            "serviceCategory": {
              "description": "Service category reference (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e222"
                },
                {
                  "$ref": "#/components/schemas/ServiceCategory"
                }
              ]
            },
            "tags": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "example": [
                "weddingphotography",
                "portraitphotography",
                "dronephotography"
              ],
              "description": "Lowercased tags for search/filtering"
            },
            "minimumBookingDuration": {
              "type": "string",
              "example": "one_hour"
            },
            "leadTimeRequired": {
              "type": "string",
              "example": "one_week"
            },
            "maximumEventSize": {
              "type": "string",
              "example": "small"
            },
            "additionalFees": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "example": "Extra hour"
                  },
                  "price": {
                    "type": "string",
                    "example": "10000"
                  },
                  "feeCategory": {
                    "type": "string",
                    "example": "other",
                    "nullable": true
                  }
                }
              }
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "VendorSpecialty": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2edef"
            },
            "vendorId": {
              "description": "Vendor reference (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e111"
                },
                {
                  "type": "object",
                  "properties": {
                    "_id": {
                      "type": "string"
                    }
                  }
                }
              ]
            },
            "serviceSpecialty": {
              "description": "Service specialty reference (may be populated)",
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e333"
                },
                {
                  "$ref": "#/components/schemas/ServiceSpecialty"
                }
              ]
            },
            "priceCharge": {
              "type": "string",
              "example": "package_pricing"
            },
            "price": {
              "type": "string",
              "example": "50000"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "VendorReviewerPublic": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string",
              "example": "Jane",
              "nullable": true
            },
            "lastName": {
              "type": "string",
              "example": "Doe",
              "nullable": true
            },
            "avatar": {
              "type": "string",
              "example": "https://cdn.example.com/avatars/jane.jpg",
              "nullable": true
            }
          }
        },
        "VendorReviewPublic": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2eaaa"
            },
            "vendorId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e555"
            },
            "bookingId": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2ebbb"
            },
            "rating": {
              "type": "number",
              "example": 5,
              "minimum": 0,
              "maximum": 5
            },
            "comment": {
              "type": "string",
              "example": "Fantastic experience",
              "nullable": true
            },
            "isEdited": {
              "type": "boolean",
              "example": false
            },
            "isFlagged": {
              "type": "boolean",
              "example": false
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            },
            "reviewer": {
              "$ref": "#/components/schemas/VendorReviewerPublic"
            }
          }
        },
        "PaginatedVendorReviews": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/VendorReviewPublic"
              }
            },
            "total": {
              "type": "integer",
              "example": 42
            },
            "page": {
              "type": "integer",
              "example": 1
            },
            "limit": {
              "type": "integer",
              "example": 10
            }
          }
        },
        "VendorReviewPaginatedResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Vendor reviews retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/PaginatedVendorReviews"
            }
          }
        },
        "PaginatedVendorServices": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/VendorService"
              }
            },
            "total": {
              "type": "integer",
              "example": 12
            },
            "page": {
              "type": "integer",
              "example": 1
            },
            "limit": {
              "type": "integer",
              "example": 10
            }
          }
        },
        "VendorServicesPaginatedResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Vendor services retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/PaginatedVendorServices"
            }
          }
        },
        "PaginatedVendorSpecialties": {
          "type": "object",
          "properties": {
            "data": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/VendorSpecialty"
              }
            },
            "total": {
              "type": "integer",
              "example": 12
            },
            "page": {
              "type": "integer",
              "example": 1
            },
            "limit": {
              "type": "integer",
              "example": 10
            }
          }
        },
        "VendorSpecialtiesPaginatedResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Vendor specialties retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/PaginatedVendorSpecialties"
            }
          }
        },
        "VendorServiceSearchDetail": {
          "type": "object",
          "properties": {
            "service": {
              "$ref": "#/components/schemas/VendorService"
            },
            "specialties": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/VendorSpecialty"
              }
            }
          },
          "required": [
            "service",
            "specialties"
          ]
        },
        "VendorServiceSearchDetailResponse": {
          "type": "object",
          "properties": {
            "message": {
              "type": "string",
              "example": "Search service retrieved successfully"
            },
            "data": {
              "$ref": "#/components/schemas/VendorServiceSearchDetail"
            }
          }
        },
        "Commission": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e222"
            },
            "type": {
              "type": "string",
              "example": "flat_rate"
            },
            "amount": {
              "type": "number",
              "example": 500
            },
            "currency": {
              "type": "string",
              "example": "NGN"
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "Faq": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e333"
            },
            "question": {
              "type": "string",
              "example": "How do I reset my password?",
              "maxLength": 300
            },
            "answer": {
              "type": "string",
              "example": "Use the “Forgot password” link on the login screen to receive a reset email.",
              "maxLength": 5000
            },
            "isActive": {
              "type": "boolean",
              "example": true
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "Address": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e444"
            },
            "street": {
              "type": "string",
              "example": "123 Main St"
            },
            "city": {
              "type": "string",
              "example": "lagos"
            },
            "state": {
              "type": "string",
              "example": "lagos"
            },
            "postalCode": {
              "type": "string",
              "example": "100001"
            },
            "country": {
              "type": "string",
              "example": "NG"
            },
            "long": {
              "type": "number",
              "example": 3.3792
            },
            "lat": {
              "type": "number",
              "example": 6.5244
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        },
        "CustomerRequest": {
          "type": "object",
          "properties": {
            "_id": {
              "type": "string",
              "example": "64f0c2f7a2b6c1a9b3d2e333"
            },
            "customerId": {
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e111"
                },
                {
                  "$ref": "#/components/schemas/User"
                }
              ]
            },
            "serviceCategoryId": {
              "oneOf": [
                {
                  "type": "string",
                  "example": "64f0c2f7a2b6c1a9b3d2e222"
                },
                {
                  "$ref": "#/components/schemas/ServiceCategory"
                }
              ]
            },
            "eventDetails": {
              "type": "string",
              "example": "Looking for a photographer for my wedding on June 15th."
            },
            "createdAt": {
              "type": "string",
              "format": "date-time"
            },
            "updatedAt": {
              "type": "string",
              "format": "date-time"
            }
          }
        }
      }
    },
    "tags": [
      {
        "name": "Auth",
        "description": "Authentication related endpoints"
      },
      {
        "name": "Users",
        "description": "User management endpoints"
      },
      {
        "name": "BusinessProfiles",
        "description": "Business profile management endpoints"
      },
      {
        "name": "Uploads",
        "description": "File upload and retrieval endpoints"
      },
      {
        "name": "Admin",
        "description": "Admin payment and reporting endpoints"
      },
      {
        "name": "Bookings",
        "description": "Booking payment endpoints"
      },
      {
        "name": "Customers",
        "description": "Customer payment method endpoints"
      },
      {
        "name": "Vendors",
        "description": "Vendor management endpoints"
      },
      {
        "name": "Webhooks",
        "description": "Webhook endpoints (e.g., Stripe)"
      },
      {
        "name": "Logs",
        "description": "Admin log querying endpoints (audit, error, request, app, integration)"
      },
      {
        "name": "ServiceCategories",
        "description": "Service category management endpoints"
      },
      {
        "name": "ServiceSpecialties",
        "description": "Service specialty management endpoints"
      },
      {
        "name": "Faqs",
        "description": "FAQ management endpoints"
      },
      {
        "name": "Addresses",
        "description": "Address management endpoints"
      },
      {
        "name": "Chats",
        "description": "Realtime + persisted chat endpoints.\n\nRealtime transport (Socket.IO)\n- URL: same origin as API (e.g. http://localhost:5000)\n- Path: /socket.io (default Socket.IO path)\n- Auth: pass the JWT access token via Socket.IO handshake:\n  - Recommended: io(API_ORIGIN, { auth: { token: <JWT> } })\n  - Alternative: io(API_ORIGIN, { extraHeaders: { Authorization: 'Bearer <JWT>' } })\n\nRealtime events\n- Client -> Server: chat:join { conversationId }\n- Client -> Server: chat:leave { conversationId }\n- Client -> Server: chat:send { conversationId, type, text?, attachments?, replyToMessageId?, clientMessageId? }\n- Client -> Server: chat:read { conversationId }\n- Server -> Client: chat:message { conversationId, data: <ChatMessage> }\n- Server -> Client: chat:read { conversationId, data: <ChatConversation> }\n\nNotes\n- You must emit chat:join for a conversation to receive realtime broadcasts.\n- clientMessageId is recommended for idempotent sends/retries.\n\nFull frontend guide: docs/CHAT_REALTIME.md"
      },
      {
        "name": "Commissions",
        "description": "Commission management endpoints"
      },
      {
        "name": "VendorServices",
        "description": "Vendor service management endpoints"
      },
      {
        "name": "VendorSpecialties",
        "description": "Vendor specialty management endpoints"
      },
      {
        "name": "SupportRequests",
        "description": "Support request/contact endpoints"
      },
      {
        "name": "CustomerRequests",
        "description": "Customer request endpoints"
      }
    ],
    "paths": {
      "/api/v1/addresses": {
        "post": {
          "tags": [
            "Addresses"
          ],
          "summary": "Create an address",
          "description": "Creates a new address. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateAddressInput"
                },
                "example": {
                  "street": "10 Admiralty Way",
                  "city": "lekki",
                  "state": "lagos",
                  "postalCode": "100001",
                  "country": "NG",
                  "lat": 6.4474,
                  "long": 3.4567
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Address created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Address created successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Address"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/addresses/{id}": {
        "get": {
          "tags": [
            "Addresses"
          ],
          "summary": "Get an address by ID",
          "description": "Returns a single address. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Address retrieved successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not found"
            }
          }
        },
        "patch": {
          "tags": [
            "Addresses"
          ],
          "summary": "Update an address",
          "description": "Updates fields on an existing address. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateAddressInput"
                },
                "example": {
                  "street": "12 Admiralty Way",
                  "lat": 6.4475,
                  "long": 3.4568
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Address updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Address updated successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Address"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not found"
            }
          }
        },
        "delete": {
          "tags": [
            "Addresses"
          ],
          "summary": "Delete an address",
          "description": "Deletes an address by ID. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Address deleted successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not found"
            }
          }
        }
      },
      "/api/v1/admin/transactions": {
        "get": {
          "tags": [
            "Admin"
          ],
          "summary": "Get all platform transactions",
          "description": "Returns a paginated list of completed transactions (bookings with succeeded payments) across the platform.\nSupports filtering by date range and payment model.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1,
                "minimum": 1
              },
              "description": "Page number"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 20,
                "minimum": 1,
                "maximum": 100
              },
              "description": "Results per page"
            },
            {
              "in": "query",
              "name": "from",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Filter transactions paid on or after this date"
            },
            {
              "in": "query",
              "name": "to",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Filter transactions paid on or before this date"
            },
            {
              "in": "query",
              "name": "paymentModel",
              "schema": {
                "type": "string",
                "enum": [
                  "upfront_payout",
                  "split_payout"
                ]
              },
              "description": "Filter by payment model"
            }
          ],
          "responses": {
            "200": {
              "description": "Transactions retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Transactions retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "bookingId": {
                                  "type": "string"
                                },
                                "paymentIntentId": {
                                  "type": "string"
                                },
                                "paymentModel": {
                                  "type": "string"
                                },
                                "amountMinor": {
                                  "type": "number"
                                },
                                "commissionMinor": {
                                  "type": "number"
                                },
                                "vendorPayoutMinor": {
                                  "type": "number"
                                },
                                "currency": {
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "number"
                          },
                          "page": {
                            "type": "number"
                          },
                          "limit": {
                            "type": "number"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/admin/revenue": {
        "get": {
          "tags": [
            "Admin"
          ],
          "summary": "Get platform revenue report",
          "description": "Returns aggregated revenue totals for the requested period.\nIncludes total revenue, platform commission, vendor payout totals, and breakdown by payment model.\n\n⚠️ **Amount fields:** All monetary values with a `Minor` suffix (e.g. `totalRevenueMinor`, `platformCommissionMinor`, `vendorPayoutMinor`, `amountMinor`) are in **minor currency units** (pence for GBP, cents for USD). Divide by `_meta.minorUnitDivisor` (100) for display.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "period",
              "schema": {
                "type": "string",
                "enum": [
                  "day",
                  "week",
                  "month",
                  "year"
                ],
                "default": "month"
              },
              "description": "Period for the report (determines default date range when from/to are omitted)"
            },
            {
              "in": "query",
              "name": "from",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Start of date range"
            },
            {
              "in": "query",
              "name": "to",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "End of date range"
            }
          ],
          "responses": {
            "200": {
              "description": "Revenue report retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Revenue report retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_meta": {
                            "type": "object",
                            "description": "Metadata about response format and currency units",
                            "properties": {
                              "amountsInMinorUnits": {
                                "type": "boolean",
                                "example": true
                              },
                              "minorUnitDivisor": {
                                "type": "integer",
                                "example": 100
                              },
                              "note": {
                                "type": "string",
                                "example": "All fields ending in 'Minor' are in minor currency units. Divide by 100 for display."
                              }
                            }
                          },
                          "period": {
                            "type": "string",
                            "example": "month"
                          },
                          "from": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "to": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "totalRevenueMinor": {
                            "type": "number"
                          },
                          "platformCommissionMinor": {
                            "type": "number"
                          },
                          "vendorPayoutMinor": {
                            "type": "number"
                          },
                          "transactionCount": {
                            "type": "number"
                          },
                          "byPaymentModel": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "model": {
                                  "type": "string"
                                },
                                "amountMinor": {
                                  "type": "number"
                                },
                                "count": {
                                  "type": "number"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/admin/analytics/overview": {
        "get": {
          "tags": [
            "Admin"
          ],
          "summary": "Analytics overview",
          "description": "Returns the full admin dashboard analytics payload (performance metrics, breakdowns, top vendors, and today stats).\n\n⚠️ **Amount fields:** All monetary values with a `Minor` suffix (e.g. `totalRevenueMinor`, `pendingPayoutMinor`, `activeEscrowMinor`, `amountMinor`) are in **minor currency units** (pence for GBP, cents for USD). Divide by `_meta.minorUnitDivisor` (100) for display.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "from",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Start of range (defaults to last 30 days)"
            },
            {
              "in": "query",
              "name": "to",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "End of range (defaults to now)"
            },
            {
              "in": "query",
              "name": "currency",
              "schema": {
                "type": "string",
                "example": "GBP"
              },
              "description": "Optional currency filter"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 5,
                "minimum": 1,
                "maximum": 20
              },
              "description": "How many rows to return for \"top\" lists"
            }
          ],
          "responses": {
            "200": {
              "description": "Analytics overview retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AdminAnalyticsOverviewResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/admin/analytics/booking-trends": {
        "get": {
          "tags": [
            "Admin"
          ],
          "summary": "Booking trends time series",
          "description": "Returns a time series of bookings and revenue grouped by `period` (day/week/month/year).\nCash basis: only successful payments are counted, bucketed by `payment.paidAt`.\n\n⚠️ **Amount fields:** `revenueMinor` and `commissionMinor` are in **minor currency units**. Divide by `_meta.minorUnitDivisor` (100) for display.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "from",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Start of range (defaults to last 30 days)"
            },
            {
              "in": "query",
              "name": "to",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "End of range (defaults to now)"
            },
            {
              "in": "query",
              "name": "period",
              "schema": {
                "type": "string",
                "enum": [
                  "day",
                  "week",
                  "month",
                  "year"
                ],
                "default": "day"
              },
              "description": "Bucket size for the time series"
            },
            {
              "in": "query",
              "name": "currency",
              "schema": {
                "type": "string",
                "example": "GBP"
              },
              "description": "Optional currency filter"
            }
          ],
          "responses": {
            "200": {
              "description": "Booking trends retrieved successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/admin/payouts/pending": {
        "get": {
          "tags": [
            "Admin"
          ],
          "summary": "Get pending vendor payouts",
          "description": "Returns a paginated list of split_payout bookings that are paid but have not yet had their payout released to the vendor.\nAdmins use this to identify bookings that need a manual payout release via POST /admin/bookings/{bookingId}/release-payout.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1,
                "minimum": 1
              },
              "description": "Page number"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 20,
                "minimum": 1,
                "maximum": 100
              },
              "description": "Results per page"
            }
          ],
          "responses": {
            "200": {
              "description": "Pending payouts retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Pending payouts retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "bookingId": {
                                  "type": "string"
                                },
                                "paymentIntentId": {
                                  "type": "string"
                                },
                                "paidAt": {
                                  "type": "string",
                                  "format": "date-time"
                                },
                                "amountMinor": {
                                  "type": "number"
                                },
                                "commissionMinor": {
                                  "type": "number"
                                },
                                "vendorPayoutMinor": {
                                  "type": "number"
                                },
                                "currency": {
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "number"
                          },
                          "page": {
                            "type": "number"
                          },
                          "limit": {
                            "type": "number"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/admin/payment-queue": {
        "get": {
          "tags": [
            "Admin"
          ],
          "summary": "Get payment queue",
          "description": "Returns a paginated list of payment-related bookings, shaped for the admin Payment Queue UI.\nNote: advanced Stripe states like manual review/disputes require webhook syncing (not fully implemented yet).\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 20,
                "maximum": 100
              }
            },
            {
              "in": "query",
              "name": "status",
              "description": "Derived queue status.",
              "schema": {
                "type": "string",
                "enum": [
                  "all",
                  "success",
                  "pending",
                  "failed",
                  "refunded"
                ],
                "default": "all"
              }
            },
            {
              "in": "query",
              "name": "vendorId",
              "schema": {
                "type": "string",
                "example": "64f0c2f7a2b6c1a9b3d2e555"
              }
            },
            {
              "in": "query",
              "name": "customerId",
              "schema": {
                "type": "string",
                "example": "64f0c2f7a2b6c1a9b3d2e111"
              }
            },
            {
              "in": "query",
              "name": "bookingStatus",
              "schema": {
                "type": "string",
                "enum": [
                  "pending_payment",
                  "paid",
                  "confirmed",
                  "completed",
                  "cancelled",
                  "refunded"
                ]
              }
            },
            {
              "in": "query",
              "name": "paymentStatus",
              "schema": {
                "type": "string",
                "enum": [
                  "not_started",
                  "requires_payment_method",
                  "requires_confirmation",
                  "requires_action",
                  "requires_capture",
                  "processing",
                  "succeeded",
                  "canceled"
                ]
              }
            },
            {
              "in": "query",
              "name": "from",
              "description": "Filter by booking createdAt (inclusive).",
              "schema": {
                "type": "string",
                "format": "date-time"
              }
            },
            {
              "in": "query",
              "name": "to",
              "description": "Filter by booking createdAt (inclusive).",
              "schema": {
                "type": "string",
                "format": "date-time"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Payment queue retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaymentQueueResponse"
                  },
                  "examples": {
                    "sample": {
                      "summary": "Example response",
                      "value": {
                        "message": "Payment queue retrieved successfully",
                        "data": {
                          "data": [
                            {
                              "bookingId": "64f1c2a9b3d6f5a2c1e9a111",
                              "transactionId": "pi_3NQwq2LkKp0b5Z8A1abc123",
                              "paymentIntentId": "pi_3NQwq2LkKp0b5Z8A1abc123",
                              "transferId": "tr_1NQwrALkKp0b5Z8A2def456",
                              "createdAt": "2026-01-18T10:15:00.000Z",
                              "paidAt": "2026-01-18T10:16:10.000Z",
                              "releasedAt": null,
                              "amountMinor": 183000,
                              "currency": "GBP",
                              "status": {
                                "queue": "success",
                                "booking": "paid",
                                "payment": "succeeded"
                              },
                              "customer": {
                                "_id": "64f0c2f7a2b6c1a9b3d2e111",
                                "firstName": "Ada",
                                "lastName": "Lovelace",
                                "email": "ada@example.com",
                                "phoneNumber": "+447700900000"
                              },
                              "vendor": {
                                "_id": "64f0c2f7a2b6c1a9b3d2e555",
                                "businessName": "Momentiv Studios",
                                "owner": {
                                  "_id": "64f0c2f7a2b6c1a9b3d2e222",
                                  "firstName": "John",
                                  "lastName": "Vendor",
                                  "email": "vendor@example.com",
                                  "phoneNumber": "+447700900111"
                                }
                              },
                              "actions": {
                                "canRefund": true,
                                "canReleasePayout": true
                              }
                            }
                          ],
                          "total": 1,
                          "page": 1,
                          "limit": 20
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/admin/payment-queue/sync-stripe": {
        "post": {
          "tags": [
            "Admin"
          ],
          "summary": "Sync booking payment statuses from Stripe",
          "description": "Admin-only reconciliation endpoint. For every booking with a stored Stripe PaymentIntent,\nfetches the current PaymentIntent from Stripe and updates the local booking payment status.\n\nBehavior:\n- Updates `payment.status` from Stripe.\n- Sets `payment.paidAt` when Stripe says the PaymentIntent succeeded and `paidAt` is missing.\n- Promotes `pending_payment` bookings to `paid` when Stripe status is `succeeded`.\n- Marks `pending_payment` bookings as `cancelled` when Stripe status is `canceled`.\n- Never downgrades bookings that already moved beyond payment.\n- On non-dry-run paid/cancelled promotions, creates the same idempotent payment notifications as the Stripe webhook path.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "dryRun": {
                      "type": "boolean",
                      "default": false,
                      "description": "Preview changes without writing to MongoDB."
                    },
                    "limit": {
                      "type": "integer",
                      "minimum": 1,
                      "description": "Optional max number of bookings to process. Omit to process all candidates."
                    },
                    "onlyPending": {
                      "type": "boolean",
                      "default": false,
                      "description": "Only process local payment statuses in the pending bucket."
                    },
                    "bookingId": {
                      "type": "string",
                      "description": "Optional single booking id to sync."
                    }
                  }
                },
                "examples": {
                  "syncAll": {
                    "summary": "Sync all stored Stripe PaymentIntents",
                    "value": {}
                  },
                  "preview": {
                    "summary": "Preview first 50 pending payments",
                    "value": {
                      "dryRun": true,
                      "limit": 50,
                      "onlyPending": true
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Stripe payment status sync completed"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/admin/bookings": {
        "get": {
          "tags": [
            "Admin"
          ],
          "summary": "List all bookings",
          "description": "Returns a paginated list of all bookings across the platform (admin only). Each booking includes populated vendor info with business profile and profile photo.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10,
                "maximum": 100
              }
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "default": "all"
              },
              "description": "Filter by booking status (or 'all')"
            },
            {
              "in": "query",
              "name": "vendorId",
              "schema": {
                "type": "string"
              },
              "description": "Filter bookings by vendorId"
            },
            {
              "in": "query",
              "name": "customerId",
              "schema": {
                "type": "string"
              },
              "description": "Filter bookings by customerId"
            },
            {
              "in": "query",
              "name": "from",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Filter by event startDate >= from"
            },
            {
              "in": "query",
              "name": "to",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Filter by event startDate <= to"
            }
          ],
          "responses": {
            "200": {
              "description": "Bookings retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Bookings retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string",
                                  "example": "64f1c2a9b3d6f5a2c1e9a111"
                                },
                                "customerRequestId": {
                                  "type": "object",
                                  "nullable": true
                                },
                                "quoteId": {
                                  "type": "object",
                                  "nullable": true
                                },
                                "vendorId": {
                                  "type": "object",
                                  "description": "Populated vendor document with nested business profile and profile photo",
                                  "properties": {
                                    "_id": {
                                      "type": "string"
                                    },
                                    "userId": {
                                      "type": "string"
                                    },
                                    "businessProfile": {
                                      "type": "object",
                                      "nullable": true,
                                      "description": "Vendor's business profile details",
                                      "properties": {
                                        "_id": {
                                          "type": "string"
                                        },
                                        "businessName": {
                                          "type": "string",
                                          "example": "Momentiv Studios"
                                        },
                                        "businessDescription": {
                                          "type": "string"
                                        },
                                        "companyRegNo": {
                                          "type": "string"
                                        },
                                        "businessRegType": {
                                          "type": "string"
                                        },
                                        "yearInBusiness": {
                                          "type": "string"
                                        },
                                        "contactInfo": {
                                          "type": "object",
                                          "properties": {
                                            "primaryContactName": {
                                              "type": "string"
                                            },
                                            "emailAddress": {
                                              "type": "string"
                                            },
                                            "phoneNumber": {
                                              "type": "string"
                                            }
                                          }
                                        }
                                      }
                                    },
                                    "profilePhoto": {
                                      "type": "object",
                                      "nullable": true,
                                      "description": "Vendor's profile picture file",
                                      "properties": {
                                        "_id": {
                                          "type": "string"
                                        },
                                        "url": {
                                          "type": "string"
                                        },
                                        "mimetype": {
                                          "type": "string"
                                        }
                                      }
                                    },
                                    "isActive": {
                                      "type": "boolean"
                                    },
                                    "rate": {
                                      "type": "number"
                                    }
                                  }
                                },
                                "customerId": {
                                  "type": "object",
                                  "properties": {
                                    "_id": {
                                      "type": "string"
                                    },
                                    "firstName": {
                                      "type": "string"
                                    },
                                    "lastName": {
                                      "type": "string"
                                    },
                                    "email": {
                                      "type": "string"
                                    }
                                  }
                                },
                                "serviceCategoryId": {
                                  "type": "object",
                                  "nullable": true
                                },
                                "eventDetails": {
                                  "type": "object",
                                  "properties": {
                                    "title": {
                                      "type": "string"
                                    },
                                    "startDate": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "endDate": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "guestCount": {
                                      "type": "integer"
                                    },
                                    "description": {
                                      "type": "string"
                                    }
                                  }
                                },
                                "location": {
                                  "type": "object",
                                  "properties": {
                                    "addressText": {
                                      "type": "string"
                                    },
                                    "lat": {
                                      "type": "number"
                                    },
                                    "long": {
                                      "type": "number"
                                    }
                                  }
                                },
                                "currency": {
                                  "type": "string",
                                  "example": "GBP"
                                },
                                "amounts": {
                                  "type": "object",
                                  "properties": {
                                    "subtotal": {
                                      "type": "number"
                                    },
                                    "fees": {
                                      "type": "number"
                                    },
                                    "commission": {
                                      "type": "number"
                                    },
                                    "total": {
                                      "type": "number"
                                    }
                                  }
                                },
                                "paymentModel": {
                                  "type": "string"
                                },
                                "status": {
                                  "type": "string"
                                },
                                "payment": {
                                  "type": "object",
                                  "properties": {
                                    "provider": {
                                      "type": "string"
                                    },
                                    "status": {
                                      "type": "string"
                                    },
                                    "paymentIntentId": {
                                      "type": "string"
                                    },
                                    "transferId": {
                                      "type": "string"
                                    },
                                    "paidAt": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "releasedAt": {
                                      "type": "string",
                                      "format": "date-time"
                                    }
                                  }
                                },
                                "createdAt": {
                                  "type": "string",
                                  "format": "date-time"
                                },
                                "updatedAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "integer"
                          },
                          "page": {
                            "type": "integer"
                          },
                          "limit": {
                            "type": "integer"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/admin/bookings/{bookingId}/release-payout": {
        "post": {
          "tags": [
            "Admin"
          ],
          "summary": "Release payout for booking",
          "description": "Releases vendor payout for a paid booking (admin only).\n\nStripe flow (SPLIT_PAYOUT only):\n- Customer pays a Stripe PaymentIntent on the platform.\n- After service completion, admin calls this endpoint.\n- Backend creates a Stripe Transfer to the vendor's connected account for `(total - commission)`.\n- Booking is updated with `transferId` and marked completed.\n\nNotes:\n- Requires the vendor's connected account to be transfer-enabled (onboarding complete).\n- If the booking used an upfront destination charge, payout is already handled at charge time and this endpoint should not be used.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string",
                "example": "64f1c2a9b3d6f5a2c1e9a111"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Payout released successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AdminReleasePayoutResponse"
                  },
                  "examples": {
                    "sample": {
                      "value": {
                        "message": "Payout released successfully",
                        "data": {
                          "bookingId": "64f1c2a9b3d6f5a2c1e9a111",
                          "transferId": "tr_1NQwrALkKp0b5Z8A2def456",
                          "amount": 170000
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/admin/bookings/{bookingId}/refund": {
        "post": {
          "tags": [
            "Admin"
          ],
          "summary": "Refund booking payment",
          "description": "Creates a Stripe Refund for the booking's PaymentIntent (admin only).\n\nBehavior:\n- If `amount` is provided, a partial refund is created.\n- If `amount` is omitted, Stripe refunds the full amount.\n- Amount is in minor units (e.g. cents/pence).\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string",
                "example": "64f1c2a9b3d6f5a2c1e9a111"
              }
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "amount": {
                      "type": "integer",
                      "description": "Refund amount in minor units (e.g. pence/cents). If omitted, refunds full amount.",
                      "example": 54900
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Refund created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/AdminRefundResponse"
                  },
                  "examples": {
                    "sample": {
                      "value": {
                        "message": "Refund created successfully",
                        "data": {
                          "bookingId": "64f1c2a9b3d6f5a2c1e9a111",
                          "refundId": "re_1NQx0bLkKp0b5Z8A9ghi789",
                          "amount": 54900
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/admin/disputes": {
        "get": {
          "tags": [
            "Admin - Disputes"
          ],
          "summary": "Get all disputes (paginated)",
          "description": "Returns a paginated list of disputes across the entire platform (admin only).\nSupports filtering by status, priority, vendor, customer, booking, and filed date range.\n\n**Status filter values:**\n- `all` – all disputes regardless of status (default)\n- `open` – all non-terminal disputes (evidence, mediation, review, escalated)\n- `evidence` – initial state, 48h evidence window active\n- `mediation` – both parties in mediation\n- `review` – under admin review\n- `escalated` – escalated to higher authority by admin\n- `closed` – resolved by admin (terminal)\n- `archived` – cancelled by client (terminal)\n\n**Roles:** `admin`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number for pagination"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 10
              },
              "description": "Number of disputes per page (max 100)"
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "all",
                  "open",
                  "mediation",
                  "evidence",
                  "review",
                  "escalated",
                  "closed",
                  "archived"
                ],
                "default": "all"
              },
              "description": "Filter disputes by status. Use `all` to retrieve all disputes, or `open` to retrieve only non-terminal disputes (evidence, mediation, review, escalated).\n"
            },
            {
              "in": "query",
              "name": "priority",
              "schema": {
                "type": "string",
                "default": "all"
              },
              "description": "Filter disputes by priority (use `all` for any)"
            },
            {
              "in": "query",
              "name": "vendorId",
              "schema": {
                "type": "string"
              },
              "description": "Optional – filter by vendor ObjectId"
            },
            {
              "in": "query",
              "name": "customerId",
              "schema": {
                "type": "string"
              },
              "description": "Optional – filter by customer(user) ObjectId"
            },
            {
              "in": "query",
              "name": "bookingId",
              "schema": {
                "type": "string"
              },
              "description": "Optional – filter by booking ObjectId"
            },
            {
              "in": "query",
              "name": "from",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Start of filed date range filter (ISO 8601)"
            },
            {
              "in": "query",
              "name": "to",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "End of filed date range filter (ISO 8601)"
            }
          ],
          "responses": {
            "200": {
              "description": "Disputes retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DisputePaginatedResponse"
                  },
                  "examples": {
                    "openDisputes": {
                      "summary": "Open disputes response (status=open)",
                      "value": {
                        "message": "Disputes retrieved successfully",
                        "data": {
                          "data": [
                            {
                              "_id": "64f1c2a9b3d6f5a2c1e9a999",
                              "caseId": "D-1234",
                              "status": "evidence",
                              "priority": "high",
                              "amountInDisputeMinor": 54900,
                              "currency": "GBP",
                              "filedAt": "2025-07-01T14:00:00.000Z",
                              "windowEndsAt": "2025-07-03T14:00:00.000Z",
                              "client": {
                                "userId": "64f0c2f7a2b6c1a9b3d2e111",
                                "nameSnapshot": "Jane Doe"
                              },
                              "vendor": {
                                "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                                "nameSnapshot": "Acme Photography"
                              },
                              "booking": {
                                "bookingId": "64f1c2a9b3d6f5a2c1e9a111"
                              },
                              "reason": {
                                "clientClaim": "Photos were poorly lit and do not match portfolio quality."
                              },
                              "createdAt": "2025-07-01T14:00:00.000Z",
                              "updatedAt": "2025-07-01T14:00:00.000Z"
                            }
                          ],
                          "total": 1,
                          "page": 1,
                          "limit": 10
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized – missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden – requires admin role"
            }
          }
        }
      },
      "/api/v1/admin/disputes/escalation-levels": {
        "get": {
          "tags": [
            "Admin - Disputes"
          ],
          "summary": "Get escalation levels",
          "description": "Returns the available escalation level options for the dispute escalation form (admin only).\n\n**Levels (lowest → highest):**\n1. `level_1_senior_admin_review` – Senior Admin Review\n2. `level_2_department_head` – Department Head\n3. `level_3_legal_team` – Legal Team\n4. `level_4_executive` – Executive\n5. `level_5_external_mediation` – External Mediation\n\nUse these values when calling `POST /admin/disputes/{disputeId}/escalate`.\n\n**Roles:** `admin`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Escalation levels retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/EscalationLevelsResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized – missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden – requires admin role"
            }
          }
        }
      },
      "/api/v1/admin/disputes/escalation-reasons": {
        "get": {
          "tags": [
            "Admin - Disputes"
          ],
          "summary": "Get escalation reasons",
          "description": "Returns the available escalation reason options for the dispute escalation form (admin only).\n\n**Reasons:**\n- `high_financial_value` – High financial value\n- `legal_complexity` – Legal complexity\n- `platform_policy_conflict` – Platform policy conflict\n- `repeat_disputer` – Repeat disputer\n- `vendor_performance_concerns` – Vendor performance concerns\n- `customer_service_risk` – Customer service risk\n- `other` – Other (requires `otherReason` text, max 200 chars)\n\nEach option includes a `requiresOtherText` flag. When `true`, the frontend\nmust show a text input and send the `otherReason` field on the escalation request.\n\nUse these values when calling `POST /admin/disputes/{disputeId}/escalate`.\n\n**Roles:** `admin`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Escalation reasons retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/EscalationReasonsResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized – missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden – requires admin role"
            }
          }
        }
      },
      "/api/v1/admin/disputes/{disputeId}/escalate": {
        "post": {
          "tags": [
            "Admin - Disputes"
          ],
          "summary": "Escalate dispute",
          "description": "Creates an escalation record (`EscalateDispute`) for a dispute and sets the dispute status to `escalated`.\n\n**What happens:**\n- An `EscalateDispute` record is created linking the dispute to the escalation details.\n- The dispute status transitions to `escalated`.\n- A timeline event of type `escalated` is appended to the dispute.\n- Creates `dispute.escalated` notifications for the customer, vendor team, and admins.\n\n**Escalation levels (lowest → highest):**\n1. `level_1_senior_admin_review`\n2. `level_2_department_head`\n3. `level_3_legal_team`\n4. `level_4_executive`\n5. `level_5_external_mediation`\n\n**Urgency levels & target response times:**\n- `normal` → 48 hours\n- `high` → 24 hours\n- `critical` → 4 hours\n\n**Business rules:**\n- Cannot escalate a `closed` or `archived` dispute.\n- When `escalationReason` is `other`, the `otherReason` field is required (2–200 chars).\n- Use `GET /admin/disputes/escalation-levels` and `GET /admin/disputes/escalation-reasons` to populate form dropdowns.\n\n**Roles:** `admin`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "disputeId",
              "required": true,
              "description": "The MongoDB ObjectId of the dispute to escalate",
              "schema": {
                "type": "string",
                "example": "64f1c2a9b3d6f5a2c1e9a999"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/EscalateDisputeInput"
                },
                "examples": {
                  "legalEscalation": {
                    "summary": "Escalate to legal team",
                    "value": {
                      "escalationLevel": "level_3_legal_team",
                      "escalationReason": "legal_complexity",
                      "additionalContext": "Vendor alleges extenuating circumstances; needs higher-level decision.",
                      "urgencyLevel": "high"
                    }
                  },
                  "otherReason": {
                    "summary": "Escalate with custom reason",
                    "value": {
                      "escalationLevel": "level_2_department_head",
                      "escalationReason": "other",
                      "otherReason": "Unusual circumstance not covered by standard reasons.",
                      "urgencyLevel": "normal"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Dispute escalated successfully. Status is now `escalated`.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/EscalateDisputeResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Validation error or dispute is already closed/archived"
            },
            "401": {
              "description": "Unauthorized – missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden – requires admin role"
            },
            "404": {
              "description": "Dispute not found"
            }
          }
        }
      },
      "/api/v1/admin/disputes/{disputeId}/resolve": {
        "post": {
          "tags": [
            "Admin - Disputes"
          ],
          "summary": "Resolve a dispute",
          "description": "Creates a `DisputeResolution` record and sets the dispute status to `closed`. This is the terminal action for a dispute.\n\n**What happens:**\n- A `DisputeResolution` record is created with the resolution details.\n- The dispute status transitions to `closed`.\n- `closedAt` timestamp is set on the dispute.\n- A timeline event of type `resolved` is appended to the dispute.\n- Creates `dispute.resolved` notifications for the customer, vendor team, and admins.\n\n**Resolution types:**\n- `partial_refund` – Partial refund to the customer\n- `vendor_credit` – Credit applied to vendor account\n- `full_refund` – Full refund to the customer\n- `denied` – Dispute claim denied\n- `mediated` – Resolved through mediation\n\n**Business rules:**\n- Cannot resolve an `archived` dispute (cancelled by client).\n- Only **one resolution** per dispute (unique constraint on `disputeId`).\n- `amountMinor` is in minor currency units (e.g. 32000 = £320.00).\n- Default currency is `GBP` if not specified.\n- This action is **irreversible**.\n\n**Roles:** `admin`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "disputeId",
              "required": true,
              "description": "The MongoDB ObjectId of the dispute to resolve",
              "schema": {
                "type": "string",
                "example": "64f1c2a9b3d6f5a2c1e9a999"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ResolveDisputeInput"
                },
                "examples": {
                  "partialRefund": {
                    "summary": "Partial refund",
                    "value": {
                      "resolution": "partial_refund",
                      "amountMinor": 32000,
                      "currency": "GBP",
                      "notes": "Approved partial refund after review."
                    }
                  },
                  "fullRefund": {
                    "summary": "Full refund",
                    "value": {
                      "resolution": "full_refund",
                      "amountMinor": 183000,
                      "currency": "GBP",
                      "notes": "Full refund granted — vendor failed to deliver."
                    }
                  },
                  "denied": {
                    "summary": "Deny the dispute",
                    "value": {
                      "resolution": "denied",
                      "amountMinor": 0,
                      "notes": "No evidence of service failure. Dispute denied."
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Dispute resolved successfully. Status is now `closed`.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DisputeResolutionResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Validation error, dispute is archived, or already resolved"
            },
            "401": {
              "description": "Unauthorized – missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden – requires admin role"
            },
            "404": {
              "description": "Dispute not found"
            }
          }
        }
      },
      "/api/v1/admin/dispute-resolutions": {
        "get": {
          "tags": [
            "Admin - Disputes"
          ],
          "summary": "Get all dispute resolutions (paginated)",
          "description": "Returns a paginated list of dispute resolutions across the entire platform (admin only).\nSupports filtering by resolution type, date range, and vendor.\n\nEach resolution record links to the original dispute and includes the resolution type,\namount in minor currency units, who resolved it, and optional notes.\n\n**Roles:** `admin`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number for pagination"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 10
              },
              "description": "Number of resolutions per page"
            },
            {
              "in": "query",
              "name": "resolution",
              "schema": {
                "type": "string",
                "enum": [
                  "all",
                  "partial_refund",
                  "vendor_credit",
                  "full_refund",
                  "denied",
                  "mediated"
                ],
                "default": "all"
              },
              "description": "Filter by resolution type"
            },
            {
              "in": "query",
              "name": "vendorId",
              "schema": {
                "type": "string"
              },
              "description": "Optional – filter resolutions by a specific vendor ObjectId"
            },
            {
              "in": "query",
              "name": "from",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Start of date range filter (ISO 8601)"
            },
            {
              "in": "query",
              "name": "to",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "End of date range filter (ISO 8601)"
            }
          ],
          "responses": {
            "200": {
              "description": "Dispute resolutions retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DisputeResolutionPaginatedResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized – missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden – requires admin role"
            }
          }
        }
      },
      "/api/v1/admin/vendors": {
        "get": {
          "tags": [
            "Admin - Vendor Management"
          ],
          "summary": "List all vendors (admin)",
          "description": "Returns a paginated list of **all** vendors regardless of `isActive` status.\nUnlike the public `GET /api/v1/vendors` endpoint (which only returns active + onboarded vendors),\nthis admin endpoint exposes every vendor record so admins can manage inactive or\nnot-yet-onboarded vendors from the dashboard.\n\n**Optional filters:**\n- `search` — partial match on business name, business description, or primary contact name.\n- `isActive` — `true` / `false` to narrow by activation status.\n- `onBoarded` — `true` / `false` to narrow by onboarding status.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              },
              "description": "Page number (1-based)"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              },
              "description": "Number of records per page (max 100)"
            },
            {
              "in": "query",
              "name": "search",
              "schema": {
                "type": "string"
              },
              "description": "Search by business name, description, or primary contact name",
              "example": "event planners"
            },
            {
              "in": "query",
              "name": "isActive",
              "schema": {
                "type": "boolean"
              },
              "description": "Filter by active status (`true` = active, `false` = inactive)"
            },
            {
              "in": "query",
              "name": "onBoarded",
              "schema": {
                "type": "boolean"
              },
              "description": "Filter by onboarded status"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendors retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendors retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string",
                                  "example": "665a1b2c3d4e5f6a7b8c9d0e"
                                },
                                "userId": {
                                  "type": "object",
                                  "properties": {
                                    "_id": {
                                      "type": "string"
                                    },
                                    "firstName": {
                                      "type": "string",
                                      "example": "John"
                                    },
                                    "lastName": {
                                      "type": "string",
                                      "example": "Doe"
                                    },
                                    "email": {
                                      "type": "string",
                                      "example": "john@example.com"
                                    }
                                  }
                                },
                                "businessProfile": {
                                  "type": "object",
                                  "properties": {
                                    "businessName": {
                                      "type": "string",
                                      "example": "Elite Events Ltd"
                                    },
                                    "businessDescription": {
                                      "type": "string"
                                    }
                                  }
                                },
                                "isActive": {
                                  "type": "boolean",
                                  "example": true
                                },
                                "onBoarded": {
                                  "type": "boolean",
                                  "example": true
                                },
                                "rate": {
                                  "type": "number",
                                  "example": 4.5
                                },
                                "createdAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 42
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized — missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden — caller is not an admin"
            }
          }
        }
      },
      "/api/v1/admin/vendors/{vendorId}": {
        "get": {
          "tags": [
            "Admin - Vendor Management"
          ],
          "summary": "Get a single vendor by ID (admin)",
          "description": "Returns the full vendor record regardless of `isActive` or `onBoarded` status.\nUnlike the public `GET /api/v1/vendors/{vendorId}` (which only returns active + onboarded),\nthis endpoint always returns the vendor if the document exists.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The vendor ObjectId",
              "example": "665a1b2c3d4e5f6a7b8c9d0e"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "userId": {
                            "type": "object",
                            "description": "Populated user with avatar and address"
                          },
                          "businessProfile": {
                            "type": "object",
                            "description": "Populated business profile with documents"
                          },
                          "address": {
                            "type": "object"
                          },
                          "profilePhoto": {
                            "type": "object",
                            "nullable": true
                          },
                          "coverPhoto": {
                            "type": "object",
                            "nullable": true
                          },
                          "isActive": {
                            "type": "boolean"
                          },
                          "onBoarded": {
                            "type": "boolean"
                          },
                          "rate": {
                            "type": "number"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized — missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden — caller is not an admin"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/admin/vendors/{vendorId}/services": {
        "get": {
          "tags": [
            "Admin - Vendor Management"
          ],
          "summary": "List services for a vendor (admin)",
          "description": "Returns a paginated list of services offered by the specified vendor,\nregardless of the vendor's `isActive` or `onBoarded` status.\nUnlike the public `GET /api/v1/vendors/{vendorId}/services` which requires the vendor\nto be active and onboarded, this admin endpoint works for any vendor.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The vendor ObjectId",
              "example": "665a1b2c3d4e5f6a7b8c9d0e"
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              },
              "description": "Page number (1-based)"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              },
              "description": "Number of records per page"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor services retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor services retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "vendorId": {
                                  "type": "string"
                                },
                                "serviceCategory": {
                                  "type": "object",
                                  "description": "Populated service category"
                                },
                                "tags": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  }
                                },
                                "minimumBookingDuration": {
                                  "type": "number"
                                },
                                "leadTimeRequired": {
                                  "type": "number"
                                },
                                "maximumEventSize": {
                                  "type": "number"
                                },
                                "additionalFees": {
                                  "type": "array",
                                  "items": {
                                    "type": "object",
                                    "properties": {
                                      "name": {
                                        "type": "string"
                                      },
                                      "price": {
                                        "type": "number"
                                      },
                                      "feeCategory": {
                                        "type": "string"
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 3
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized — missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden — caller is not an admin"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/admin/vendors/{vendorId}/specialties": {
        "get": {
          "tags": [
            "Admin - Vendor Management"
          ],
          "summary": "List specialties for a vendor (admin)",
          "description": "Returns a paginated list of specialties for the specified vendor,\nregardless of the vendor's `isActive` or `onBoarded` status.\nUnlike the public `GET /api/v1/vendors/{vendorId}/specialties` which requires the vendor\nto be active and onboarded, this admin endpoint works for any vendor.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The vendor ObjectId",
              "example": "665a1b2c3d4e5f6a7b8c9d0e"
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              },
              "description": "Page number (1-based)"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              },
              "description": "Number of records per page"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor specialties retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor specialties retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "vendorId": {
                                  "type": "string"
                                },
                                "serviceSpecialty": {
                                  "type": "object",
                                  "description": "Populated service specialty"
                                },
                                "createdAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 5
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized — missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden — caller is not an admin"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/admin/vendors/{vendorId}/status": {
        "patch": {
          "tags": [
            "Admin - Vendor Management"
          ],
          "summary": "Suspend or reactivate a vendor account",
          "description": "Allows an admin to suspend or reactivate a vendor account.\n- **suspend** — sets `vendor.isActive = false` and user status to `banned`. The vendor\n  will be hidden from public listings and the owner cannot log in.\n- **reactivate** — sets `vendor.isActive = true` and user status back to `active`.\n\nAn optional `reason` is recorded in the audit log.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The vendor ObjectId",
              "example": "665a1b2c3d4e5f6a7b8c9d0e"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "action"
                  ],
                  "properties": {
                    "action": {
                      "type": "string",
                      "enum": [
                        "suspend",
                        "reactivate"
                      ],
                      "description": "Action to perform on the vendor account"
                    },
                    "reason": {
                      "type": "string",
                      "description": "Optional reason recorded in the audit log",
                      "example": "Repeated policy violations"
                    }
                  }
                },
                "examples": {
                  "suspend": {
                    "summary": "Suspend a vendor",
                    "value": {
                      "action": "suspend",
                      "reason": "Fraudulent activity detected"
                    }
                  },
                  "reactivate": {
                    "summary": "Reactivate a vendor",
                    "value": {
                      "action": "reactivate"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Vendor account status updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor account suspended successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "isActive": {
                            "type": "boolean",
                            "example": false
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid action value"
            },
            "401": {
              "description": "Unauthorized — missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden — caller is not an admin"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/admin/clients": {
        "get": {
          "tags": [
            "Admin - Client Management"
          ],
          "summary": "List all clients",
          "description": "Returns a paginated list of all users with role `customer` or `user`.\nUse this endpoint on the admin dashboard to browse and search the client base.\n\n**Optional filters:**\n- `search` — partial match on firstName, lastName, or email.\n- `status` — one of `active`, `inactive`, `banned`, `pending_verification`, or `all` (default).\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              },
              "description": "Page number (1-based)"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              },
              "description": "Number of records per page (max 100)"
            },
            {
              "in": "query",
              "name": "search",
              "schema": {
                "type": "string"
              },
              "description": "Search by first name, last name, or email",
              "example": "jane"
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "all",
                  "active",
                  "inactive",
                  "banned",
                  "pending_verification"
                ],
                "default": "all"
              },
              "description": "Filter by account status"
            }
          ],
          "responses": {
            "200": {
              "description": "Clients retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Clients retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string",
                                  "example": "665a1b2c3d4e5f6a7b8c9d0e"
                                },
                                "firstName": {
                                  "type": "string",
                                  "example": "Jane"
                                },
                                "lastName": {
                                  "type": "string",
                                  "example": "Smith"
                                },
                                "email": {
                                  "type": "string",
                                  "example": "jane@example.com"
                                },
                                "phoneNumber": {
                                  "type": "string",
                                  "example": "+44712345678"
                                },
                                "role": {
                                  "type": "string",
                                  "example": "customer"
                                },
                                "status": {
                                  "type": "string",
                                  "example": "active"
                                },
                                "emailVerified": {
                                  "type": "boolean",
                                  "example": true
                                },
                                "avatar": {
                                  "type": "object",
                                  "nullable": true,
                                  "properties": {
                                    "_id": {
                                      "type": "string"
                                    },
                                    "url": {
                                      "type": "string"
                                    }
                                  }
                                },
                                "createdAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 128
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized — missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden — caller is not an admin"
            }
          }
        }
      },
      "/api/v1/admin/clients/{clientId}": {
        "get": {
          "tags": [
            "Admin - Client Management"
          ],
          "summary": "Get a single client by ID",
          "description": "Returns the full profile of a client including avatar, address, and\n(if applicable) vendor or vendor-staff relations.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "clientId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The user ObjectId of the client",
              "example": "665a1b2c3d4e5f6a7b8c9d0e"
            }
          ],
          "responses": {
            "200": {
              "description": "Client retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Client retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "firstName": {
                            "type": "string",
                            "example": "Jane"
                          },
                          "lastName": {
                            "type": "string",
                            "example": "Smith"
                          },
                          "email": {
                            "type": "string",
                            "example": "jane@example.com"
                          },
                          "role": {
                            "type": "string",
                            "example": "customer"
                          },
                          "status": {
                            "type": "string",
                            "example": "active"
                          },
                          "emailVerified": {
                            "type": "boolean"
                          },
                          "avatar": {
                            "type": "object",
                            "nullable": true
                          },
                          "addressId": {
                            "type": "object",
                            "nullable": true
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "lastLoginAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized — missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden — caller is not an admin"
            },
            "404": {
              "description": "Client not found"
            }
          }
        }
      },
      "/api/v1/admin/clients/{clientId}/status": {
        "patch": {
          "tags": [
            "Admin - Client Management"
          ],
          "summary": "Suspend or reactivate a client account",
          "description": "Allows an admin to suspend (ban) or reactivate a client account.\n- **suspend** — sets user status to `banned`. The client will not be able to log in.\n- **reactivate** — sets user status to `active`.\n\nAn optional `reason` field is recorded in the audit log for accountability.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "clientId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The user ObjectId of the client",
              "example": "665a1b2c3d4e5f6a7b8c9d0e"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "action"
                  ],
                  "properties": {
                    "action": {
                      "type": "string",
                      "enum": [
                        "suspend",
                        "reactivate"
                      ],
                      "description": "The action to perform on the account"
                    },
                    "reason": {
                      "type": "string",
                      "description": "Optional reason for the action (recorded in audit log)",
                      "example": "Repeated policy violations"
                    }
                  }
                },
                "examples": {
                  "suspend": {
                    "summary": "Suspend a client",
                    "value": {
                      "action": "suspend",
                      "reason": "Repeated policy violations"
                    }
                  },
                  "reactivate": {
                    "summary": "Reactivate a client",
                    "value": {
                      "action": "reactivate"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Client status updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Client account suspended successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "firstName": {
                            "type": "string"
                          },
                          "lastName": {
                            "type": "string"
                          },
                          "email": {
                            "type": "string"
                          },
                          "status": {
                            "type": "string",
                            "example": "banned"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized — missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden — caller is not an admin"
            },
            "404": {
              "description": "Client not found"
            }
          }
        }
      },
      "/api/v1/admin/clients/{clientId}/bookings": {
        "get": {
          "tags": [
            "Admin - Client Management"
          ],
          "summary": "List bookings for a specific client",
          "description": "Returns a paginated list of all bookings placed by a specific client.\nSupports optional status and date range filters.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "clientId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The user ObjectId of the client",
              "example": "665a1b2c3d4e5f6a7b8c9d0e"
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              },
              "description": "Page number (1-based)"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              },
              "description": "Number of records per page"
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "all",
                  "pending_payment",
                  "paid",
                  "confirmed",
                  "rejected",
                  "cancelled",
                  "completed",
                  "refunded"
                ]
              },
              "description": "Filter by booking status (default returns all)"
            },
            {
              "in": "query",
              "name": "from",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Start date filter (inclusive, based on event start date)"
            },
            {
              "in": "query",
              "name": "to",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "End date filter (inclusive, based on event start date)"
            }
          ],
          "responses": {
            "200": {
              "description": "Client bookings retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Client bookings retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "vendorId": {
                                  "type": "object",
                                  "description": "Populated vendor"
                                },
                                "customerId": {
                                  "type": "object",
                                  "description": "Populated customer"
                                },
                                "status": {
                                  "type": "string",
                                  "example": "confirmed"
                                },
                                "eventDetails": {
                                  "type": "object",
                                  "properties": {
                                    "title": {
                                      "type": "string"
                                    },
                                    "startDate": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "endDate": {
                                      "type": "string",
                                      "format": "date-time"
                                    },
                                    "guestCount": {
                                      "type": "integer"
                                    }
                                  }
                                },
                                "amounts": {
                                  "type": "object",
                                  "properties": {
                                    "subtotal": {
                                      "type": "number"
                                    },
                                    "fees": {
                                      "type": "number"
                                    },
                                    "commission": {
                                      "type": "number"
                                    },
                                    "total": {
                                      "type": "number"
                                    }
                                  }
                                },
                                "createdAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 5
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized — missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden — caller is not an admin"
            }
          }
        }
      },
      "/api/v1/admin/sandbox/stripe/simulate-settlement/{vendorId}": {
        "post": {
          "tags": [
            "Admin - Sandbox"
          ],
          "summary": "[SANDBOX] Simulate Stripe balance settlement for a vendor",
          "description": "**Sandbox / test mode only — blocked in production.**\n\nIn test mode, destination-charge funds (upfront payout) land in a connected\naccount's `pending` balance and can take 1–2 business days to settle.\nThis endpoint short-circuits that delay by:\n1. Reading the pending balance on the vendor's connected Stripe account.\n2. Creating a platform TopUp (bypasses pending via `tok_bypassPending`).\n3. Transferring the equivalent amount directly to the connected account's\n   available balance.\n\nReturns a before/after balance snapshot so you can confirm the change.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Balance settlement simulated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Balance settlement simulated successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "vendorId": {
                            "type": "string"
                          },
                          "stripeAccountId": {
                            "type": "string"
                          },
                          "settlements": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "currency": {
                                  "type": "string"
                                },
                                "amount": {
                                  "type": "number"
                                },
                                "transferId": {
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "balance": {
                            "type": "object",
                            "properties": {
                              "before": {
                                "type": "object"
                              },
                              "after": {
                                "type": "object"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden in production or caller is not an admin"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/admin/reviews": {
        "get": {
          "tags": [
            "Admin - Reviews"
          ],
          "summary": "List all reviews (admin)",
          "description": "Returns a paginated list of all reviews across the platform.\nSupports filtering by vendor, reviewer, flag status, and rating range.\n\n- Caller must be authenticated with a valid JWT and hold the `admin` role.\n- Results are ordered by `createdAt` descending.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number (1-based)",
              "example": 1
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 20
              },
              "description": "Number of results per page",
              "example": 20
            },
            {
              "in": "query",
              "name": "vendorId",
              "schema": {
                "type": "string",
                "pattern": "^[0-9a-fA-F]{24}$"
              },
              "description": "Filter by vendor ObjectId",
              "example": "64f0c2f7a2b6c1a9b3d2eaaa"
            },
            {
              "in": "query",
              "name": "reviewerUserId",
              "schema": {
                "type": "string",
                "pattern": "^[0-9a-fA-F]{24}$"
              },
              "description": "Filter by reviewer user ObjectId",
              "example": "64f0c2f7a2b6c1a9b3d2eddd"
            },
            {
              "in": "query",
              "name": "isFlagged",
              "schema": {
                "type": "string",
                "enum": [
                  true,
                  false
                ]
              },
              "description": "Filter by flag status",
              "example": "true"
            },
            {
              "in": "query",
              "name": "minRating",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 5
              },
              "description": "Minimum star rating (inclusive)",
              "example": 3
            },
            {
              "in": "query",
              "name": "maxRating",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 5
              },
              "description": "Maximum star rating (inclusive)",
              "example": 5
            }
          ],
          "responses": {
            "200": {
              "description": "Reviews retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "reviews": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/Review"
                            }
                          },
                          "total": {
                            "type": "integer"
                          },
                          "page": {
                            "type": "integer"
                          },
                          "limit": {
                            "type": "integer"
                          },
                          "totalPages": {
                            "type": "integer"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Reviews retrieved successfully",
                    "data": {
                      "reviews": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2eccc",
                          "vendorId": "64f0c2f7a2b6c1a9b3d2eaaa",
                          "bookingId": "64f0c2f7a2b6c1a9b3d2ebbb",
                          "reviewerUserId": "64f0c2f7a2b6c1a9b3d2eddd",
                          "rating": 2,
                          "comment": "Service was below expectations.",
                          "isEdited": false,
                          "isFlagged": true,
                          "createdAt": "2024-01-15T10:00:00.000Z",
                          "updatedAt": "2024-01-15T10:00:00.000Z"
                        }
                      ],
                      "total": 1,
                      "page": 1,
                      "limit": 20,
                      "totalPages": 1
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error (invalid query params)"
            },
            "401": {
              "description": "Unauthorized — valid JWT required"
            },
            "403": {
              "description": "Forbidden — admin role required"
            },
            "500": {
              "description": "Internal server error"
            }
          }
        }
      },
      "/api/v1/admin/reviews/{reviewId}/flag": {
        "patch": {
          "tags": [
            "Admin - Reviews"
          ],
          "summary": "Flag or unflag a review (admin)",
          "description": "Set the `isFlagged` status on a review.\n\n- Caller must be authenticated with a valid JWT and hold the `admin` role.\n- The `adminUserId` performing the action is derived from the JWT and recorded in the audit log.\n- A flagged review remains visible but can be used to filter in the admin list view.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "reviewId",
              "required": true,
              "schema": {
                "type": "string",
                "pattern": "^[0-9a-fA-F]{24}$",
                "example": "64f0c2f7a2b6c1a9b3d2eccc"
              },
              "description": "The MongoDB ObjectId of the review"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "isFlagged"
                  ],
                  "properties": {
                    "isFlagged": {
                      "type": "boolean",
                      "description": "True to flag the review; false to unflag it"
                    }
                  }
                },
                "example": {
                  "isFlagged": true
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Review flag status updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Review"
                      }
                    }
                  },
                  "example": {
                    "message": "Review flag status updated successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2eccc",
                      "vendorId": "64f0c2f7a2b6c1a9b3d2eaaa",
                      "bookingId": "64f0c2f7a2b6c1a9b3d2ebbb",
                      "reviewerUserId": "64f0c2f7a2b6c1a9b3d2eddd",
                      "rating": 2,
                      "comment": "Service was below expectations.",
                      "isEdited": false,
                      "isFlagged": true,
                      "createdAt": "2024-01-15T10:00:00.000Z",
                      "updatedAt": "2024-01-16T08:00:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error (invalid reviewId or body)"
            },
            "401": {
              "description": "Unauthorized — valid JWT required"
            },
            "403": {
              "description": "Forbidden — admin role required"
            },
            "404": {
              "description": "Review not found"
            },
            "500": {
              "description": "Internal server error"
            }
          }
        }
      },
      "/api/v1/admin/reviews/{reviewId}": {
        "delete": {
          "tags": [
            "Admin - Reviews"
          ],
          "summary": "Delete a review (admin)",
          "description": "Permanently remove a review from the platform regardless of ownership.\n\n- Caller must be authenticated with a valid JWT and hold the `admin` role.\n- After deletion the vendor's `rate` field is recalculated immediately.\n- The action is logged to the audit log with the `adminUserId` derived from the JWT.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "reviewId",
              "required": true,
              "schema": {
                "type": "string",
                "pattern": "^[0-9a-fA-F]{24}$",
                "example": "64f0c2f7a2b6c1a9b3d2eccc"
              },
              "description": "The MongoDB ObjectId of the review to delete"
            }
          ],
          "responses": {
            "200": {
              "description": "Review deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  },
                  "example": {
                    "message": "Review deleted successfully"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized — valid JWT required"
            },
            "403": {
              "description": "Forbidden — admin role required"
            },
            "404": {
              "description": "Review not found"
            },
            "500": {
              "description": "Internal server error"
            }
          }
        }
      },
      "/api/v1/admin-management/roles-and-permissions": {
        "get": {
          "tags": [
            "AdminManagement"
          ],
          "summary": "List all roles and permissions",
          "description": "Returns the complete catalog of user roles supported by the system and the\nvendor-staff permission names that can be granted (each with the supported\naccess modes: `read` and `write`).\n\nUse this to populate role/permission selectors in admin UIs. Requires ADMIN role.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Roles and permissions retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Roles and permissions retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "roles": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "enum": [
                                "admin",
                                "customer",
                                "user",
                                "auditor",
                                "vendor",
                                "vendorstaff"
                              ]
                            },
                            "example": [
                              "admin",
                              "customer",
                              "user",
                              "auditor",
                              "vendor",
                              "vendorstaff"
                            ]
                          },
                          "vendorPermissions": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "name": {
                                  "type": "string",
                                  "example": "view_orders"
                                },
                                "modes": {
                                  "type": "array",
                                  "items": {
                                    "type": "string",
                                    "enum": [
                                      "read",
                                      "write"
                                    ]
                                  },
                                  "example": [
                                    "read",
                                    "write"
                                  ]
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Roles and permissions retrieved successfully",
                    "data": {
                      "roles": [
                        "admin",
                        "customer",
                        "user",
                        "auditor",
                        "vendor",
                        "vendorstaff"
                      ],
                      "vendorPermissions": [
                        {
                          "name": "chat",
                          "modes": [
                            "read",
                            "write"
                          ]
                        },
                        {
                          "name": "manage_services",
                          "modes": [
                            "read",
                            "write"
                          ]
                        },
                        {
                          "name": "view_orders",
                          "modes": [
                            "read",
                            "write"
                          ]
                        },
                        {
                          "name": "manage_staff",
                          "modes": [
                            "read",
                            "write"
                          ]
                        },
                        {
                          "name": "view_reports",
                          "modes": [
                            "read",
                            "write"
                          ]
                        },
                        {
                          "name": "finance",
                          "modes": [
                            "read",
                            "write"
                          ]
                        },
                        {
                          "name": "business_profile",
                          "modes": [
                            "read",
                            "write"
                          ]
                        }
                      ]
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden – requires ADMIN role"
            }
          }
        }
      },
      "/api/v1/admin-management": {
        "get": {
          "tags": [
            "AdminManagement"
          ],
          "summary": "List all admins",
          "description": "Returns a paginated list of admin users. Supports optional search and status filter. Requires ADMIN role.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              }
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "active",
                  "inactive",
                  "banned",
                  "pending_verification"
                ]
              }
            },
            {
              "in": "query",
              "name": "search",
              "schema": {
                "type": "string"
              },
              "description": "Search by first name, last name, or email"
            }
          ],
          "responses": {
            "200": {
              "description": "Admins retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Admins retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/User"
                            }
                          },
                          "total": {
                            "type": "integer"
                          },
                          "page": {
                            "type": "integer"
                          },
                          "limit": {
                            "type": "integer"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden – requires ADMIN role"
            }
          }
        },
        "post": {
          "tags": [
            "AdminManagement"
          ],
          "summary": "Create a new admin",
          "description": "Creates a new admin user. The created admin is NOT a root admin. Requires ADMIN role.\n\n**Notification side effects:** Creates `admin.created` notifications for the new admin and admins.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "firstName",
                    "lastName",
                    "email",
                    "password"
                  ],
                  "properties": {
                    "firstName": {
                      "type": "string"
                    },
                    "lastName": {
                      "type": "string"
                    },
                    "email": {
                      "type": "string",
                      "format": "email"
                    },
                    "phoneNumber": {
                      "type": "string"
                    },
                    "password": {
                      "type": "string",
                      "minLength": 8
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Admin created successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden – requires ADMIN role"
            },
            "409": {
              "description": "Email already in use"
            }
          }
        }
      },
      "/api/v1/admin-management/{id}": {
        "get": {
          "tags": [
            "AdminManagement"
          ],
          "summary": "Get admin by ID",
          "description": "Returns a single admin user by ID. Requires ADMIN role.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Admin retrieved successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden – requires ADMIN role"
            },
            "404": {
              "description": "Admin not found"
            }
          }
        },
        "patch": {
          "tags": [
            "AdminManagement"
          ],
          "summary": "Update an admin",
          "description": "Updates an admin user's profile fields. Non-root admins cannot update the root admin. Requires ADMIN role.\n\n**Notification side effects:** Creates an `admin.updated` notification for the affected admin.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "firstName": {
                      "type": "string"
                    },
                    "lastName": {
                      "type": "string"
                    },
                    "phoneNumber": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Admin updated successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Admin not found"
            }
          }
        },
        "delete": {
          "tags": [
            "AdminManagement"
          ],
          "summary": "Delete an admin",
          "description": "Permanently deletes an admin user. Root admin can NEVER be deleted. Cannot delete yourself. Requires ADMIN role.\n\n**Notification side effects:** Creates an `admin.deleted` notification for admins.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Admin deleted successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden – cannot delete root admin or yourself"
            },
            "404": {
              "description": "Admin not found"
            }
          }
        }
      },
      "/api/v1/admin-management/{id}/deactivate": {
        "patch": {
          "tags": [
            "AdminManagement"
          ],
          "summary": "Deactivate an admin",
          "description": "Sets admin status to INACTIVE. Non-root admins cannot deactivate the root admin. Cannot deactivate yourself. Requires ADMIN role.\n\n**Notification side effects:** Creates an `admin.deactivated` notification for admins.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Admin deactivated successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Admin not found"
            }
          }
        }
      },
      "/api/v1/admin-management/{id}/reactivate": {
        "patch": {
          "tags": [
            "AdminManagement"
          ],
          "summary": "Reactivate an admin",
          "description": "Sets admin status back to ACTIVE. Requires ADMIN role.\n\n**Notification side effects:** Creates `admin.reactivated` notifications for the affected admin and admins.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Admin reactivated successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Admin not found"
            }
          }
        }
      },
      "/api/v1/auth/register": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "Register a new user with email and password",
          "description": "Creates a new user account using local authentication (email/password).\n\n**Important:** No JWT token is returned at registration.\nUser must verify their email first using the verification link sent to their inbox.\nOnly after email verification can the user login and receive JWT tokens.\n\n**Flow:**\n1. Submit registration with email/password\n2. Account created with PENDING_VERIFICATION status\n3. Verification email sent automatically\n4. User clicks verification link in email\n5. User can then login with email/password\n\n**Notification side effects:** Creates an `auth.registered` notification for the new user.\n",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "firstName",
                    "password",
                    "lastName",
                    "email"
                  ],
                  "properties": {
                    "firstName": {
                      "type": "string",
                      "minLength": 2,
                      "example": "John"
                    },
                    "lastName": {
                      "type": "string",
                      "minLength": 2,
                      "example": "Doe"
                    },
                    "email": {
                      "type": "string",
                      "format": "email",
                      "example": "john.doe@example.com"
                    },
                    "password": {
                      "type": "string",
                      "minLength": 8,
                      "format": "password",
                      "example": "SecurePass123"
                    },
                    "role": {
                      "type": "string",
                      "enum": [
                        "customer",
                        "vendor",
                        "vendorstaff",
                        "auditor",
                        "admin"
                      ],
                      "description": "User role (case-insensitive). Defaults to customer if not provided. Stored as lowercase.",
                      "example": "customer"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "User registered successfully. Check email for verification link.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "User registered successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "user": {
                            "type": "object",
                            "properties": {
                              "_id": {
                                "type": "string"
                              },
                              "email": {
                                "type": "string"
                              },
                              "firstName": {
                                "type": "string"
                              },
                              "lastName": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "409": {
              "description": "Email already in use"
            },
            "429": {
              "description": "Too many requests (rate limited)"
            }
          }
        }
      },
      "/api/v1/auth/resend-verification-email": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "Resend verification email",
          "description": "Resends the verification email to the user.\n\n**Checks performed:**\n- User must exist\n- Email must not be already verified\n- If previous token expired, a new token is generated\n- If token still valid, existing token is reused\n",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "email"
                  ],
                  "properties": {
                    "email": {
                      "type": "string",
                      "format": "email",
                      "example": "john.doe@example.com"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Verification email sent successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Verification email sent successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "emailSent": {
                            "type": "boolean",
                            "example": true
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Invalid email format"
            },
            "401": {
              "description": "User not found"
            },
            "409": {
              "description": "Email is already verified"
            },
            "429": {
              "description": "Too many requests (rate limited)"
            }
          }
        }
      },
      "/api/v1/auth/login": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "Login with email and password",
          "description": "Authenticates a user with email and password. Users must have verified their email before logging in.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "email",
                    "password"
                  ],
                  "properties": {
                    "email": {
                      "type": "string",
                      "format": "email",
                      "example": "john.doe@example.com"
                    },
                    "password": {
                      "type": "string",
                      "minLength": 8,
                      "format": "password",
                      "example": "SecurePass123"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Login successful",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Login successful"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "user": {
                            "type": "object",
                            "properties": {
                              "_id": {
                                "type": "string"
                              },
                              "email": {
                                "type": "string"
                              },
                              "firstName": {
                                "type": "string"
                              },
                              "lastName": {
                                "type": "string"
                              },
                              "role": {
                                "type": "string",
                                "description": "User role (normalized)"
                              }
                            }
                          },
                          "token": {
                            "type": "string",
                            "description": "JWT access token"
                          },
                          "refreshToken": {
                            "type": "string",
                            "description": "JWT refresh token"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Invalid email or password / Email not verified"
            },
            "429": {
              "description": "Too many requests (rate limited)"
            }
          }
        }
      },
      "/api/v1/auth/refresh-token": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "Refresh access token",
          "description": "Generate a new access token using a valid refresh token. Use this when the access token expires.",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "refreshToken"
                  ],
                  "properties": {
                    "refreshToken": {
                      "type": "string",
                      "description": "Valid JWT refresh token",
                      "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Token refreshed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Token refreshed successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "token": {
                            "type": "string",
                            "description": "New JWT access token"
                          },
                          "user": {
                            "type": "object",
                            "properties": {
                              "role": {
                                "type": "string",
                                "description": "User role (from refresh token claims)"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Invalid or expired refresh token"
            }
          }
        }
      },
      "/api/v1/auth/google/auth-url": {
        "get": {
          "tags": [
            "Auth"
          ],
          "summary": "Get Google OAuth authorization URL",
          "description": "Returns the Google OAuth authorization URL for initiating the Google Sign-In flow. Redirect users to this URL to authenticate with Google.",
          "responses": {
            "200": {
              "description": "Google auth URL generated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Google auth URL generated successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "url": {
                            "type": "string",
                            "description": "Google OAuth authorization URL",
                            "example": "https://accounts.google.com/o/oauth2/v2/auth?client_id=..."
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/auth/google/callback": {
        "get": {
          "tags": [
            "Auth"
          ],
          "summary": "Handle Google OAuth callback",
          "description": "Processes the OAuth callback from Google after user authentication. \nThis endpoint receives the authorization code, exchanges it for user information,\nand either creates a new user or logs in an existing user.\n\n**User Flow:**\n- New users are automatically created with emailVerified=true\n- Existing users with same email are linked to Google account\n- Returns same JWT token structure as local login\n- Google users can optionally set a password later using /set-password\n\n**Notification side effects:** Creates an `auth.google_registered` notification for newly created Google users.\n",
          "parameters": [
            {
              "in": "query",
              "name": "code",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Authorization code received from Google OAuth",
              "example": "4/0AY0e-g7X..."
            },
            {
              "in": "query",
              "name": "role",
              "required": false,
              "schema": {
                "type": "string",
                "enum": [
                  "customer",
                  "user",
                  "vendor",
                  "vendorstaff",
                  "auditor",
                  "admin"
                ]
              },
              "description": "Optional role to assign when creating a **new** account via Google.\nIf omitted, defaults to `customer`.\n\nNote: `user` is accepted for backwards compatibility and is normalized to `customer`.\n",
              "example": "customer"
            }
          ],
          "responses": {
            "200": {
              "description": "Login or registration successful",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "description": "Either 'Account created successfully' (new user) or 'Login successful' (existing user)",
                        "example": "Login successful"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "user": {
                            "$ref": "#/components/schemas/User"
                          },
                          "token": {
                            "type": "string",
                            "description": "JWT access token"
                          },
                          "refreshToken": {
                            "type": "string",
                            "description": "JWT refresh token"
                          },
                          "isNewUser": {
                            "type": "boolean",
                            "description": "Indicates if this is a newly created account",
                            "example": true
                          }
                        }
                      }
                    }
                  },
                  "examples": {
                    "newUser": {
                      "summary": "New user created via Google",
                      "value": {
                        "message": "Account created successfully",
                        "data": {
                          "user": {
                            "_id": "64f0c2f7a2b6c1a9b3d2e111",
                            "firstName": "John",
                            "lastName": "Doe",
                            "email": "john.doe@example.com",
                            "phoneNumber": null,
                            "stripeCustomerId": null,
                            "gender": "other",
                            "dateOfBirth": null,
                            "avatar": null,
                            "addressId": null,
                            "role": "customer",
                            "status": "active",
                            "emailVerified": true,
                            "authProvider": "google",
                            "googleId": 109876543210987650000,
                            "hasPassword": false,
                            "lastLoginAt": "2026-01-18T10:00:00.000Z",
                            "lastActiveAt": "2026-01-18T10:00:00.000Z",
                            "createdAt": "2026-01-18T10:00:00.000Z",
                            "updatedAt": "2026-01-18T10:00:00.000Z"
                          },
                          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                          "isNewUser": true
                        }
                      }
                    },
                    "existingUser": {
                      "summary": "Existing user logged in via Google",
                      "value": {
                        "message": "Login successful",
                        "data": {
                          "user": {
                            "_id": "64f0c2f7a2b6c1a9b3d2e111",
                            "firstName": "John",
                            "lastName": "Doe",
                            "email": "john.doe@example.com",
                            "phoneNumber": null,
                            "stripeCustomerId": "cus_123",
                            "gender": "other",
                            "dateOfBirth": null,
                            "avatar": null,
                            "addressId": null,
                            "role": "customer",
                            "status": "active",
                            "emailVerified": true,
                            "authProvider": "google",
                            "googleId": 109876543210987650000,
                            "hasPassword": false,
                            "lastLoginAt": "2026-01-18T10:00:00.000Z",
                            "lastActiveAt": "2026-01-18T10:00:00.000Z",
                            "createdAt": "2026-01-10T10:00:00.000Z",
                            "updatedAt": "2026-01-18T10:00:00.000Z"
                          },
                          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                          "isNewUser": false
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Authorization code is missing or invalid",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Authorization code is required"
                  }
                }
              }
            },
            "401": {
              "description": "Failed to authenticate with Google",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Failed to authenticate with Google",
                    "statusCode": 401,
                    "timestamp": "2026-01-18T10:00:00.000Z",
                    "path": "/api/v1/auth/google/callback",
                    "method": "GET"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/auth/verify-email/{token}": {
        "get": {
          "tags": [
            "Auth"
          ],
          "summary": "Verify email with token (from email link)",
          "description": "Verifies a user's email address using the token sent in the verification email.\nThis endpoint is typically accessed by clicking a link in the verification email.\n\n**Flow:**\n1. User registers with email/password\n2. Verification email is sent with unique token\n3. User clicks verification link (frontend URL with token in query)\n4. Frontend reads token from query and calls this endpoint to verify\n5. User can now login\n\n**Token validity:**\n- Tokens are valid for 24 hours\n- Each token can be used only once\n\n**Notification side effects:** Creates an `auth.email_verified` notification for the verified user.\n",
          "parameters": [
            {
              "in": "path",
              "name": "token",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Email verification token from the verification email",
              "example": "a1b2c3d4e5f6..."
            }
          ],
          "responses": {
            "200": {
              "description": "Email verified successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Email verified successfully"
                      },
                      "data": {
                        "type": "object",
                        "description": "Updated user object with verified email"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Verification token is required"
            },
            "401": {
              "description": "Invalid or expired verification token"
            }
          }
        }
      },
      "/api/v1/auth/set-password": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "Set password for Google-only users",
          "description": "Allows users who signed up via Google OAuth to set a password for their account.\nThis enables them to login using either Google OAuth or email/password.\n\n**Requirements:**\n- User must be authenticated (JWT token required)\n- User's authProvider must be GOOGLE\n- User must not already have a password set\n\n**After setting password:**\n- User can login with email/password\n- User can still login with Google OAuth\n\n**Notification side effects:** Creates an `auth.password_set` notification for the user.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "password"
                  ],
                  "properties": {
                    "password": {
                      "type": "string",
                      "minLength": 8,
                      "format": "password",
                      "description": "New password (minimum 8 characters)",
                      "example": "SecurePass123"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Password set successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Password set successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "email": {
                            "type": "string"
                          },
                          "firstName": {
                            "type": "string"
                          },
                          "lastName": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token / User not found"
            },
            "409": {
              "description": "Password already set or user is not a Google OAuth user"
            }
          }
        }
      },
      "/api/v1/auth/change-password": {
        "patch": {
          "tags": [
            "Auth"
          ],
          "summary": "Change password (signed-in user)",
          "description": "Changes the password for the currently authenticated user.\n\n**Requirements:**\n- User must be authenticated (JWT token required)\n- Current password must be provided and correct\n\n**Notes:**\n- Google-only accounts without a password must use `/set-password` first.\n\n**Notification side effects:** Creates an `auth.password_changed` notification for the user.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "currentPassword",
                    "newPassword"
                  ],
                  "properties": {
                    "currentPassword": {
                      "type": "string",
                      "format": "password",
                      "example": "OldPass123"
                    },
                    "newPassword": {
                      "type": "string",
                      "minLength": 8,
                      "format": "password",
                      "example": "NewSecurePass123"
                    }
                  }
                },
                "examples": {
                  "basic": {
                    "summary": "Change password",
                    "value": {
                      "currentPassword": "OldPass123",
                      "newPassword": "NewSecurePass123"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Password changed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Password changed successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "passwordChanged": {
                            "type": "boolean",
                            "example": true
                          }
                        }
                      }
                    }
                  },
                  "examples": {
                    "success": {
                      "summary": "Password changed",
                      "value": {
                        "message": "Password changed successfully",
                        "data": {
                          "passwordChanged": true
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error (missing/invalid fields)"
            },
            "401": {
              "description": "Unauthorized - Invalid token / current password incorrect"
            },
            "409": {
              "description": "Conflict - Account has no password set (Google-only)"
            },
            "429": {
              "description": "Too many requests (rate limited)"
            }
          }
        }
      },
      "/api/v1/auth/forgot-password": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "Request a password reset email",
          "description": "Sends a password reset link to the provided email address if an account exists.\nFor security, this endpoint always returns a success response regardless of\nwhether the email is registered.\n\n**Behavior:**\n- Generates a one-time reset token valid for 1 hour.\n- Sends an email with a link to the frontend reset-password page.\n- Does not reveal whether the email exists in the system.\n- If the account exists, creates an `auth.password_reset_requested` notification for that user.\n",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "email"
                  ],
                  "properties": {
                    "email": {
                      "type": "string",
                      "format": "email",
                      "description": "The account email address",
                      "example": "user@example.com"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Password reset email sent (if account exists)",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "If an account with that email exists, a password reset link has been sent"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "emailSent": {
                            "type": "boolean",
                            "example": true
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error (invalid email format)"
            },
            "429": {
              "description": "Too many requests (rate limited)"
            }
          }
        }
      },
      "/api/v1/auth/reset-password": {
        "post": {
          "tags": [
            "Auth"
          ],
          "summary": "Reset password using a reset token",
          "description": "Resets the user's password using a valid, non-expired reset token\nreceived via the forgot-password email.\n\n**Behavior:**\n- Validates the token and checks expiry (1 hour).\n- Sets the new password and clears the reset token.\n- After success, the user can log in with the new password.\n- Creates an `auth.password_reset` notification for the user.\n",
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "token",
                    "newPassword"
                  ],
                  "properties": {
                    "token": {
                      "type": "string",
                      "description": "The password reset token from the email link",
                      "example": "a1b2c3d4e5f6..."
                    },
                    "newPassword": {
                      "type": "string",
                      "minLength": 8,
                      "format": "password",
                      "description": "The new password (minimum 8 characters)",
                      "example": "NewSecurePass123"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Password reset successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Password reset successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "passwordReset": {
                            "type": "boolean",
                            "example": true
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error (missing/invalid fields)"
            },
            "401": {
              "description": "Invalid or expired reset token"
            },
            "429": {
              "description": "Too many requests (rate limited)"
            }
          }
        }
      },
      "/api/v1/bookings": {
        "post": {
          "tags": [
            "Bookings"
          ],
          "summary": "Create a booking",
          "description": "**Flow context — Direct booking (no quote flow):** Customer creates a booking directly by selecting a vendor and services.\n\n**What this endpoint does:**\nCreates a new booking for the authenticated customer.\nNew model uses `eventDetails` + `budgetAllocations`.\nLegacy fields `vendorSpecialties` and `startDate/endDate/eventDate` are still accepted and will be normalized.\n\n**Notification side effects:** Creates `booking.created` notifications for the customer and the vendor team.\n\n**Next step:** Create a payment intent via `POST /api/v1/bookings/{bookingId}/payment-intent` and complete the Stripe payment flow.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateBookingInput"
                },
                "examples": {
                  "newModel": {
                    "summary": "New model (recommended)",
                    "value": {
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "eventDetails": {
                        "title": "Birthday Party",
                        "startDate": "2026-02-01T12:00:00.000Z",
                        "endDate": "2026-02-01T14:00:00.000Z",
                        "guestCount": 50,
                        "description": "Fun birthday party"
                      },
                      "budgetAllocations": [
                        {
                          "vendorSpecialtyId": "64f0c2f7a2b6c1a9b3d2e777",
                          "budgetedAmount": 5000
                        }
                      ],
                      "location": {
                        "addressText": "123 Party St"
                      },
                      "currency": "GBP"
                    }
                  },
                  "legacy": {
                    "summary": "Legacy fields (still supported)",
                    "value": {
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "vendorSpecialties": [
                        "64f0c2f7a2b6c1a9b3d2e777"
                      ],
                      "startDate": "2026-02-01T12:00:00.000Z",
                      "endDate": "2026-02-01T14:00:00.000Z",
                      "location": {
                        "addressText": "123 Party St"
                      },
                      "currency": "GBP"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Booking created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Booking created successfully"
                      },
                      "data": {
                        "type": "object"
                      }
                    }
                  },
                  "example": {
                    "message": "Booking created successfully",
                    "data": {
                      "_id": "64f1c2a9b3d6f5a2c1e9a111",
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "customerId": "64f0c2f7a2b6c1a9b3d2e111",
                      "eventDetails": {
                        "startDate": "2026-02-01T12:00:00.000Z",
                        "endDate": "2026-02-01T14:00:00.000Z"
                      },
                      "currency": "GBP",
                      "status": "pending_payment"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        },
        "get": {
          "tags": [
            "Bookings"
          ],
          "summary": "List my bookings",
          "description": "**What this endpoint does:**\nReturns a paginated list of bookings for the authenticated customer (newest-first by eventDetails.startDate).\n\n**Next step:** Customer can view individual booking details, create payment intents, or cancel bookings.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Bookings retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Bookings retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object"
                            }
                          },
                          "total": {
                            "type": "integer"
                          },
                          "page": {
                            "type": "integer"
                          },
                          "limit": {
                            "type": "integer"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/bookings/from-customer-request/{customerRequestId}": {
        "post": {
          "tags": [
            "Bookings"
          ],
          "summary": "Create a booking from a customer request",
          "description": "**Flow context — Previous step:** Customer created a Customer Request (`POST /api/v1/customer-requests`) and browsed available vendors.\nThis is the direct-booking path (bypasses the quote flow).\n\n**What this endpoint does:**\nConverts an existing customer request into a booking for a specific vendor.\nThe customer request does not have a vendor id; the caller must provide `vendorId`.\nYou must also select at least one vendor service (`budgetAllocations` or legacy `vendorSpecialties`).\n\n**Notification side effects:** Creates `booking.created_from_customer_request` notifications for the customer and the vendor team.\n\n**Next step:** Create a payment intent via `POST /api/v1/bookings/{bookingId}/payment-intent` and complete the Stripe payment flow.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "customerRequestId",
              "required": true,
              "schema": {
                "$ref": "#/components/schemas/CustomerRequestIdParam"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateBookingFromCustomerRequestBodyInput"
                },
                "example": {
                  "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                  "budgetAllocations": [
                    {
                      "vendorSpecialtyId": "64f0c2f7a2b6c1a9b3d2e777",
                      "budgetedAmount": 5000
                    }
                  ],
                  "currency": "GBP"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Booking created successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/bookings/from-quote/{quoteId}": {
        "post": {
          "tags": [
            "Bookings"
          ],
          "summary": "Create a booking from an accepted quote",
          "description": "**Flow context — Previous step:** Customer accepted a quote via `POST /api/v1/quotes/{quoteId}/respond` with `decision: accept`.\n\nConverts an accepted quote into a booking, closing out the quote flow.\n\n**What this endpoint does:**\n1. Validates the quote is in ACCEPTED status and is owned by the authenticated customer.\n2. Creates a new Booking, pulling event details from the underlying Customer Request, amounts from the quote totals, and vendor/customer references from the quote.\n3. Links the new booking back to the quote (`bookingId` field on the Quote document).\n4. Invalidates quote and quote-request caches.\n\n**Location resolution:** If `body.location` is provided it is used, otherwise the endpoint falls back to\n`eventDetails.location` from the Customer Request. If neither is available, a 400 error is returned.\n\n**Notification side effects:** Creates `booking.created_from_quote` notifications for the customer and the vendor team.\n\n**Next step:** Create a payment intent via `POST /api/v1/bookings/{bookingId}/payment-intent` and complete the Stripe payment flow.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "quoteId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "ID of the accepted quote"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "location": {
                      "type": "object",
                      "properties": {
                        "addressText": {
                          "type": "string",
                          "example": "123 Venue Street, London"
                        },
                        "lat": {
                          "type": "number"
                        },
                        "long": {
                          "type": "number"
                        },
                        "placeId": {
                          "type": "string"
                        }
                      }
                    },
                    "currency": {
                      "type": "string",
                      "description": "Override the quote currency (ISO 4217)",
                      "example": "GBP"
                    }
                  }
                },
                "example": {
                  "location": {
                    "addressText": "123 Venue Street, London"
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Booking created from quote successfully"
            },
            "400": {
              "description": "Validation error (quote not accepted, missing location, etc.)"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden — customer does not own the quote"
            },
            "404": {
              "description": "Quote not found"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}/vendor/decision": {
        "post": {
          "tags": [
            "Bookings"
          ],
          "summary": "Vendor confirm or reject booking",
          "description": "**Flow context — Previous step:** Customer paid for the booking via the payment flow (`POST /api/v1/bookings/{bookingId}/payment-intent` → Stripe.js → `POST /api/v1/bookings/{bookingId}/confirm-payment`).\n\n**What this endpoint does:**\nVendor (or vendor staff with permission) confirms or rejects a paid booking.\nAllowed only when booking status is `paid`.\nRejecting a paid booking does not automatically issue a refund (admin refund endpoint is separate).\n\n**Notification side effects:** Creates `booking.confirmed` or `booking.rejected` notifications for the customer and the vendor team.\n\n**Next steps:**\n- If **confirmed**: Booking is active. After service delivery, admin can release payment via `POST /api/v1/bookings/{bookingId}/release-payment`.\n- If **rejected**: Customer may dispute or request a refund (admin: `POST /api/v1/bookings/{bookingId}/refund`).\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "decision"
                  ],
                  "properties": {
                    "decision": {
                      "type": "string",
                      "enum": [
                        "confirm",
                        "reject"
                      ]
                    }
                  }
                },
                "example": {
                  "decision": "confirm"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Booking updated successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}/cancel": {
        "post": {
          "tags": [
            "Bookings"
          ],
          "summary": "Cancel booking (client)",
          "description": "**Flow context — Previous step:** Customer created a booking (any path) and it is in `pending_payment` or `paid` status.\n\n**What this endpoint does:**\nCancels a booking owned by the authenticated client.\nAllowed when payment has not been made (`pending_payment`) OR when payment is made but vendor has not confirmed yet (`paid`).\n\n**Notification side effects:** Creates `booking.cancelled` notifications for the customer and the vendor team.\n\n**Next step (terminal):** If the booking was paid, an admin can issue a refund via `POST /api/v1/bookings/{bookingId}/refund`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Booking cancelled successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/bookings/vendor/me": {
        "get": {
          "tags": [
            "Bookings"
          ],
          "summary": "List my vendor bookings",
          "description": "**What this endpoint does:**\nReturns a paginated list of bookings for the authenticated vendor (or vendor staff with permission).\n\n**Next step:** Vendor can confirm or reject paid bookings via `POST /api/v1/bookings/{bookingId}/vendor/decision`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Bookings retrieved successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/bookings/vendor/{vendorId}": {
        "get": {
          "tags": [
            "Bookings"
          ],
          "summary": "List bookings for a vendor (Admin)",
          "description": "**What this endpoint does:**\nReturns a paginated list of bookings for the given vendor. Admin-only.\nUseful for support and monitoring.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Bookings retrieved successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}": {
        "get": {
          "tags": [
            "Bookings"
          ],
          "summary": "Get a booking by ID",
          "description": "**What this endpoint does:**\nReturns a single booking by its ID with all populated relations.\n\n**Access rules:**\n- **Admin** can view any booking.\n- **Customer** can view their own booking.\n- **Vendor** (or vendor staff with `VIEW_ORDERS` read permission) can view bookings assigned to them.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Booking ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Booking retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Booking retrieved successfully"
                      },
                      "data": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden — not the booking's customer, vendor, or an admin"
            },
            "404": {
              "description": "Booking not found"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}/payment-intent": {
        "post": {
          "tags": [
            "Bookings"
          ],
          "summary": "Create payment intent for booking",
          "description": "**Flow context — Previous step:** A booking was created via `POST /api/v1/bookings`, `POST /api/v1/bookings/from-customer-request/{customerRequestId}`, or `POST /api/v1/bookings/from-quote/{quoteId}`.\n\n**What this endpoint does:**\nCreates (or re-creates) a Stripe PaymentIntent for the specified booking and returns a `clientSecret` for Stripe.js.\n\nFrontend payment flow:\n1) Call this endpoint to get `clientSecret`.\n2) Use Stripe.js to confirm the payment on the client (e.g. `stripe.confirmPayment({ clientSecret, ... })`).\n   - The PaymentIntent is created with `automatic_payment_methods` enabled.\n   - The PaymentIntent is associated to the booking customer.\n3) After the client confirmation attempt completes, call `POST /api/v1/bookings/{bookingId}/confirm-payment`.\n   - This server-side step re-fetches the PaymentIntent from Stripe and updates the booking state.\n4) Optionally poll `GET /api/v1/bookings/{bookingId}/payment-status` to display the latest status.\n\nPayout model notes:\n- If the vendor is configured for `upfront_payout`, the backend attempts a destination charge.\n- If the vendor's connected Stripe account is not transfer-enabled yet, the backend falls back to `split_payout`\n  so the customer can still pay; payout is then released later by an admin via the release payout flow.\n\nRequest body: not required (send `{}` if your client requires a JSON body).\n\n**Notification side effects:** Creates a `payment.intent_created.*` notification for the customer.\n\n**Next step:** Confirm payment with Stripe.js, then call `POST /api/v1/bookings/{bookingId}/confirm-payment`.\n\n⚠️ **Amount fields:** All monetary amounts in the response are in **minor currency units** (pence for GBP, cents for USD). Divide by `_meta.minorUnitDivisor` (100) for display.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Booking ID"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false
                },
                "example": {}
              }
            }
          },
          "responses": {
            "201": {
              "description": "Payment intent created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Payment intent created successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_meta": {
                            "type": "object",
                            "description": "Metadata about response format and currency units",
                            "properties": {
                              "amountsInMinorUnits": {
                                "type": "boolean",
                                "example": true
                              },
                              "minorUnitDivisor": {
                                "type": "integer",
                                "example": 100
                              },
                              "currency": {
                                "type": "string",
                                "example": "GBP"
                              },
                              "note": {
                                "type": "string",
                                "example": "All amounts are in minor currency units (e.g. pence). Divide by 100 for display."
                              }
                            }
                          },
                          "clientSecret": {
                            "type": "string",
                            "example": "pi_123_secret_456"
                          },
                          "paymentIntentId": {
                            "type": "string",
                            "example": "pi_123"
                          },
                          "bookingId": {
                            "type": "string",
                            "example": "64f1c2a9b3d6f5a2c1e9a111"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Payment intent created successfully",
                    "data": {
                      "_meta": {
                        "amountsInMinorUnits": true,
                        "minorUnitDivisor": 100,
                        "currency": "GBP",
                        "note": "All amounts are in minor currency units (e.g. pence). Divide by 100 for display."
                      },
                      "clientSecret": "pi_123_secret_456",
                      "paymentIntentId": "pi_123",
                      "bookingId": "64f1c2a9b3d6f5a2c1e9a111"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}/confirm-payment": {
        "post": {
          "tags": [
            "Bookings"
          ],
          "summary": "Confirm payment for booking",
          "description": "**Flow context — Previous step:** Customer created a PaymentIntent via `POST /api/v1/bookings/{bookingId}/payment-intent` and confirmed it with Stripe.js.\n\n**What this endpoint does:**\nServer-side confirmation step after the client completes Stripe.js confirmation.\nThis endpoint does **not** confirm the payment with Stripe; it only retrieves the PaymentIntent and updates the booking.\nIf the PaymentIntent has not succeeded yet, the booking remains in its pre-paid state.\n\n**Notification side effects:** Creates idempotent `payment.succeeded.*` notifications for the customer and vendor team, or `payment.failed.*` for incomplete payments.\n\n**Next step:** Vendor confirms or rejects the booking via `POST /api/v1/bookings/{bookingId}/vendor/decision`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Booking ID"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false
                },
                "example": {}
              }
            }
          },
          "responses": {
            "200": {
              "description": "Payment confirmed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Payment confirmed successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "bookingId": {
                            "type": "string"
                          },
                          "status": {
                            "type": "string",
                            "example": "paid"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}/payment-status": {
        "get": {
          "tags": [
            "Bookings"
          ],
          "summary": "Get payment status for booking",
          "description": "**Flow context:** Used during or after the payment flow to poll for the latest status.\n\n**What this endpoint does:**\nReturns the latest payment status for the booking.\n- If the booking has no PaymentIntent yet, the API returns `NOT_STARTED`.\n- If a PaymentIntent exists, the API retrieves it from Stripe and returns the Stripe status, amount, and currency.\n\nTypical frontend usage: Poll this endpoint while awaiting completion (or after returning from a redirect flow).\n\n⚠️ **Amount fields:** The `amount` field is in **minor currency units** (pence for GBP, cents for USD). Divide by `_meta.minorUnitDivisor` (100) for display.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Booking ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Payment status retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Payment status retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_meta": {
                            "type": "object",
                            "description": "Metadata about response format and currency units",
                            "properties": {
                              "amountsInMinorUnits": {
                                "type": "boolean",
                                "example": true
                              },
                              "minorUnitDivisor": {
                                "type": "integer",
                                "example": 100
                              },
                              "currency": {
                                "type": "string",
                                "example": "GBP"
                              },
                              "note": {
                                "type": "string",
                                "example": "All amounts are in minor currency units (e.g. pence). Divide by 100 for display."
                              }
                            }
                          },
                          "bookingId": {
                            "type": "string"
                          },
                          "status": {
                            "type": "string",
                            "example": "succeeded"
                          },
                          "amount": {
                            "type": "number",
                            "description": "Total booking amount in minor currency units (e.g. pence for GBP). Divide by 100 for display.",
                            "example": 300000
                          },
                          "currency": {
                            "type": "string",
                            "example": "gbp"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Payment status retrieved successfully",
                    "data": {
                      "_meta": {
                        "amountsInMinorUnits": true,
                        "minorUnitDivisor": 100,
                        "currency": "GBP",
                        "note": "All amounts are in minor currency units (e.g. pence). Divide by 100 for display."
                      },
                      "bookingId": "64f1c2a9b3d6f5a2c1e9a111",
                      "status": "succeeded",
                      "amount": 300000,
                      "currency": "gbp"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}/release-payment": {
        "post": {
          "tags": [
            "Bookings"
          ],
          "summary": "Release payment to vendor",
          "description": "**Flow context — Previous step:** Booking was confirmed by vendor (`POST /api/v1/bookings/{bookingId}/vendor/decision` with `confirm`) and the service has been delivered.\n\n**What this endpoint does:**\nAdmin-only payout release for `split_payout` bookings where the platform collects funds first and later releases the vendor share via a Stripe Transfer.\n\nPreconditions:\n- Booking must have a succeeded PaymentIntent.\n- Booking must be configured for `split_payout`.\n- Vendor must have a connected Stripe account with transfers capability enabled.\n\n**Notification side effects:** Creates `payment.payout_released.*` notifications for the customer and vendor team.\n\n**Next step (terminal):** Payment cycle is complete.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Booking ID"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false
                },
                "example": {}
              }
            }
          },
          "responses": {
            "200": {
              "description": "Payment released to vendor successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Payment released to vendor successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "bookingId": {
                            "type": "string"
                          },
                          "transferId": {
                            "type": "string",
                            "example": "tr_123"
                          },
                          "amount": {
                            "type": "number",
                            "example": 0
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}/refund": {
        "post": {
          "tags": [
            "Bookings"
          ],
          "summary": "Create refund for booking",
          "description": "**Flow context:** Booking was rejected by vendor, cancelled by customer after payment, or a dispute was resolved in favor of the customer.\n\n**What this endpoint does:**\nAdmin-only refund operation. Creates a Stripe Refund against the booking's PaymentIntent.\n- Provide `amount` to do a partial refund.\n- Refund amount is in minor units (e.g. cents/pence).\n\n**Notification side effects:** Creates `payment.refunded.*` notifications for the customer and vendor team.\n\n**Next step:** Check refund list via `GET /api/v1/bookings/{bookingId}/refunds`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Booking ID"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "amount"
                  ],
                  "properties": {
                    "amount": {
                      "type": "number",
                      "description": "Refund amount (in the smallest currency unit if using Stripe)",
                      "example": 5000
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Refund created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Refund created successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "bookingId": {
                            "type": "string"
                          },
                          "refundId": {
                            "type": "string",
                            "example": "re_123"
                          },
                          "amount": {
                            "type": "number",
                            "example": 5000
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}/refunds": {
        "get": {
          "tags": [
            "Bookings"
          ],
          "summary": "Get refunds for booking",
          "description": "**What this endpoint does:**\nLists all Stripe refunds associated with the booking's PaymentIntent.\nIf the booking has no PaymentIntent yet, this returns an empty list.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Booking ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Refunds retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Refunds retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "bookingId": {
                            "type": "string"
                          },
                          "refunds": {
                            "type": "array",
                            "items": {
                              "type": "object"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/bookings/unified": {
        "post": {
          "tags": [
            "Bookings"
          ],
          "summary": "Step 1 - Customer Starts Unified Booking",
          "description": "**Flow context — Direct unified booking flow:** Customer starts the booking process by providing event details and choosing a pricing type (hourly rate, package pricing, or custom quote).\n\n**What this endpoint does:**\nCreates a new booking request in `pending` status. No payment happens yet.\nSaves the details, calculates the initial subtotal, and sends a notification to the vendor.\n\n**Previous steps:** None (initial step).\n**Next step:** Vendor confirms availability via `PATCH /api/v1/bookings/{bookingId}/unified-status`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "vendorId",
                    "serviceCategoryId",
                    "eventDetails",
                    "location",
                    "pricingType"
                  ],
                  "properties": {
                    "vendorId": {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e555"
                    },
                    "serviceCategoryId": {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e666"
                    },
                    "eventDetails": {
                      "type": "object",
                      "properties": {
                        "title": {
                          "type": "string",
                          "example": "Wedding Reception"
                        },
                        "startDate": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2026-08-15T14:00:00.000Z"
                        },
                        "endDate": {
                          "type": "string",
                          "format": "date-time",
                          "example": "2026-08-15T20:00:00.000Z"
                        },
                        "guestCount": {
                          "type": "number",
                          "example": 150
                        },
                        "description": {
                          "type": "string",
                          "example": "Our wedding reception dinner"
                        }
                      }
                    },
                    "location": {
                      "type": "object",
                      "properties": {
                        "addressText": {
                          "type": "string",
                          "example": "123 Grand Hall, London"
                        }
                      }
                    },
                    "currency": {
                      "type": "string",
                      "example": "GBP"
                    },
                    "pricingType": {
                      "type": "string",
                      "enum": [
                        "hourly_rate",
                        "package_pricing",
                        "custom_quotes"
                      ],
                      "example": "hourly_rate"
                    },
                    "estimatedServiceHours": {
                      "type": "number",
                      "description": "Required if pricingType is hourly_rate",
                      "example": 6
                    },
                    "vendorSpecialtyId": {
                      "type": "string",
                      "description": "Required if pricingType is hourly_rate or package_pricing",
                      "example": "64f0c2f7a2b6c1a9b3d2e777"
                    },
                    "budget": {
                      "type": "number",
                      "description": "Required if pricingType is custom_quotes (in normal currency units)",
                      "example": 1500
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Booking request created successfully in PENDING status.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Unified booking request created successfully"
                      },
                      "data": {
                        "type": "object"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}/unified-status": {
        "patch": {
          "tags": [
            "Bookings"
          ],
          "summary": "Step 2a - Vendor Confirms Availability",
          "description": "**Flow context:** Vendor receives the unified booking request and confirms availability for the date.\n\n**What this endpoint does:**\nUpdates the booking status to `reviewing`.\nSends a notification to the customer letting them know the vendor is available.\n\n**Previous steps:** Customer created request (`POST /api/v1/bookings/unified`).\n**Next step:** Vendor adjusts the pricing details to match reality via `PUT /api/v1/bookings/{bookingId}/unified-adjust`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Status updated to REVIEWING successfully."
            },
            "400": {
              "description": "Validation error (booking not in pending status, etc.)"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden (not the assigned vendor)"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}/unified-adjust": {
        "put": {
          "tags": [
            "Bookings"
          ],
          "summary": "Step 2b - Vendor Adjusts Pricing Details",
          "description": "**Flow context:** Vendor adjusts the pricing parameters to reflect actual prep/execution, extra items, or custom quote.\n\n**What this endpoint does:**\nUpdates the booking's pricing details and recalculates the subtotal/total. Status remains `reviewing`.\n- For `hourly_rate`: updates `actualServiceHours`.\n- For `package_pricing`: updates `extraLineItems` (adds fees like transport fee).\n- For `custom_quotes`: updates `finalPrice`.\n\n**Previous steps:** Vendor confirmed availability (`PATCH /api/v1/bookings/{bookingId}/unified-status`).\n**Next step:** Vendor approves and sends invoice via `POST /api/v1/bookings/{bookingId}/unified-send-invoice`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "actualServiceHours": {
                      "type": "number",
                      "description": "Required for hourly_rate bookings.",
                      "example": 8
                    },
                    "extraLineItems": {
                      "type": "array",
                      "description": "Required for package_pricing bookings.",
                      "items": {
                        "type": "object",
                        "required": [
                          "description",
                          "amount"
                        ],
                        "properties": {
                          "description": {
                            "type": "string",
                            "example": "Transport Fee"
                          },
                          "amount": {
                            "type": "number",
                            "example": 75.5
                          }
                        }
                      }
                    },
                    "finalPrice": {
                      "type": "number",
                      "description": "Required for custom_quotes bookings.",
                      "example": 1800
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Pricing details updated successfully."
            },
            "400": {
              "description": "Validation error"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/bookings/{bookingId}/unified-send-invoice": {
        "post": {
          "tags": [
            "Bookings"
          ],
          "summary": "Step 3 - Vendor Sends Invoice",
          "description": "**Flow context:** Vendor finalizes and locks in pricing.\n\n**What this endpoint does:**\nLocks the final total on the backend, calculates platform commissions, and updates status to `awaiting_payment`.\nSends a notification or email with the invoice details to the customer.\n\n**Previous steps:** Vendor adjusted pricing (`PUT /api/v1/bookings/{bookingId}/unified-adjust`).\n**Next step:** Customer completes checkout via existing Stripe flow:\n  1. Create Stripe payment intent: `POST /api/v1/bookings/{bookingId}/payment-intent`\n  2. Complete Stripe checkout on client.\n  3. Confirm payment: `POST /api/v1/bookings/{bookingId}/confirm-payment` -> status becomes `booked`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "bookingId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Invoice approved and sent to client. Status transitioned to AWAITING_PAYMENT."
            },
            "400": {
              "description": "Validation error"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/business-profiles": {
        "post": {
          "tags": [
            "BusinessProfiles"
          ],
          "summary": "Create or update a business profile",
          "description": "Creates a new business profile for the authenticated vendor, or updates the existing one if a profile already exists for this vendor.\n\n**Idempotent / safe to re-submit:** If the vendor already has a business profile, the existing record is updated and returned (no 409 error).\n\nOn first creation, the vendor's `onBoardingStage` is advanced to `1` (never decremented).\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "vendorId",
                    "businessName",
                    "yearInBusiness",
                    "companyRegNo",
                    "businessRegType",
                    "businessDescription"
                  ],
                  "properties": {
                    "vendorId": {
                      "type": "string",
                      "format": "objectId",
                      "example": "507f1f77bcf86cd799439011",
                      "description": "MongoDB ObjectId of the vendor"
                    },
                    "contactInfo": {
                      "type": "object",
                      "description": "Contact information for the business",
                      "required": [
                        "primaryContactName",
                        "emailAddress",
                        "phoneNumber",
                        "meansOfIdentification"
                      ],
                      "properties": {
                        "primaryContactName": {
                          "type": "string",
                          "example": "Jane Doe"
                        },
                        "emailAddress": {
                          "type": "string",
                          "format": "email",
                          "example": "contact@acme.com"
                        },
                        "phoneNumber": {
                          "type": "string",
                          "example": 2348012345678
                        },
                        "meansOfIdentification": {
                          "type": "string",
                          "example": "NIN"
                        },
                        "addressId": {
                          "type": "string",
                          "format": "objectId",
                          "description": "Address ObjectId linked to this business contact info",
                          "example": "507f1f77bcf86cd799439012"
                        }
                      }
                    },
                    "businessName": {
                      "type": "string",
                      "example": "Acme Services Ltd"
                    },
                    "yearInBusiness": {
                      "type": "string",
                      "description": "Enum value from YearInBusinessRange",
                      "example": "1_3_YEARS"
                    },
                    "companyRegNo": {
                      "type": "string",
                      "example": "RC-1234567"
                    },
                    "businessRegType": {
                      "type": "string",
                      "description": "Enum value from BusinessProfileType",
                      "example": "SOLE_PROPRIETORSHIP"
                    },
                    "businessDescription": {
                      "type": "string",
                      "example": "We provide professional home cleaning services."
                    },
                    "businessDocuments": {
                      "type": "array",
                      "description": "Optional supporting documents (UploadedFile IDs)",
                      "items": {
                        "type": "object",
                        "required": [
                          "docName",
                          "file"
                        ],
                        "properties": {
                          "docName": {
                            "type": "string",
                            "example": "CAC Certificate"
                          },
                          "file": {
                            "type": "string",
                            "format": "objectId",
                            "example": "507f1f77bcf86cd799439013"
                          }
                        }
                      }
                    },
                    "serviceArea": {
                      "type": "object",
                      "description": "Optional service area coverage",
                      "properties": {
                        "travelDistance": {
                          "type": "string",
                          "example": "10km"
                        },
                        "areaNames": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "city": {
                                "type": "string",
                                "example": "lagos"
                              },
                              "state": {
                                "type": "string",
                                "example": "lagos"
                              },
                              "country": {
                                "type": "string",
                                "example": "NG"
                              }
                            }
                          }
                        }
                      }
                    },
                    "workdays": {
                      "type": "array",
                      "description": "Business operating days (defaults to Mon-Fri 9AM-5PM if not provided)",
                      "items": {
                        "type": "object",
                        "required": [
                          "dayOfWeek",
                          "open",
                          "close"
                        ],
                        "properties": {
                          "dayOfWeek": {
                            "type": "string",
                            "example": "monday"
                          },
                          "open": {
                            "type": "string",
                            "format": "time",
                            "example": "09:00",
                            "description": "Time in HH:mm format"
                          },
                          "close": {
                            "type": "string",
                            "format": "time",
                            "example": "17:00",
                            "description": "Time in HH:mm format"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Business profile created or updated",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "BusinessProfile saved successfully"
                      },
                      "data": {
                        "type": "object",
                        "description": "Created or updated business profile",
                        "properties": {
                          "_id": {
                            "type": "string",
                            "example": "507f1f77bcf86cd799439099"
                          },
                          "vendorId": {
                            "type": "string",
                            "example": "507f1f77bcf86cd799439011"
                          },
                          "businessName": {
                            "type": "string",
                            "example": "Acme Services Ltd"
                          },
                          "businessDescription": {
                            "type": "string",
                            "example": "We provide professional home cleaning services."
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "BusinessProfile saved successfully",
                    "data": {
                      "_id": "507f1f77bcf86cd799439099",
                      "vendorId": "507f1f77bcf86cd799439011",
                      "businessName": "Acme Services Ltd",
                      "businessDescription": "We provide professional home cleaning services.",
                      "createdAt": "2026-01-16T08:30:36.092Z",
                      "updatedAt": "2026-01-16T08:30:36.092Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        },
        "get": {
          "tags": [
            "BusinessProfiles"
          ],
          "summary": "List all business profiles (admin)",
          "description": "Returns paginated business profiles. Requires ADMIN role.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "example": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "example": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Business profiles retrieved",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "BusinessProfiles retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "description": "Paginated result",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "vendorId": {
                                  "type": "string"
                                },
                                "businessName": {
                                  "type": "string"
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 1
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "BusinessProfiles retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "507f1f77bcf86cd799439099",
                          "vendorId": "507f1f77bcf86cd799439011",
                          "businessName": "Acme Services Ltd"
                        }
                      ],
                      "total": 1,
                      "page": 1,
                      "limit": 10
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/business-profiles/me": {
        "get": {
          "tags": [
            "BusinessProfiles"
          ],
          "summary": "Get signed-in user's business profile",
          "description": "Returns the business profile for the authenticated vendor (or vendor staff's vendor).",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "BusinessProfile retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "BusinessProfile retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "vendorId": {
                            "type": "string"
                          },
                          "businessName": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "BusinessProfile retrieved successfully",
                    "data": {
                      "_id": "507f1f77bcf86cd799439099",
                      "vendorId": "507f1f77bcf86cd799439011",
                      "businessName": "Acme Services Ltd"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Not found"
            }
          }
        }
      },
      "/api/v1/business-profiles/{id}": {
        "get": {
          "tags": [
            "BusinessProfiles"
          ],
          "summary": "Get a business profile by ID",
          "description": "Returns a single business profile by its ID.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Business profile ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Business profile retrieved",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "BusinessProfile retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "vendorId": {
                            "type": "string"
                          },
                          "businessName": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "BusinessProfile retrieved successfully",
                    "data": {
                      "_id": "507f1f77bcf86cd799439099",
                      "vendorId": "507f1f77bcf86cd799439011",
                      "businessName": "Acme Services Ltd"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not found"
            }
          }
        },
        "put": {
          "tags": [
            "BusinessProfiles"
          ],
          "summary": "Update a business profile",
          "description": "Updates fields on an existing business profile.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Business profile ID"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Partial update payload",
                  "properties": {
                    "vendorId": {
                      "type": "string",
                      "format": "objectId",
                      "example": "507f1f77bcf86cd799439011",
                      "description": "MongoDB ObjectId of the vendor"
                    },
                    "contactInfo": {
                      "type": "object",
                      "description": "Contact information for the business",
                      "properties": {
                        "primaryContactName": {
                          "type": "string"
                        },
                        "emailAddress": {
                          "type": "string",
                          "format": "email"
                        },
                        "phoneNumber": {
                          "type": "string"
                        },
                        "addressId": {
                          "type": "string",
                          "format": "objectId"
                        },
                        "meansOfIdentification": {
                          "type": "string"
                        }
                      }
                    },
                    "businessName": {
                      "type": "string"
                    },
                    "yearInBusiness": {
                      "type": "string"
                    },
                    "companyRegNo": {
                      "type": "string"
                    },
                    "businessRegType": {
                      "type": "string"
                    },
                    "businessDescription": {
                      "type": "string"
                    },
                    "businessDocuments": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "docName": {
                            "type": "string"
                          },
                          "file": {
                            "type": "string",
                            "format": "objectId"
                          }
                        }
                      }
                    },
                    "serviceArea": {
                      "type": "object",
                      "properties": {
                        "travelDistance": {
                          "type": "string"
                        },
                        "areaNames": {
                          "type": "array",
                          "items": {
                            "type": "object",
                            "properties": {
                              "city": {
                                "type": "string"
                              },
                              "state": {
                                "type": "string"
                              },
                              "country": {
                                "type": "string"
                              }
                            }
                          }
                        }
                      }
                    },
                    "workdays": {
                      "type": "array",
                      "description": "Business operating days",
                      "items": {
                        "type": "object",
                        "properties": {
                          "dayOfWeek": {
                            "type": "string",
                            "example": "monday"
                          },
                          "open": {
                            "type": "string",
                            "format": "time",
                            "example": "09:00",
                            "description": "Time in HH:mm format"
                          },
                          "close": {
                            "type": "string",
                            "format": "time",
                            "example": "17:00",
                            "description": "Time in HH:mm format"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Business profile updated",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "BusinessProfile updated successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "vendorId": {
                            "type": "string"
                          },
                          "businessName": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "BusinessProfile updated successfully",
                    "data": {
                      "_id": "507f1f77bcf86cd799439099",
                      "vendorId": "507f1f77bcf86cd799439011",
                      "businessName": "Acme Services Ltd"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not found"
            }
          }
        },
        "delete": {
          "tags": [
            "BusinessProfiles"
          ],
          "summary": "Delete a business profile",
          "description": "Deletes a business profile by ID.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Business profile ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Business profile deleted",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "BusinessProfile deleted successfully"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not found"
            }
          }
        }
      },
      "/api/v1/business-profiles/search-by-name": {
        "get": {
          "tags": [
            "BusinessProfiles"
          ],
          "summary": "List business profiles by name",
          "description": "Returns paginated business profiles. Requires ADMIN role.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "example": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "example": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Business profiles retrieved",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "BusinessProfiles retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "description": "Paginated result",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "vendorId": {
                                  "type": "string"
                                },
                                "businessName": {
                                  "type": "string"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "BusinessProfiles retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "507f1f77bcf86cd799439099",
                          "vendorId": "507f1f77bcf86cd799439011",
                          "businessName": "Acme Services Ltd"
                        }
                      ]
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/chats": {
        "get": {
          "tags": [
            "Chats"
          ],
          "summary": "List conversations",
          "description": "Returns chat conversations visible to the authenticated actor.\n- `customer`/`admin`: conversations they started (user-side)\n- `vendor`: conversations for their vendor\n- `vendorstaff`: conversations for their vendor if they have `chat` permission\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Conversations retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChatConversationListResponse"
                  },
                  "example": {
                    "message": "Conversations retrieved successfully",
                    "data": [
                      {
                        "_id": "64f0c2f7a2b6c1a9b3d2e901",
                        "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                        "userId": "64f0c2f7a2b6c1a9b3d2e111",
                        "user": {
                          "firstName": "John",
                          "lastName": "Doe",
                          "avatar": "https://cdn.example.com/avatar.jpg"
                        },
                        "counterpartyType": "customer",
                        "status": "open",
                        "lastMessageId": "64f0c2f7a2b6c1a9b3d2e902",
                        "lastMessageAt": "2026-01-16T10:00:00.000Z",
                        "lastMessagePreview": "Hello, are you available next weekend?",
                        "vendorLastReadAt": "2026-01-16T10:01:00.000Z",
                        "userLastReadAt": "2026-01-16T10:00:00.000Z",
                        "createdAt": "2026-01-16T09:55:00.000Z",
                        "updatedAt": "2026-01-16T10:01:00.000Z"
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/chats/vendor/{vendorId}": {
        "post": {
          "tags": [
            "Chats"
          ],
          "summary": "Get or create a vendor conversation",
          "description": "Creates (or returns) the 1:1 chat conversation between the authenticated user (customer/admin) and the vendor.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Conversation ready",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChatConversationResponse"
                  },
                  "example": {
                    "message": "Conversation ready",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2e901",
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "userId": "64f0c2f7a2b6c1a9b3d2e111",
                      "user": {
                        "firstName": "John",
                        "lastName": "Doe",
                        "avatar": "https://cdn.example.com/avatar.jpg"
                      },
                      "counterpartyType": "customer",
                      "status": "open",
                      "createdAt": "2026-01-16T09:55:00.000Z",
                      "updatedAt": "2026-01-16T09:55:00.000Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/chats/{conversationId}/messages": {
        "get": {
          "tags": [
            "Chats"
          ],
          "summary": "List messages (offline sync)",
          "description": "Returns messages for a conversation. Supports cursor-style pagination using `before`.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "conversationId",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 30
              }
            },
            {
              "in": "query",
              "name": "before",
              "required": false,
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Return messages older than this timestamp."
            }
          ],
          "responses": {
            "200": {
              "description": "Messages retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChatMessageListResponse"
                  },
                  "example": {
                    "message": "Messages retrieved successfully",
                    "data": [
                      {
                        "_id": "64f0c2f7a2b6c1a9b3d2e902",
                        "conversationId": "64f0c2f7a2b6c1a9b3d2e901",
                        "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                        "senderUserId": "64f0c2f7a2b6c1a9b3d2e111",
                        "senderSide": "user",
                        "type": "text",
                        "text": "Hello, are you available next weekend?",
                        "attachments": [
                          {
                            "fileId": {
                              "_id": "64f0c2f7a2b6c1a9b3d2e777",
                              "originalName": "invoice.pdf",
                              "mimeType": "application/pdf",
                              "size": 123456,
                              "url": "https://cdn.example.com/files/invoice.pdf"
                            }
                          }
                        ],
                        "createdAt": "2026-01-16T10:00:00.000Z",
                        "updatedAt": "2026-01-16T10:00:00.000Z"
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Conversation not found"
            }
          }
        },
        "post": {
          "tags": [
            "Chats"
          ],
          "summary": "Send message",
          "description": "Persists a message to MongoDB and broadcasts it in realtime (Socket.IO) to the conversation room.\n\n**Notification side effects:** Creates a `chat.message.created.*` notification for the opposite side of the conversation.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "conversationId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SendChatMessageInput"
                },
                "example": {
                  "type": "text",
                  "text": "Hello, are you available next weekend?",
                  "clientMessageId": "cmsg_01HQExample"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Message sent successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChatMessageResponse"
                  },
                  "example": {
                    "message": "Message sent successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2e902",
                      "conversationId": "64f0c2f7a2b6c1a9b3d2e901",
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "senderUserId": "64f0c2f7a2b6c1a9b3d2e111",
                      "senderSide": "user",
                      "type": "text",
                      "text": "Hello, are you available next weekend?",
                      "attachments": [
                        {
                          "fileId": "64f0c2f7a2b6c1a9b3d2e777"
                        }
                      ],
                      "clientMessageId": "cmsg_01HQExample",
                      "createdAt": "2026-01-16T10:00:00.000Z",
                      "updatedAt": "2026-01-16T10:00:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Conversation not found"
            }
          }
        }
      },
      "/api/v1/chats/{conversationId}/read": {
        "post": {
          "tags": [
            "Chats"
          ],
          "summary": "Mark conversation as read",
          "description": "Updates the read marker for the current side (user-side or vendor-side).",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "conversationId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Conversation marked as read",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/ChatMarkReadResponse"
                  },
                  "example": {
                    "message": "Conversation marked as read",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2e901",
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "userId": "64f0c2f7a2b6c1a9b3d2e111",
                      "counterpartyType": "customer",
                      "status": "open",
                      "vendorLastReadAt": "2026-01-16T10:01:00.000Z",
                      "userLastReadAt": "2026-01-16T10:00:00.000Z",
                      "createdAt": "2026-01-16T09:55:00.000Z",
                      "updatedAt": "2026-01-16T10:01:00.000Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Conversation not found"
            }
          }
        }
      },
      "/api/v1/commissions": {
        "post": {
          "tags": [
            "Commissions"
          ],
          "summary": "Create a commissions (Admin only)",
          "description": "Creates a new commissions that vendors can attach to their offerings.\nRequires authentication.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCommissionInput"
                },
                "example": {
                  "type": "flat_rate",
                  "amount": 50,
                  "currency": "NGN"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Commission created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Commission created successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Commission"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "409": {
              "description": "Commission already exists"
            }
          }
        },
        "get": {
          "tags": [
            "Commissions"
          ],
          "summary": "List commissions (paginated)",
          "description": "Returns commissions using simple page/limit pagination. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number"
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "description": "Items per page"
            }
          ],
          "responses": {
            "200": {
              "description": "Commissions retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Commissions retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/Commission"
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 42
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/commissions/{id}": {
        "get": {
          "tags": [
            "Commissions"
          ],
          "summary": "Get a commissions by ID",
          "description": "Retrieves a single commissions document. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Commission ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Commission retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Commission retrieved successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Commission"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Commission not found"
            }
          }
        },
        "put": {
          "tags": [
            "Commissions"
          ],
          "summary": "Update a commissions (Admin only)",
          "description": "Updates fields on an existing commissions. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Commission ID"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCommissionInput"
                },
                "example": {
                  "amount": 75,
                  "currency": "NGN"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Commission updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Commission updated successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Commission"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Commission not found"
            }
          }
        },
        "delete": {
          "tags": [
            "Commissions"
          ],
          "summary": "Delete a commissions (Admin only)",
          "description": "Deletes a commissions by ID. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Commission ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Commission deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Commission deleted successfully"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Commission not found"
            }
          }
        }
      },
      "/api/v1/config/stripe": {
        "get": {
          "tags": [
            "Config"
          ],
          "summary": "Get Stripe publishable key (for Stripe.js)",
          "description": "Returns the Stripe **publishable** key used by Stripe.js on the frontend.\nThis is safe to expose publicly.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Stripe config retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "publishableKey": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "503": {
              "description": "Stripe not configured"
            }
          }
        }
      },
      "/api/v1/customers/{customerId}/payment-methods": {
        "post": {
          "tags": [
            "Customers"
          ],
          "summary": "Add payment method for customer",
          "description": "Adds a payment method to the customer.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "customerId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Customer ID"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Payment method payload",
                  "properties": {
                    "paymentMethodId": {
                      "type": "string",
                      "example": "pm_123"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Payment method added successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Payment method added successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "customerId": {
                            "type": "string"
                          },
                          "paymentMethodId": {
                            "type": "string",
                            "example": "pm_123"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        },
        "get": {
          "tags": [
            "Customers"
          ],
          "summary": "List all payment methods for customer",
          "description": "Returns all stored payment methods for the customer.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "customerId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Customer ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Payment methods retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Payment methods retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "customerId": {
                            "type": "string"
                          },
                          "paymentMethods": {
                            "type": "array",
                            "items": {
                              "type": "object"
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/customers/{customerId}/payment-methods/{paymentMethodId}/default": {
        "put": {
          "tags": [
            "Customers"
          ],
          "summary": "Set default payment method",
          "description": "Sets the given payment method as the default for the customer.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "customerId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Customer ID"
            },
            {
              "in": "path",
              "name": "paymentMethodId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Payment method ID"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false
                },
                "example": {}
              }
            }
          },
          "responses": {
            "200": {
              "description": "Default payment method updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Default payment method updated successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "customerId": {
                            "type": "string"
                          },
                          "defaultPaymentMethod": {
                            "type": "string",
                            "example": "pm_123"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/customers/{customerId}/payment-methods/{paymentMethodId}": {
        "delete": {
          "tags": [
            "Customers"
          ],
          "summary": "Remove payment method",
          "description": "Removes the specified payment method from the customer.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "customerId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Customer ID"
            },
            {
              "in": "path",
              "name": "paymentMethodId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Payment method ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Payment method removed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Payment method removed successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "customerId": {
                            "type": "string"
                          },
                          "removedPaymentMethod": {
                            "type": "string",
                            "example": "pm_123"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/customers/me/favorites": {
        "get": {
          "tags": [
            "Customers - Favorites"
          ],
          "summary": "List my favorited vendors",
          "description": "Returns a paginated list of vendors the authenticated client has added to their favorites.\nEach record contains the populated vendor data (business name, profile photo, rating, etc.).\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              },
              "description": "Page number (1-based)"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              },
              "description": "Records per page"
            }
          ],
          "responses": {
            "200": {
              "description": "Favorites retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Favorites retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "vendorId": {
                                  "type": "object",
                                  "description": "Populated vendor document"
                                },
                                "createdAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 5
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/customers/me/favorites/{vendorId}": {
        "get": {
          "tags": [
            "Customers - Favorites"
          ],
          "summary": "Check if a vendor is favorited",
          "description": "Returns a boolean indicating whether the authenticated client has favorited the specified vendor.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The vendor ObjectId to check",
              "example": "665a1b2c3d4e5f6a7b8c9d0e"
            }
          ],
          "responses": {
            "200": {
              "description": "Favorite status retrieved",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Favorite status retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "isFavorited": {
                            "type": "boolean",
                            "example": true
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        },
        "post": {
          "tags": [
            "Customers - Favorites"
          ],
          "summary": "Add a vendor to favorites",
          "description": "Adds the specified vendor to the authenticated client's favorites list.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The vendor ObjectId to favorite",
              "example": "665a1b2c3d4e5f6a7b8c9d0e"
            }
          ],
          "responses": {
            "201": {
              "description": "Vendor added to favorites",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor added to favorites"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "userId": {
                            "type": "string"
                          },
                          "vendorId": {
                            "type": "string"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Vendor not found"
            },
            "409": {
              "description": "Vendor is already in your favorites"
            }
          }
        },
        "delete": {
          "tags": [
            "Customers - Favorites"
          ],
          "summary": "Remove a vendor from favorites",
          "description": "Removes the specified vendor from the authenticated client's favorites list.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The vendor ObjectId to un-favorite",
              "example": "665a1b2c3d4e5f6a7b8c9d0e"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor removed from favorites",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor removed from favorites"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Favorite not found"
            }
          }
        }
      },
      "/api/v1/customer-profile-management/me/overview": {
        "get": {
          "tags": [
            "Customer Profile Management"
          ],
          "summary": "Get signed-in customer's profile overview",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Customer profile overview retrieved successfully"
            }
          }
        }
      },
      "/api/v1/customer-profile-management/{customerId}/overview": {
        "get": {
          "tags": [
            "Customer Profile Management"
          ],
          "summary": "Get customer's profile overview (self or admin)",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "customerId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Customer profile overview retrieved successfully"
            }
          }
        }
      },
      "/api/v1/customer-profile-management/me/bookings": {
        "get": {
          "tags": [
            "Customer Profile Management"
          ],
          "summary": "List bookings made by the signed-in customer",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "number",
                "example": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "number",
                "example": 20
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Customer bookings retrieved successfully"
            }
          }
        }
      },
      "/api/v1/customer-profile-management/{customerId}/bookings": {
        "get": {
          "tags": [
            "Customer Profile Management"
          ],
          "summary": "List bookings made by a customer (self or admin)",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "customerId",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "number",
                "example": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "number",
                "example": 20
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Customer bookings retrieved successfully"
            }
          }
        }
      },
      "/api/v1/customer-profile-management/me/reviews": {
        "get": {
          "tags": [
            "Customer Profile Management"
          ],
          "summary": "List reviews made by the signed-in customer",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "number",
                "example": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "number",
                "example": 20
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Customer reviews retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Customer reviews retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "rating": {
                                  "type": "integer"
                                },
                                "comment": {
                                  "type": "string"
                                },
                                "reviewerUserId": {
                                  "type": "string"
                                },
                                "vendorId": {
                                  "type": "object",
                                  "properties": {
                                    "_id": {
                                      "type": "string"
                                    },
                                    "rate": {
                                      "type": "number"
                                    },
                                    "profilePhoto": {
                                      "type": "object",
                                      "description": "Populated uploaded file document"
                                    },
                                    "businessProfile": {
                                      "type": "object",
                                      "properties": {
                                        "_id": {
                                          "type": "string"
                                        },
                                        "businessName": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  }
                                },
                                "createdAt": {
                                  "type": "string",
                                  "format": "date-time"
                                },
                                "updatedAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "number"
                          },
                          "page": {
                            "type": "number"
                          },
                          "limit": {
                            "type": "number"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/customer-profile-management/{customerId}/reviews": {
        "get": {
          "tags": [
            "Customer Profile Management"
          ],
          "summary": "List reviews made by a customer (self or admin)",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "customerId",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "number",
                "example": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "number",
                "example": 20
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Customer reviews retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Customer reviews retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "rating": {
                                  "type": "integer"
                                },
                                "comment": {
                                  "type": "string"
                                },
                                "reviewerUserId": {
                                  "type": "string"
                                },
                                "vendorId": {
                                  "type": "object",
                                  "properties": {
                                    "_id": {
                                      "type": "string"
                                    },
                                    "rate": {
                                      "type": "number"
                                    },
                                    "profilePhoto": {
                                      "type": "object",
                                      "description": "Populated uploaded file document"
                                    },
                                    "businessProfile": {
                                      "type": "object",
                                      "properties": {
                                        "_id": {
                                          "type": "string"
                                        },
                                        "businessName": {
                                          "type": "string"
                                        }
                                      }
                                    }
                                  }
                                },
                                "createdAt": {
                                  "type": "string",
                                  "format": "date-time"
                                },
                                "updatedAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              }
                            }
                          },
                          "total": {
                            "type": "number"
                          },
                          "page": {
                            "type": "number"
                          },
                          "limit": {
                            "type": "number"
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/customer-profile-management/me/payment-dashboard": {
        "get": {
          "tags": [
            "Customer Profile Management"
          ],
          "summary": "Get signed-in customer's payment dashboard",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Customer payment dashboard retrieved successfully"
            }
          }
        }
      },
      "/api/v1/customer-profile-management/{customerId}/payment-dashboard": {
        "get": {
          "tags": [
            "Customer Profile Management"
          ],
          "summary": "Get customer's payment dashboard (self or admin)",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "customerId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Customer payment dashboard retrieved successfully"
            }
          }
        }
      },
      "/api/v1/customer-requests/drafts": {
        "post": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "Create a DraftCustomer Request",
          "description": "Creates a new Customer Request. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateRequestInput"
                },
                "example": {
                  "serviceCategoryId": "64f0c2f7a2b6c1a9b3d2e111",
                  "customerId": "64f0c2f7a2b6c1a9b3d2e222",
                  "eventDetails": {
                    "title": "Birthday Party",
                    "startDate": "2024-12-01T18:00:00.000Z",
                    "endDate": "2024-12-01T23:00:00.000Z",
                    "guestCount": 50,
                    "location": "123 Party St",
                    "description": "Fun birthday party"
                  },
                  "budgetAllocations": [
                    {
                      "serviceSpecialtyId": "64f0c2f7a2b6c1a9b3d2e333",
                      "budgetedAmount": 5000
                    }
                  ],
                  "attachments": [
                    "64f0c2f7a2b6c1a9b3d2e444",
                    "64f0c2f7a2b6c1a9b3d2e555"
                  ]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Customer Request created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Customer Request created successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/CustomerRequest"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/customer-requests/drafts/{id}": {
        "patch": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "Update a draft Customer Request (no submit)",
          "description": "Updates an existing draft (or cancelled) Customer Request without submitting it.\n\nRules:\n- Draft must belong to the authenticated user\n- Draft must be in `DRAFT` or `CANCELLED`\n- Does not allow changing `customerId` or `status`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Draft Customer Request ID"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateDraftCustomerRequestInput"
                },
                "examples": {
                  "updateEventDetails": {
                    "summary": "Update event details (draft stays draft)",
                    "value": {
                      "eventDetails": {
                        "title": "Updated title (still a draft)",
                        "guestCount": 75,
                        "location": "123 Party St"
                      }
                    }
                  },
                  "updateAttachmentsAndBudget": {
                    "summary": "Update attachments and budget allocations",
                    "value": {
                      "attachments": [
                        "64f0c2f7a2b6c1a9b3d2e444",
                        "64f0c2f7a2b6c1a9b3d2e555"
                      ],
                      "budgetAllocations": [
                        {
                          "serviceSpecialtyId": "64f0c2f7a2b6c1a9b3d2e333",
                          "budgetedAmount": 5000
                        }
                      ]
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Draft Customer Request updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Draft Customer Request updated successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/CustomerRequest"
                      }
                    }
                  },
                  "example": {
                    "message": "Draft Customer Request updated successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2e999",
                      "customerId": "64f0c2f7a2b6c1a9b3d2e222",
                      "serviceCategoryId": "64f0c2f7a2b6c1a9b3d2e111",
                      "status": "DRAFT",
                      "eventDetails": {
                        "title": "Updated title (still a draft)",
                        "guestCount": 75,
                        "location": "123 Party St"
                      },
                      "budgetAllocations": [
                        {
                          "serviceSpecialtyId": "64f0c2f7a2b6c1a9b3d2e333",
                          "budgetedAmount": 5000
                        }
                      ],
                      "attachments": [
                        "64f0c2f7a2b6c1a9b3d2e444",
                        "64f0c2f7a2b6c1a9b3d2e555"
                      ],
                      "createdAt": "2026-02-11T11:00:00.000Z",
                      "updatedAt": "2026-02-11T12:00:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Draft Customer Request not found"
            }
          }
        }
      },
      "/api/v1/customer-requests/submit": {
        "post": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "Submit a Customer Request (create and submit)",
          "description": "Creates and immediately submits a new Customer Request.\n\nNotes:\n- `customerId` is derived from the authenticated user (do not send it in the body)\n- Status is set to `PENDING_APPROVAL`\n- Writes an audit log entry with action `SUBMIT`\n- Creates `customer_request.submitted` notifications for the customer and admins.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SubmitNewRequestInput"
                },
                "example": {
                  "serviceCategoryId": "64f0c2f7a2b6c1a9b3d2e111",
                  "eventDetails": {
                    "title": "Birthday Party",
                    "startDate": "2026-02-20T18:00:00.000Z",
                    "endDate": "2026-02-20T23:00:00.000Z",
                    "guestCount": 50,
                    "location": "123 Party St",
                    "description": "Fun birthday party"
                  },
                  "budgetAllocations": [
                    {
                      "serviceSpecialtyId": "64f0c2f7a2b6c1a9b3d2e333",
                      "budgetedAmount": 5000
                    }
                  ],
                  "attachments": [
                    "64f0c2f7a2b6c1a9b3d2e444",
                    "64f0c2f7a2b6c1a9b3d2e555"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Customer Request submitted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Draft Customer Request submitted successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/CustomerRequest"
                      }
                    }
                  },
                  "example": {
                    "message": "Draft Customer Request submitted successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2e999",
                      "customerId": "64f0c2f7a2b6c1a9b3d2e222",
                      "serviceCategoryId": "64f0c2f7a2b6c1a9b3d2e111",
                      "status": "PENDING_APPROVAL",
                      "eventDetails": {
                        "title": "Birthday Party",
                        "startDate": "2026-02-20T18:00:00.000Z",
                        "endDate": "2026-02-20T23:00:00.000Z",
                        "guestCount": 50,
                        "location": "123 Party St",
                        "description": "Fun birthday party"
                      },
                      "attachments": [
                        "64f0c2f7a2b6c1a9b3d2e444"
                      ],
                      "createdAt": "2026-02-11T12:00:00.000Z",
                      "updatedAt": "2026-02-11T12:00:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/customer-requests/submit/{id}": {
        "post": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "Submit a Draft Customer Request (by id)",
          "description": "Submits an existing draft for approval.\n\nAction:\n- Looks up the existing request by `id`\n- Verifies the request belongs to the authenticated user\n- Only allows submission if the request is currently `DRAFT` or `CANCELLED`\n- Applies any provided patch fields (optional)\n- Transitions the request to `PENDING_APPROVAL`\n- Writes an audit log entry with action `SUBMIT`\n- Creates `customer_request.submitted` notifications for the customer and admins.\n\nThis endpoint is tolerant of accidental URLs like `/submit/undefined` (these are treated as \"no id\" and will follow the `/submit` behavior).\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Draft Customer Request ID"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateRequestInput"
                },
                "examples": {
                  "empty": {
                    "summary": "Submit with no additional changes",
                    "value": {}
                  },
                  "patch": {
                    "summary": "Submit and patch a couple fields",
                    "value": {
                      "eventDetails": {
                        "title": "Updated title before submission",
                        "guestCount": 75
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Draft Customer Request submitted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Draft Customer Request submitted successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/CustomerRequest"
                      }
                    }
                  },
                  "example": {
                    "message": "Draft Customer Request submitted successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2e999",
                      "customerId": "64f0c2f7a2b6c1a9b3d2e222",
                      "serviceCategoryId": "64f0c2f7a2b6c1a9b3d2e111",
                      "status": "PENDING_APPROVAL",
                      "eventDetails": {
                        "title": "Updated title before submission",
                        "guestCount": 75
                      },
                      "createdAt": "2026-02-10T10:00:00.000Z",
                      "updatedAt": "2026-02-11T12:05:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Draft Customer Request not found (not a draft/cancelled, or missing)"
            }
          }
        }
      },
      "/api/v1/customer-requests": {
        "get": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "List all Customer Requests",
          "description": "Returns a paginated list of customer requests.\n\nSupports optional filters:\n- `serviceCategoryId`\n- `status`\n- `dateFrom`/`dateTo` (filters by `createdAt`)\n- `search` (MongoDB text search across `eventDetails.title`, `eventDetails.location`, `eventDetails.description`)\n\nExample query:\n`GET /api/v1/customer-requests?page=1&limit=10&status=pending_approval&serviceCategoryId=64f0c2f7a2b6c1a9b3d2e111&dateFrom=2026-01-01T00:00:00.000Z&dateTo=2026-01-31T23:59:59.999Z&search=birthday`\n",
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "example": 1
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "example": 10
            },
            {
              "in": "query",
              "name": "serviceCategoryId",
              "required": false,
              "schema": {
                "type": "string"
              },
              "description": "Filter by service category ObjectId",
              "example": "64f0c2f7a2b6c1a9b3d2e111"
            },
            {
              "in": "query",
              "name": "status",
              "required": false,
              "schema": {
                "type": "string"
              },
              "description": "Filter by request status",
              "example": "pending_approval"
            },
            {
              "in": "query",
              "name": "dateFrom",
              "required": false,
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Filter by createdAt >= dateFrom",
              "example": "2026-01-01T00:00:00.000Z"
            },
            {
              "in": "query",
              "name": "dateTo",
              "required": false,
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Filter by createdAt <= dateTo",
              "example": "2026-01-31T23:59:59.999Z"
            },
            {
              "in": "query",
              "name": "search",
              "required": false,
              "schema": {
                "type": "string"
              },
              "description": "MongoDB text search query across title/location/description (term-based)",
              "example": "birthday"
            }
          ],
          "responses": {
            "200": {
              "description": "Customer Requests retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Customer Requests retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/CustomerRequest"
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 42
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  },
                  "examples": {
                    "paginated": {
                      "summary": "Paginated customer requests",
                      "value": {
                        "message": "Customer Requests retrieved successfully",
                        "data": {
                          "data": [
                            {
                              "_id": "64f0c2f7a2b6c1a9b3d2e900",
                              "serviceCategoryId": {
                                "_id": "64f0c2f7a2b6c1a9b3d2e111",
                                "name": "Catering"
                              },
                              "customerId": {
                                "_id": "64f0c2f7a2b6c1a9b3d2e222",
                                "firstName": "John",
                                "lastName": "Doe",
                                "email": "john.doe@example.com",
                                "role": "customer"
                              },
                              "eventDetails": {
                                "title": "Birthday Party",
                                "startDate": "2026-01-20T18:00:00.000Z",
                                "endDate": "2026-01-20T23:00:00.000Z",
                                "guestCount": 50,
                                "location": "123 Party St",
                                "description": "Fun birthday party"
                              },
                              "budgetAllocations": [
                                {
                                  "serviceSpecialtyId": "64f0c2f7a2b6c1a9b3d2e333",
                                  "budgetedAmount": 5000
                                }
                              ],
                              "attachments": [],
                              "status": "pending_approval",
                              "approvedAt": null,
                              "createdAt": "2026-01-15T10:00:00.000Z",
                              "updatedAt": "2026-01-15T10:00:00.000Z"
                            }
                          ],
                          "total": 42,
                          "page": 1,
                          "limit": 10
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error (bad query params)"
            }
          }
        }
      },
      "/api/v1/customer-requests/me": {
        "get": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "List my Customer Requests",
          "description": "Returns a paginated list of Customer Requests for the authenticated user.\n\nSupports optional filters:\n- `serviceCategoryId`\n- `status`\n- `dateFrom`/`dateTo` (filters by `createdAt`)\n- `search` (MongoDB text search across `eventDetails.title`, `eventDetails.location`, `eventDetails.description`)\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "example": 1
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "example": 10
            },
            {
              "in": "query",
              "name": "serviceCategoryId",
              "required": false,
              "schema": {
                "type": "string"
              },
              "description": "Filter by service category ObjectId",
              "example": "64f0c2f7a2b6c1a9b3d2e111"
            },
            {
              "in": "query",
              "name": "status",
              "required": false,
              "schema": {
                "type": "string"
              },
              "description": "Filter by request status",
              "example": "pending_approval"
            },
            {
              "in": "query",
              "name": "dateFrom",
              "required": false,
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Filter by createdAt >= dateFrom",
              "example": "2026-01-01T00:00:00.000Z"
            },
            {
              "in": "query",
              "name": "dateTo",
              "required": false,
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Filter by createdAt <= dateTo",
              "example": "2026-01-31T23:59:59.999Z"
            },
            {
              "in": "query",
              "name": "search",
              "required": false,
              "schema": {
                "type": "string"
              },
              "description": "MongoDB text search query across title/location/description (term-based)",
              "example": "birthday"
            }
          ],
          "responses": {
            "200": {
              "description": "Customer Requests retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Customer Requests retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/CustomerRequest"
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 3
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error (bad query params)"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/customer-requests/{id}/quotes": {
        "get": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "Get quotes for a Customer Request",
          "description": "Returns all quotes associated with a specific Customer Request. Supports pagination and optional filters.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Customer Request ID"
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              }
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string"
              },
              "description": "Filter by quote status"
            },
            {
              "in": "query",
              "name": "dateFrom",
              "schema": {
                "type": "string",
                "format": "date-time"
              }
            },
            {
              "in": "query",
              "name": "dateTo",
              "schema": {
                "type": "string",
                "format": "date-time"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quotes retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Quotes retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/Quote"
                            }
                          },
                          "total": {
                            "type": "integer"
                          },
                          "page": {
                            "type": "integer"
                          },
                          "limit": {
                            "type": "integer"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Customer Request not found"
            }
          }
        }
      },
      "/api/v1/customer-requests/{id}": {
        "get": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "Get an Customer Request by ID",
          "description": "Returns a single Customer Request.",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Customer Request retrieved successfully"
            },
            "404": {
              "description": "Not found"
            }
          }
        },
        "delete": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "Delete an Customer Request",
          "description": "Deletes an Customer Request by ID. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Customer Request deleted successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not found"
            }
          }
        }
      },
      "/api/v1/customer-requests/customer/{id}": {
        "get": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "Get an Customer Request by Customer ID",
          "description": "Returns all Customer Requests for a specific customer.",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Customer Request retrieved successfully"
            },
            "404": {
              "description": "Not found"
            }
          }
        }
      },
      "/api/v1/customer-requests/{id}/approve-reject": {
        "patch": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "Approve or reject a Customer Request",
          "description": "Approves or rejects a pending Customer Request. When `approve` is `true`\nthe request status is set to **ACTIVE** and `approvedAt` / `approvedBy`\nare recorded. When `approve` is `false` the status is set to\n**REJECTED**. Requires an authenticated user with the **ADMIN** role.\n\n**Notification side effects:** Creates `customer_request.approved` or `customer_request.rejected` notifications for the customer. Approval also notifies matching vendor teams.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "description": "The Customer Request ID",
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ApproveOrRejectCustomerRequestInput"
                },
                "examples": {
                  "approve": {
                    "summary": "Approve the request",
                    "value": {
                      "approve": true
                    }
                  },
                  "reject": {
                    "summary": "Reject the request",
                    "value": {
                      "approve": false
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Customer Request approved or rejected successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Customer Request approved successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/CustomerRequest"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized – missing or invalid token"
            },
            "403": {
              "description": "Forbidden – requires ADMIN role"
            },
            "404": {
              "description": "Customer Request not found"
            }
          }
        }
      },
      "/api/v1/customer-requests/{id}/cancel": {
        "patch": {
          "tags": [
            "CustomerRequests"
          ],
          "summary": "Cancel a Customer Request",
          "description": "Cancels an existing Customer Request. Requires authentication.\n\n**Notification side effects:** Creates a `customer_request.cancelled` notification for the customer.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Customer Request updated successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not found"
            }
          }
        }
      },
      "/api/v1/disputes": {
        "post": {
          "tags": [
            "Disputes"
          ],
          "summary": "Create a dispute (client)",
          "description": "Opens a dispute for a booking payment. This is the entry point of the dispute lifecycle.\n\n**Flow:**\n- The dispute is created with status `evidence` and a 48-hour evidence window (`windowEndsAt = filedAt + 48h`).\n- A timeline event of type `created` is recorded.\n- Snapshots of the client, vendor, and booking details are captured at creation time.\n- Creates `dispute.created` notifications for the customer, vendor team, and admins.\n\n**Business rules:**\n- Only **one open dispute** per booking per customer (duplicates are blocked).\n- The booking **must have a `paymentIntentId`** (i.e. payment must have been processed).\n- You may provide `requestedRefundPercent` OR `requestedRefundAmountMinor`, but **not both**.\n- Default priority is `high`.\n\n**Lifecycle after creation:**\n- Client can cancel → status becomes `archived` (PATCH `/{disputeId}/cancel`)\n- Admin can escalate → status becomes `escalated` (POST `/admin/disputes/{disputeId}/escalate`)\n- Admin can resolve → status becomes `closed` (POST `/admin/disputes/{disputeId}/resolve`)\n\n**Roles:** `customer`, `user`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateDisputeInput"
                },
                "examples": {
                  "withRefundPercent": {
                    "summary": "Request 30% refund",
                    "value": {
                      "bookingId": "64f1c2a9b3d6f5a2c1e9a111",
                      "clientClaim": "Photos were poorly lit and do not match portfolio quality.",
                      "requestedRefundPercent": 30,
                      "clientAttachments": [
                        "64f0c2f7a2b6c1a9b3d2e777",
                        "64f0c2f7a2b6c1a9b3d2e778"
                      ],
                      "priority": "high"
                    }
                  },
                  "withRefundAmount": {
                    "summary": "Request specific refund amount",
                    "value": {
                      "bookingId": "64f1c2a9b3d6f5a2c1e9a111",
                      "clientClaim": "Service was not delivered as agreed.",
                      "requestedRefundAmountMinor": 54900,
                      "priority": "medium"
                    }
                  },
                  "minimalRequest": {
                    "summary": "Minimal dispute (claim only)",
                    "value": {
                      "bookingId": "64f1c2a9b3d6f5a2c1e9a111",
                      "clientClaim": "The vendor did not show up to the event as scheduled."
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Dispute created successfully. Status is `evidence`, 48-hour window starts.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DisputeResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Validation error (e.g. both refund percent and amount provided, claim too short)"
            },
            "401": {
              "description": "Unauthorized – missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden – user does not own the booking or lacks required role"
            },
            "409": {
              "description": "Conflict – an open dispute already exists for this booking"
            }
          }
        }
      },
      "/api/v1/disputes/me": {
        "get": {
          "tags": [
            "Disputes"
          ],
          "summary": "Get my disputes (client)",
          "description": "Returns a paginated list of disputes created by the authenticated client.\nUse the `status` filter to show disputes in a specific state.\n\n**Status values:**\n- `all` – all disputes (default)\n- `open` – all non-terminal disputes (evidence, mediation, review, escalated)\n- `evidence` – initial state, 48h evidence window active\n- `mediation` – both parties in mediation\n- `review` – under admin review\n- `escalated` – escalated to higher authority by admin\n- `closed` – resolved by admin (terminal)\n- `archived` – cancelled by client (terminal)\n\n**Roles:** `customer`, `user`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number for pagination"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 10
              },
              "description": "Number of disputes per page"
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "all",
                  "open",
                  "mediation",
                  "evidence",
                  "review",
                  "escalated",
                  "closed",
                  "archived"
                ],
                "default": "all"
              },
              "description": "Filter disputes by status. Use `all` to retrieve disputes in any state, or `open` to retrieve only non-terminal disputes."
            }
          ],
          "responses": {
            "200": {
              "description": "Disputes retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DisputePaginatedResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized – missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden – user lacks required role"
            }
          }
        }
      },
      "/api/v1/disputes/vendor/{vendorId}": {
        "get": {
          "tags": [
            "Disputes"
          ],
          "summary": "Get disputes by vendorId (vendor/admin)",
          "description": "Returns a paginated list of disputes for a specific vendor.\n\n**Access control:**\n- `admin` can query disputes for **any** vendor.\n- `vendor` and `vendorstaff` can only query disputes for **their own** vendorId.\n\n**Roles:** `admin`, `vendor`, `vendorstaff`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "The MongoDB ObjectId of the vendor"
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 10
              }
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "default": "all"
              },
              "description": "Filter disputes by status (use `all` for any)"
            },
            {
              "in": "query",
              "name": "priority",
              "schema": {
                "type": "string",
                "default": "all"
              },
              "description": "Filter disputes by priority (use `all` for any)"
            },
            {
              "in": "query",
              "name": "from",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Start of filed date range filter (ISO 8601)"
            },
            {
              "in": "query",
              "name": "to",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "End of filed date range filter (ISO 8601)"
            }
          ],
          "responses": {
            "200": {
              "description": "Disputes retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DisputePaginatedResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized – missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden – non-admin users can only query their own vendorId"
            }
          }
        }
      },
      "/api/v1/disputes/{disputeId}/cancel": {
        "patch": {
          "tags": [
            "Disputes"
          ],
          "summary": "Cancel my dispute (client)",
          "description": "Cancels a dispute created by the authenticated client.\n\n**What happens:**\n- Status transitions to `archived`\n- `archivedAt` timestamp is set\n- A timeline event of type `cancelled_by_client` is recorded\n- Creates `dispute.cancelled` notifications for the customer, vendor team, and admins.\n\n**Business rules:**\n- Only the client who created the dispute can cancel it.\n- Cannot cancel a dispute that is already `closed` or `archived`.\n- This action is **irreversible** — the dispute cannot be reopened.\n\n**Roles:** `customer`, `user`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "disputeId",
              "required": true,
              "description": "The MongoDB ObjectId of the dispute to cancel",
              "schema": {
                "type": "string",
                "example": "64f1c2a9b3d6f5a2c1e9a999"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Dispute cancelled successfully. Status is now `archived`.",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DisputeResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Validation error or dispute is already closed/archived"
            },
            "401": {
              "description": "Unauthorized – missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden – user does not own this dispute or lacks required role"
            },
            "404": {
              "description": "Dispute not found"
            }
          }
        }
      },
      "/api/v1/dispute-resolutions/vendor/{vendorId}": {
        "get": {
          "tags": [
            "Dispute Resolutions"
          ],
          "summary": "Get dispute resolutions by vendorId",
          "description": "Returns a paginated list of dispute resolutions for a specific vendor.\nSupports filtering by resolution type and date range.\n\n**Access control:**\n- `admin` can query resolutions for **any** vendor.\n- `vendor` and `vendorstaff` can only query resolutions for **their own** vendorId.\n\nEach resolution record includes the resolution type, amount in minor currency units,\nthe admin who resolved it, and optional notes.\n\n**Roles:** `admin`, `vendor`, `vendorstaff`\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "description": "The MongoDB ObjectId of the vendor to retrieve resolutions for",
              "schema": {
                "type": "string",
                "example": "64f0c2f7a2b6c1a9b3d2e555"
              }
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number for pagination"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 10
              },
              "description": "Number of resolutions per page"
            },
            {
              "in": "query",
              "name": "resolution",
              "schema": {
                "type": "string",
                "enum": [
                  "all",
                  "partial_refund",
                  "vendor_credit",
                  "full_refund",
                  "denied",
                  "mediated"
                ],
                "default": "all"
              },
              "description": "Filter by resolution type"
            },
            {
              "in": "query",
              "name": "from",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Start of date range filter (ISO 8601)"
            },
            {
              "in": "query",
              "name": "to",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "End of date range filter (ISO 8601)"
            }
          ],
          "responses": {
            "200": {
              "description": "Dispute resolutions retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DisputeResolutionPaginatedResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized – missing or invalid Bearer token"
            },
            "403": {
              "description": "Forbidden – non-admin users can only query their own vendorId"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/faqs": {
        "post": {
          "tags": [
            "Faqs"
          ],
          "summary": "Create an FAQ (Admin only)",
          "description": "Creates a new FAQ. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateFaqInput"
                },
                "example": {
                  "question": "How do I reset my password?",
                  "answer": "Use the “Forgot password” link on the login screen to receive a reset email.",
                  "isActive": true
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "FAQ created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "FAQ created successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Faq"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        },
        "get": {
          "tags": [
            "Faqs"
          ],
          "summary": "List all FAQs",
          "description": "Returns all FAQs.",
          "responses": {
            "200": {
              "description": "FAQs retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "FAQs retrieved successfully"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/Faq"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/faqs/{id}": {
        "get": {
          "tags": [
            "Faqs"
          ],
          "summary": "Get an FAQ by ID",
          "description": "Returns a single FAQ.",
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "FAQ retrieved successfully"
            },
            "404": {
              "description": "Not found"
            }
          }
        },
        "patch": {
          "tags": [
            "Faqs"
          ],
          "summary": "Update an FAQ (Admin only)",
          "description": "Updates fields on an existing FAQ. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateFaqInput"
                },
                "example": {
                  "answer": "Updated answer text"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "FAQ updated successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not found"
            }
          }
        },
        "delete": {
          "tags": [
            "Faqs"
          ],
          "summary": "Delete an FAQ (Admin only)",
          "description": "Deletes an FAQ by ID. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "FAQ deleted successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Not found"
            }
          }
        }
      },
      "/api/v1/logs/{type}": {
        "get": {
          "tags": [
            "Logs"
          ],
          "summary": "Query logs (paginated)",
          "description": "Queries logs by type with pagination, date-range filtering, and type-specific filters.\n\n**Date filtering:**\n- Use `startDate` and/or `endDate` as ISO strings.\n- Sort is newest-first by `createdAt`.\n\n**Supported types:** `audit`, `error`, `morgan`, `app`, `integration`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "type",
              "required": true,
              "schema": {
                "type": "string",
                "enum": [
                  "audit",
                  "error",
                  "morgan",
                  "app",
                  "integration"
                ]
              }
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "example": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "example": 20
              }
            },
            {
              "in": "query",
              "name": "startDate",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "Start of date range (inclusive)"
            },
            {
              "in": "query",
              "name": "endDate",
              "schema": {
                "type": "string",
                "format": "date-time"
              },
              "description": "End of date range (inclusive)"
            },
            {
              "in": "query",
              "name": "userId",
              "schema": {
                "type": "string"
              },
              "description": "Filter by userId (where applicable)"
            },
            {
              "in": "query",
              "name": "statusCode",
              "schema": {
                "type": "integer"
              },
              "description": "Filter by HTTP status code (morgan/error)"
            },
            {
              "in": "query",
              "name": "method",
              "schema": {
                "type": "string"
              },
              "description": "Filter by HTTP method (morgan/error)"
            },
            {
              "in": "query",
              "name": "url",
              "schema": {
                "type": "string"
              },
              "description": "Partial match for URL (morgan/error)"
            },
            {
              "in": "query",
              "name": "severity",
              "schema": {
                "type": "string",
                "enum": [
                  "low",
                  "medium",
                  "high",
                  "critical"
                ]
              },
              "description": "Error severity (error)"
            },
            {
              "in": "query",
              "name": "resolved",
              "schema": {
                "type": "boolean"
              },
              "description": "Resolved flag (error)"
            },
            {
              "in": "query",
              "name": "action",
              "schema": {
                "type": "string"
              },
              "description": "Audit action (audit)"
            },
            {
              "in": "query",
              "name": "resource",
              "schema": {
                "type": "string"
              },
              "description": "Audit resource (audit)"
            },
            {
              "in": "query",
              "name": "resourceId",
              "schema": {
                "type": "string"
              },
              "description": "Audit resourceId (audit)"
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "success",
                  "failure"
                ]
              },
              "description": "Audit status (audit)"
            },
            {
              "in": "query",
              "name": "ip",
              "schema": {
                "type": "string"
              },
              "description": "IP address filter (morgan)"
            },
            {
              "in": "query",
              "name": "level",
              "schema": {
                "type": "string",
                "enum": [
                  "info",
                  "warn",
                  "error",
                  "debug"
                ]
              },
              "description": "App log level (app)"
            },
            {
              "in": "query",
              "name": "message",
              "schema": {
                "type": "string"
              },
              "description": "Partial match for app log message (app)"
            },
            {
              "in": "query",
              "name": "service",
              "schema": {
                "type": "string"
              },
              "description": "Integration service name (integration)"
            },
            {
              "in": "query",
              "name": "operation",
              "schema": {
                "type": "string"
              },
              "description": "Integration operation name (integration)"
            },
            {
              "in": "query",
              "name": "success",
              "schema": {
                "type": "boolean"
              },
              "description": "Integration call success flag (integration)"
            }
          ],
          "responses": {
            "200": {
              "description": "Logs retrieved",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Logs retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "items": {
                            "type": "array",
                            "items": {
                              "type": "object"
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 120
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 20
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/logs/{type}/date/{date}": {
        "get": {
          "tags": [
            "Logs"
          ],
          "summary": "Query logs for a specific date (paginated)",
          "description": "Returns logs for a single UTC date (YYYY-MM-DD), paginated, with the same filters as the main query.\n\nThis is equivalent to using `startDate` and `endDate` covering the given day.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "type",
              "required": true,
              "schema": {
                "type": "string",
                "enum": [
                  "audit",
                  "error",
                  "morgan",
                  "app",
                  "integration"
                ]
              }
            },
            {
              "in": "path",
              "name": "date",
              "required": true,
              "schema": {
                "type": "string",
                "example": "2025-12-31"
              },
              "description": "UTC date in YYYY-MM-DD format"
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "example": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "example": 20
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Logs retrieved"
            }
          }
        }
      },
      "/api/v1/notifications": {
        "post": {
          "tags": [
            "Notifications"
          ],
          "summary": "Create a scoped targeted notification",
          "description": "Creates one notification per resolved recipient so read/archive state stays personal.\n\n**Scoped creation rules:**\n- Authenticated non-admin actors can create notifications only for users who participate in the referenced `sourceType` + `sourceId`.\n- Supported sources include booking, payment, quote, dispute, chat conversation, support request, review, auth/user, vendor staff, and admin-management records.\n- This endpoint does not support all-user, role, service-category, vendor-type, or tag broadcasts. Use `POST /api/v1/notifications/broadcast` as an admin for those.\n- Admin actors may also use this endpoint for direct source-scoped targeting.\n\n**Automatic flow notifications:** Backend services create transactional notifications after successful state changes in booking, payment, quote, dispute, support, chat, review, account, staff, and admin-management flows. Frontend should not replay those domain events manually.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateNotificationInput"
                },
                "examples": {
                  "targeted": {
                    "value": {
                      "title": "Booking update",
                      "message": "Your booking has been confirmed.",
                      "type": "booking",
                      "sourceType": "booking",
                      "sourceId": "64f0c2f7a2b6c1a9b3d2e999",
                      "eventKey": "booking.confirmed.manual",
                      "targetUserIds": [
                        "64f0c2f7a2b6c1a9b3d2e111"
                      ],
                      "redirectUrl": "/bookings/64f0c2f7a2b6c1a9b3d2e999"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Notification created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationCreateResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        },
        "get": {
          "tags": [
            "Notifications"
          ],
          "summary": "List notifications for the authenticated user",
          "description": "Returns only notifications owned by the authenticated user. Use `status=active` for the normal inbox, `unread` for badge lists, and `archived` for archived rows.\n\nNotification rows are per-recipient records, so reading or archiving one user notification never changes another user's notification state.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "active",
                  "all",
                  "read",
                  "unread",
                  "archived"
                ],
                "default": "active"
              }
            },
            {
              "in": "query",
              "name": "type",
              "schema": {
                "type": "string",
                "enum": [
                  "general",
                  "system",
                  "booking",
                  "payment",
                  "chat",
                  "dispute",
                  "promotion",
                  "custom"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Notifications retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationListResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/notifications/broadcast": {
        "post": {
          "tags": [
            "Notifications"
          ],
          "summary": "Broadcast targeted notifications (Admin only)",
          "description": "Creates notifications for a broad audience. Only admins can use this endpoint.\n\n**Allowed broadcast selectors:**\n- `targetUserIds` for explicit users\n- `audience.allUsers` for every active/non-banned user\n- `audience.roles` for role broadcasts (`clients`, `customers`, `vendors`, `vendorstaff`, `admins`, `auditors`)\n- `audience.vendorIds` for vendor owner users\n- `audience.serviceCategoryIds`, `audience.serviceSpecialtyIds`, and `audience.vendorServiceTags` for vendor-service audiences\n\n**Read/archive model:** A separate notification row is created for every recipient, so each user controls their own read/archive state.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BroadcastNotificationInput"
                },
                "examples": {
                  "allUsers": {
                    "value": {
                      "title": "Scheduled maintenance",
                      "message": "The platform will be unavailable briefly tonight.",
                      "type": "system",
                      "priority": "high",
                      "audience": {
                        "allUsers": true
                      }
                    }
                  },
                  "vendorsByService": {
                    "value": {
                      "title": "New opportunity",
                      "message": "A new event request matches your services.",
                      "type": "system",
                      "audience": {
                        "serviceCategoryIds": [
                          "64f0c2f7a2b6c1a9b3d2e333"
                        ],
                        "vendorServiceTags": [
                          "photography"
                        ]
                      }
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Notification broadcast created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationCreateResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/notifications/unread-count": {
        "get": {
          "tags": [
            "Notifications"
          ],
          "summary": "Get unread notification count",
          "description": "Returns the active unread notification count for the authenticated user's badge UI.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Notification unread count retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationUnreadCountResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/notifications/read": {
        "patch": {
          "tags": [
            "Notifications"
          ],
          "summary": "Mark multiple notifications as read",
          "description": "Marks either the supplied notification IDs or all unread notifications for the authenticated user as read.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BulkNotificationActionInput"
                },
                "examples": {
                  "selected": {
                    "value": {
                      "notificationIds": [
                        "64f0c2f7a2b6c1a9b3d2e901"
                      ]
                    }
                  },
                  "allUnread": {
                    "value": {
                      "all": true
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Notifications marked as read",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationBulkActionResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/notifications/archive": {
        "patch": {
          "tags": [
            "Notifications"
          ],
          "summary": "Archive multiple notifications",
          "description": "Archives either the supplied notification IDs or all active notifications for the authenticated user.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/BulkNotificationActionInput"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Notifications archived successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationBulkActionResponse"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/notifications/{id}/read": {
        "patch": {
          "tags": [
            "Notifications"
          ],
          "summary": "Mark one notification as read",
          "description": "Marks a single notification as read only when it belongs to the authenticated user.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Notification marked as read",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationResponse"
                  }
                }
              }
            },
            "404": {
              "description": "Notification not found"
            }
          }
        }
      },
      "/api/v1/notifications/{id}/archive": {
        "patch": {
          "tags": [
            "Notifications"
          ],
          "summary": "Archive one notification",
          "description": "Archives a single notification only when it belongs to the authenticated user. Archived notifications stay queryable with `status=archived`.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Notification archived successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationResponse"
                  }
                }
              }
            },
            "404": {
              "description": "Notification not found"
            }
          }
        }
      },
      "/api/v1/notifications/{id}/unarchive": {
        "patch": {
          "tags": [
            "Notifications"
          ],
          "summary": "Unarchive one notification",
          "description": "Restores a single archived notification to the authenticated user's active notification list.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Notification unarchived successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NotificationResponse"
                  }
                }
              }
            },
            "404": {
              "description": "Notification not found"
            }
          }
        }
      },
      "/api/v1/quotes/drafts": {
        "post": {
          "tags": [
            "Quotes"
          ],
          "summary": "Create a draft quote (vendor)",
          "description": "**Flow context — Previous step:** A quote request was created via `POST /api/v1/quote-requests` and the vendor discovered it via `GET /api/v1/quote-requests/vendor/me`.\n\n**What this endpoint does:**\nVendor creates a draft quote for a quote request. The draft is NOT visible to the customer.\nThe quote request must be in `new` or `changes_requested` status.\n\n**Next step:** The vendor reviews the draft and sends it via `POST /api/v1/quotes/{quoteId}/send`,\nor edits it first via `PATCH /api/v1/quotes/drafts/{quoteId}`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "quoteRequestId",
                    "lineItems",
                    "total"
                  ],
                  "properties": {
                    "quoteRequestId": {
                      "type": "string"
                    },
                    "lineItems": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "required": [
                          "service",
                          "quantity",
                          "hours",
                          "rate",
                          "subtotal"
                        ],
                        "properties": {
                          "service": {
                            "type": "string",
                            "example": "Full Day Photography Coverage"
                          },
                          "quantity": {
                            "type": "integer",
                            "example": 1
                          },
                          "hours": {
                            "type": "number",
                            "example": 8
                          },
                          "rate": {
                            "type": "number",
                            "example": 250
                          },
                          "subtotal": {
                            "type": "number",
                            "example": 2000
                          }
                        }
                      }
                    },
                    "currency": {
                      "type": "string",
                      "example": "GBP"
                    },
                    "total": {
                      "type": "number",
                      "example": 3450
                    },
                    "paymentTerms": {
                      "type": "object",
                      "properties": {
                        "depositPercent": {
                          "type": "number",
                          "example": 50
                        },
                        "balancePercent": {
                          "type": "number",
                          "example": 50
                        }
                      }
                    },
                    "validityDuration": {
                      "type": "string",
                      "enum": [
                        "7_days",
                        "14_days",
                        "30_days",
                        "60_days",
                        "custom"
                      ]
                    },
                    "customExpiryDate": {
                      "type": "string",
                      "format": "date-time"
                    },
                    "personalMessage": {
                      "type": "string",
                      "example": "Hi Team, I'd love to capture your product launch!"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Quote draft created successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Quote Request not found"
            }
          }
        }
      },
      "/api/v1/quotes/drafts/{quoteId}": {
        "patch": {
          "tags": [
            "Quotes"
          ],
          "summary": "Update a draft quote (vendor)",
          "description": "**Flow context — Previous step:** Vendor created a draft via `POST /api/v1/quotes/drafts`.\n\n**What this endpoint does:**\nUpdates an existing draft quote. Only DRAFT quotes can be updated. Line items, totals, payment terms, validity, and personal message are all editable.\n\n**Next step:** Send the draft to the customer via `POST /api/v1/quotes/{quoteId}/send`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "quoteId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "lineItems": {
                      "type": "array",
                      "items": {
                        "type": "object"
                      }
                    },
                    "total": {
                      "type": "number"
                    },
                    "paymentTerms": {
                      "type": "object"
                    },
                    "validityDuration": {
                      "type": "string"
                    },
                    "personalMessage": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Quote draft updated successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Quote not found"
            }
          }
        }
      },
      "/api/v1/quotes/{quoteId}/send": {
        "post": {
          "tags": [
            "Quotes"
          ],
          "summary": "Send a draft quote to the customer",
          "description": "**Flow context — Previous step:** Vendor created/updated a draft via `POST /api/v1/quotes/drafts` or `PATCH /api/v1/quotes/drafts/{quoteId}`.\n\n**What this endpoint does:**\nTransitions a DRAFT quote to SENT. Updates the parent QuoteRequest status to `responded`. Computes and sets the `expiresAt` date based on the validityDuration.\n\n**Notification side effects:** Creates a `quote.sent` notification for the customer.\n\n**Next step:** Customer receives the quote (via `GET /api/v1/quotes/me`) and responds via `POST /api/v1/quotes/{quoteId}/respond` with `accept`, `decline`, or `request_changes`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "quoteId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quote sent successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Quote not found"
            }
          }
        }
      },
      "/api/v1/quotes/send": {
        "post": {
          "tags": [
            "Quotes"
          ],
          "summary": "Create and send a quote in one step",
          "description": "**Flow context — Previous step:** A quote request was created via `POST /api/v1/quote-requests` and the vendor discovered it via `GET /api/v1/quote-requests/vendor/me`.\n\n**What this endpoint does:**\nCombines draft creation and sending into a single call. Equivalent to calling `POST /api/v1/quotes/drafts` then `POST /api/v1/quotes/{quoteId}/send`.\nThe QuoteRequest status is updated to `responded`.\n\n**Notification side effects:** Creates a `quote.sent` notification for the customer.\n\n**Next step:** Customer receives the quote (via `GET /api/v1/quotes/me`) and responds via `POST /api/v1/quotes/{quoteId}/respond` with `accept`, `decline`, or `request_changes`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateQuoteInput"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Quote created and sent successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Quote Request not found"
            }
          }
        }
      },
      "/api/v1/quotes/{quoteId}/revise": {
        "post": {
          "tags": [
            "Quotes"
          ],
          "summary": "Revise a quote",
          "description": "**Flow context — Previous step:** Customer requested changes via `POST /api/v1/quotes/{quoteId}/respond` with `decision: request_changes`, or vendor decides to revise a SENT quote.\n\n**What this endpoint does:**\nCreates a new revision of the quote. The old quote is marked as `revised`. The new quote is immediately SENT to the customer.\nAllowed when existing quote is SENT or CHANGES_REQUESTED.\nRevision number is incremented and the new quote links to the parent via `parentQuoteId`.\n\n**Notification side effects:** Creates a `quote.revised` notification for the customer.\n\n**Next step:** Customer responds to the new revision via `POST /api/v1/quotes/{quoteId}/respond`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "quoteId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "lineItems": {
                      "type": "array"
                    },
                    "total": {
                      "type": "number"
                    },
                    "paymentTerms": {
                      "type": "object"
                    },
                    "validityDuration": {
                      "type": "string"
                    },
                    "personalMessage": {
                      "type": "string"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Quote revised successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Quote not found"
            }
          }
        }
      },
      "/api/v1/quotes/{quoteId}/withdraw": {
        "post": {
          "tags": [
            "Quotes"
          ],
          "summary": "Withdraw a sent quote",
          "description": "**Flow context — Previous step:** Vendor sent a quote via `POST /api/v1/quotes/{quoteId}/send` or `POST /api/v1/quotes/send`.\n\n**What this endpoint does:**\nVendor withdraws a SENT quote. The quote is no longer available to the customer.\n\n**Notification side effects:** Creates a `quote.withdrawn` notification for the customer.\n\n**Next step (terminal for this quote):** Vendor may optionally create a new quote for the same quote request.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "quoteId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quote withdrawn successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Quote not found"
            }
          }
        }
      },
      "/api/v1/quotes/{quoteId}/respond": {
        "post": {
          "tags": [
            "Quotes"
          ],
          "summary": "Customer responds to a quote",
          "description": "**Flow context — Previous step:** Vendor sent a quote (`POST /api/v1/quotes/{quoteId}/send` or `POST /api/v1/quotes/send`). Customer views it via `GET /api/v1/quotes/me` or `GET /api/v1/quotes/{quoteId}`.\n\n**What this endpoint does:**\nCustomer accepts, declines, or requests changes on a SENT quote.\n\n- `accept`: marks quote ACCEPTED and QuoteRequest ACCEPTED.\n- `decline`: marks quote DECLINED and QuoteRequest CUSTOMER_DECLINED.\n- `request_changes`: marks quote CHANGES_REQUESTED and QuoteRequest CHANGES_REQUESTED.\n\n**Notification side effects:** Creates `quote.accepted`, `quote.declined`, or `quote.changes_requested` notifications for the vendor team.\n\n**Next steps:**\n- If **accepted**: Customer creates a booking from the quote via `POST /api/v1/bookings/from-quote/{quoteId}`.\n- If **request_changes**: Vendor revises the quote via `POST /api/v1/quotes/{quoteId}/revise`.\n- If **declined**: Flow ends for this quote. Customer may send the request to another vendor.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "quoteId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "decision"
                  ],
                  "properties": {
                    "decision": {
                      "type": "string",
                      "enum": [
                        "accept",
                        "decline",
                        "request_changes"
                      ]
                    },
                    "customerNote": {
                      "type": "string",
                      "maxLength": 2000
                    }
                  }
                },
                "example": {
                  "decision": "accept",
                  "customerNote": "Looks great, let's proceed!"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Quote response recorded successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Quote not found"
            }
          }
        }
      },
      "/api/v1/quotes/vendor/me": {
        "get": {
          "tags": [
            "Quotes"
          ],
          "summary": "List my vendor quotes",
          "description": "**Flow context:** Vendor uses this endpoint to track all quotes they have created/sent.\n\n**What this endpoint does:**\nReturns paginated quotes for the authenticated vendor with optional status and quoteRequestId filters.\n\n**Next step:** Vendor can take action on individual quotes (send, revise, withdraw) depending on status.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "draft",
                  "sent",
                  "accepted",
                  "declined",
                  "changes_requested",
                  "revised",
                  "expired",
                  "withdrawn",
                  "converted"
                ]
              }
            },
            {
              "in": "query",
              "name": "quoteRequestId",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quotes retrieved successfully"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/quotes/me": {
        "get": {
          "tags": [
            "Quotes"
          ],
          "summary": "List my quotes (customer)",
          "description": "**Flow context — Previous step:** Vendor sent quotes for the customer’s quote requests.\n\n**What this endpoint does:**\nReturns paginated quotes for the authenticated customer. DRAFT quotes are excluded by default.\n\n**Next step:** Customer responds to a SENT quote via `POST /api/v1/quotes/{quoteId}/respond`.\nFor ACCEPTED quotes, customer creates a booking via `POST /api/v1/bookings/from-quote/{quoteId}`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "query",
              "name": "quoteRequestId",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quotes retrieved successfully"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/quotes": {
        "get": {
          "tags": [
            "Quotes"
          ],
          "summary": "List all quotes (admin)",
          "description": "**What this endpoint does:**\nReturns paginated list of all quotes across the platform. Admin only.\nUseful for monitoring quoting activity and resolving disputes.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quotes retrieved successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/quotes/{quoteId}": {
        "get": {
          "tags": [
            "Quotes"
          ],
          "summary": "Get a quote by ID",
          "description": "**What this endpoint does:**\nReturns a single quote with populated quote request, customer request, vendor, and customer details.\nCan be used by vendor, customer, or admin to inspect a specific quote and its line items.\n\n**Next step:** Depends on quote status and viewer role — see individual action endpoints above.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "quoteId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quote retrieved successfully"
            },
            "404": {
              "description": "Not found"
            }
          }
        }
      },
      "/api/v1/quote-requests": {
        "post": {
          "tags": [
            "QuoteRequests"
          ],
          "summary": "Create a quote request",
          "description": "**Flow context — Previous step:** Customer created a Customer Request (`POST /api/v1/customer-requests`) and it was approved (status ACTIVE).\n\n**What this endpoint does:**\nBroadcasts a customer request for vendor quotes, creating a QuoteRequest with status `new`.\nThe customer request must be in ACTIVE status.\nThis is NOT directed at a specific vendor — any vendor whose services match the\ncustomer request's service category will see it via `GET /api/v1/quote-requests/vendor/me`.\n\n**Notification side effects:** Creates `quote_request.created` notifications for the customer and matching vendor teams.\n\n**Next step:** Matching vendors discover the quote request via `GET /api/v1/quote-requests/vendor/me`\nand create quotes: `POST /api/v1/quotes/drafts` or `POST /api/v1/quotes/send`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "required": [
                    "customerRequestId"
                  ],
                  "properties": {
                    "customerRequestId": {
                      "type": "string",
                      "example": "64f0c2f7a2b6c1a9b3d2e111"
                    },
                    "expiresAt": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Quote Request created successfully"
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Customer Request not found or not active"
            }
          }
        },
        "get": {
          "tags": [
            "QuoteRequests"
          ],
          "summary": "List all quote requests (admin)",
          "description": "**What this endpoint does:**\nReturns paginated list of all quote requests across the platform. Admin only.\nUseful for monitoring quoting activity and diagnosing issues.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "new",
                  "responded",
                  "accepted",
                  "completed",
                  "expired",
                  "closed"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quote Requests retrieved successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/quote-requests/{quoteRequestId}/close": {
        "post": {
          "tags": [
            "QuoteRequests"
          ],
          "summary": "Customer closes a quote request",
          "description": "**Flow context — Previous step:** Customer created a quote request via `POST /api/v1/quote-requests`\nand may have received quotes from vendors.\n\n**What this endpoint does:**\nCustomer manually closes a quote request (e.g. no longer needed, found another vendor outside the platform).\nUpdates the quote request status to `closed`. Only the customer who owns the quote request can close it.\nThe quote request must be in `new` or `responded` status.\n\n**Notification side effects:** Creates `quote_request.closed` notifications for the customer and matching vendor teams.\n\n**Next step (terminal):** Flow ends for this quote request. Vendors will no longer see it.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "quoteRequestId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quote Request closed successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Quote Request not found"
            }
          }
        }
      },
      "/api/v1/quote-requests/vendor/me": {
        "get": {
          "tags": [
            "QuoteRequests"
          ],
          "summary": "List matching quote requests for vendor",
          "description": "**Flow context:** Vendor uses this endpoint to discover incoming quote requests that match their services.\n\n**What this endpoint does:**\nReturns paginated quote requests whose underlying customer request has a service category\nthat the authenticated vendor offers (via VendorService records). By default only\n`new` and `responded` requests are shown so the vendor sees actionable items.\n\n**Next step:** For each quote request the vendor can create a quote:\n`POST /api/v1/quotes/drafts` → `POST /api/v1/quotes/{quoteId}/send`\n(or one-step `POST /api/v1/quotes/send`)\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "new",
                  "responded",
                  "accepted",
                  "completed",
                  "expired",
                  "closed"
                ]
              }
            },
            {
              "in": "query",
              "name": "dateFrom",
              "schema": {
                "type": "string",
                "format": "date-time"
              }
            },
            {
              "in": "query",
              "name": "dateTo",
              "schema": {
                "type": "string",
                "format": "date-time"
              }
            },
            {
              "in": "query",
              "name": "search",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quote Requests retrieved successfully"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/quote-requests/me": {
        "get": {
          "tags": [
            "QuoteRequests"
          ],
          "summary": "List my quote requests (customer)",
          "description": "**Flow context — Previous step:** Customer created quote requests via `POST /api/v1/quote-requests`.\n\n**What this endpoint does:**\nReturns paginated quote requests for the authenticated customer with optional status filter.\n\n**Next step:** Customer can check quotes received via `GET /api/v1/quotes/me` and respond\nto a quote via `POST /api/v1/quotes/{quoteId}/respond`. Customer can also close the\nquote request via `POST /api/v1/quote-requests/{quoteRequestId}/close`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            },
            {
              "in": "query",
              "name": "status",
              "schema": {
                "type": "string",
                "enum": [
                  "new",
                  "responded",
                  "accepted",
                  "completed",
                  "expired",
                  "closed"
                ]
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quote Requests retrieved successfully"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/quote-requests/{quoteRequestId}": {
        "get": {
          "tags": [
            "QuoteRequests"
          ],
          "summary": "Get a quote request by ID",
          "description": "**What this endpoint does:**\nReturns a single quote request with populated customer request and customer details.\nCan be used by vendor, customer, or admin to inspect a specific quote request.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "quoteRequestId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Quote Request retrieved successfully"
            },
            "404": {
              "description": "Not found"
            }
          }
        }
      },
      "/api/v1/reviews": {
        "post": {
          "tags": [
            "Reviews"
          ],
          "summary": "Create a review for a vendor",
          "description": "Submit a star-rating and optional comment for a vendor after a **completed** booking.\n\n- `reviewerUserId` is derived from the authenticated user's JWT.\n- The booking must belong to the caller, reference the same vendor, and have `status = completed`.\n- Only one review is allowed per booking (duplicate attempts return 409).\n- The vendor's `rate` field is recalculated immediately after creation.\n\n**Notification side effects:** Creates a `review.created` notification for the vendor team.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateReviewRequest"
                },
                "example": {
                  "vendorId": "64f0c2f7a2b6c1a9b3d2eaaa",
                  "bookingId": "64f0c2f7a2b6c1a9b3d2ebbb",
                  "rating": 5,
                  "comment": "Fantastic experience — punctual, professional, and great value."
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Review created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Review"
                      }
                    }
                  },
                  "example": {
                    "message": "Review created successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2eccc",
                      "vendorId": "64f0c2f7a2b6c1a9b3d2eaaa",
                      "bookingId": "64f0c2f7a2b6c1a9b3d2ebbb",
                      "reviewerUserId": "64f0c2f7a2b6c1a9b3d2eddd",
                      "rating": 5,
                      "comment": "Fantastic experience — punctual, professional, and great value.",
                      "isEdited": false,
                      "isFlagged": false,
                      "createdAt": "2024-01-15T10:00:00.000Z",
                      "updatedAt": "2024-01-15T10:00:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error (missing fields, invalid rating, comment too short/long)"
            },
            "401": {
              "description": "Unauthorized — valid JWT required"
            },
            "403": {
              "description": "Forbidden — no completed booking found for this vendor"
            },
            "404": {
              "description": "Vendor not found"
            },
            "409": {
              "description": "Conflict — a review for this booking already exists"
            },
            "500": {
              "description": "Internal server error"
            }
          }
        }
      },
      "/api/v1/reviews/{reviewId}": {
        "get": {
          "tags": [
            "Reviews"
          ],
          "summary": "Get a review by ID",
          "description": "Retrieve a single review document by its ID.\nThe `reviewerUserId` field is populated with the reviewer's `firstName`, `lastName`, and `profilePhoto`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "reviewId",
              "required": true,
              "schema": {
                "type": "string",
                "pattern": "^[0-9a-fA-F]{24}$",
                "example": "64f0c2f7a2b6c1a9b3d2eccc"
              },
              "description": "The MongoDB ObjectId of the review"
            }
          ],
          "responses": {
            "200": {
              "description": "Review retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Review"
                      }
                    }
                  },
                  "example": {
                    "message": "Review retrieved successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2eccc",
                      "vendorId": "64f0c2f7a2b6c1a9b3d2eaaa",
                      "bookingId": "64f0c2f7a2b6c1a9b3d2ebbb",
                      "reviewerUserId": {
                        "_id": "64f0c2f7a2b6c1a9b3d2eddd",
                        "firstName": "Alice",
                        "lastName": "Smith",
                        "profilePhoto": "https://cdn.example.com/photos/alice.jpg"
                      },
                      "rating": 5,
                      "comment": "Fantastic experience!",
                      "isEdited": false,
                      "isFlagged": false,
                      "createdAt": "2024-01-15T10:00:00.000Z",
                      "updatedAt": "2024-01-15T10:00:00.000Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized — valid JWT required"
            },
            "404": {
              "description": "Review not found"
            },
            "500": {
              "description": "Internal server error"
            }
          }
        },
        "patch": {
          "tags": [
            "Reviews"
          ],
          "summary": "Update a review",
          "description": "Update the `rating` and/or `comment` on an existing review.\n\n- Only the original reviewer (identified via JWT `userId`) may edit their own review.\n- At least one of `rating` or `comment` must be provided.\n- After a successful update the review's `isEdited` flag is set to `true`.\n- If the `rating` is changed, the vendor's `rate` field is recalculated immediately.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "reviewId",
              "required": true,
              "schema": {
                "type": "string",
                "pattern": "^[0-9a-fA-F]{24}$",
                "example": "64f0c2f7a2b6c1a9b3d2eccc"
              },
              "description": "The MongoDB ObjectId of the review to update"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateReviewRequest"
                },
                "example": {
                  "rating": 4,
                  "comment": "Good service, but arrived a bit late."
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Review updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Review"
                      }
                    }
                  },
                  "example": {
                    "message": "Review updated successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2eccc",
                      "vendorId": "64f0c2f7a2b6c1a9b3d2eaaa",
                      "bookingId": "64f0c2f7a2b6c1a9b3d2ebbb",
                      "reviewerUserId": "64f0c2f7a2b6c1a9b3d2eddd",
                      "rating": 4,
                      "comment": "Good service, but arrived a bit late.",
                      "isEdited": true,
                      "isFlagged": false,
                      "createdAt": "2024-01-15T10:00:00.000Z",
                      "updatedAt": "2024-01-15T12:30:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error — must provide rating or comment; comment length constraints"
            },
            "401": {
              "description": "Unauthorized — valid JWT required"
            },
            "403": {
              "description": "Forbidden — you can only edit your own reviews"
            },
            "404": {
              "description": "Review not found"
            },
            "500": {
              "description": "Internal server error"
            }
          }
        },
        "delete": {
          "tags": [
            "Reviews"
          ],
          "summary": "Delete a review",
          "description": "Permanently delete a review.\n\n- Only the original reviewer (identified via JWT `userId`) may delete their own review.\n- After deletion the vendor's `rate` field is recalculated immediately.\n- The action is logged to the audit log.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "reviewId",
              "required": true,
              "schema": {
                "type": "string",
                "pattern": "^[0-9a-fA-F]{24}$",
                "example": "64f0c2f7a2b6c1a9b3d2eccc"
              },
              "description": "The MongoDB ObjectId of the review to delete"
            }
          ],
          "responses": {
            "200": {
              "description": "Review deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      }
                    }
                  },
                  "example": {
                    "message": "Review deleted successfully"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized — valid JWT required"
            },
            "403": {
              "description": "Forbidden — you can only delete your own reviews"
            },
            "404": {
              "description": "Review not found"
            },
            "500": {
              "description": "Internal server error"
            }
          }
        }
      },
      "/api/v1/service-categories": {
        "post": {
          "tags": [
            "ServiceCategories"
          ],
          "summary": "Create a service category (Admin only)",
          "description": "Creates a new service category that vendors can attach to their offerings.\nRequires authentication.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateServiceCategoryInput"
                },
                "example": {
                  "name": "Photography & Videography",
                  "icon": "camera",
                  "suggestedTags": [
                    "weddingphotography",
                    "portraitphotography",
                    "dronephotography"
                  ]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Service category created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Service category created successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/ServiceCategory"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "409": {
              "description": "Service category already exists"
            }
          }
        },
        "get": {
          "tags": [
            "ServiceCategories"
          ],
          "summary": "List service categories (paginated)",
          "description": "Returns service categories using simple page/limit pagination. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number"
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "description": "Items per page"
            }
          ],
          "responses": {
            "200": {
              "description": "Service categories retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Service categories retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/ServiceCategory"
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 42
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/service-categories/{id}": {
        "get": {
          "tags": [
            "ServiceCategories"
          ],
          "summary": "Get a service category by ID",
          "description": "Retrieves a single service category document. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Service category ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Service category retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Service category retrieved successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/ServiceCategory"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Service category not found"
            }
          }
        },
        "put": {
          "tags": [
            "ServiceCategories"
          ],
          "summary": "Update a service category (Admin only)",
          "description": "Updates fields on an existing service category. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Service category ID"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateServiceCategoryInput"
                },
                "example": {
                  "name": "Photography & Videography",
                  "icon": "camera",
                  "suggestedTags": [
                    "weddingphotography",
                    "portraitphotography",
                    "dronephotography",
                    "eventvideography"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Service category updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Service category updated successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/ServiceCategory"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Service category not found"
            }
          }
        },
        "delete": {
          "tags": [
            "ServiceCategories"
          ],
          "summary": "Delete a service category (Admin only)",
          "description": "Deletes a service category by ID. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Service category ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Service category deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Service category deleted successfully"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Service category not found"
            }
          }
        }
      },
      "/api/v1/service-categories/{id}/suggested-tags": {
        "get": {
          "tags": [
            "ServiceCategories"
          ],
          "summary": "Get suggested tags for a category",
          "description": "Returns an array of suggested tags for a specific service category. Useful for autocomplete in vendor service forms.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Service category ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Suggested tags retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Suggested tags retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "tags": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "example": [
                              "weddingphotography",
                              "portraitphotography",
                              "dronephotography"
                            ]
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Service category not found"
            }
          }
        }
      },
      "/api/v1/service-categories/tags/all": {
        "get": {
          "tags": [
            "ServiceCategories"
          ],
          "summary": "Get all suggested tags across all categories",
          "description": "Returns all suggested tags from all service categories, both as a flat list and categorized.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "All suggested tags retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "All suggested tags retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "tags": {
                            "type": "array",
                            "items": {
                              "type": "string"
                            },
                            "description": "All unique tags sorted alphabetically"
                          },
                          "categorizedTags": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "categoryId": {
                                  "type": "string"
                                },
                                "categoryName": {
                                  "type": "string"
                                },
                                "tags": {
                                  "type": "array",
                                  "items": {
                                    "type": "string"
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/service-specialties": {
        "post": {
          "tags": [
            "ServiceSpecialties"
          ],
          "summary": "Create a service specialty (Admin only)",
          "description": "Creates a service specialty that belongs to a specific service category.\nRequires authentication.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateServiceSpecialtyInput"
                },
                "example": {
                  "serviceCategoryId": "64f0c2f7a2b6c1a9b3d2e111",
                  "name": "Wedding Photography",
                  "description": "Professional wedding photography services",
                  "commissionId": "64f0c2f7a2b6c1a9b3d2e222"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Service specialty created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Service specialty created successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/ServiceSpecialty"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        },
        "get": {
          "tags": [
            "ServiceSpecialties"
          ],
          "summary": "List service specialties (paginated)",
          "description": "Returns service specialties using simple page/limit pagination. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number"
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "description": "Items per page"
            }
          ],
          "responses": {
            "200": {
              "description": "Service specialties retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Service specialties retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/ServiceSpecialty"
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 10
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/service-specialties/by-category/{serviceCategoryId}": {
        "get": {
          "tags": [
            "ServiceSpecialties"
          ],
          "summary": "List service specialties by service category",
          "description": "Returns all service specialties belonging to the given service category.",
          "parameters": [
            {
              "in": "path",
              "name": "serviceCategoryId",
              "required": true,
              "schema": {
                "type": "string",
                "example": "64f0c2f7a2b6c1a9b3d2e111"
              },
              "description": "Service category ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Service specialties retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Service specialties retrieved successfully"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "$ref": "#/components/schemas/ServiceSpecialty"
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            }
          }
        }
      },
      "/api/v1/service-specialties/{id}": {
        "get": {
          "tags": [
            "ServiceSpecialties"
          ],
          "summary": "Get a service specialty by ID",
          "description": "Retrieves a single service specialty document. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Service specialty ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Service specialty retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Service specialty retrieved successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/ServiceSpecialty"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Service specialty not found"
            }
          }
        },
        "put": {
          "tags": [
            "ServiceSpecialties"
          ],
          "summary": "Update a service specialty (Admin only)",
          "description": "Updates fields on an existing service specialty. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Service specialty ID"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateServiceSpecialtyInput"
                },
                "example": {
                  "description": "Updated specialty description"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Service specialty updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Service specialty updated successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/ServiceSpecialty"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Service specialty not found"
            }
          }
        },
        "delete": {
          "tags": [
            "ServiceSpecialties"
          ],
          "summary": "Delete a service specialty (Admin only)",
          "description": "Deletes a service specialty by ID. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Service specialty ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Service specialty deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Service specialty deleted successfully"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Service specialty not found"
            }
          }
        }
      },
      "/api/v1/support-requests": {
        "post": {
          "tags": [
            "SupportRequests"
          ],
          "summary": "Create a support request",
          "description": "Creates a support request. Authentication is optional.\n\nIf the user is authenticated:\n- `clientId` is taken from the token userId (and any provided `clientId` is ignored).\n- If the user is a vendor or vendor staff, `vendorId` is taken from token claims (and any provided `vendorId` is ignored).\n\nAfter creation, an email is sent to support with full request details.\n\n**Notification side effects:** Creates `support_request.created` notifications for admins, the authenticated client when available, and the linked vendor team when available.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateSupportRequestInput"
                },
                "example": {
                  "firstName": "John",
                  "lastName": "Doe",
                  "email": "john.doe@example.com",
                  "message": "I need help with my booking",
                  "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                  "clientId": "64f0c2f7a2b6c1a9b3d2e111"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Support request created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SupportRequestResponse"
                  },
                  "example": {
                    "message": "Support request created successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2eabc",
                      "firstName": "John",
                      "lastName": "Doe",
                      "email": "john.doe@example.com",
                      "message": "I need help with my booking",
                      "vendorId": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e555"
                      },
                      "clientId": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e111"
                      },
                      "archivedAt": null,
                      "archivedBy": null,
                      "createdAt": "2026-01-18T10:00:00.000Z",
                      "updatedAt": "2026-01-18T10:00:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Validation failed",
                    "errors": {
                      "body": {
                        "fieldErrors": {
                          "email": [
                            "Invalid email"
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        "get": {
          "tags": [
            "SupportRequests"
          ],
          "summary": "List all support requests (Admin)",
          "description": "Returns a paginated list of support requests. Admin-only.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            },
            {
              "in": "query",
              "name": "sort",
              "schema": {
                "type": "string",
                "enum": [
                  "createdAt_desc",
                  "createdAt_asc"
                ],
                "default": "createdAt_desc"
              }
            },
            {
              "in": "query",
              "name": "includeArchived",
              "schema": {
                "type": "boolean",
                "default": false
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Support requests retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SupportRequestPaginatedResponse"
                  },
                  "example": {
                    "message": "Support requests retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2eabc",
                          "firstName": "John",
                          "lastName": "Doe",
                          "email": "john.doe@example.com",
                          "message": "I need help with my booking",
                          "vendorId": {
                            "_id": "64f0c2f7a2b6c1a9b3d2e555"
                          },
                          "clientId": {
                            "_id": "64f0c2f7a2b6c1a9b3d2e111"
                          },
                          "archivedAt": null,
                          "archivedBy": null,
                          "createdAt": "2026-01-18T10:00:00.000Z",
                          "updatedAt": "2026-01-18T10:00:00.000Z"
                        }
                      ],
                      "total": 1,
                      "page": 1,
                      "limit": 10
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Invalid token"
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Forbidden",
                    "statusCode": 403,
                    "timestamp": "2026-01-18T10:00:00.000Z",
                    "path": "/api/v1/support-requests",
                    "method": "GET"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/support-requests/me": {
        "get": {
          "tags": [
            "SupportRequests"
          ],
          "summary": "List my support requests",
          "description": "Returns a paginated list of support requests created by the authenticated user.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Support requests retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SupportRequestPaginatedResponse"
                  },
                  "example": {
                    "message": "Support requests retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2eabc",
                          "firstName": "John",
                          "lastName": "Doe",
                          "email": "john.doe@example.com",
                          "message": "I need help with my booking",
                          "vendorId": null,
                          "clientId": {
                            "_id": "64f0c2f7a2b6c1a9b3d2e111"
                          },
                          "archivedAt": null,
                          "archivedBy": null,
                          "createdAt": "2026-01-18T10:00:00.000Z",
                          "updatedAt": "2026-01-18T10:00:00.000Z"
                        }
                      ],
                      "total": 1,
                      "page": 1,
                      "limit": 10
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Invalid token"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/support-requests/{id}": {
        "get": {
          "tags": [
            "SupportRequests"
          ],
          "summary": "Get support request by ID",
          "description": "Retrieves a support request.\n- Admins can retrieve any request.\n- Non-admins can retrieve requests they created (clientId matches) or requests tied to their vendor (vendor/vendorstaff).\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Support request retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SupportRequestResponse"
                  },
                  "example": {
                    "message": "Support request retrieved successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2eabc",
                      "firstName": "John",
                      "lastName": "Doe",
                      "email": "john.doe@example.com",
                      "message": "I need help with my booking",
                      "vendorId": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e555"
                      },
                      "clientId": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e111"
                      },
                      "archivedAt": null,
                      "archivedBy": null,
                      "createdAt": "2026-01-18T10:00:00.000Z",
                      "updatedAt": "2026-01-18T10:00:00.000Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Invalid token"
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Forbidden",
                    "statusCode": 403,
                    "timestamp": "2026-01-18T10:00:00.000Z",
                    "path": "/api/v1/support-requests/64f0c2f7a2b6c1a9b3d2eabc",
                    "method": "GET"
                  }
                }
              }
            },
            "404": {
              "description": "Not found",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Support request not found",
                    "statusCode": 404,
                    "timestamp": "2026-01-18T10:00:00.000Z",
                    "path": "/api/v1/support-requests/64f0c2f7a2b6c1a9b3d2eabc",
                    "method": "GET"
                  }
                }
              }
            }
          }
        },
        "delete": {
          "tags": [
            "SupportRequests"
          ],
          "summary": "Delete a support request (Admin)",
          "description": "Permanently deletes a support request. Admin-only.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Support request deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SupportRequestDeletedResponse"
                  },
                  "example": {
                    "message": "Support request deleted successfully"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Invalid token"
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Forbidden",
                    "statusCode": 403,
                    "timestamp": "2026-01-18T10:00:00.000Z",
                    "path": "/api/v1/support-requests/64f0c2f7a2b6c1a9b3d2eabc",
                    "method": "DELETE"
                  }
                }
              }
            }
          }
        },
        "patch": {
          "tags": [
            "SupportRequests"
          ],
          "summary": "Update support request status/notes (Admin)",
          "description": "Updates the status and/or adminNotes of a support request. Admin-only.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "SupportRequest ID"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "status": {
                      "type": "string",
                      "enum": [
                        "pending",
                        "in_progress",
                        "resolved"
                      ]
                    },
                    "adminNotes": {
                      "type": "string"
                    }
                  }
                },
                "example": {
                  "status": "resolved",
                  "adminNotes": "Answered client query and sent solution."
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Support request updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SupportRequestResponse"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Support request not found"
            }
          }
        }
      },
      "/api/v1/support-requests/vendor/{vendorId}": {
        "get": {
          "tags": [
            "SupportRequests"
          ],
          "summary": "List support requests for a vendor",
          "description": "Returns a paginated list of support requests for a vendor. Allowed for admin, the vendor owner, or vendor staff of the same vendor (with required permission).",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Support requests retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SupportRequestPaginatedResponse"
                  },
                  "example": {
                    "message": "Support requests retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2eabc",
                          "firstName": "John",
                          "lastName": "Doe",
                          "email": "john.doe@example.com",
                          "message": "I need help with my booking",
                          "vendorId": {
                            "_id": "64f0c2f7a2b6c1a9b3d2e555"
                          },
                          "clientId": {
                            "_id": "64f0c2f7a2b6c1a9b3d2e111"
                          },
                          "archivedAt": null,
                          "archivedBy": null,
                          "createdAt": "2026-01-18T10:00:00.000Z",
                          "updatedAt": "2026-01-18T10:00:00.000Z"
                        }
                      ],
                      "total": 1,
                      "page": 1,
                      "limit": 10
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Invalid token"
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "examples": {
                    "vendorMismatch": {
                      "summary": "Vendor staff vendor mismatch",
                      "value": {
                        "message": "Forbidden: vendor mismatch"
                      }
                    },
                    "forbidden": {
                      "summary": "Forbidden via authorization rules",
                      "value": {
                        "message": "Forbidden",
                        "statusCode": 403,
                        "timestamp": "2026-01-18T10:00:00.000Z",
                        "path": "/api/v1/support-requests/vendor/64f0c2f7a2b6c1a9b3d2e555",
                        "method": "GET"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/support-requests/client/{clientId}": {
        "get": {
          "tags": [
            "SupportRequests"
          ],
          "summary": "List support requests by clientId (Admin)",
          "description": "Returns a paginated list of support requests for a given clientId. Admin-only.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "clientId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Support requests retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SupportRequestPaginatedResponse"
                  },
                  "example": {
                    "message": "Support requests retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2eabc",
                          "firstName": "John",
                          "lastName": "Doe",
                          "email": "john.doe@example.com",
                          "message": "I need help with my booking",
                          "vendorId": null,
                          "clientId": {
                            "_id": "64f0c2f7a2b6c1a9b3d2e111"
                          },
                          "archivedAt": null,
                          "archivedBy": null,
                          "createdAt": "2026-01-18T10:00:00.000Z",
                          "updatedAt": "2026-01-18T10:00:00.000Z"
                        }
                      ],
                      "total": 1,
                      "page": 1,
                      "limit": 10
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Invalid token"
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Forbidden",
                    "statusCode": 403,
                    "timestamp": "2026-01-18T10:00:00.000Z",
                    "path": "/api/v1/support-requests/client/64f0c2f7a2b6c1a9b3d2e111",
                    "method": "GET"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/support-requests/{id}/archive": {
        "patch": {
          "tags": [
            "SupportRequests"
          ],
          "summary": "Archive (soft-delete) a support request",
          "description": "Archives a support request by setting archivedAt. Allowed for admin, request owner, or vendor/vendor staff linked to the request.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Support request archived successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SupportRequestArchivedResponse"
                  },
                  "example": {
                    "message": "Support request archived successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2eabc",
                      "firstName": "John",
                      "lastName": "Doe",
                      "email": "john.doe@example.com",
                      "message": "I need help with my booking",
                      "vendorId": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e555"
                      },
                      "clientId": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e111"
                      },
                      "archivedAt": "2026-01-18T10:05:00.000Z",
                      "archivedBy": "64f0c2f7a2b6c1a9b3d2e111",
                      "createdAt": "2026-01-18T10:00:00.000Z",
                      "updatedAt": "2026-01-18T10:05:00.000Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Invalid token"
                  }
                }
              }
            },
            "403": {
              "description": "Forbidden",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Forbidden",
                    "statusCode": 403,
                    "timestamp": "2026-01-18T10:00:00.000Z",
                    "path": "/api/v1/support-requests/64f0c2f7a2b6c1a9b3d2eabc/archive",
                    "method": "PATCH"
                  }
                }
              }
            },
            "404": {
              "description": "Not found",
              "content": {
                "application/json": {
                  "example": {
                    "message": "Support request not found",
                    "statusCode": 404,
                    "timestamp": "2026-01-18T10:00:00.000Z",
                    "path": "/api/v1/support-requests/64f0c2f7a2b6c1a9b3d2eabc/archive",
                    "method": "PATCH"
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/uploads": {
        "post": {
          "tags": [
            "Uploads"
          ],
          "summary": "Upload a file to Cloudinary",
          "description": "Upload a file (image or document) to Cloudinary storage.\nThe file metadata is saved to the database for tracking.\n\n**Supported file types:**\n- Images: JPEG, PNG, GIF, WebP\n- Documents: PDF, DOC, DOCX, XLS, XLSX\n\n**Maximum file size:** 10MB\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "required": [
                    "file"
                  ],
                  "properties": {
                    "file": {
                      "type": "string",
                      "format": "binary",
                      "description": "The file to upload"
                    },
                    "folder": {
                      "type": "string",
                      "description": "Cloudinary folder name (optional)",
                      "default": "momentiv",
                      "example": "avatars"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "File uploaded successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "File uploaded successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string",
                            "example": "507f1f77bcf86cd799439011"
                          },
                          "url": {
                            "type": "string",
                            "example": "https://res.cloudinary.com/demo/image/upload/sample.jpg"
                          },
                          "originalName": {
                            "type": "string",
                            "example": "profile-picture.jpg"
                          },
                          "mimeType": {
                            "type": "string",
                            "example": "image/jpeg"
                          },
                          "size": {
                            "type": "number",
                            "example": 245678
                          },
                          "provider": {
                            "type": "string",
                            "example": "cloudinary"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "No file provided or invalid file type"
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            },
            "413": {
              "description": "File too large (exceeds 10MB)"
            }
          }
        }
      },
      "/api/v1/uploads/{id}": {
        "get": {
          "tags": [
            "Uploads"
          ],
          "summary": "Get file details by ID",
          "description": "Retrieves detailed information about a specific uploaded file including uploader details.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "File ID (MongoDB ObjectId)",
              "example": "507f1f77bcf86cd799439011"
            }
          ],
          "responses": {
            "200": {
              "description": "File retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "File retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "originalName": {
                            "type": "string"
                          },
                          "mimeType": {
                            "type": "string"
                          },
                          "size": {
                            "type": "number"
                          },
                          "url": {
                            "type": "string"
                          },
                          "provider": {
                            "type": "string"
                          },
                          "uploadedBy": {
                            "type": "object",
                            "properties": {
                              "firstName": {
                                "type": "string"
                              },
                              "lastName": {
                                "type": "string"
                              },
                              "email": {
                                "type": "string"
                              }
                            }
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            },
            "404": {
              "description": "File not found"
            }
          }
        },
        "delete": {
          "tags": [
            "Uploads"
          ],
          "summary": "Delete a file",
          "description": "Deletes a file from both Cloudinary and the database.\n\n**Permissions:**\n- File owner can delete their own files\n- Admin users can delete any file\n\n**What gets deleted:**\n- File from Cloudinary storage\n- File metadata from database\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "File ID (MongoDB ObjectId)",
              "example": "507f1f77bcf86cd799439011"
            }
          ],
          "responses": {
            "200": {
              "description": "File deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "File deleted successfully"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            },
            "403": {
              "description": "Forbidden - You do not have permission to delete this file"
            },
            "404": {
              "description": "File not found"
            }
          }
        }
      },
      "/api/v1/uploads/my-files": {
        "get": {
          "tags": [
            "Uploads"
          ],
          "summary": "Get authenticated user's uploaded files",
          "description": "Retrieves a paginated list of files uploaded by the authenticated user.\nFiles are sorted by upload date (newest first).\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number for pagination"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "description": "Number of files per page"
            }
          ],
          "responses": {
            "200": {
              "description": "Files retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Files retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "files": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "originalName": {
                                  "type": "string"
                                },
                                "mimeType": {
                                  "type": "string"
                                },
                                "size": {
                                  "type": "number"
                                },
                                "url": {
                                  "type": "string"
                                },
                                "createdAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              }
                            }
                          },
                          "pagination": {
                            "type": "object",
                            "properties": {
                              "currentPage": {
                                "type": "integer"
                              },
                              "totalPages": {
                                "type": "integer"
                              },
                              "totalFiles": {
                                "type": "integer"
                              },
                              "limit": {
                                "type": "integer"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            }
          }
        }
      },
      "/api/v1/uploads/all": {
        "get": {
          "tags": [
            "Uploads"
          ],
          "summary": "Get all uploaded files (Admin only)",
          "description": "Retrieves a paginated list of all files uploaded to the platform.\nThis endpoint is restricted to admin users only.\nIncludes uploader information for each file.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number for pagination"
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "description": "Number of files per page"
            }
          ],
          "responses": {
            "200": {
              "description": "All files retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "All files retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "files": {
                            "type": "array",
                            "items": {
                              "type": "object"
                            }
                          },
                          "pagination": {
                            "type": "object",
                            "properties": {
                              "currentPage": {
                                "type": "integer"
                              },
                              "totalPages": {
                                "type": "integer"
                              },
                              "totalFiles": {
                                "type": "integer"
                              },
                              "limit": {
                                "type": "integer"
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            },
            "403": {
              "description": "Forbidden - User is not an admin"
            }
          }
        }
      },
      "/api/v1/users/profile": {
        "get": {
          "tags": [
            "Users"
          ],
          "summary": "Get authenticated user's profile",
          "description": "Returns the full (non-sensitive) user document for the currently authenticated user.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Profile retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Profile retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string",
                            "example": "507f1f77bcf86cd799439011"
                          },
                          "firstName": {
                            "type": "string",
                            "example": "John"
                          },
                          "lastName": {
                            "type": "string",
                            "example": "Doe"
                          },
                          "email": {
                            "type": "string",
                            "format": "email",
                            "example": "john.doe@example.com"
                          },
                          "phoneNumber": {
                            "type": "string",
                            "nullable": true,
                            "example": "+2348012345678"
                          },
                          "stripeCustomerId": {
                            "type": "string",
                            "nullable": true,
                            "example": "cus_1234567890"
                          },
                          "gender": {
                            "type": "string",
                            "enum": [
                              "male",
                              "female",
                              "other"
                            ],
                            "example": "male"
                          },
                          "dateOfBirth": {
                            "type": "string",
                            "format": "date",
                            "nullable": true,
                            "example": "1995-01-15"
                          },
                          "addressId": {
                            "type": "object",
                            "nullable": true,
                            "description": "Address reference (may be populated)"
                          },
                          "role": {
                            "type": "string",
                            "enum": [
                              "admin",
                              "customer",
                              "user",
                              "auditor",
                              "vendor",
                              "vendorstaff"
                            ],
                            "example": "customer"
                          },
                          "status": {
                            "type": "string",
                            "enum": [
                              "pending_verification",
                              "active",
                              "inactive",
                              "banned"
                            ],
                            "example": "active"
                          },
                          "emailVerified": {
                            "type": "boolean",
                            "example": true
                          },
                          "authProvider": {
                            "type": "string",
                            "enum": [
                              "local",
                              "google"
                            ],
                            "example": "local"
                          },
                          "googleId": {
                            "type": "string",
                            "nullable": true
                          },
                          "hasPassword": {
                            "type": "boolean",
                            "description": "True if the user has set a login password."
                          },
                          "lastLoginAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true
                          },
                          "lastActiveAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true
                          },
                          "avatar": {
                            "type": "object",
                            "nullable": true,
                            "description": "User's profile picture"
                          },
                          "vendorStaff": {
                            "type": "object",
                            "nullable": true,
                            "description": "Present when the authenticated user is a vendor staff member"
                          },
                          "vendor": {
                            "type": "object",
                            "nullable": true,
                            "description": "Present when the authenticated user is a vendor or vendor staff"
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Profile retrieved successfully",
                    "data": {
                      "_id": "507f1f77bcf86cd799439011",
                      "firstName": "John",
                      "lastName": "Doe",
                      "email": "john.doe@example.com",
                      "phoneNumber": "+2348012345678",
                      "stripeCustomerId": "cus_1234567890",
                      "gender": "male",
                      "dateOfBirth": "1995-01-15",
                      "addressId": null,
                      "role": "customer",
                      "status": "active",
                      "emailVerified": true,
                      "authProvider": "local",
                      "googleId": null,
                      "hasPassword": true,
                      "lastLoginAt": "2026-01-22T10:30:00.000Z",
                      "lastActiveAt": "2026-01-22T11:05:00.000Z",
                      "avatar": null,
                      "vendorStaff": null,
                      "vendor": null,
                      "createdAt": "2026-01-01T12:00:00.000Z",
                      "updatedAt": "2026-01-01T12:00:00.000Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            }
          }
        },
        "delete": {
          "tags": [
            "Users"
          ],
          "summary": "Delete authenticated user's account",
          "description": "Permanently deletes the authenticated user's account and all associated data.\n**Warning:** This action is irreversible. All user data will be permanently removed.\n\n**What gets deleted:**\n- User account and profile\n- Associated business profiles\n- User's bookings and transactions\n- Audit logs related to the user\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Account deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Account deleted successfully"
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            },
            "404": {
              "description": "User not found"
            }
          }
        }
      },
      "/api/v1/users": {
        "get": {
          "tags": [
            "Users"
          ],
          "summary": "Get all users (Admin only)",
          "description": "Retrieves a paginated list of all users in the system.\nThis endpoint is restricted to admin users only.\nSupports pagination with page and limit query parameters.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number for pagination",
              "example": 1
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "description": "Number of users per page",
              "example": 10
            }
          ],
          "responses": {
            "200": {
              "description": "Users retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Users retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "users": {
                            "type": "array",
                            "items": {
                              "type": "object",
                              "properties": {
                                "_id": {
                                  "type": "string"
                                },
                                "firstName": {
                                  "type": "string"
                                },
                                "lastName": {
                                  "type": "string"
                                },
                                "email": {
                                  "type": "string"
                                },
                                "role": {
                                  "type": "string"
                                },
                                "status": {
                                  "type": "string"
                                },
                                "emailVerified": {
                                  "type": "boolean"
                                },
                                "createdAt": {
                                  "type": "string",
                                  "format": "date-time"
                                }
                              }
                            }
                          },
                          "pagination": {
                            "type": "object",
                            "properties": {
                              "currentPage": {
                                "type": "integer",
                                "example": 1
                              },
                              "totalPages": {
                                "type": "integer",
                                "example": 5
                              },
                              "totalUsers": {
                                "type": "integer",
                                "example": 50
                              },
                              "limit": {
                                "type": "integer",
                                "example": 10
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            },
            "403": {
              "description": "Forbidden - User is not an admin"
            }
          }
        }
      },
      "/api/v1/users/get-favorite-vendors": {
        "get": {
          "tags": [
            "Users"
          ],
          "summary": "Get favorite vendors for a customer",
          "description": "Retrieves a list of favorite vendors for the authenticated customer.\nThis endpoint is restricted to customers only.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number for pagination",
              "example": 1
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "description": "Number of users per page",
              "example": 10
            }
          ],
          "responses": {
            "200": {
              "description": "Favorite vendors retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Favorite vendors retrieved successfully"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object"
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            },
            "403": {
              "description": "Forbidden - User is not a customer"
            }
          }
        }
      },
      "/api/v1/users/{id}": {
        "get": {
          "tags": [
            "Users"
          ],
          "summary": "Get user by ID (Admin only)",
          "description": "Retrieves detailed information about a specific user by their ID.\nThis endpoint is restricted to admin users only.\nReturns full user profile including all fields.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "User ID (MongoDB ObjectId)",
              "example": "507f1f77bcf86cd799439011"
            }
          ],
          "responses": {
            "200": {
              "description": "User retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "User retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_id": {
                            "type": "string"
                          },
                          "firstName": {
                            "type": "string"
                          },
                          "lastName": {
                            "type": "string"
                          },
                          "email": {
                            "type": "string"
                          },
                          "gender": {
                            "type": "string"
                          },
                          "role": {
                            "type": "string"
                          },
                          "status": {
                            "type": "string"
                          },
                          "emailVerified": {
                            "type": "boolean"
                          },
                          "authProvider": {
                            "type": "string"
                          },
                          "googleId": {
                            "type": "string",
                            "nullable": true
                          },
                          "hasPassword": {
                            "type": "boolean",
                            "description": "True if the user has set a login password."
                          },
                          "lastLoginAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true
                          },
                          "lastActiveAt": {
                            "type": "string",
                            "format": "date-time",
                            "nullable": true
                          },
                          "avatar": {
                            "type": "object",
                            "nullable": true
                          },
                          "createdAt": {
                            "type": "string",
                            "format": "date-time"
                          },
                          "updatedAt": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            },
            "403": {
              "description": "Forbidden - User is not an admin"
            },
            "404": {
              "description": "User not found"
            }
          }
        }
      },
      "/api/v1/users/profile/update": {
        "put": {
          "tags": [
            "Users"
          ],
          "summary": "Update authenticated user's profile",
          "description": "Allows the authenticated user to update their own profile information.\nAll fields are optional - only provided fields will be updated.\nAvatar must be a valid UploadedFile ObjectId if provided.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateUserInput"
                },
                "example": {
                  "firstName": "John",
                  "lastName": "Doe",
                  "phoneNumber": "+2348012345678",
                  "gender": "male",
                  "dateOfBirth": "1995-01-15",
                  "addressId": "64f0c2f7a2b6c1a9b3d2e444",
                  "avatar": "64f0c2f7a2b6c1a9b3d2e777"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Profile updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Profile updated successfully"
                      },
                      "data": {
                        "type": "object",
                        "description": "Updated user profile"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error - Invalid input data"
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            }
          }
        }
      },
      "/api/v1/users/add-favorite-vendors": {
        "patch": {
          "tags": [
            "Users"
          ],
          "summary": "Add favorite vendors for authenticated user",
          "description": "Allows the authenticated customer to add favorite vendors.\nThe request body must contain an array of vendor IDs.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "vendorIds": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "ObjectId"
                      }
                    }
                  }
                },
                "example": {
                  "vendorIds": [
                    "64f0c2f7a2b6c1a9b3d2e888",
                    "64f0c2f7a2b6c1a9b3d2e999"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Favorite vendors added successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Favorite vendors added successfully"
                      },
                      "data": {
                        "type": "object",
                        "description": "Updated user"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error - Invalid input data"
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            },
            "403": {
              "description": "Forbidden - User is not a customer"
            },
            "404": {
              "description": "User not found"
            }
          }
        }
      },
      "/api/v1/users/remove-favorite-vendors": {
        "patch": {
          "tags": [
            "Users"
          ],
          "summary": "Remove favorite vendors for authenticated user",
          "description": "Allows the authenticated customer to remove favorite vendors.\nThe request body must contain an array of vendor IDs.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "vendorIds": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "ObjectId"
                      }
                    }
                  }
                },
                "example": {
                  "vendorIds": [
                    "64f0c2f7a2b6c1a9b3d2e888",
                    "64f0c2f7a2b6c1a9b3d2e999"
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Favorite vendors removed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Favorite vendors removed successfully"
                      },
                      "data": {
                        "type": "object",
                        "description": "Updated user"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error - Invalid input data"
            },
            "401": {
              "description": "Unauthorized - Invalid or missing token"
            },
            "403": {
              "description": "Forbidden - User is not a customer"
            },
            "404": {
              "description": "User not found"
            }
          }
        }
      },
      "/api/v1/vendors/permissions": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "Get supported vendor permissions",
          "description": "Returns the list of supported vendor permission names that can be assigned to vendor staff.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Permissions retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor permissions retrieved successfully"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "string"
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Vendor permissions retrieved successfully",
                    "data": [
                      "manage_staff",
                      "view_orders",
                      "manage_services"
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendors/me": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "Get signed-in user's vendor profile",
          "description": "Returns the Vendor entity for the authenticated vendor (or vendor staff's vendor).",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor retrieved successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Vendor"
                      }
                    }
                  },
                  "example": {
                    "message": "Vendor retrieved successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2e555",
                      "userId": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e111"
                      },
                      "address": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e444"
                      },
                      "businessProfile": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e666"
                      },
                      "profilePhoto": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e777"
                      },
                      "coverPhoto": null,
                      "portfolioGallery": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2e999"
                        }
                      ],
                      "rate": 4.5,
                      "socialMediaLinks": [
                        {
                          "name": "instagram",
                          "link": "https://instagram.com/vendor"
                        }
                      ],
                      "paymentAccountId": "acct_123",
                      "paymentAccountProvider": "stripe",
                      "isActive": true,
                      "onBoardingStage": 3,
                      "onBoarded": true,
                      "onboardedAt": "2026-01-01T12:00:00.000Z",
                      "reviewCount": 0,
                      "createdAt": "2026-01-01T12:00:00.000Z",
                      "updatedAt": "2026-01-01T12:00:00.000Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Not found"
            }
          }
        },
        "patch": {
          "tags": [
            "Vendors"
          ],
          "summary": "Update signed-in vendor's profile",
          "description": "Patches the authenticated vendor's Vendor entity using the vendor context from the JWT.\nThis endpoint is intended for vendor owners updating their own vendor profile.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false,
                  "description": "Partial Vendor fields to update (at least one field is required).",
                  "properties": {
                    "address": {
                      "type": "string",
                      "description": "Address ID"
                    },
                    "businessProfile": {
                      "type": "string",
                      "description": "BusinessProfile ID"
                    },
                    "profilePhoto": {
                      "type": "string",
                      "description": "UploadedFile ID"
                    },
                    "coverPhoto": {
                      "type": "string",
                      "description": "UploadedFile ID"
                    },
                    "portfolioGallery": {
                      "type": "array",
                      "items": {
                        "type": "string"
                      },
                      "description": "Array of UploadedFile IDs"
                    },
                    "rate": {
                      "type": "number",
                      "minimum": 0,
                      "maximum": 5
                    },
                    "socialMediaLinks": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "additionalProperties": false,
                        "properties": {
                          "name": {
                            "type": "string",
                            "example": "instagram"
                          },
                          "link": {
                            "type": "string",
                            "example": "https://instagram.com/acme_vendor"
                          }
                        }
                      }
                    },
                    "paymentAccountId": {
                      "type": "string",
                      "description": "Payment provider account ID (e.g. Stripe connected account)",
                      "example": "acct_1234567890"
                    },
                    "paymentAccountProvider": {
                      "type": "string",
                      "description": "Payment provider name",
                      "example": "stripe"
                    },
                    "isActive": {
                      "type": "boolean"
                    },
                    "onBoardingStage": {
                      "type": "integer",
                      "minimum": 0
                    },
                    "onBoarded": {
                      "type": "boolean"
                    },
                    "onboardedAt": {
                      "type": "string",
                      "format": "date-time"
                    }
                  }
                },
                "example": {
                  "socialMediaLinks": [
                    {
                      "name": "instagram",
                      "link": "https://instagram.com/acme_vendor"
                    }
                  ],
                  "isActive": true,
                  "onBoardingStage": 2
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Vendor updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VendorResponse"
                  },
                  "example": {
                    "message": "Vendor updated successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2e555",
                      "userId": "64f0c2f7a2b6c1a9b3d2e111",
                      "rate": 4.5,
                      "socialMediaLinks": [
                        {
                          "name": "instagram",
                          "link": "https://instagram.com/acme_vendor"
                        }
                      ],
                      "isActive": true,
                      "onBoardingStage": 2,
                      "onBoarded": false,
                      "reviewCount": 0,
                      "createdAt": "2026-01-01T12:00:00.000Z",
                      "updatedAt": "2026-01-16T12:00:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/vendors/search": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "List vendors with filters",
          "description": "Paginated vendor list with optional service/specialty filters and rate ordering.\n\nThis endpoint returns **open vendors only**:\n- `isActive: true`\n- `onBoarded: true`\n\n**Auth:** No JWT required.\n",
          "security": [],
          "parameters": [
            {
              "in": "query",
              "name": "search",
              "schema": {
                "type": "string"
              },
              "description": "Free-text search (matches business name/tags/description/contact name)"
            },
            {
              "in": "query",
              "name": "service",
              "schema": {
                "type": "string"
              },
              "description": "ServiceCategory ID"
            },
            {
              "in": "query",
              "name": "specialty",
              "schema": {
                "type": "string"
              },
              "description": "ServiceSpecialty ID"
            },
            {
              "in": "query",
              "name": "sort",
              "schema": {
                "type": "string",
                "enum": [
                  "rate_desc",
                  "rate_asc"
                ]
              },
              "description": "Sort vendors by rate"
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Vendors retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendors retrieved successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/PaginatedVendors"
                      }
                    }
                  },
                  "example": {
                    "message": "Vendors retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2e555",
                          "rate": 4.7,
                          "userId": "64f0c2f7a2b6c1a9b3d2e111"
                        }
                      ],
                      "total": 42,
                      "page": 1,
                      "limit": 10
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendors/featured": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "Get featured (top-rated) vendors",
          "description": "Returns the top-rated active and onboarded vendors sorted by rating descending.\nUseful for homepage hero sections or featured vendor carousels.\n\n**Auth:** No JWT required.\n",
          "security": [],
          "parameters": [
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10,
                "minimum": 1,
                "maximum": 50
              },
              "description": "Maximum number of featured vendors to return (capped at 50)"
            }
          ],
          "responses": {
            "200": {
              "description": "Featured vendors retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Featured vendors retrieved successfully"
                      },
                      "data": {
                        "type": "array",
                        "items": {
                          "type": "object",
                          "properties": {
                            "_id": {
                              "type": "string",
                              "example": "665a1b2c3d4e5f6a7b8c9d0e"
                            },
                            "rate": {
                              "type": "number",
                              "example": 4.9
                            },
                            "businessProfile": {
                              "type": "object",
                              "properties": {
                                "businessName": {
                                  "type": "string",
                                  "example": "Elite Events Ltd"
                                },
                                "businessDescription": {
                                  "type": "string"
                                }
                              }
                            },
                            "profilePhoto": {
                              "type": "object",
                              "nullable": true,
                              "properties": {
                                "url": {
                                  "type": "string"
                                }
                              }
                            },
                            "isActive": {
                              "type": "boolean",
                              "example": true
                            },
                            "onBoarded": {
                              "type": "boolean",
                              "example": true
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/vendors/nearby": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "List vendors near a location",
          "description": "Paginated vendor list ordered by distance from provided lat/long, optionally filtered by service/specialty.\n\nThis endpoint returns **open vendors only** (`isActive: true` and `onBoarded: true`).\n\n**Auth:** No JWT required.\n",
          "security": [],
          "parameters": [
            {
              "in": "query",
              "name": "lat",
              "schema": {
                "type": "number"
              },
              "description": "Latitude (optional — when omitted, distance is not computed)"
            },
            {
              "in": "query",
              "name": "long",
              "schema": {
                "type": "number"
              },
              "description": "Longitude (optional — when omitted, distance is not computed)"
            },
            {
              "in": "query",
              "name": "maxDistanceKm",
              "schema": {
                "type": "number"
              },
              "description": "Optional radius filter (km)"
            },
            {
              "in": "query",
              "name": "cityName",
              "schema": {
                "type": "string"
              },
              "description": "Optional city name filter (case-insensitive)"
            },
            {
              "in": "query",
              "name": "service",
              "schema": {
                "type": "string"
              },
              "description": "ServiceCategory ID"
            },
            {
              "in": "query",
              "name": "specialty",
              "schema": {
                "type": "string"
              },
              "description": "ServiceSpecialty ID"
            },
            {
              "in": "query",
              "name": "page",
              "schema": {
                "type": "integer",
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "schema": {
                "type": "integer",
                "default": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Vendors retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendors retrieved successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/PaginatedVendorsNearby"
                      }
                    }
                  },
                  "example": {
                    "message": "Vendors retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2e555",
                          "rate": 4.7,
                          "distanceKm": 2.34
                        }
                      ],
                      "total": 12,
                      "page": 1,
                      "limit": 10
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/staff": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "List vendor staff",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Staff retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VendorStaffListResponse"
                  },
                  "example": {
                    "message": "Staff retrieved successfully",
                    "data": [
                      {
                        "_id": "64f0c2f7a2b6c1a9b3d2eaaa",
                        "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                        "userId": {
                          "_id": "64f0c2f7a2b6c1a9b3d2e111",
                          "firstName": "Jane",
                          "lastName": "Doe",
                          "email": "jane.doe@momentiv.com"
                        },
                        "permissions": [
                          {
                            "name": "manage_staff",
                            "read": true,
                            "write": true
                          }
                        ],
                        "isActive": true,
                        "createdAt": "2026-01-01T12:00:00.000Z",
                        "updatedAt": "2026-01-01T12:00:00.000Z"
                      }
                    ]
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        },
        "post": {
          "tags": [
            "Vendors"
          ],
          "summary": "Add vendor staff",
          "description": "Creates or reuses a User by email, then links them as VendorStaff with explicit permissions.\n\n**Notification side effects:** Creates `vendor_staff.added` notifications for the staff user and vendor team.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateVendorStaffInput"
                },
                "example": {
                  "firstName": "Jane",
                  "lastName": "Doe",
                  "email": "jane.doe@momentiv.com",
                  "permissions": [
                    {
                      "name": "manage_staff",
                      "read": true,
                      "write": true
                    }
                  ],
                  "isActive": true
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Staff added successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VendorStaffResponse"
                  },
                  "example": {
                    "message": "Staff added successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2eaaa",
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "userId": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e111",
                        "firstName": "Jane",
                        "lastName": "Doe",
                        "email": "jane.doe@momentiv.com"
                      },
                      "permissions": [
                        {
                          "name": "manage_staff",
                          "read": true,
                          "write": true
                        }
                      ],
                      "isActive": true,
                      "createdAt": "2026-01-01T12:00:00.000Z",
                      "updatedAt": "2026-01-01T12:00:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "User/Role/Vendor not found"
            },
            "409": {
              "description": "Staff already exists"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/staff/invite": {
        "post": {
          "tags": [
            "Vendors"
          ],
          "summary": "Invite vendor staff",
          "description": "Creates (or reuses) a vendor staff user, assigns permissions, and sends an email invite.\n\n**Notification side effects:** Creates `vendor_staff.invited` notifications for the invited user and vendor team.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/InviteVendorStaffInput"
                },
                "example": {
                  "firstName": "Jane",
                  "lastName": "Doe",
                  "email": "jane.doe@momentiv.com",
                  "phone": "+2348012345678",
                  "gender": "female",
                  "permissions": [
                    {
                      "name": "manage_staff",
                      "read": true,
                      "write": true
                    }
                  ]
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Staff invited successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VendorStaffInviteResponse"
                  },
                  "example": {
                    "message": "Staff invited successfully",
                    "data": {
                      "staffId": "64f0c2f7a2b6c1a9b3d2eaaa",
                      "userId": "64f0c2f7a2b6c1a9b3d2e111",
                      "email": "jane.doe@momentiv.com"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "409": {
              "description": "Conflict"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/staff/{staffId}": {
        "patch": {
          "tags": [
            "Vendors"
          ],
          "summary": "Update vendor staff",
          "description": "Updates a vendor staff member's permissions or active state.\n\n**Notification side effects:** Creates `vendor_staff.updated` notifications for the staff user and vendor team.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "path",
              "name": "staffId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateVendorStaffInput"
                },
                "example": {
                  "permissions": [
                    {
                      "name": "manage_staff",
                      "read": true,
                      "write": true
                    }
                  ],
                  "isActive": true
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Staff updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VendorStaffResponse"
                  },
                  "example": {
                    "message": "Staff updated successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2eaaa",
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "userId": {
                        "_id": "64f0c2f7a2b6c1a9b3d2e111",
                        "firstName": "Jane",
                        "lastName": "Doe",
                        "email": "jane.doe@momentiv.com"
                      },
                      "permissions": [
                        {
                          "name": "manage_staff",
                          "read": true,
                          "write": true
                        }
                      ],
                      "isActive": true,
                      "createdAt": "2026-01-01T12:00:00.000Z",
                      "updatedAt": "2026-01-16T12:00:00.000Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Staff not found"
            }
          }
        },
        "delete": {
          "tags": [
            "Vendors"
          ],
          "summary": "Remove vendor staff",
          "description": "Removes a staff member from a vendor team.\n\n**Notification side effects:** Creates `vendor_staff.removed` notifications for the removed user and vendor team.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "path",
              "name": "staffId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Staff removed successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Staff removed successfully"
                      }
                    }
                  },
                  "example": {
                    "message": "Staff removed successfully"
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Staff not found"
            }
          }
        }
      },
      "/api/v1/vendors": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "List vendors (paginated)",
          "description": "Returns vendors using page/limit pagination.\n\nThis endpoint returns **open vendors only** (`isActive: true` and `onBoarded: true`).\n\n**Auth:** No JWT required.\n",
          "security": [],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Vendors retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PaginatedVendorsResponse"
                  },
                  "example": {
                    "message": "Vendors retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2e555",
                          "userId": "64f0c2f7a2b6c1a9b3d2e111",
                          "rate": 4.5,
                          "socialMediaLinks": [
                            {
                              "name": "instagram",
                              "link": "https://instagram.com/vendor"
                            }
                          ],
                          "isActive": true,
                          "onBoardingStage": 0,
                          "onBoarded": false,
                          "reviewCount": 0,
                          "createdAt": "2026-01-01T12:00:00.000Z",
                          "updatedAt": "2026-01-16T12:00:00.000Z"
                        }
                      ],
                      "total": 1,
                      "page": 1,
                      "limit": 10
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "Get vendor by ID",
          "description": "Returns a single vendor by id.\n\nThis endpoint returns **open vendors only** (`isActive: true` and `onBoarded: true`).\n\n**Auth:** No JWT required.\n",
          "security": [],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID",
              "example": "64f0c2f7a2b6c1a9b3d2e555"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor retrieved successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/Vendor"
                      }
                    }
                  },
                  "example": {
                    "message": "Vendor retrieved successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2e555",
                      "userId": "64f0c2f7a2b6c1a9b3d2e111",
                      "address": {
                        "city": "london",
                        "state": "greater london",
                        "country": "GB"
                      },
                      "businessProfile": {
                        "businessName": "Acme Catering",
                        "businessDescription": "Premium event catering",
                        "workdays": [
                          {
                            "dayOfWeek": "monday",
                            "open": "09:00",
                            "close": "17:00"
                          }
                        ]
                      },
                      "profilePhoto": {
                        "url": "https://cdn.example.com/vendor/profile.jpg"
                      },
                      "coverPhoto": null,
                      "portfolioGallery": [
                        {
                          "_id": "abc123",
                          "url": "https://cdn.example.com/vendor/portfolio-1.jpg"
                        }
                      ],
                      "rate": 4.7,
                      "socialMediaLinks": [
                        {
                          "name": "instagram",
                          "link": "https://instagram.com/acme_vendor"
                        }
                      ],
                      "isActive": true,
                      "onBoarded": true,
                      "reviewCount": 0,
                      "createdAt": "2026-01-01T12:00:00.000Z",
                      "updatedAt": "2026-01-16T12:00:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        },
        "patch": {
          "tags": [
            "Vendors"
          ],
          "summary": "Update a vendor (owner/admin)",
          "description": "Updates fields on a vendor. Requires authentication and must be vendor owner or admin.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateVendorInput"
                },
                "example": {
                  "address": "507f1f77bcf86cd799439012",
                  "businessProfile": "507f1f77bcf86cd799439013",
                  "profilePhoto": "507f1f77bcf86cd799439014",
                  "coverPhoto": "507f1f77bcf86cd799439015",
                  "portfolioGallery": [
                    "507f1f77bcf86cd799439016",
                    "507f1f77bcf86cd799439017"
                  ],
                  "rate": 4.5,
                  "socialMediaLinks": [
                    {
                      "name": "instagram",
                      "link": "https://instagram.com/acme_vendor"
                    }
                  ],
                  "paymentAccountId": "acct_1234567890",
                  "paymentAccountProvider": "stripe",
                  "isActive": true,
                  "onBoardingStage": 2,
                  "onBoarded": true,
                  "onboardedAt": "2026-01-16T12:00:00.000Z"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Vendor updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VendorResponse"
                  },
                  "example": {
                    "message": "Vendor updated successfully",
                    "data": {
                      "_id": "64f0c2f7a2b6c1a9b3d2e555",
                      "userId": "64f0c2f7a2b6c1a9b3d2e111",
                      "rate": 4.5,
                      "socialMediaLinks": [
                        {
                          "name": "instagram",
                          "link": "https://instagram.com/acme_vendor"
                        }
                      ],
                      "isActive": true,
                      "onBoardingStage": 0,
                      "onBoarded": false,
                      "reviewCount": 0,
                      "createdAt": "2026-01-01T12:00:00.000Z",
                      "updatedAt": "2026-01-16T12:00:00.000Z"
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/reviews": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "List vendor reviews (public)",
          "description": "Returns reviews for a vendor. This endpoint is public (no authentication required).",
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            },
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor reviews retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VendorReviewPaginatedResponse"
                  },
                  "example": {
                    "message": "Vendor reviews retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2eaaa",
                          "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                          "bookingId": "64f0c2f7a2b6c1a9b3d2ebbb",
                          "rating": 5,
                          "comment": "Fantastic experience",
                          "isEdited": false,
                          "isFlagged": false,
                          "createdAt": "2026-01-10T12:00:00.000Z",
                          "updatedAt": "2026-01-10T12:00:00.000Z",
                          "reviewer": {
                            "firstName": "Jane",
                            "lastName": "Doe",
                            "avatar": "https://cdn.example.com/avatars/jane.jpg"
                          }
                        }
                      ],
                      "total": 1,
                      "page": 1,
                      "limit": 10
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/services": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "List vendor services (public)",
          "description": "Returns vendor services for a vendor. This endpoint is public (no authentication required).",
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            },
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor services retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VendorServicesPaginatedResponse"
                  },
                  "example": {
                    "message": "Vendor services retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2eabc",
                          "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                          "serviceCategory": {
                            "_id": "64f0c2f7a2b6c1a9b3d2e111",
                            "name": "photography & videography"
                          },
                          "tags": [
                            "weddingphotography"
                          ],
                          "minimumBookingDuration": "one_hour",
                          "leadTimeRequired": "one_week",
                          "maximumEventSize": "small",
                          "additionalFees": [
                            {
                              "name": "Extra hour",
                              "price": "10000",
                              "feeCategory": "other"
                            }
                          ],
                          "createdAt": "2026-01-01T12:00:00.000Z",
                          "updatedAt": "2026-01-16T12:00:00.000Z"
                        }
                      ],
                      "total": 1,
                      "page": 1,
                      "limit": 10
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/specialties": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "List vendor specialties (public)",
          "description": "Returns vendor specialties for a vendor. This endpoint is public (no authentication required).",
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            },
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              }
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor specialties retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VendorSpecialtiesPaginatedResponse"
                  },
                  "example": {
                    "message": "Vendor specialties retrieved successfully",
                    "data": {
                      "data": [
                        {
                          "_id": "64f0c2f7a2b6c1a9b3d2edef",
                          "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                          "serviceSpecialty": {
                            "_id": "64f0c2f7a2b6c1a9b3d2e222",
                            "name": "Wedding Photography",
                            "description": "Professional wedding photography services"
                          },
                          "priceCharge": "package_pricing",
                          "price": "50000",
                          "createdAt": "2026-01-01T12:00:00.000Z",
                          "updatedAt": "2026-01-16T12:00:00.000Z"
                        }
                      ],
                      "total": 1,
                      "page": 1,
                      "limit": 10
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/stripe-account": {
        "post": {
          "tags": [
            "Vendors"
          ],
          "summary": "Create Stripe connected account for vendor",
          "description": "Creates (or returns) a Stripe Connect Express account for the vendor.\n\nTypical vendor onboarding flow:\n1) Call this endpoint to ensure a connected account exists (returns `stripeAccountId`).\n2) Call `GET /api/v1/vendors/{vendorId}/stripe-onboarding` to get a time-limited onboarding URL.\n3) Redirect the vendor to Stripe to complete onboarding.\n4) Poll `GET /api/v1/vendors/{vendorId}/stripe-account` until capabilities are enabled.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            }
          ],
          "requestBody": {
            "required": false,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "additionalProperties": false
                },
                "example": {}
              }
            }
          },
          "responses": {
            "201": {
              "description": "Stripe account created successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Stripe account created successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "vendorId": {
                            "type": "string"
                          },
                          "stripeAccountId": {
                            "type": "string",
                            "example": "acct_123"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Stripe account created successfully",
                    "data": {
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "stripeAccountId": "acct_123"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        },
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "Get vendor Stripe account details",
          "description": "Returns Stripe connected account status flags.\n\nUse this endpoint to determine whether the vendor has completed onboarding and whether\nStripe has enabled charges/payouts capabilities.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Stripe account retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Stripe account retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "vendorId": {
                            "type": "string"
                          },
                          "stripeAccountId": {
                            "type": "string",
                            "example": "acct_123"
                          },
                          "chargesEnabled": {
                            "type": "boolean",
                            "example": false
                          },
                          "payoutsEnabled": {
                            "type": "boolean",
                            "example": false
                          },
                          "detailsSubmitted": {
                            "type": "boolean",
                            "example": false
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Stripe account retrieved successfully",
                    "data": {
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "stripeAccountId": "acct_123",
                      "chargesEnabled": false,
                      "payoutsEnabled": false,
                      "detailsSubmitted": false
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/stripe-onboarding": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "Get Stripe onboarding link for vendor",
          "description": "Generates a time-limited Stripe Connect **Express** onboarding URL.\n\nIf the vendor does not yet have a connected Stripe account, the backend creates one automatically.\n\nRedirect behavior:\n- `return_url` is where Stripe sends the vendor after completing onboarding.\n- `refresh_url` is where Stripe sends the vendor if the onboarding link expires or the flow needs to restart.\n\nBy default, the backend uses `STRIPE_CONNECT_RETURN_URL` and `STRIPE_CONNECT_REFRESH_URL` from the server environment.\nYou can optionally override these via query parameters (useful for local/dev).\n\nFrontend usage:\n- Call this endpoint and redirect the vendor to `url`.\n- After onboarding, call `GET /api/v1/vendors/{vendorId}/stripe-account` to check status.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            },
            {
              "in": "query",
              "name": "returnUrl",
              "required": false,
              "schema": {
                "type": "string",
                "format": "uri"
              },
              "description": "Optional override for Stripe `return_url` (defaults to `STRIPE_CONNECT_RETURN_URL`)"
            },
            {
              "in": "query",
              "name": "refreshUrl",
              "required": false,
              "schema": {
                "type": "string",
                "format": "uri"
              },
              "description": "Optional override for Stripe `refresh_url` (defaults to `STRIPE_CONNECT_REFRESH_URL`)"
            }
          ],
          "responses": {
            "200": {
              "description": "Onboarding link generated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Onboarding link generated successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "vendorId": {
                            "type": "string"
                          },
                          "url": {
                            "type": "string",
                            "example": "https://connect.stripe.com/setup/s/..."
                          },
                          "expiresAt": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Onboarding link generated successfully",
                    "data": {
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "url": "https://connect.stripe.com/setup/s/example",
                      "expiresAt": "2026-02-18T12:05:00.000Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            },
            "404": {
              "description": "Vendor not found"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/stripe-dashboard": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "Get Stripe dashboard login link for vendor",
          "description": "Generates a short-lived Stripe Express dashboard login URL for the vendor.\n\nFrontend usage:\n- Call this endpoint and open/redirect to `url`.\n- This is useful after onboarding for vendors to manage payouts/bank accounts in Stripe.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Dashboard link generated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Dashboard link generated successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "vendorId": {
                            "type": "string"
                          },
                          "url": {
                            "type": "string"
                          },
                          "expiresAt": {
                            "type": "string",
                            "format": "date-time"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Dashboard link generated successfully",
                    "data": {
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "url": "https://dashboard.stripe.com/login/example",
                      "expiresAt": "2026-01-16T12:05:00.000Z"
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/payment-model": {
        "put": {
          "tags": [
            "Vendors"
          ],
          "summary": "Set vendor payment model",
          "description": "Selects the vendor payout flow (e.g. upfront payout vs split payout).",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/VendorPaymentModelInput"
                },
                "example": {
                  "paymentModel": "upfront_payout"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Vendor payment model updated successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/payment-methods": {
        "post": {
          "tags": [
            "Vendors"
          ],
          "summary": "Add vendor payout method",
          "description": "Adds a Stripe external account (bank account/card) to the vendor's connected account.\n\nNotes for frontend:\n- `externalAccountToken` must be a Stripe token created client-side using Stripe.js.\n- This endpoint attaches that external account to the vendor's connected account for payouts.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AddVendorPaymentMethodInput"
                },
                "example": {
                  "externalAccountToken": "btok_1N..."
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "Vendor payment method added successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "vendorId": {
                            "type": "string"
                          },
                          "stripeAccountId": {
                            "type": "string"
                          },
                          "externalAccountId": {
                            "type": "string"
                          },
                          "object": {
                            "type": "string"
                          },
                          "last4": {
                            "type": "string"
                          },
                          "bankName": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Vendor payment method added successfully",
                    "data": {
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "stripeAccountId": "acct_123",
                      "externalAccountId": "ba_123",
                      "object": "bank_account",
                      "last4": "6789",
                      "bankName": "Chase"
                    }
                  }
                }
              }
            }
          }
        },
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "List vendor payout methods",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor payment methods retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "vendorId": {
                            "type": "string"
                          },
                          "stripeAccountId": {
                            "type": "string"
                          },
                          "paymentMethods": {
                            "type": "array",
                            "items": {
                              "type": "object"
                            }
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Vendor payment methods retrieved successfully",
                    "data": {
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "stripeAccountId": "acct_123",
                      "paymentMethods": [
                        {
                          "id": "ba_123",
                          "object": "bank_account",
                          "last4": "6789"
                        }
                      ]
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/payment-methods/{externalAccountId}/default": {
        "put": {
          "tags": [
            "Vendors"
          ],
          "summary": "Set default vendor payout method",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            },
            {
              "in": "path",
              "name": "externalAccountId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor default payment method updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "vendorId": {
                            "type": "string"
                          },
                          "stripeAccountId": {
                            "type": "string"
                          },
                          "defaultExternalAccountId": {
                            "type": "string"
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Vendor default payment method updated successfully",
                    "data": {
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "stripeAccountId": "acct_123",
                      "defaultExternalAccountId": "ba_123"
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/commission-agreement/accept": {
        "post": {
          "tags": [
            "Vendors"
          ],
          "summary": "Accept commission agreement",
          "description": "Stores the commission terms accepted by the vendor (separate from payment model selection).",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AcceptCommissionAgreementInput"
                },
                "example": {
                  "version": "v1",
                  "commissionType": "percentage",
                  "commissionAmount": 10,
                  "currency": "GBP"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Commission agreement accepted successfully"
            },
            "401": {
              "description": "Unauthorized"
            },
            "403": {
              "description": "Forbidden"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/balance": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "Get vendor balance",
          "description": "Returns the Stripe balance for the vendor's connected account.\n\nThis is a read-only Stripe Connect query and requires the vendor to have a connected Stripe account.\n\n⚠️ **Amount fields:** All `amount` values in `balance.available` and `balance.pending` arrays are in **minor currency units** (pence for GBP, cents for USD) as returned by Stripe. Divide by `_meta.minorUnitDivisor` (100) for display. Note that upfront payments land in `pending` first during Stripe's settlement window before becoming `available`.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Balance retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Balance retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_meta": {
                            "type": "object",
                            "description": "Metadata about response format and currency units",
                            "properties": {
                              "amountsInMinorUnits": {
                                "type": "boolean",
                                "example": true
                              },
                              "minorUnitDivisor": {
                                "type": "integer",
                                "example": 100
                              },
                              "note": {
                                "type": "string",
                                "example": "All amounts are in minor currency units (e.g. pence). Divide by 100 for display."
                              }
                            }
                          },
                          "vendorId": {
                            "type": "string"
                          },
                          "balance": {
                            "type": "object",
                            "properties": {
                              "available": {
                                "type": "array",
                                "description": "Funds immediately available for payout",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "integer",
                                      "description": "Amount in minor units (pence/cents)",
                                      "example": 15000
                                    },
                                    "currency": {
                                      "type": "string",
                                      "example": "gbp"
                                    }
                                  }
                                }
                              },
                              "pending": {
                                "type": "array",
                                "description": "Funds in Stripe's settlement window (not yet available; upfront payments land here first)",
                                "items": {
                                  "type": "object",
                                  "properties": {
                                    "amount": {
                                      "type": "integer",
                                      "description": "Amount in minor units (pence/cents)",
                                      "example": 300000
                                    },
                                    "currency": {
                                      "type": "string",
                                      "example": "gbp"
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Balance retrieved successfully",
                    "data": {
                      "_meta": {
                        "amountsInMinorUnits": true,
                        "minorUnitDivisor": 100,
                        "note": "All amounts are in minor currency units (e.g. pence). Divide by 100 for display."
                      },
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "balance": {
                        "available": [
                          {
                            "amount": 15000,
                            "currency": "gbp"
                          }
                        ],
                        "pending": [
                          {
                            "amount": 300000,
                            "currency": "gbp"
                          }
                        ]
                      }
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/earnings": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "Get vendor earnings history",
          "description": "Returns Stripe balance transactions (earnings history) for the vendor's connected account.\n\nThis reflects Stripe's ledger entries (charges, refunds, transfers, payouts, fees), not booking rows.\n\n⚠️ **Amount fields:** All `amount` values in the `earnings` array are in **minor currency units** (pence for GBP, cents for USD) as returned by Stripe's balance transactions API. Divide by `_meta.minorUnitDivisor` (100) for display.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Earnings retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Earnings retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "_meta": {
                            "type": "object",
                            "description": "Metadata about response format and currency units",
                            "properties": {
                              "amountsInMinorUnits": {
                                "type": "boolean",
                                "example": true
                              },
                              "minorUnitDivisor": {
                                "type": "integer",
                                "example": 100
                              },
                              "note": {
                                "type": "string",
                                "example": "All amounts are in minor currency units (e.g. pence). Divide by 100 for display."
                              }
                            }
                          },
                          "vendorId": {
                            "type": "string"
                          },
                          "earnings": {
                            "type": "array",
                            "description": "Stripe balance transaction objects",
                            "items": {
                              "type": "object"
                            }
                          },
                          "total": {
                            "type": "number",
                            "example": 1
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Earnings retrieved successfully",
                    "data": {
                      "_meta": {
                        "amountsInMinorUnits": true,
                        "minorUnitDivisor": 100,
                        "note": "All amounts are in minor currency units (e.g. pence). Divide by 100 for display."
                      },
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "earnings": [
                        {
                          "id": "txn_123",
                          "amount": 300000,
                          "currency": "gbp",
                          "type": "charge",
                          "created": 1700000000
                        }
                      ],
                      "total": 1
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendors/{vendorId}/payouts": {
        "get": {
          "tags": [
            "Vendors"
          ],
          "summary": "Get vendor payouts",
          "description": "Lists Stripe payouts for the vendor's connected account.\n\nNotes:\n- Payout availability depends on Stripe onboarding completion and account settings.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "vendorId",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Payouts retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Payouts retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "vendorId": {
                            "type": "string"
                          },
                          "payouts": {
                            "type": "array",
                            "items": {
                              "type": "object"
                            }
                          }
                        }
                      }
                    }
                  },
                  "example": {
                    "message": "Payouts retrieved successfully",
                    "data": {
                      "vendorId": "64f0c2f7a2b6c1a9b3d2e555",
                      "payouts": [
                        {
                          "id": "po_123",
                          "amount": 12000,
                          "currency": "usd",
                          "status": "paid",
                          "arrival_date": 1700000000
                        }
                      ]
                    }
                  }
                }
              }
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendor-services": {
        "post": {
          "tags": [
            "VendorServices"
          ],
          "summary": "Create or update a vendor service",
          "description": "Creates a new vendor service, or updates the existing one if a service record\nalready exists for this vendor.\n\n**Idempotent / safe to re-submit:** A vendor has at most one service record.\nRe-submitting updates the existing record instead of creating a duplicate.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateVendorServiceInput"
                },
                "example": {
                  "vendorId": "64f0c2f7a2b6c1a9b3d2e111",
                  "serviceCategory": "64f0c2f7a2b6c1a9b3d2e222",
                  "tags": [
                    "weddingphotography",
                    "portraitphotography",
                    "dronephotography"
                  ],
                  "minimumBookingDuration": "one_hour",
                  "leadTimeRequired": "one_week",
                  "maximumEventSize": "small",
                  "additionalFees": [
                    {
                      "name": "Extra hour",
                      "price": "10000",
                      "feeCategory": "other"
                    }
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Vendor service created or updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor service created successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/VendorService"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        },
        "get": {
          "tags": [
            "VendorServices"
          ],
          "summary": "List vendor services (paginated)",
          "description": "Returns vendor services using simple page/limit pagination. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number"
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "description": "Items per page"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor services retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor services retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/VendorService"
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 42
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendor-services/{id}": {
        "get": {
          "tags": [
            "VendorServices"
          ],
          "summary": "Get a vendor service by ID",
          "description": "Retrieves a single vendor service document. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor service ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor service retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor service retrieved successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/VendorService"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Vendor service not found"
            }
          }
        },
        "put": {
          "tags": [
            "VendorServices"
          ],
          "summary": "Update a vendor service",
          "description": "Updates fields on an existing vendor service. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor service ID"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateVendorServiceInput"
                },
                "example": {
                  "tags": [
                    "wedding",
                    "premium"
                  ],
                  "additionalFees": [
                    {
                      "name": "Extra hour",
                      "price": "15000"
                    }
                  ]
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Vendor service updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor service updated successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/VendorService"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Vendor service not found"
            }
          }
        },
        "delete": {
          "tags": [
            "VendorServices"
          ],
          "summary": "Delete a vendor service",
          "description": "Deletes a vendor service by ID. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor service ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor service deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor service deleted successfully"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Vendor service not found"
            }
          }
        }
      },
      "/api/v1/vendor-services/search": {
        "get": {
          "tags": [
            "VendorServices"
          ],
          "summary": "List search vendor services (paginated)",
          "description": "Returns vendor services filtered for search (optionally by serviceCategoryId/tag) with page/limit pagination. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number"
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "description": "Items per page"
            },
            {
              "in": "query",
              "name": "serviceCategoryId",
              "required": false,
              "schema": {
                "type": "string"
              },
              "description": "Filter by service category ObjectId"
            },
            {
              "in": "query",
              "name": "tag",
              "required": false,
              "schema": {
                "type": "string"
              },
              "description": "Filter by a single tag (case-insensitive)"
            }
          ],
          "responses": {
            "200": {
              "description": "Search services retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Search services retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/VendorService"
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 10
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendor-services/search/{id}": {
        "get": {
          "tags": [
            "VendorServices"
          ],
          "summary": "Get a search service by ID",
          "description": "Retrieves a single search service document. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Search service ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Search service retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/VendorServiceSearchDetailResponse"
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Search service not found"
            }
          }
        }
      },
      "/api/v1/vendor-specialties": {
        "post": {
          "tags": [
            "VendorSpecialties"
          ],
          "summary": "Create or update a vendor specialty",
          "description": "Creates a new vendor specialty, or updates the existing one if a record already exists\nfor the same `(vendorId, serviceSpecialty)` combination.\n\n**Idempotent / safe to re-submit:** Re-submitting the same vendor + specialty pair\nupdates the existing record (e.g. price change) instead of creating a duplicate.\n",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateVendorSpecialtyInput"
                },
                "example": {
                  "vendorId": "64f0c2f7a2b6c1a9b3d2e111",
                  "serviceSpecialty": "64f0c2f7a2b6c1a9b3d2e333",
                  "priceCharge": "package_pricing",
                  "price": "50000"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Vendor specialty created or updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor specialty created successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/VendorSpecialty"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        },
        "get": {
          "tags": [
            "VendorSpecialties"
          ],
          "summary": "List vendor specialties (paginated)",
          "description": "Returns vendor specialties using simple page/limit pagination. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "query",
              "name": "page",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "default": 1
              },
              "description": "Page number"
            },
            {
              "in": "query",
              "name": "limit",
              "required": false,
              "schema": {
                "type": "integer",
                "minimum": 1,
                "maximum": 100,
                "default": 10
              },
              "description": "Items per page"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor specialties retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor specialties retrieved successfully"
                      },
                      "data": {
                        "type": "object",
                        "properties": {
                          "data": {
                            "type": "array",
                            "items": {
                              "$ref": "#/components/schemas/VendorSpecialty"
                            }
                          },
                          "total": {
                            "type": "integer",
                            "example": 42
                          },
                          "page": {
                            "type": "integer",
                            "example": 1
                          },
                          "limit": {
                            "type": "integer",
                            "example": 10
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            }
          }
        }
      },
      "/api/v1/vendor-specialties/{id}": {
        "get": {
          "tags": [
            "VendorSpecialties"
          ],
          "summary": "Get a vendor specialty by ID",
          "description": "Retrieves a single vendor specialty document. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor specialty ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor specialty retrieved successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor specialty retrieved successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/VendorSpecialty"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Vendor specialty not found"
            }
          }
        },
        "put": {
          "tags": [
            "VendorSpecialties"
          ],
          "summary": "Update a vendor specialty",
          "description": "Updates fields on an existing vendor specialty. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor specialty ID"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateVendorSpecialtyInput"
                },
                "example": {
                  "price": "75000",
                  "priceCharge": "package_pricing"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Vendor specialty updated successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor specialty updated successfully"
                      },
                      "data": {
                        "$ref": "#/components/schemas/VendorSpecialty"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Vendor specialty not found"
            }
          }
        },
        "delete": {
          "tags": [
            "VendorSpecialties"
          ],
          "summary": "Delete a vendor specialty",
          "description": "Deletes a vendor specialty by ID. Requires authentication.",
          "security": [
            {
              "BearerAuth": []
            }
          ],
          "parameters": [
            {
              "in": "path",
              "name": "id",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Vendor specialty ID"
            }
          ],
          "responses": {
            "200": {
              "description": "Vendor specialty deleted successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Vendor specialty deleted successfully"
                      }
                    }
                  }
                }
              }
            },
            "400": {
              "description": "Validation error"
            },
            "401": {
              "description": "Unauthorized"
            },
            "404": {
              "description": "Vendor specialty not found"
            }
          }
        }
      },
      "/api/v1/webhooks/stripe": {
        "post": {
          "tags": [
            "Webhooks"
          ],
          "summary": "Handle Stripe webhook events",
          "description": "Endpoint for receiving Stripe webhook events.\n\nIntegration notes:\n- Stripe signs webhook requests; the backend verifies the signature using the `stripe-signature` header and the `STRIPE_WEBHOOK_SECRET` env var.\n- This route receives the **raw** request body for signature verification.\n- Configure Stripe to send relevant events for your payment flow:\n  - `payment_intent.succeeded` – marks booking as paid\n  - `payment_intent.payment_failed` – marks booking payment as failed\n  - `payment_intent.canceled` – marks booking as cancelled\n  - `account.updated` – logs vendor Stripe Connect capability changes\n\nProcessed events:\n- `payment_intent.succeeded`: Updates booking status to PAID, records paidAt timestamp, and creates idempotent `payment.succeeded.*` notifications for the customer and vendor team.\n- `payment_intent.payment_failed`: Updates booking payment status to CANCELED and creates an idempotent `payment.failed.*` notification for the customer.\n- `payment_intent.canceled`: Updates booking status to CANCELLED and creates an idempotent `payment.canceled.*` notification for the customer.\n- `account.updated`: Logs vendor Stripe Connect account capability changes.\n",
          "parameters": [
            {
              "in": "header",
              "name": "stripe-signature",
              "required": true,
              "schema": {
                "type": "string"
              },
              "description": "Stripe signature header"
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "description": "Stripe event payload (raw Stripe event JSON)"
                }
              }
            }
          },
          "responses": {
            "200": {
              "description": "Webhook received successfully",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "received": {
                        "type": "boolean",
                        "example": true
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "customOptions": {
    "docExpansion": "none"
  }
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.preauthorizeApiKey) {
    const key = customOptions.preauthorizeApiKey.authDefinitionKey;
    const value = customOptions.preauthorizeApiKey.apiKeyValue;
    if (!!key && !!value) {
      const pid = setInterval(() => {
        const authorized = ui.preauthorizeApiKey(key, value);
        if(!!authorized) clearInterval(pid);
      }, 500)

    }
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
