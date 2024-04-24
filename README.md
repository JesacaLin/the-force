
# The Force

A Star Wars character generator using SWAPI, The Star Wars API.

To start, please click "Generate A Random Character!"

## Features

- Stats on the character's birth year, species, gender, eye color.
- Data on their home world: Planet name, orbital period, population, terrain.
- Data on the films the character appeared in: Title, director, release date.

## API Reference

#### API Root

```http
  GET https://swapi.dev/api/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **No** API key required |

#### Get People

```http
  GET https://swapi.dev/api/people/${id}/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


## Screenshot

![App Screenshot](https://github.com/JesacaLin/the-force/blob/main/img/the-force.jpg?raw=true)


## Deployment

https://jesacalin.github.io/the-force/

