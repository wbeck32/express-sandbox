// const express = require('express'); //must seperate this from the require below in order to serve static files
const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const bodyParser = require('body-parser');

// a bit of middleware magic for today
// create a json body parser and pass to app.use
app.use(bodyParser.json());
const indexHtml = path.resolve(__dirname, '../public/index.html');

// paths will over write each other consecutively in the file

app.get('/', (req, res) => {
  res.sendFile(indexHtml);
});

const publicDir = path.resolve(__dirname, '../public');
app.use(express.static(publicDir));

app.get('/', (req, res) => {
  res.send('text string');
});

app.get('/json', (req, res) => {
  res.json({
    name : 'jonas'
  });
});

app.post('/tourists', (req, res) => {
  const tourists = connect.db.collection('tourists');
  tourists
    .insert(req.body)
    .then(res => res.ops[0])
    .then(tourist => res.send(tourist))
    .catch(console.log);
});

app.get('/tourists', (req, res) => {
  const tourists = connect.db.collection('tourists');
  const query = {
  };
  if (req.query.from) query.from = req.query.from;

  tourists
    .find()
    .toArray()
    .then(tourists => res.send(tourists))
    .catch(console.log);
});

app.post('/tourists/:id/favorites', () => {
  const tourists = connect.db.collection('tourists');
  tourists
    .findOneAndUpdate(
    {
      _id : new ObjectID(req.params.id)
    },
    {
      $push : {
        favorites : req.body.favorite
      }
    },
    {
      returnOriginal : false
    }
    )
    .then(({
 value
}) => res.send(value))
    .catch(console.log);
});

app.delete('/tourists/:id/favorites', () => {
  const tourists = connect.db.collection('tourists');
  tourists
    .findOneAndUpdate(
    {
      _id : new ObjectID(req.params.id)
    },
    {
      $pull : {
        favorites : req.body.favorite
      }
    },
    {
      returnOriginal : false
    }
    )
    .then(({
 value
}) => res.send(value))
    .catch(console.log);
});
