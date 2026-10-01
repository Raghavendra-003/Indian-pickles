// Simple script to POST a test order to the backend create-order endpoint
// Usage: node scripts/testCreateOrder.js or API_URL=http://localhost:5000 node scripts/testCreateOrder.js

const API_URL = process.env.API_URL || 'http://localhost:5000';
const url = `${API_URL}/api/orders/create-order`;

const payload = {
  items: [
    {
      productId: 'test-001',
      name: 'Test Pickle',
      weight: '200g',
      price: 100,
      quantity: 2,
    },
  ],
  totalAmount: 200,
};

(async () => {
  try {
    console.log('POST', url);
    console.log('BODY:', JSON.stringify(payload, null, 2));

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data;
    try {
      data = text ? JSON.parse(text) : {};
    } catch (err) {
      data = { raw: text };
    }

    console.log('STATUS:', res.status);
    console.log('RESPONSE:', data);
  } catch (err) {
    console.error('ERROR:', err);
    process.exit(1);
  }
})();
