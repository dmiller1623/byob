const express = require('express');
const app = express();
var bodyParser = require('body-parser')


const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json())
app.use(express.static('public'))

app.locals.trainers = require('./utilities/helper')

app.get('/', function (request, response) {
  response.send('Hello World!');
});

app.get('/api/v1/trainers', (request, response) => {
  database('trainers').select()
    .then(response.status(200).json(app.locals.trainers))
    .catch(error => response.status(500).json({ error }))
})

app.post('/api/v1/trainers', (request, response) => {
  const trainer = request.body;
  console.log(trainer)

  for (let requiredParameter of ['name', 'level']) {
    if (!trainer[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` })
    }
  }

  database('trainers').insert(trainer, 'id')
    .then( trainer => response.status(201).json({ id: trainer[0] }) )
    .catch( error => response.status(500).json({ error }) )
})

app.listen(app.get('port'), () => {
  console.log(`server is running on ${app.get('port')}.`);
});

module.exports = { app, database }