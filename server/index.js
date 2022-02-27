const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router');

//cors needed for React integration since frontend exists on its own server
app.use(cors());

app.use(router);

//server reachable at http://localhost:4000
app.listen(4000, () => {
  console.log('Listening on port 4000');
});
