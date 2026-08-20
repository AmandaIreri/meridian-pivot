const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Register Routes
app.use('/mock-printer', require('./routes/mock-printer'));
app.use('/', require('./routes/checkin'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Solstice Kiosk running on http://localhost:${PORT}`);
});
