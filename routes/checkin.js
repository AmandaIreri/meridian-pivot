const express = require('express');
const router = express.Router();
const attendees = require('../models/attendees');
const axios = require('axios');

const PRINTER_URL = 'http://localhost:3000/mock-printer/print';

router.post('/checkin', async (req, res) => {
    const { attendeeId } = req.body;
    const attendee = attendees.get(attendeeId);

    // 1. Check if attendee exists
    if (!attendee) return res.status(404).json({ error: 'Attendee not found' });
    
    // 2. Duplicate Protection: Check if already checked in
    if (attendee.checkedIn) return res.status(409).json({ error: 'Already checked in' });

    try {
        // 3. Synchronous: Wait for printer to finish
        const printResponse = await axios.post(PRINTER_URL, { attendeeId, name: attendee.name });
        
        // 4. Mark as checked in
        if (printResponse.data.status === 'printed') {
            attendee.checkedIn = true;
            attendee.badgePrinted = true;
            return res.json({ attendeeId, status: 'Checked In', badge: 'Printed' });
        }
    } catch (err) {
        return res.status(502).json({ error: 'Printer failed', detail: err.message });
    }
});

module.exports = router;
