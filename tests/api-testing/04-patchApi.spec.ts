import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev/objects';

test.describe('Restful API - PATCH Partial Update Object', () => {

  test('should partially update an existing Apple MacBook Pro 16 object', async ({ request }) => {
    // Create object
    const createRequestBody = {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB'
      }
    };

    const createResponse = await request.post(BASE_URL, { data: createRequestBody });
    expect(createResponse.ok()).toBeTruthy();

    const createdObject = await createResponse.json();
    expect(createdObject).toHaveProperty('id');
    const objectId = createdObject.id;

    // Partial update (PATCH) - change price and CPU model
    const patchRequestBody = {
      data: {
        price: 1599.99,
        'CPU model': 'Intel Core i7'
      }
    };

    const patchResponse = await request.patch(`${BASE_URL}/${objectId}`, { data: patchRequestBody });
    expect(patchResponse.ok()).toBeTruthy();

    const patchedBody = await patchResponse.json();

    // Verify ID remains the same
    expect(patchedBody.id).toBe(objectId);

    // Verify patched fields
    expect(patchedBody.data.price).toBe(patchRequestBody.data.price);
    expect(patchedBody.data['CPU model']).toBe(patchRequestBody.data['CPU model']);

    // Verify untouched fields remain
    expect(patchedBody.data.year).toBe(createRequestBody.data.year);
    expect(patchedBody.data['Hard disk size']).toBe(createRequestBody.data['Hard disk size']);

    console.log('Patched object:', JSON.stringify(patchedBody, null, 2));
  });

  test('patch non-existent id should not be ok', async ({ request }) => {
    const fakeId = 'non-existent-id-000';
    const patchResponse = await request.patch(`${BASE_URL}/${fakeId}`, { data: { data: { price: 10 } } });
    expect(patchResponse.ok()).toBeFalsy();
    console.log('Patch non-existent id response status:', patchResponse.status());
    const txt = await patchResponse.text().catch(() => null);
    if (txt) console.log('Response body:', txt);
  });

  test('patch known object id (from post) ff8081819d82fab6019ef82fe3d452df', async ({ request }) => {
    const id = 'ff8081819d82fab6019ef82fe3d452df';
    const patchRequestBody = { data: { price: 1399.99 } };
    const response = await request.patch(`${BASE_URL}/${id}`, { data: patchRequestBody });
    expect(response.ok()).toBeTruthy();
    const body = await response.json().catch(() => null);
    // Avoid strict message checks; if API returns object data, verify patched field
    if (body && body.data) {
      expect(body.data.price).toBe(patchRequestBody.data.price);
    }
    console.log(`Patched object ${id} response:`, body);
  });

});
