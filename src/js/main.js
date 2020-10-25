'use strict';

// Class selector
function selectClass(className) {
  return document.querySelector(className);
}

// Console log function
function feedback(element) {
  return console.log(element);
}

const button = selectClass('.js-button');
const input = selectClass('.js-search-field');
const resultsTitle = selectClass('.js-results__title');

let searchResults = [];

function getSeriesData() {
  const inputValue = input.value;
  fetch('//api.tvmaze.com/search/shows?q=' + inputValue)
    .then((response) => response.json())
    .then((data) => {
      if (data.length === 0) {
        resultsTitle.innerHTML = 'No se ha encontrado ninguna serie con este nombre';
      } else {
        for (let i = 0; i < data.length; i++) {
          let series = {};
          series.name = data[i].show.name;
          if (data[i].show.image === null) {
            series.imageSource = 'https://via.placeholder.com/210x295/ffffff/666666/?%20text=TV';
          } else if (data[i].show.image.medium === null) {
            series.imageSource = data[i].show.image.original;
          } else {
            series.imageSource = data[i].show.image.medium;
          }
          searchResults.push(series);
        }
      }
      feedback(searchResults);
      visualise();
    });
}

function visualise() {
  let resultsContainer = selectClass('.js-results__list');
  for (let movie of searchResults) {
    const listItem = document.createElement('li');
    const image = document.createElement('img');
    const seriesTitle = document.createElement('h3');
    listItem.setAttribute('class', 'js-results__list--item');
    resultsContainer.appendChild(listItem);
    image.setAttribute('class', 'results__list--item__img js-results__list--item__img');
    image.src = movie.imageSource;
    seriesTitle.setAttribute('class', 'results__list--item__title js-results__list--item__title');
    seriesTitle.innerHTML = movie.name; // createTextNode da un error
    listItem.append(image, seriesTitle); // More than one DOM node
    resultsContainer.appendChild(listItem);
    feedback(resultsContainer);
  }
}

function onClick() {
  getSeriesData();
}


// Click event
button.addEventListener('click', onClick);