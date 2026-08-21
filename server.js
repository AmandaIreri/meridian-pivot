const express = require('express');
const app = express();

app.use(express.json());

// Register Routes
app.use('/webhook', require('./routes/webhook'));
app.use('/', require('./routes/checkin'));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Solstice Kiosk (Pivoted) running on http://localhost:${PORT}`);
});