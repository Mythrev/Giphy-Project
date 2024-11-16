let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

/**
 * Adds a GIF to the favorites list.
 * @param {string} gifId - The ID of the GIF to add.
 */
export const addFavorite = (gifId) => {
  if (!favorites.includes(gifId)) {
    favorites.push(gifId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

/**
 * Removes a GIF from the favorites list.
 * @param {string} gifId - The ID of the GIF to remove.
 */
export const removeFavorite = (gifId) => {
  favorites = favorites.filter(id => id !== gifId);
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

/**
 * Retrieves the list of favorite GIF IDs.
 * @returns {string[]} The list of favorite GIF IDs.
 */
export const getFavorites = () => {
  return [...favorites];
};

export const isGifFavorited = (gifId) => {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  return favorites.includes(gifId);
};


//testing