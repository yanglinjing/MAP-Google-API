const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = 'BxPEUWatE4QCiFwCcRdAKx6-CxYy_vZMnT5fgcBZxCdN2BofkURH9Y8ooKyelJ3YCoSUVrG2ydj7T-QnFDHHVAJwvfkpgVrDSAk57YLnO2jBJF5TmC-Q7TbTkivpWnYx';

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});
