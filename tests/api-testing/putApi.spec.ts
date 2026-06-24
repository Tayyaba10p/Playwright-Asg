import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev/objects';

test.describe('Restful API - PUT Update Object', () => {

  test('should update an existing Apple MacBook Pro 16 object', async ({ request }) => {

    // Create an object first
    const createRequestBody = {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB'
      }
    };

    const createResponse = await request.post(BASE_URL, {
      data: createRequestBody
    });

    expect(createResponse.status()).toBe(200);

    const createdObject = await createResponse.json();
    const objectId = createdObject.id;

    // Update the object
    const updateRequestBody = {
      name: 'Apple MacBook Pro 16 - Updated',
      data: {
        year: 2024,
        price: 2499.99,
        'CPU model': 'Apple M4 Pro',
        'Hard disk size': '2 TB'
      }
    };

    const updateResponse = await request.put(`${BASE_URL}/${objectId}`, {
      data: updateRequestBody
    });

    // Verify response status
    expect(updateResponse.status()).toBe(200);
    expect(updateResponse.ok()).toBeTruthy();

    // Parse response body
    const body = await updateResponse.json();

    // Verify ID remains the same
    expect(body.id).toBe(objectId);

    // Verify updated values
    expect(body.name).toBe(updateRequestBody.name);
    expect(body.data.year).toBe(updateRequestBody.data.year);
    expect(body.data.price).toBe(updateRequestBody.data.price);
    expect(body.data['CPU model']).toBe(updateRequestBody.data['CPU model']);
    expect(body.data['Hard disk size']).toBe(updateRequestBody.data['Hard disk size']);

    console.log('Updated Object:', JSON.stringify(body, null, 2));
  });

});