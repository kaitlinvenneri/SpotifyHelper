const axios = require('axios');
const fs = require('fs');
const path = require('path');
const config = require('../config/tokens');
const utils = require('./utils');

//Endpoint to get temp missing track data for frontend development
exports.getTempMissingTracks = async (req, response) => {
  let rawdata = fs.readFileSync(
    path.resolve(__dirname, './data/missingSongs.json')
  );
  let tempData = JSON.parse(rawdata);

  //console.log(tempData);

  response.send(tempData);
};

//Endpoint to find tracks that are local and not in likes on Spotify
exports.getMissingTracks = async (req, response) => {
  let likedTracks = await utils.getTracksFromSpotify(
    config.likedToken,
    'https://api.spotify.com/v1/me/tracks'
  );

  let playlistId = '50QcXkIWmD0JUVqTCMyTKe';

  let playlistEndpoint =
    'https://api.spotify.com/v1/playlists/' + playlistId + '/tracks';

  let playlistTracks = await utils.getTracksFromSpotify(
    config.playlistToken,
    playlistEndpoint
  );

  //console.log(likedTracks);
  console.log('number of liked tracks = ' + likedTracks.length);

  //console.log(playlistTracks);
  console.log('number of playlist tracks = ' + playlistTracks.length);

  let missingFromLiked = utils.findDifferences(playlistTracks, likedTracks);

  console.log('number of missing tracks = ' + missingFromLiked.length);

  response.send(missingFromLiked);
};
