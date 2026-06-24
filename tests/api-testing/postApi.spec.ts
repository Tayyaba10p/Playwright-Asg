import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev/objects';

test.describe('Restful API - POST Single Object (MacBook Pro 16)', () => {

  test('should create a single Apple MacBook Pro 16 object', async ({ request }) => {
    const requestBody = {
      "name": "Apple MacBook Pro 16",
      "data": {
        "year": 2019,
        "price": 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB"
      }
    };

    const response = await request.post(BASE_URL, {
      data: requestBody
    });

    // Verify response status
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    console.log('Response:', response);

    // Parse and validate response body
    const body = await response.json();

    // Verify generated ID
    expect(body).toHaveProperty('id');
    expect(body.id).toBeTruthy();

    // Verify all fields from request are in response
    expect(body.name).toBe('Apple MacBook Pro 16');
    expect(body.data.year).toBe(2019);
    expect(body.data.price).toBe(1849.99);
    expect(body.data['CPU model']).toBe('Intel Core i9');
    expect(body.data['Hard disk size']).toBe('1 TB');

    // Log the created object
    console.log('Created Object:', JSON.stringify(body, null, 2));
  });

});
