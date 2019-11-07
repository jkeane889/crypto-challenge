const express = require('express');
const path = require('path');
const port = 5000;

const app = express();

app.use(express.static('/client'));

app.listen(port);

console.log('App is listening on port ' + port);