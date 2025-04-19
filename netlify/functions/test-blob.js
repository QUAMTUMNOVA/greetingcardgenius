const { getStore } = require('@netlify/blobs');

exports.handler = async () => {
  const store = getStore('greeting-card-genius-store');
  await store.set('test.json', JSON.stringify({ status: 'bootstrapped' }), {
    metadata: { createdAt: Date.now() }
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Blob test ran.' })
  };
};
