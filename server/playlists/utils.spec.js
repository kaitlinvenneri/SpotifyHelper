const utils = require('./utils');

describe('Put Liked Tracks in Map', () => {
  //FIXME: Use "rewire" to access unexported function (putLikedTracksInMap)

  test('should put all songs in a map and capitalize the song name', () => {
    const song = { name: 'song 1', artists: ['artist1'] };

    const input = [song];

    const result = utils.putLikedTracksInMap(input);
    const artistsFromResult = result.get(song.name.toUpperCase());

    expect(result.size).toBe(input.length);
    expect(artistsFromResult).toContain(song.artists[0]);
  });

  test('should put songs with the same name into the map as a single song with multiple artists', () => {
    const song1 = { name: 'song 1', artists: ['artist1'] };
    const song2 = { name: 'song 1', artists: ['artist2'] };

    const input = [song1, song2];

    const result = utils.putLikedTracksInMap(input);
    const artistsFromResult = result.get(song1.name.toUpperCase());

    expect(result.size).toBe(1);
    expect(artistsFromResult).toContain(song1.artists[0]);
  });

  test('should put songs with different names into the map as a multiple songs', () => {
    const song1 = { name: 'song 1', artists: ['artist1'] };
    const song2 = { name: 'song 2', artists: ['artist2'] };

    const input = [song1, song2];

    const result = utils.putLikedTracksInMap(input);
    const artistsFromResult = result.get(song1.name.toUpperCase());

    expect(result.size).toBe(input.length);
    expect(artistsFromResult).toContain(song1.artists[0]);
  });

  test('should return an empty map when given an empty array', () => {
    const input = [];

    const result = utils.putLikedTracksInMap(input);

    expect(result.size).toBe(input.length);
  });
});
