require('dotenv').config()
const express= require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const { client } = require('./dbConnection');
const router = require('./routes/airRoutes');
const app = express();
require('./cronTask')
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(router);

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000,()=>{
        console.log('Listening on port 3000')
    })
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });


module.exports.app = app;
