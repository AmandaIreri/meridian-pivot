const express = require('express');
const router = express.Router();

router.post('/print', async (req, res) => {
    const { attendeeId, name } = req.body;
    console.log(`[Printer] Printing badge for ${name} (${attendeeId})...`);
    
    // Simulate 1 second print delay
    await new Promise(r => setTimeout(r, 1000));
    
    console.log(`[Printer] Done.`);
    res.json({ status: 'printed', attendeeId, printedAt: new Date().toISOString() });
});

module.exports = router;
