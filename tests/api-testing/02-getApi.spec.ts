import { test, expect } from '@playwright/test';

test('Get /objects should return list of objects', async ({ request }) => {
    const response = await request.get('https://api.restful-api.dev/objects');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log(body);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);

    //validate a id & name for one object
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('name');
});
