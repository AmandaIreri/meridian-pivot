const express = require('express');
const router = express.Router();
const attendees = require('../models/attendees');

router.post('/print-complete', (req, res) => {
    const { attendeeId, status } = req.body;
    const attendee = attendees.get(attendeeId);

    if (!attendee) return res.status(404).json({ error: 'Attendee not found' });

    console.log(`[Webhook] Received print confirmation for ${attendeeId}`);

    // Update state to fully checked in
    if (status === 'printed') {
        attendee.checkedIn = true;
        console.log(`[Webhook] ${attendee.name} fully checked in.`);
    } else {
        // If it failed, reset the lock so they can try again
        attendee.badgePrinted = false;
    }

    res.json({ success: true, checkedIn: attendee.checkedIn });
});

module.exports = router;
