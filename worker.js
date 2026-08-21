const axios = require('axios');
const printQueue = require('./queue');

// Process jobs from the queue
printQueue.process(async (job) => {
    const { attendeeId, name } = job.data;
    console.log(`[Worker] Printing badge for ${name}...`);
    
    // Simulate 1s print delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`[Worker] Done. Calling webhook for ${attendeeId}...`);
    
    // Simulate the printer vendor calling our webhook
    await axios.post('http://localhost:3000/webhook/print-complete', {
        attendeeId,
        status: 'printed'
    });

    return { status: 'cached' };
});

printQueue.on('completed', (job) => {
    console.log(`[Worker] Job ${job.id} finished successfully.`);
});

printQueue.on('failed', (job, err) => {
    console.error(`[Worker] Job ${job.id} failed:`, err.message);
});

console.log('Worker running. Waiting for print jobs...');
