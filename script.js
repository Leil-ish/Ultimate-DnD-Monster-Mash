'use strict';

const searchURL = 'https://api.open5e.com/monsters';

function displayResults(responseJson, battleSize) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.results.length & i < battleSize; i++) {
        $('#results-list').append(
            `<ul>
                <li><h3>Name: ${responseJson.results[i].name}</h3></li>
                <li><p>Type: ${responseJson.results[i].type}</p></li>
                <li><p>Size: ${responseJson.results[i].size}</p></li>
                <li><p>Armor Class: ${responseJson.results[i].armor_class}</p></li>
                <li><p>Hit Points: ${responseJson.results[i].hit_points}</p></li>
                <li><p>Damage Vulnerabilities: ${responseJson.results[i].damage_vulnerabilities}</p></li>
                <li><p>Damage Resistances: ${responseJson.results[i].damage_resistances}</p></li>
                <li><p>Damage Immunities: ${responseJson.results[i].damage_immunities}</p></li>
                <li><p>Condition Immunities: ${responseJson.results[i].condition_immunities}</p></li>
                <li><p>Actions: ${responseJson.results[i].actions.name}</p></li>`
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