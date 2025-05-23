

GitHub Copilot: # API Endpoints Documentation for Frontend Integration

## Base URL
```
http://localhost:5000/api
```

## Authentication

### Register
```
POST /v1/auth/register
```
Creates a new user account.

**Request Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "role": "client" // "admin", "staff", or "client"
}
```

**Response:**
Returns the created user with an authentication token.

### Login
```
POST /v1/auth/login
```
Authenticates a user and returns a token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
Returns user data and authentication token.

### Get Current User
```
GET /v1/auth/me
```
Retrieves the profile of the currently authenticated user.

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
User profile data.

## Clients

### List Clients
```
GET /v1/clients
```
Retrieves a list of all clients.

**Response:**
Array of client objects with basic information.

### Create Client
```
POST /v1/clients
```
Adds a new client to the system.

**Request Body:**
```json
{
  "name": "Test Client",
  "email": "client@example.com",
  "password": "password123",
  "phone": "555-123-4567",
  "company": "Test Company",
  "notes": "Created via frontend"
}
```

**Response:**
The created client object.

### Get Client Details
```
GET /v1/clients/{clientId}
```
Retrieves detailed information about a specific client.

**Response:**
Complete client object.

### Get Client Events
```
GET /v1/clients/{clientId}/events
```
Retrieves all events associated with a client.

**Response:**
Array of events.

### Update Client
```
PUT /v1/clients/{clientId}
```
Updates client information.

**Request Body:**
```json
{
  "name": "Updated Client Name",
  "phone": "555-987-6543",
  "notes": "Updated via frontend"
}
```

**Response:**
Updated client object.

### Delete Client
```
DELETE /v1/clients/{clientId}
```
Removes a client from the system.

**Response:**
Success message.

## Staff

### List Staff
```
GET /v1/staff
```
Retrieves all staff members.

**Response:**
Array of staff objects.

### Create Staff Member
```
POST /v1/staff
```
Adds a new staff member.

**Request Body:**
```json
{
  "name": "Test Staff Member",
  "email": "staff@example.com",
  "phone": "555-789-0123",
  "role": "staff",
  "position": "Event Coordinator"
}
```

**Response:**
Created staff object.

### Get Staff Details
```
GET /v1/staff/{staffId}
```
Retrieves detailed information about a specific staff member.

**Response:**
Complete staff object.

### Update Staff
```
PUT /v1/staff/{staffId}
```
Updates staff information.

**Request Body:**
```json
{
  "name": "Updated Staff Name",
  "position": "Senior Event Coordinator",
  "notes": "Updated via frontend"
}
```

**Response:**
Updated staff object.

### Get Staff Schedule
```
GET /v1/staff/{staffId}/schedule
```
Retrieves assignments and events for a specific staff member.

**Response:**
Array of assignments with related event details.

### Delete Staff
```
DELETE /v1/staff/{staffId}
```
Removes a staff member from the system.

**Response:**
Success message.

## Staff Assignments

### Assign Staff to Event
```
POST /v1/staff/assignments
```
Assigns a staff member to an event.

**Request Body:**
```json
{
  "staffId": "staff-uuid",
  "eventId": "event-uuid",
  "role": "Event Manager"
}
```

**Response:**
Created assignment object.

### Unassign Staff from Event
```
DELETE /v1/staff/assignments/{assignmentId}
```
Removes a staff assignment.

**Response:**
Success message.

## Events

### List Events
```
GET /v1/events
```
Retrieves all events.

**Response:**
Array of events with pagination.

### Create Event
```
POST /v1/events
```
Creates a new event.

**Request Body:**
```json
{
  "name": "Test Event",
  "date": "2025-08-01T18:00:00.000Z",
  "endDate": "2025-08-01T23:00:00.000Z",
  "location": "Test Venue",
  "clientId": "client-uuid",
  "estimatedGuests": 100,
  "eventType": "Corporate",
  "notes": "Created via frontend"
}
```

**Response:**
Created event object.

### Get Event Details
```
GET /v1/events/{eventId}
```
Retrieves detailed information about a specific event.

**Response:**
Complete event object with client information.

### Update Event
```
PUT /v1/events/{eventId}
```
Updates event information.

**Request Body:**
```json
{
  "name": "Updated Event Name",
  "status": "confirmed"
}
```

**Response:**
Updated event object.

### Get Event Timeline
```
GET /v1/events/{eventId}/timeline
```
Retrieves the timeline for a specific event.

**Response:**
Event timeline data.

### Update Event Status
```
POST /v1/events/{eventId}/status
```
Updates the status of an event.

**Request Body:**
```json
{
  "status": "confirmed" // "pending", "confirmed", "canceled"
}
```

**Response:**
Updated event object.

### Delete Event
```
DELETE /v1/events/{eventId}
```
Removes an event from the system.

**Response:**
Success message.

## Inventory

### List Inventory
```
GET /v1/inventory
```
Retrieves all inventory items.

**Response:**
Array of inventory items.

### Create Inventory Item
```
POST /v1/inventory
```
Adds a new inventory item.

**Request Body:**
```json
{
  "name": "Test Inventory Item",
  "category": "Test Category",
  "quantity": 25,
  "unitCost": "19.99",
  "description": "Created via frontend"
}
```

**Response:**
Created inventory item.

### Get Inventory Item
```
GET /v1/inventory/{inventoryId}
```
Retrieves detailed information about a specific inventory item.

**Response:**
Complete inventory item object.

### Update Inventory Item
```
PUT /v1/inventory/{inventoryId}
```
Updates inventory item information.

**Request Body:**
```json
{
  "name": "Updated Inventory Item",
  "description": "Updated via frontend",
  "unitCost": 29.99
}
```

**Response:**
Updated inventory item.

### Update Inventory Quantity
```
POST /v1/inventory/update
```
Updates inventory quantity.

**Request Body:**
```json
{
  "id": "inventory-uuid",
  "quantity": 35
}
```

**Response:**
Updated inventory item.

### Get Inventory Categories
```
GET /v1/inventory/categories
```
Retrieves all unique inventory categories.

**Response:**
Array of category names.

### Check Inventory Availability
```
GET /v1/inventory/availability?start_date=2025-08-01&end_date=2025-08-05
```
Checks inventory availability for a specific date range.

**Response:**
Available inventory items within date range.

### Delete Inventory Item
```
DELETE /v1/inventory/{inventoryId}
```
Removes an inventory item from the system.

**Response:**
Success message.

## Quotes

### List Quotes
```
GET /v1/quotes
```
Retrieves all quotes.

**Response:**
Array of quotes with client, event, and item details.

### Create Quote
```
POST /v1/quotes
```
Creates a new quote.

**Request Body:**
```json
{
  "clientId": "client-uuid",
  "eventId": "event-uuid",
  "name": "Test Quote",
  "notes": "Created via frontend",
  "items": [
    {
      "inventoryId": "inventory-uuid",
      "quantity": 2,
      "unitPrice": 100.00,
      "total": 200.00
    }
  ]
}
```

**Response:**
Created quote with items.

### Get Quote Details
```
GET /v1/quotes/{quoteId}
```
Retrieves detailed information about a specific quote.

**Response:**
Complete quote object with client, event, and item details.

### Update Quote
```
PUT /v1/quotes/{quoteId}
```
Updates quote information and items.

**Request Body:**
```json
{
  "notes": "Updated via frontend",
  "items": [
    {
      "inventoryId": "inventory-uuid",
      "description": "Venue Rental",
      "quantity": 1,
      "unitPrice": 1800.00,
      "total": 1800.00
    },
    {
      "inventoryId": "inventory-uuid",
      "description": "Catering Services",
      "quantity": 150,
      "unitPrice": 45.00,
      "total": 6750.00
    }
  ]
}
```

**Response:**
Updated quote with items.

### Approve Quote
```
POST /v1/quotes/{quoteId}/approve
```
Approves a quote.

**Request Body:**
```json
{}
```

**Response:**
Approved quote object with updated status.

## Invoices

### List Invoices
```
GET /v1/invoices
```
Retrieves all invoices.

**Response:**
Array of invoices with client and quote details.

### Create Invoice
```
POST /v1/invoices
```
Creates a new invoice, typically from an approved quote.

**Request Body:**
```json
{
  "quoteId": "quote-uuid",
  "clientId": "client-uuid",
  "eventId": "event-uuid",
  "amount": 9000.00,
  "dueDate": "2025-07-15T00:00:00.000Z",
  "notes": "Created via frontend"
}
```

**Response:**
Created invoice with associations.

### Get Invoice Details
```
GET /v1/invoices/{invoiceId}
```
Retrieves detailed information about a specific invoice.

**Response:**
Complete invoice object with client, event, quote, and payment details.

### Update Invoice
```
PUT /v1/invoices/{invoiceId}
```
Updates invoice information.

**Request Body:**
```json
{
  "amount": 9500.00,
  "notes": "Updated via frontend"
}
```

**Response:**
Updated invoice.

### Record Payment
```
POST /v1/invoices/{invoiceId}/payment
```
Records a payment for an invoice.

**Request Body:**
```json
{
  "amount": 4750.00,
  "method": "credit_card",
  "reference": "CC-AUTH-12345",
  "notes": "Partial payment via frontend"
}
```

**Response:**
Created payment object.

## Notifications

### List Notifications
```
GET /v1/notifications
```
Retrieves all notifications for the current user.

**Response:**
Array of notification objects.

### Register Device for Notifications
```
POST /v1/notifications/register-device
```
Registers a device for push notifications.

**Request Body:**
```json
{
  "deviceToken": "device-token-123",
  "platform": "web"
}
```

**Response:**
Created device registration.

### Create Notification
```
POST /v1/notifications
```
Creates a new notification (typically used by admins).

**Request Body:**
```json
{
  "userId": "user-uuid",
  "title": "Test Notification",
  "message": "This is a test notification",
  "type": "system"
}
```

**Response:**
Created notification object.

### Mark Notification as Read
```
PUT /v1/notifications/{notificationId}/read
```
Marks a notification as read.

**Request Body:**
```json
{}
```

**Response:**
Updated notification with read=true.

### Delete Notification
```
DELETE /v1/notifications/{notificationId}
```
Removes a notification.

**Response:**
Success message.

## Usage Notes

1. **Authentication**: Include the JWT token in the Authorization header for all protected endpoints:
   ```
   Authorization: Bearer {token}
   ```

2. **Error Handling**: All endpoints return a consistent error format:
   ```json
   {
     "status": "error",
     "message": "Error message",
     "errors": ["Detailed error information"]
   }
   ```

3. **Success Responses**: Successful responses follow this format:
   ```json
   {
     "status": "success",
     "message": "Success message",
     "data": {} // or []
   }
   ```

4. **Data Relationships**: Be aware of relationships between resources:
   - Events belong to Clients
   - Quotes belong to Events and Clients
   - Invoices belong to Quotes
   - Staff can be assigned to Events

5. **Pagination**: Some list endpoints may support pagination parameters:
   ```
   ?page=1&limit=10
   ```

This guide covers all the endpoints demonstrated in your test results. The frontend can use these endpoints to build a complete event management application.