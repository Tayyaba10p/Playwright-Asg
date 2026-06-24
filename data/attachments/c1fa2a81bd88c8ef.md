# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api-testing/04-patchApi.spec.ts >> Restful API - PATCH Partial Update Object >> should partially update an existing Apple MacBook Pro 16 object
- Location: tests/api-testing/04-patchApi.spec.ts:7:7

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 2019
Received: undefined
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | const BASE_URL = 'https://api.restful-api.dev/objects';
  4  | 
  5  | test.describe('Restful API - PATCH Partial Update Object', () => {
  6  | 
  7  |   test('should partially update an existing Apple MacBook Pro 16 object', async ({ request }) => {
  8  |     // Create object
  9  |     const createRequestBody = {
  10 |       name: 'Apple MacBook Pro 16',
  11 |       data: {
  12 |         year: 2019,
  13 |         price: 1849.99,
  14 |         'CPU model': 'Intel Core i9',
  15 |         'Hard disk size': '1 TB'
  16 |       }
  17 |     };
  18 | 
  19 |     const createResponse = await request.post(BASE_URL, { data: createRequestBody });
  20 |     expect(createResponse.ok()).toBeTruthy();
  21 | 
  22 |     const createdObject = await createResponse.json();
  23 |     expect(createdObject).toHaveProperty('id');
  24 |     const objectId = createdObject.id;
  25 | 
  26 |     // Partial update (PATCH) - change price and CPU model
  27 |     const patchRequestBody = {
  28 |       data: {
  29 |         price: 1599.99,
  30 |         'CPU model': 'Intel Core i7'
  31 |       }
  32 |     };
  33 | 
  34 |     const patchResponse = await request.patch(`${BASE_URL}/${objectId}`, { data: patchRequestBody });
  35 |     expect(patchResponse.ok()).toBeTruthy();
  36 | 
  37 |     const patchedBody = await patchResponse.json();
  38 | 
  39 |     // Verify ID remains the same
  40 |     expect(patchedBody.id).toBe(objectId);
  41 | 
  42 |     // Verify patched fields
  43 |     expect(patchedBody.data.price).toBe(patchRequestBody.data.price);
  44 |     expect(patchedBody.data['CPU model']).toBe(patchRequestBody.data['CPU model']);
  45 | 
  46 |     // Verify untouched fields remain
> 47 |     expect(patchedBody.data.year).toBe(createRequestBody.data.year);
     |                                   ^ Error: expect(received).toBe(expected) // Object.is equality
  48 |     expect(patchedBody.data['Hard disk size']).toBe(createRequestBody.data['Hard disk size']);
  49 | 
  50 |     console.log('Patched object:', JSON.stringify(patchedBody, null, 2));
  51 |   });
  52 | 
  53 |   test('patch non-existent id should not be ok', async ({ request }) => {
  54 |     const fakeId = 'non-existent-id-000';
  55 |     const patchResponse = await request.patch(`${BASE_URL}/${fakeId}`, { data: { data: { price: 10 } } });
  56 |     expect(patchResponse.ok()).toBeFalsy();
  57 |     console.log('Patch non-existent id response status:', patchResponse.status());
  58 |     const txt = await patchResponse.text().catch(() => null);
  59 |     if (txt) console.log('Response body:', txt);
  60 |   });
  61 | 
  62 |   test('patch known object id (from post) ff8081819d82fab6019ef82fe3d452df', async ({ request }) => {
  63 |     const id = 'ff8081819d82fab6019ef82fe3d452df';
  64 |     const patchRequestBody = { data: { price: 1399.99 } };
  65 |     const response = await request.patch(`${BASE_URL}/${id}`, { data: patchRequestBody });
  66 |     expect(response.ok()).toBeTruthy();
  67 |     const body = await response.json().catch(() => null);
  68 |     // Avoid strict message checks; if API returns object data, verify patched field
  69 |     if (body && body.data) {
  70 |       expect(body.data.price).toBe(patchRequestBody.data.price);
  71 |     }
  72 |     console.log(`Patched object ${id} response:`, body);
  73 |   });
  74 | 
  75 | });
  76 | 
```