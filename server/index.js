const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const fs = require('fs');
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

  //console.log('number of songs returned = ' + savedSongs.length);
  //console.log(savedSongs);

  response.send(savedSongs);
});

getTracks = async (offset, limit) => {
  token = config.token;

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
      //id: song.track.id,
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

//Endpoint to retrieve local tracks
app.get('/localtracks', (req, response) => {
  // try {
  //   const data = fs.readFileSync(config.localFilePath, 'utf8');
  //   console.log(data);
  // } catch (err) {
  //   console.error(err);
  // }

  fs.readdir(config.localFilePath, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      // Do whatever you want to do with the file
      console.log(file);
    });
  });

  response.send('hey');
});
