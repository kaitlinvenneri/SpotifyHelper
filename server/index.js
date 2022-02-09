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
  let savedSongs = [];

  let limit = 50;
  let offset = 0;

  let numSongs = limit;

  //retrieve songs in intervals
  while (numSongs == limit) {
    const songs = await getTracks(offset, limit);

    //using spreading to put all elements from songs into the savedSongs array
    savedSongs.push(...songs);
    numSongs = songs.length;
    offset = offset + limit;
  }

  console.log('number of songs returned = ' + savedSongs.length);
  //console.log(savedSongs);

  response.send(savedSongs);
});

getTracks = async (offset, limit) => {
  token =
    'BQABvpS6iYlmgVLSUmj2V08gPd-CW9oS6TkSBr7Wb_hxRqU1OC_R95744IFi308Z96PzYxF7BUYo-_-C7S7OnySbHPiI_Wy_0VBwgsvfPcNH6j1DfHgTVRt2mNivh02nftyIFtTUdGMuw4iTLUGLfOenz9O8Fz9Sh1q5HDOIon0zPZ2-_wB3iTZ0HQM';

  options = {
    headers: {
      accept: 'application/json',
      authorization: 'Bearer ' + token,
    },
    params: {
      limit: limit,
      offset: offset,
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

    //console.log(song.track.is_local);

    savedSongs.push(temp);
    //console.log(temp);
  }

  //console.log('number of songs returned = ' + savedSongs.length);
  //console.log(savedSongs);

  return savedSongs;
};
