const express = require('express');
const router = express.Router();
const attendees = require('../models/attendees');
const printQueue = require('../queue');

router.post('/checkin', async (req, res) => {
    const { attendeeId } = req.body;
    const attendee = attendees.get(attendeeId);

    // 1. Check if attendee exists
    if (!attendee) return res.status(404).json({ error: 'Attendee not found' });
    
    // 2. Duplicate Protection: Check if already fully checked in
    if (attendee.checkedIn) return res.status(409).json({ error: 'Already checked in' });
    
    // 3. Prevent duplicate scans while print is pending in the queue
    if (attendee.badgePrinted) return res.status(409).json({ error: 'Print already in progress' });

    // 4. Lock the attendee state & push to queue
    attendee.badgePrinted = true;
    await printQueue.add({ attendeeId, name: attendee.name });

    // 5. Return immediately! Don't wait for the printer.
    return res.json({ attendeeId, status: 'Printing...' });
});

module.exports = router;
