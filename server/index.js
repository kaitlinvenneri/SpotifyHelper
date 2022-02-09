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
    'BQCxUxy8GeyeSivoL6WU-87YRg0k29fv2nPCS9_45fyvu_TkTind5VnCmKK3dGZoXHzCiAeUmxznfp9P7SqbJ20HBIA23wi-2-vS-pqAtVDDc6sIQjlqUNuQP_3n3s0JkWIxR776-Ziwmxe4IQQXrFYDZ6iGVSxPmRoHnZoLfiMPJx1oYtnNCzMvG1o';

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

getAllConfiguredSubgroups = async () => {
  token =
    'BQCCTLyV4fTDPFqbChj5Vsl4UsNynr2I1ISpuh6ADiQzoNRuxC_okNBZppJ6NdYXdXo79JIfjkzM01kHPbP52RvwXtucaAQ51KqPURh5wZQkQ7XT1MwtezAqrmfiYZRHmnt0-QHVofNDu77OIxgnwcWyLk0_3qXg4PH6y-BRorNK9DSlD-gD_3hMdJc';

  options = {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  };

  return await axios
    .get('https://api.spotify.com/v1/me/tracks"', options)
    .then((response) => response.data)
    .catch((err) => null);
};
