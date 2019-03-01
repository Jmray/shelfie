require('dotenv').config({ path: __dirname + '/.env' })
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

//Controllers
const productsController = require('./controllers/controllers');

const app = express();

//Destruction from dotenv
const { 
    PORT,
    DB_CONNECTION_STRING 
        } = process.env;

//Database Connectoin
massive(DB_CONNECTION_STRING, { scripts: __dirname + '/db'})
    .then( dbInstance => {
    app.set('db', dbInstance);
    })
    .catch( err => {
        console.err(err);
    });


//MiddleWare
app.use(bodyParser.json());
app.use(cors());


//Products end points
app.get('/api/products', productsController.getAll);
app.post('/api/products', productsController.create);
app.delete('/api/products/:id', productsController.delete);
// app.put('/api/products/:id', productsController.update);




app.listen(PORT, () => console.log(`Listening to port: ${PORT}`));