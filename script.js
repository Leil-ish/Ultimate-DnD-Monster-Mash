'use strict';

const searchURL = 'https://api.open5e.com/monsters';

function displayResults(responseJson, battleSize) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.results.length & i < battleSize; i++) {
        $('#results-list').append(
            `<p>${responseJson.results[i].name}</p>`
    )}
  $('#results').removeClass('hidden');
};

function rollForMonsters(battleSize, challengeRating) {

  const url = searchURL + '?' + 'challenge_rating=' + challengeRating;

  console.log(url);

  fetch(url)
    .then(response => {

      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, battleSize, challengeRating))
    .catch(err => {
        $('#js-error-message').text(`Critical fail! ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const challengeRating = $('#js-challenge-rating').val();
    const battleSize = $('#js-battle-size').val();
    rollForMonsters(battleSize, challengeRating);
  });
}

$(watchForm);