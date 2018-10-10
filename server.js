const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'))

app.locals.teams = require('./utilities/helper')


app.get('/', function (request, response) {
  response.send('Hello World!');
});

app.get('/api/v1/teams', (request, response) => {
  response.status(200).json(app.locals.teams)
})

app.listen(app.get('port'), () => {
  console.log(`server is running on ${app.get('port')}.`);
});

module.exports = app;