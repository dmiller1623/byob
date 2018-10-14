const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (request, response) {
  response.send('POKEMON!');
});

app.get('/api/v1/trainers', (request, response) => {
  let levelQuery = request.query.level;
  if (!levelQuery) {
    database('trainers').select()
      .then((trainers) => {
        if (trainers.length){
          return response.status(200).json(trainers);
        }
        return response.status(404).json({ message: 'could not find all the trainers'});
      })
      .catch((error) => {
        return response.status(500).json({ error });
      });    
  } else {
    database('trainers').where('level', levelQuery).select()
      .then((trainers) => {
        if (trainers.length){
          return response.status(200).json(trainers);
        }
        return response.status(404).json({ message: `could not find any trainers with the level of ${levelQuery}`});
      })
      .catch((error) => {
        return response.status(500).json({ error });
      });
  }
});



app.get('/api/v1/pokemon', (request, response) => {
  database('pokemon').select()
    .then((pokemon) => {
      if (pokemon.length) {
        return response.status(200).json(pokemon);
      }
      return response.status(404).json({ message: 'could not find all the pokemon'});
    })

    .catch((error) => {
      return response.status(500).json({ error });
    });
});

app.get('/api/v1/trainers/:id', (request, response) => {
  const id = request.params.id;
  database('trainers').where('id', id).select()
    .then((trainer) => {
      if (trainer.length) {
        return response.status(200).json(trainer);
      }
      return response.status(404).json({ message: 'could not find trainer'});
    })
    .catch((error) => {
      return response.status(500).json({ error });
    });
});

app.get('/api/v1/pokemon/:id', (request, response) => {
  const id = request.params.id;
  database('pokemon').where('id', id).select()
    .then((team) => {
      if (team.length) {
        return response.status(200).json(team);
      }
      return response.status(404).json({ message: 'could not find pokemon team'});
    })

    .catch((error) => {
      return response.status(500).json({ error });
    });
});

app.post('/api/v1/trainers', (request, response) => {
  const trainer = request.body;

  for (let requiredParameter of ['name', 'level']) {
    if (!trainer[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { name: <String>, level: <Number> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('trainers').insert(trainer, 'id')
    .then( trainer => response.status(201).json({ id: trainer[0] }) )
    .catch( error => response.status(500).json({ error }) );
});

app.post('/api/v1/pokemon', (request, response) => {
  const pokemon = request.body;

  for (let requiredParameter of ['trainer_id', 'pokemon_one', 'pokemon_two', 'pokemon_three', 'pokemon_four', 'pokemon_five']) {
    if (!pokemon[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { trainer_id: <Number>, pokemon_one: <String>, pokemon_two: <String>, pokemon_three: <String>, pokemon_four: <String>, pokemon_five: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('pokemon').insert(pokemon, 'id')
    .then( pokemon => response.status(201).json({ id: pokemon[0] }) )
    .catch( error => response.status(500).json({ error }) );
});

app.patch('/api/v1/trainers/:id', (request, response) => {
  const id = request.params.id;
  database('trainers').where('id', id).update('name', request.body.name)
    .then( trainer => response.status(204).json({ id: trainer[0] }))
    .catch( error => response.status(500).json({ error }) );
});

app.patch('/api/v1/trainer-levels/:id', (request, response) => {
  const id = request.params.id;
  database('trainers').where('id', id).update('level', request.body.level)
    .then( trainer => response.status(204).json({ id: trainer[0] }))
    .catch( error => response.status(500).json({ error }) );
});

app.delete('/api/v1/pokemon/:id', (request, response) => {
  const id = request.params.id;
  database('pokemon').where('id', id).delete()
    .then(pokemon => {
      if (pokemon) {
        return response.status(200).json({ id });
      }
      return response.status(404).json({ message: 'could not find that pokemon team to delete'});
    })
    
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/trainers/:id', (request, response) => {
  const id = request.params.id;
  database('pokemon').where('trainer_id', id).delete()
    .catch(error => response.status(500).json({ error }));

  database('trainers').where('id', id).delete()
    .then(trainerId => {
      if (trainerId) {
        return response.status(200).json({ id });
      }
      return response.status(404).json({ message: 'could not find that trainer to delete'});
    })
    .catch(error => response.status(500).json({ error }));
});


app.listen(app.get('port'), () => {
  console.log(`server is running on ${app.get('port')}.`);
});

module.exports = { app, database };
