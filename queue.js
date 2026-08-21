const Queue = require('bull');
// Re-using the inventory-updates queue name or you can rename it to print-jobs
const printQueue = new Queue('print-jobs', 'redis://127.0.0.1:6379');
module.exports = printQueue;
