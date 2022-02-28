const playlists = require('./playlists');
const axios = require('axios');

jest.mock('axios');

describe('Get Missing Tracks', () => {
  const likedTracksResponse = {
    data: {
      items: [{ track: { name: 'Sincerely Yours', artists: ['A.J. McLean'] } }],
    },
  };

  axios.get.mockImplementation((url) => {
    switch (url) {
      case 'https://api.spotify.com/v1/me/tracks':
        return Promise.resolve(likedTracksResponse);
      default:
        return Promise.resolve(likedTracksResponse);
    }
  });

  //axios.get.mockResolvedValue(likedTracksResponse);

  test('should return a map containing the liked tracks', async () => {
    //FIXME: I need to mock a response object before I can test this - use "node-fetch"
    const result = await playlists.getMissingTracks(request, response);

    //expect(result.size).toBe(likedTracksResponse.items.length);
    expect(result.length).toBe(1);
  });
});
