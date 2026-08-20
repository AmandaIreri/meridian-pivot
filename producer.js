const Queue = require('bull');

const inventoryQueue = new Queue('inventory-updates', 'redis://127.0.0.1:6379');

async function addJobs() {
    const jobs = [
        { sku: 'ABC123', quantity: 50, timestamp: new Date().toISOString() },
        { sku: 'DEF456', quantity: 0, timestamp: new Date().toISOString() },
        { sku: 'GHI789', quantity: 12, timestamp: new Date().toISOString() }
    ];

    for (const job of jobs) {
        await inventoryQueue.add(job);
        console.log(`Added job: ${job.sku} → ${job.quantity} units`);
    }

    console.log('All jobs queued.');
    process.exit(0);
}

addJobs().catch(console.error);
