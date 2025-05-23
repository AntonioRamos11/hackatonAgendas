const axios = require('axios');
const fs = require('fs');

class ApiTestRunner {
  constructor(baseUrl, authToken) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
    this.results = [];
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
  }

  async runTest(name, method, endpoint, data = null, expectedStatus = 200) {
    try {
      console.log(`\n🧪 Testing: ${name} (${method} ${endpoint})`);
      
      let response;
      if (method.toLowerCase() === 'get') {
        response = await this.client.get(endpoint);
      } else if (method.toLowerCase() === 'post') {
        response = await this.client.post(endpoint, data);
      } else if (method.toLowerCase() === 'put') {
        response = await this.client.put(endpoint, data);
      } else if (method.toLowerCase() === 'delete') {
        response = await this.client.delete(endpoint);
      }
      
      const success = response.status === expectedStatus;
      
      const result = {
        name,
        endpoint: `${method} ${endpoint}`,
        status: response.status,
        success,
        data: response.data,
        error: null
      };
      
      if (success) {
        console.log(`✅ SUCCESS: ${name}`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Response: ${JSON.stringify(response.data.message || response.data).slice(0, 100)}...`);
      } else {
        console.log(`❌ FAILED: ${name}`);
        console.log(`   Expected status: ${expectedStatus}, Got: ${response.status}`);
      }
      
      this.results.push(result);
      return result;
    } catch (error) {
      console.log(`❌ ERROR: ${name}`);
      console.log(`   ${error.message}`);
      
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Data: ${JSON.stringify(error.response.data)}`);
      }
      
      const result = {
        name,
        endpoint: `${method} ${endpoint}`,
        status: error.response ? error.response.status : 'Network Error',
        success: false,
        data: error.response ? error.response.data : null,
        error: error.message
      };
      
      this.results.push(result);
      return result;
    }
  }
  
  // Utility method to wait between requests to avoid rate limiting
  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Save results to a file
  saveResults(filename = 'test-results.json') {
    fs.writeFileSync(filename, JSON.stringify({
      timestamp: new Date().toISOString(),
      baseUrl: this.baseUrl,
      tests: this.results,
      summary: {
        total: this.results.length,
        passed: this.results.filter(r => r.success).length,
        failed: this.results.filter(r => !r.success).length
      }
    }, null, 2));
    
    console.log(`\n📊 Test Results:`);
    console.log(`   Total: ${this.results.length}`);
    console.log(`   Passed: ${this.results.filter(r => r.success).length}`);
    console.log(`   Failed: ${this.results.filter(r => !r.success).length}`);
    console.log(`   Results saved to ${filename}`);
    
    // Print failed tests summary
    this.printFailedTests();
  }

  printFailedTests() {
    const failedTests = this.results.filter(test => !test.success);
    
    if (failedTests.length === 0) {
      console.log('\n✅ All tests passed successfully!');
      return;
    }
    
    console.log('\n❌ Failed Tests Summary:');
    console.log('==============================================');
    
    failedTests.forEach((test, index) => {
      console.log(`${index + 1}. ${test.name}`);
      console.log(`   Endpoint: ${test.endpoint}`);
      console.log(`   Status: ${test.status}`);
      
      if (test.error) {
        console.log(`   Error: ${test.error}`);
      }
      
      if (test.data && test.data.errors) {
        console.log(`   API Errors: ${JSON.stringify(test.data.errors)}`);
      }
      
      console.log('----------------------------------------------');
    });
    
    console.log(`\nTotal Failed Tests: ${failedTests.length} of ${this.results.length}`);
  }
}

module.exports = ApiTestRunner;