const Queue = require('bull');

const inventoryQueue = new Queue('inventory-updates', 'redis://127.0.0.1:6379', {
    defaultJobOptions: {
        attempts: 3,
        backoff: {
            type: 'exponential',
            delay: 1000 // 1s, then 2s, then 4s
        }
    }
});

inventoryQueue.process(async (job) => {
    const { sku, quantity } = job.data;
    
    // Simulate a flaky warehouse: SKU 'FAIL999' always fails
    if (sku === 'FAIL999') {
        throw new Error(`Warehouse timeout for ${sku}`);
    }

    console.log(`Processing: ${sku} → ${quantity}`);
    return { sku, status: 'cached' };
});

inventoryQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} (attempt ${job.attemptsMade + 1}) failed: ${err.message}`);
    if (job.attemptsMade >= 2) {
        console.error(`  → ${job.data.sku} MOVED TO DEAD LETTER after 3 attempts`);
    }
});

inventoryQueue.on('completed', (job) => {
    console.log(`Job ${job.id} completed on attempt ${job.attemptsMade + 1}`);
});

console.log('Consumer running. Waiting for jobs...');
