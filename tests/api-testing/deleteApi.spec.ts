import { test, expect } from '@playwright/test';

test('delete object using given id', async ({ request }) => {

  const id = "ff8081819d82fab6019ef912bdd25479";

  const response = await request.delete(
    `https://api.restful-api.dev/objects/${id}`
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log("Delete response:", body);
});