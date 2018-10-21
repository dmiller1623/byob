# Build Your Own Pokémon API
---
**Table of Contents**
* [Trainers](#trainers)
* [Pokémon](#pokémon)

---

## Trainers
* **GET** - All Trainers - ```/api/v1/trainers```

Hitting this endpoint will return an array of all trainers.

##### Example Response
```
[
  {
    id: 1,
    name: 'Kiel',
    level: '1'
  },
  {
    id: 2,
    name: 'Dennis',
    level: '2'
  }
  ...
]
```
* **GET** - All trainers at a certain level - ```api/v1/trainers?level=:level```

Hitting this enpoint will return an array of trainers at a certain level.

##### Example Response
```
[
  {
    id: 1,
    name: 'Kiel',
    level: '1'
  },
  {
    id: 2,
    name: 'Dennis',
    level: '1'
  }
  ...
]
```
    
* **GET** - Trainer by id - ```/api/v1/trainers/:id```

Hitting this endpoint will return one trainer.

##### Example Response

```
{
  id: 2,
  name: 'Dennis',
  level: '2'
}
```
* **DELETE** - Trainer by id - ```api/v1/trainers/:id```

##### Example endpoint  
```
api/v1/trainers/1
```

* **PATCH** - Edit trainer name - ```api/v1/trainers/:id```

#### Example endpoint
```
/api/v1/trainers/43
```

##### Example request object
```
{
  name: 'Dennis'
}
```

* **PATCH** - Edit trainer level - ```api/v1/trainer-levels/:id```

#### Example endpoint
```
/api/v1/trainer-levels/43
```

##### Example request object
```
{
  level: 5
}
```

* **POST** - Add new trainer - ```api/v1/trainers```

##### Example request object
```
{
  name: 'Dennis',
  level: 5
}
```

## Pokémon

* **GET** - All Pokémon - ```/api/v1/pokemon```

Hitting this endpoint will return an array of all the Pokémon.

##### Example Response
```
[
  {
    id: 12,
    trainer_id: 1,
    pokemon_one: [imgUrl],
    pokemon_two: [imgUrl],
    pokemon_three: [imgUrl],
    pokemon_four: [imgUrl],
    pokemon_five: [imgUrl]
  },
  {
    id: 35,
    trainer_id: 2,
    pokemon_one: [imgUrl],
    pokemon_two: [imgUrl],
    pokemon_three: [imgUrl],
    pokemon_four: [imgUrl],
    pokemon_five: [imgUrl]
  }
  ...
]
```

* **GET** - Pokémon by id - ```/api/v1/pokemon/:id```

Hitting this endpoint will return one Pokémon.

##### Example Response

```
{
  id: 35,
  trainer_id: 2,
  pokemon_one: [imgUrl],
  pokemon_two: [imgUrl],
  pokemon_three: [imgUrl],
  pokemon_four: [imgUrl],
  pokemon_five: [imgUrl]
}
```

* **DELETE** - Pokémon by id - ```api/v1/pokemon/:id```

##### Example endpoint
```
api/v1/pokemon/1
```

* **POST** - Add new Pokémon - ```api/v1/pokemon```

##### Example request object
```
{
  trainer_id: 2,
  pokemon_one: [imgUrl],
  pokemon_two: [imgUrl],
  pokemon_three: [imgUrl],
  pokemon_four: [imgUrl],
  pokemon_five: [imgUrl]
}
```
