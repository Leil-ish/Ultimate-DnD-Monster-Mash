'use strict';

const searchURL = 'https://api.open5e.com/monsters';

function displayResults(responseJson, battleSize) {
  console.log(responseJson);
  $('#results-list').empty();
  for (let i = 0; i < responseJson.results.length & i < battleSize; i++) {
        $('#results-list').append(
            `<button class="collapsible">&#10133; ${responseJson.results[i].name}</button>
                <div class="content">
                    <ul>
                        <li><p>Type: ${responseJson.results[i].type}</p></li>
                        <li><p>Size: ${responseJson.results[i].size}</p></li>
                        <li><p>Armor Class: ${responseJson.results[i].armor_class}</p></li>
                        <li><p>Hit Points: ${responseJson.results[i].hit_points}</p></li>
                        <li><p>Damage Vulnerabilities: ${responseJson.results[i].damage_vulnerabilities}</p></li>
                        <li><p>Damage Resistances: ${responseJson.results[i].damage_resistances}</p></li>
                        <li><p>Damage Immunities: ${responseJson.results[i].damage_immunities}</p></li>
                        <li><p>Condition Immunities: ${responseJson.results[i].condition_immunities}</p></li><br>
                        <p><a href = "https://beta.open5e.com/monsters/${responseJson.results[i].slug}/" 
                        target="_blank" id="statsLink">Full Stats & Actions</a></p>
                    </ul>
                </div>`
    )}
  $('#results').removeClass('hidden');

  let coll = document.getElementsByClassName("collapsible");
  let i;

  for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let content = this.nextElementSibling;
      if (content.style.display === "block") {
      content.style.display = "none";
      } else {
      content.style.display = "block";
      }
  });
  }
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
        $('#js-results').text(`Critical fail! ${err.message}`);
    });
}

function validateChallengeRating() {
    let x;
    x = document.getElementById("js-challenge-rating").value;
    if (x < 0 || x > 30) {
        $('#results').empty();
        $('#js-main').html(
        `<h2>Challenge rating needs to be 0, 1/8, 1/4, 1/2, or an integer from 1 to 30.</h2><br>
        <form>
        <input type="submit" class="button" value="Roll again?"></input>
        </form>`
        )
    }
    else {
        const challengeRating = $('#js-challenge-rating').val();
        const battleSize = $('#js-battle-size').val();
        rollForMonsters(battleSize, challengeRating);
    }
}

function validateBattleSize() {
    let y;
    y = document.getElementById("js-battle-size").value;
    if (isNaN(y) || y < 2 || y > 10) {
        $('#results').empty();
        $('#js-main').html(
            `<h2>Battle size needs to be an integer from 2 to 10.</h2><br>
            <form>
            <input type="submit" class="button" value="Roll again?"></input>
            </form>`
        )
    }
    else {
        validateChallengeRating();
    }
}



function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    validateBattleSize();
  });
}

$(watchForm);