const router = require('express').Router();
const playlists = require('../playlists');

//const router = new Router();

// endpoints
router.get('/missingTracksTemp', playlists.getTempMissingTracks);

module.exports = router;
