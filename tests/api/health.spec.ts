import {test, expect} from '@playwright/test';

test('get /health returns 200 status', async ({request}) => {
    // Make http request
    const response = await request.get('http://127.0.0.1:3000/health');
    const body = await response.json();

    // Make assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(body.status).toBe('ok');
})