const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
let engine = require('ejs-locals');

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('ejs', engine);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.json());

const connectionString = 'mongodb+srv://jason:1234@cluster0.sr5vk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let db;
let quotesCollection;
MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err);
  console.log('Connected to Database');
  db = client.db('star-wars-quotes');
  quotesCollection = db.collection('quotes');
});

app.listen(3000, function () {
  console.log('listening on 3000');
});

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray()
    .then(results => {
      console.log(results);
      res.render('index.ejs', { quotes: results });
    })
    .catch(error => console.error(error));

});

app.post('/quotes', (req, res) => {
  quotesCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/');
    })
    .catch(error => console.error(error));
});

app.put('/quotes', (req, res) => {
  quotesCollection.findOneAndUpdate(
    { name: 'Name' },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote,
      },
    },
    {
      upsert: true,
    },
  )
    .then(result => {
      console.log(result);
      res.json('Success');
    })
    .catch(error => console.error(error));
});

app.delete('/quotes', (req, res) => {
  quotesCollection.deleteOne(
    { name: req.body.name },
  )
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No quote to delete');
      }
      res.json(`Deleted Darth Vadar's quote`);
    })
    .catch(error => console.error(error));
});

