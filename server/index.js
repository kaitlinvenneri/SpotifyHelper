const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

//cors needed for React integration since frontend exists on its own server
app.use(cors());

//server reachable at http://localhost:4000
app.listen(4000, () => {
  console.log('Listening on port 4000');
});

//Endpoint for homepage
app.get('/', (req, res) => {
  res.send('homepage');
});

//Endpoint to retrieve saved tracks from Spotify
app.get('/savedtracks', async (req, response) => {
  token =
    'BQABvpS6iYlmgVLSUmj2V08gPd-CW9oS6TkSBr7Wb_hxRqU1OC_R95744IFi308Z96PzYxF7BUYo-_-C7S7OnySbHPiI_Wy_0VBwgsvfPcNH6j1DfHgTVRt2mNivh02nftyIFtTUdGMuw4iTLUGLfOenz9O8Fz9Sh1q5HDOIon0zPZ2-_wB3iTZ0HQM';

  options = {
    headers: {
      accept: 'application/json',
      authorization: 'Bearer ' + token,
    },
  };

  const spotifyResponse = await axios.get(
    'https://api.spotify.com/v1/me/tracks',
    options
  );

  //console.log(spotifyResponse.data.items);

  let savedSongs = [];

  for (let song of spotifyResponse.data.items) {
    let artists = [];
    for (let artist of song.track.artists) {
      let tempArtist = artist.name;
      artists.push(tempArtist);
    }

    let temp = {
      id: song.track.id,
      name: song.track.name,
      artists: artists,
    };

    savedSongs.push(temp);
    //console.log(temp);
  }

  //console.log(savedSongs);

  response.send(savedSongs);
});
