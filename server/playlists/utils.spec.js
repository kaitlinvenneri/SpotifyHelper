const utils = require('./utils');

describe('Put Liked Tracks in Map', () => {
  test('should put all songs in a map and capitalize the song name', () => {
    const song = { name: 'song 1', artists: ['artist1'] };

    const input = [song];

    const result = utils.putLikedTracksInMap(input);
    const artistsFromResult = result.get(song.name.toUpperCase());

    expect(artistsFromResult).toContain(song.artists[0]);
    //expect(artistsFromResult).toBe(song.artists[0]);
  });
});
