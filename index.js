const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.drapr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const port = 4000;
const app = express();
app.use(bodyParser.json());
app.use(cors())


client.connect(err => {
  const registerCollection = client.db("bloodDB").collection("register");


  app.get('/register',(req,res) =>{
    registerCollection.find()
    .toArray((err, data) =>{
      res.send(data)
      console.log('data comes fromm database', data);
    })
  })
 
  app.post('/addRegister', (req,res) =>{
    const newRegister = req.body;
    registerCollection.insertOne(newRegister)
    .then(result => {
      console.log(result.insertedCount)
      res(result)
    })
  })

});


app.get('/', (req,res) => {
    res.send('hello i am working')
})
app.listen(process.env.PORT || port);