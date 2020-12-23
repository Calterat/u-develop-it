const db = require('./db/database');
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request(Not Found) Catch all request
// app.use((_req, res) => {
//   res.status(404).end();
// });

// Start server after DB connection is
db.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});