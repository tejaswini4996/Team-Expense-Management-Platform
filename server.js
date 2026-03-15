const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware and routes will be set up here

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
