const axios = require("axios");

exports.searchContent = async (req, res) => {
  const { term, media } = req.query;

  // Check if the search term and media type are provided
  if (!term) {
    return res.status(400).json({ error: "Search term is required" });
  }

  if (!media) {
    return res.status(400).json({ error: "Media type is required" });
  }

  try {
    // Make a request to the iTunes Search API with the specified term and media type
    const response = await axios.get(`https://itunes.apple.com/search`, {
      params: {
        term,
        media, // Use the media type provided in the request
        limit: 10, // Adjust the limit as needed
      },
    });

    // Format the response data based on the media type
    const formattedResults = response.data.results.map((item) => {
      return {
        trackName:
          item.trackName ||
          item.collectionName ||
          item.trackCensoredName ||
          item.collectionCensoredName,
        albumId: item.collectionId, // Or use another unique identifier if appropriate
        albumName: item.collectionName,
        artistName: item.artistName,
        albumCover: item.artworkUrl100,
        releaseDate: item.releaseDate,
      };
    });

    res.json(formattedResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from iTunes API" });
  }
};
