const ApiTestRunner = require('./apiTestRunner');
const axios = require('axios'); // Make sure axios is installed: npm install axios

async function getAuthToken() {
  const baseUrl = 'http://localhost:5000/api';
  
  try {
    // Try to login with test user first
    console.log("Attempting to login with test user...");
    const loginResponse = await axios.post(`${baseUrl}/v1/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    if (loginResponse.data && loginResponse.data.data && loginResponse.data.data.token) {
      console.log("Login successful, using existing test user");
      return loginResponse.data.data.token;
    }
  } catch (error) {
    console.log("Login failed, will create a new test user");
  }
  
  // If login fails, register a new user
  try {
    console.log("Registering new test admin user...");
    const timestamp = Date.now();
    const registerResponse = await axios.post(`${baseUrl}/v1/auth/register`, {
      name: 'Test Admin',
      email: `testadmin${timestamp}@example.com`,
      password: 'password123',
      role: 'admin' // Note: You may need to adjust this if your API restricts admin creation
    });
    
    // After registration, login to get the token
    const loginResponse = await axios.post(`${baseUrl}/v1/auth/login`, {
      email: `testadmin${timestamp}@example.com`,
      password: 'password123'
    });
    
    if (loginResponse.data && loginResponse.data.data && loginResponse.data.data.token) {
      console.log("New user created and logged in successfully");
      return loginResponse.data.data.token;
    } else {
      throw new Error("Failed to get token after registration");
    }
  } catch (error) {
    console.error("Error during user creation:", error.message);
    throw error;
  }
}

async function runTests() {
  // Initialize test runner with your API base URL
  const baseUrl = 'http://localhost:5000/api';
  
  // Define runner at function scope level with a default null value
  let runner = null;
  
  try {
    // Get a fresh auth token
    const authToken = await getAuthToken();
    console.log("Auth token obtained successfully");
    
    // Create test runner with the fresh token
    runner = new ApiTestRunner(baseUrl, authToken);
    
    // Store IDs for use in related tests
    let eventId, clientId, staffId, inventoryId, quoteId, invoiceId, notificationId, assignmentId;
    
    // Get current user profile with the new token
    const profileResult = await runner.runTest('Get Profile', 'GET', '/v1/auth/me');
    const userId = profileResult.data?.data?.id || '3cdc7922-219e-4555-bc32-84a5d19e7845';
    
    // ========== EVENT ENDPOINTS ==========
    const eventsResult = await runner.runTest('List Events', 'GET', '/v1/events');
    
    // Create a new event
    const newEventResult = await runner.runTest('Create Event', 'POST', '/v1/events', {
      name: 'Test Automation Event',
      date: '2025-08-01T18:00:00.000Z',
      endDate: '2025-08-01T23:00:00.000Z',
      location: 'Test Venue',
      clientId: userId, // Use the current user ID
      estimatedGuests: 100,
      eventType: 'Corporate',
      notes: 'Created via test automation'
    }, 201);
    
    if (newEventResult.success && newEventResult.data.data) {
      eventId = newEventResult.data.data.id;
    } else if (eventsResult.success && eventsResult.data.data.length > 0) {
      eventId = eventsResult.data.data[0].id;
    }
    
    if (eventId) {
      await runner.runTest('Get Event Details', 'GET', `/v1/events/${eventId}`);
      
      await runner.runTest('Update Event', 'PUT', `/v1/events/${eventId}`, {
        name: 'Updated Event Name',
        estimatedGuests: 150,
        notes: 'Updated via test automation'
      });
      
      await runner.runTest('Get Event Timeline', 'GET', `/v1/events/${eventId}/timeline`);
      
      await runner.runTest('Update Event Status', 'POST', `/v1/events/${eventId}/status`, {
        status: 'confirmed'
      });
    }
    
    // ========== CLIENT ENDPOINTS ==========
    const clientsResult = await runner.runTest('List Clients', 'GET', '/v1/clients');
    
    // Create a new client
    const newClientResult = await runner.runTest('Create Client', 'POST', '/v1/clients', {
      name: 'Test Client',
      email: `client${Date.now()}@example.com`,
      phone: '555-123-4567',
      company: 'Test Company',
      password: 'securepassword123', // Add this line
      notes: 'Created via test automation'
    }, 201);
    
    if (newClientResult.success && newClientResult.data.data) {
      clientId = newClientResult.data.data.id;
    } else if (clientsResult.success && clientsResult.data.data.length > 0) {
      clientId = clientsResult.data.data[0].id;
    }
    
    // Get a valid client ID first before updating
    if (clientsResult.success && clientsResult.data.data && clientsResult.data.data.length > 0) {
      clientId = clientsResult.data.data[0].id;
      
      // Only attempt these if we got a valid ID
      if (clientId) {
        await runner.runTest('Get Client Details', 'GET', `/v1/clients/${clientId}`);
        await runner.runTest('Get Client Events', 'GET', `/v1/clients/${clientId}/events`);
        await runner.runTest('Update Client', 'PUT', `/v1/clients/${clientId}`, {
          name: 'Updated Client Name',
          phone: '555-987-6543',
          notes: 'Updated via test automation'
        });
      }
    }
    
    // ========== STAFF ENDPOINTS ==========
    // Comment out or conditionally run the staff tests
    const staffResult = await runner.runTest('List Staff', 'GET', '/v1/staff');

    // Initialize variables to track if resources were created in this test run
    let newStaffResult = { success: false };

    // Only run staff creation test if List Staff endpoint works
    if (staffResult.success) {
      // Create a new staff member
      newStaffResult = await runner.runTest('Create Staff', 'POST', '/v1/staff', {
        name: 'Test Staff Member',
        email: `staff${Date.now()}@example.com`,
        phone: '555-789-0123',
        role: 'staff',
        position: 'Event Coordinator',
        password: 'staffpass123' // Add password
      }, 201);
      
      if (newStaffResult.success && newStaffResult.data.data) {
        staffId = newStaffResult.data.data.id;
        
        // Only run these if staff was created successfully
        await runner.runTest('Get Staff Details', 'GET', `/v1/staff/${staffId}`);
        await runner.runTest('Update Staff', 'PUT', `/v1/staff/${staffId}`, {
          name: 'Updated Staff Name',
          position: 'Senior Event Coordinator',
          notes: 'Updated via test automation'
        });
      }
    }
    
    // Only attempt staff assignment if we have both valid staffId and eventId
    if (staffId && eventId) {
      // Assign staff to event
      const assignmentResult = await runner.runTest('Assign Staff', 'POST', '/v1/staff/assignments', {
        staffId: staffId,
        eventId: eventId,
        role: 'Event Manager'
      }, 201);
      
      if (assignmentResult.success && assignmentResult.data && assignmentResult.data.data) {
        assignmentId = assignmentResult.data.data.id;
        
        // Only run these if assignment was successful
        await runner.runTest('Get Staff Schedule', 'GET', `/v1/staff/${staffId}/schedule`);
        
        if (assignmentId) {
          await runner.runTest('Unassign Staff', 'DELETE', `/v1/staff/assignments/${assignmentId}`);
        }
      }
    }
    
    // ========== INVENTORY ENDPOINTS ==========
    const inventoryResult = await runner.runTest('List Inventory', 'GET', '/v1/inventory');
    
    // Create a test inventory item
    const newInventoryResult = await runner.runTest('Create Inventory Item', 'POST', '/v1/inventory', {
      name: 'Test Inventory Item',
      category: 'Test Category',
      quantity: 25,
      unitCost: 19.99,
      description: 'Created via test automation'
    }, 201);
    
    if (newInventoryResult.success && newInventoryResult.data.data) {
      inventoryId = newInventoryResult.data.data.id;
    } else if (inventoryResult.success && inventoryResult.data.data.length > 0) {
      inventoryId = inventoryResult.data.data[0].id;
    }
    
    if (inventoryId) {
      await runner.runTest('Get Inventory Item', 'GET', `/v1/inventory/${inventoryId}`);
      
      await runner.runTest('Update Inventory Item', 'PUT', `/v1/inventory/${inventoryId}`, {
        name: 'Updated Inventory Item',
        description: 'Updated via test automation',
        unitCost: 29.99
      });
      
      await runner.runTest('Update Inventory Quantity', 'POST', '/v1/inventory/update', {
        itemId: inventoryId,
        quantityChange: 10,
        reason: 'Added stock via test automation'
      });
    }
    
    await runner.runTest('Get Inventory Categories', 'GET', '/v1/inventory/categories');
    
    await runner.runTest('Check Inventory Availability', 'GET', '/v1/inventory/availability?start_date=2025-08-01&end_date=2025-08-05');
    
    // ========== QUOTES & BILLING ENDPOINTS ==========
    // Check if quotes endpoint exists first
    const quotesResult = await runner.runTest('List Quotes', 'GET', '/v1/quotes');
    if (quotesResult.success) {
      // Only run quote creation if listing works
      const newQuoteResult = await runner.runTest('Create Quote', 'POST', '/v1/quotes', {
        clientId: clientId || userId, // Use the current user ID as fallback
        eventId: eventId,
        name: 'Test Quote', 
        items: [
          {
            description: 'Venue Rental',
            quantity: 1,
            unitPrice: 1500.00
          },
          {
            description: 'Catering Services',
            quantity: 100,
            unitPrice: 45.00
          }
        ],
        notes: 'Created via test automation'
      }, 201);
      
      if (newQuoteResult.success && newQuoteResult.data.data) {
        quoteId = newQuoteResult.data.data.id;
      }
      
      if (quoteId) {
        await runner.runTest('Get Quote Details', 'GET', `/v1/quotes/${quoteId}`);
        
        await runner.runTest('Update Quote', 'PUT', `/v1/quotes/${quoteId}`, {
          items: [
            {
              description: 'Venue Rental',
              quantity: 1,
              unitPrice: 1800.00
            },
            {
              description: 'Catering Services',
              quantity: 150,
              unitPrice: 45.00
            },
            {
              description: 'Decoration',
              quantity: 1,
              unitPrice: 500.00
            }
          ],
          notes: 'Updated via test automation'
        });
        
        await runner.runTest('Approve Quote', 'POST', `/v1/quotes/${quoteId}/approve`);
        
        // Create an invoice based on the quote
        const newInvoiceResult = await runner.runTest('Create Invoice', 'POST', '/v1/invoices', {
          quoteId: quoteId,
          clientId: clientId || userId,
          eventId: eventId,
          amount: 9000.00,
          dueDate: '2025-07-15T00:00:00.000Z',
          notes: 'Created via test automation'
        }, 201);
        
        if (newInvoiceResult.success && newInvoiceResult.data.data) {
          invoiceId = newInvoiceResult.data.data.id;
        }
        
        if (invoiceId) {
          await runner.runTest('Get Invoice Details', 'GET', `/v1/invoices/${invoiceId}`);
          
          await runner.runTest('Update Invoice', 'PUT', `/v1/invoices/${invoiceId}`, {
            amount: 9500.00,
            notes: 'Updated via test automation'
          });
          
          await runner.runTest('Record Payment', 'POST', `/v1/invoices/${invoiceId}/payment`, {
            amount: 4750.00,
            method: 'credit_card',
            reference: 'CC-AUTH-12345',
            notes: 'Partial payment via test automation'
          });
        }
      }
    }
    
    // ========== NOTIFICATIONS ENDPOINTS ==========
    // Check if notifications endpoint exists first
    const notificationsResult = await runner.runTest('List Notifications', 'GET', '/v1/notifications');
    if (notificationsResult.success) {
      // Only run notification creation if listing works
      await runner.runTest('Register Device', 'POST', '/v1/notifications/register-device', {
        userId: userId,
        deviceToken: `test-token-${Date.now()}`,
        platform: 'web'
      });
      
      const newNotificationResult = await runner.runTest('Create Notification', 'POST', '/v1/notifications', {
        userId: userId,
        title: 'Test Notification',
        message: 'This is a test notification created via test automation',
        type: 'system'
      }, 201);
      
      if (newNotificationResult.success && newNotificationResult.data.data) {
        notificationId = newNotificationResult.data.data.id;
      }
      
      if (notificationId) {
        await runner.runTest('Mark Notification as Read', 'PUT', `/v1/notifications/${notificationId}/read`);
        
        await runner.runTest('Delete Notification', 'DELETE', `/v1/notifications/${notificationId}`);
      }
    }
    
    // Test cleanup - Delete created resources
    if (inventoryId && newInventoryResult.success) {
      await runner.runTest('Delete Inventory Item', 'DELETE', `/v1/inventory/${inventoryId}`);
    }
    
    if (eventId && newEventResult.success) {
      await runner.runTest('Delete Event', 'DELETE', `/v1/events/${eventId}`);
    }
    
    if (staffId && newStaffResult && newStaffResult.success) {
      await runner.runTest('Delete Staff', 'DELETE', `/v1/staff/${staffId}`);
    }
    
    if (clientId && newClientResult.success) {
      await runner.runTest('Delete Client', 'DELETE', `/v1/clients/${clientId}`);
    }
    
  } catch (error) {
    console.error('Test runner error:', error);
  } finally {
    // Check if runner exists before using it
    if (runner) {
      runner.saveResults();
    } else {
      console.log('Test runner was not initialized.');
    }
  }
}

runTests().catch(console.error);