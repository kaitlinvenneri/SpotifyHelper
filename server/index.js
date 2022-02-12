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

  let missingFromLiked = findDifferences(playlistTracks, likedTracks);

  console.log('number of missing tracks = ' + missingFromLiked.length);

  response.send(missingFromLiked);
});

findDifferences = (playlistTracks, likedTracks) => {
  const tracks = [];
  //const duplicates = [];

  //Put liked tracks into a map
  const likedMap = putLikedTracksInMap(likedTracks);
  console.log('songs in liked map = ' + likedMap.size);

  //Check which tracks are in playlist, but not in the liked songs map
  for (let playlistTrack of playlistTracks) {
    let matchFound = false;

    //Check if liked songs has track with the same name
    if (likedMap.has(playlistTrack.name.toUpperCase())) {
      matchFound = true;
      // //Check if liked songs has track with the same artist (& name)
      // for (let playlistArtist of playlistTrack.artists) {
      //   let likedArtists = likedMap.get(playlistTrack.name.toUpperCase());

      //   //TODO: Optimize this by making the values in likedMap a map of artists?
      //   for (let likedArtist of likedArtists) {
      //     if (likedArtist.toUpperCase() === playlistArtist.toUpperCase()) {
      //       matchFound = true;

      //       //TODO: break or continue here?
      //     }
      //   }
      // }
    }

    if (matchFound == false) {
      tracks.push(playlistTrack);
    }
  }

  return tracks;
};

putLikedTracksInMap = (likedTracks) => {
  //Put liked tracks into a map
  const likedMap = new Map();

  for (let liked of likedTracks) {
    //track name is the key, artist array is the value for each map element

    if (likedMap.has(liked.name.toUpperCase())) {
      //if a track with the same name is already in the map, add artists to artist array
      let tempArtists = likedMap.get(liked.name.toUpperCase());
      tempArtists.push(...liked.artists);

      //console.log(likedMap.get(liked.name));
    } else {
      likedMap.set(liked.name.toUpperCase(), liked.artists);
    }
  }

  return likedMap;
};

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
