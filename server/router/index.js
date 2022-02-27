const router = require('express').Router();
const playlists = require('../playlists');

// endpoints
router.get('/missingTracksTemp', playlists.getTempMissingTracks);
router.get('/missingTracks', playlists.getMissingTracks);

module.exports = router;
