const Queue = require('bull');

// Create a test queue (this connects to the local Redis from Task 1.1)
const testQueue = new Queue('test-queue');

console.log('Bull is installed and connected to Redis successfully!');

// Close the connection so the script can finish
testQueue.close().then(() => {
    process.exit(0);
});
