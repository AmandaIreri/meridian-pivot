const Queue = require('bull');

const inventoryQueue = new Queue('inventory-updates', 'redis://127.0.0.1:6379');

inventoryQueue.process(async (job) => {
    const { sku, quantity, timestamp } = job.data;
    console.log(`[${new Date().toISOString()}] Processing: SKU=${sku}, Qty=${quantity}, Received=${timestamp}`);
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`  → ${sku} processed successfully`);
    return { sku, status: 'cached' };
});

inventoryQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed:`, result);
});

inventoryQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed:`, err.message);
});

console.log('Consumer running. Waiting for jobs...');
