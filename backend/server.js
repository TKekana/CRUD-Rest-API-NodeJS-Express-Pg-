const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const app = express()
const db = require('./configs/db.config');
const register = require('./routes/register.route');

const port = 3000

app.use(bodyParser.json());
app.use(cors());


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.use('', register)


app.listen(port, () => {
  console.log(`App Server Running On Port: ${port}.`)
})