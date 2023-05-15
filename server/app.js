const express = require('express');
const app = express();

process.env.NODE_ENV = 'development';

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});

app.use((req, res, next) => {
  let e = new Error(`Sorry, the requested resource couldn't be found`);
  e.statusCode = 404;
  next(e);
});

app.use((err, req, res, next) => {
  console.log(err);
  let status = err.statusCode;
  res.status(status || 500);
  res.json({ message: err.message, statusCode: status});
});

const port = 5001;
app.listen(port, () => console.log('Server is listening on port', port));
