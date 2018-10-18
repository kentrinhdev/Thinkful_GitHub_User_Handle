'use strict';

function getEndpoint(searchTerm) {
  let a = 'https://api.github.com/users/';
  var s = searchTerm;
  let z = "/repos";
  const searchURL = a + s + z;

  console.log('searchURL: ', searchURL);
  return searchURL;
}

function getUserHandle(url) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      // Empty out the previous results
      $('#results-list').empty();
      // Hide the results section  
      $('#results').addClass('hidden');

      $('#js-error-message').text(`Oh No!: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();

    const searchTerm = $('#js-search-term').val();
    const url = getEndpoint(searchTerm);
    getUserHandle(url);
  });
}

function displayResults(responseJson) {
  // Empty out the previous results
  $('#results-list').empty();
  $('#js-error-message').empty();
  
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <p><a href="${responseJson[i].url}">${responseJson[i].url}</a></p>
      </li>`
    )};

  // Show the results section  
  $('#results').removeClass('hidden');
};

$(watchForm);