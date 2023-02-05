"use strict";
//Selecting the DOM elements
const characterCard = document.querySelector(".characterCard");
const originCard = document.querySelector(".originCard");
const filmCard = document.querySelector(".filmCard");
const btn = document.querySelector(".btn");

//LOOK --> CHARACTER CARD
//Render characters to the character card
const renderCharacter = function (data) {
  // extract text of species from link
  let speciesName;
  fetch(data.species)
    .then((response) => response.json())
    .then((speciesData) => {
      speciesName = speciesData.name;
      //extra info of homeworld

      //render character data to the DOM.
      const html = `
      <section class="location">
        <strong class="characterName">${data.name}</strong>
        <strong class="birth_year">${data.birth_year}</strong>
        <strong class="species">${speciesName}</strong>
        <strong class="gender">${data.gender}</strong>
      </section>
      `;
      characterCard.insertAdjacentHTML("beforeend", html);
      //Fetch homeworld data
      getHomeworldData(data.homeworld);
    });
};

//Generate a random person from the api
const maxCharacters = 87;

const randomGenerator = function (num) {
  return Math.floor(Math.random() * num) + 1;
};

//Fetching data from the characters endpoint.

const getCharacterData = function (person) {
  fetch(`https://swapi.dev/api/people/${randomGenerator(maxCharacters)}/`)
    //Create a promoise chain
    .then((response) => response.json())
    //Need to call the json method to unpack the data
    .then((data) => renderCharacter(data));
};
getCharacterData(randomGenerator(maxCharacters));

//LOOK ----> HOMEWORLD CARD
//Render homeworld info
const renderOrigin = function (data) {
  const originHTML = `
    <section class="originCard">
        <strong class="planetName">${data.name}</strong>
        <strong class="population">${data.population}</strong>
        <strong class="terrain">${data.terrain}</strong>
      </section>
      `;
  originCard.insertAdjacentHTML("beforeend", originHTML);
};

//Fetching data from the homeworld endpoint.
const getHomeworldData = function (homeworld) {
  fetch(homeworld)
    .then((response) => response.json())
    .then((data) => renderOrigin(data));
};

//LOOK ----> FILM CARD
//Render film info

//Fetching data from the film endpoint
