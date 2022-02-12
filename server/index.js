const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const config = require('./config');

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

//Endpoint to find tracks that are local and not in likes on Spotify
app.get('/findMissingTracks', async (req, response) => {
  let likedTracks = await getTracksFromSpotify(
    config.likedToken,
    'https://api.spotify.com/v1/me/tracks'
  );

  let playlistId = '50QcXkIWmD0JUVqTCMyTKe';

  let playlistEndpoint =
    'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks';

  let playlistTracks = await getTracksFromSpotify(
    config.playlistToken,
    playlistEndpoint
  );

  //console.log(likedTracks);
  console.log('number of liked tracks = ' + likedTracks.length);

  //console.log(playlistTracks);
  console.log('number of playlist tracks = ' + playlistTracks.length);

  response.send('tempResponse');
});

getTracksFromSpotify = async (token, endpoint) => {
  let tracks = [];

  let limit = 50;
  let offset = 0;

  let numRetrieved = limit;

  //retrieve tracks in intervals
  while (numRetrieved == limit) {
    const tracksFromSpotify = await getTracksInIntervals(
      token,
      endpoint,
      offset,
      limit
    );

    //using spreading to put all elements from spotofy into the tracks array
    tracks.push(...tracksFromSpotify);
    numRetrieved = tracksFromSpotify.length;
    offset = offset + limit;
  }

  //console.log('number of tracks = ' + tracks.length);
  //console.log(tracks);

  return tracks;
};

getTracksInIntervals = async (token, endpoint, offset, limit) => {
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

  const spotifyResponse = await axios.get(endpoint, options);

  //console.log(spotifyResponse.data.items);

  let tracks = [];

  for (let item of spotifyResponse.data.items) {
    let artists = [];
    for (let artist of item.track.artists) {
      let tempArtist = artist.name;
      artists.push(tempArtist);
    }

    let temp = {
      name: item.track.name,
      artists: artists,
    };

    //console.log(item.track.is_local);

    tracks.push(temp);
    //console.log(temp);
  }

  //console.log('number of tracks = ' + tracks.length);
  //console.log(tracks);

  return tracks;
};
