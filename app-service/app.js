const express = require('express');
const app = express();
const port = process.env.PORT || 4001;
const routes = require('./routes');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);
app.use('/uploads', express.static('uploads'));
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
    console.log(`Service app running on port ${port}`)
})