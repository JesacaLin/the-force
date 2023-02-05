"use strict";
//Selecting the DOM elements
const characterCard = document.querySelector(".characterCard");
const originCard = document.querySelector(".originCard");
const filmCard = document.querySelector(".filmCard");
const btn = document.querySelector(".btn");

//fetch from api
const request = fetch("https://swapi.dev/api/people/1/");
console.log(request);
