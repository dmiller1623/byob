const express = require('express');
const app = express();

const data = pokedata.getPokemon()

console.log(data)

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'))

app.get('/', function (request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log(`server is running on ${app.get('port')}.`);
});