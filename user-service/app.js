const express = require('express')
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const error = err.error || err.message || 'Internal server error'
    return res.status(status).json({
      status: status,
      message: 'Error',
      error: error 
    })
  })
  app.listen(port, () => {
    console.log(`User service running on port ${port}`)
})