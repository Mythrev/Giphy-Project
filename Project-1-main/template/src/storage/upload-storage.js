const UPLOADED_GIFS_KEY = 'uploadedGifs';

/**
 * Saves a uploaded GIF URL to local storage.
 * @param {string} gifUrl - The URL of the GIF to save.
 */
export function saveUploadedGif(gifId) {
  let uploadedGifIds = JSON.parse(localStorage.getItem('uploadedGifIds')) || [];
  uploadedGifIds.push(gifId); // Add the new GIF ID to the array
  localStorage.setItem('uploadedGifIds', JSON.stringify(uploadedGifIds)); // Save the updated list to local storage
}

/**
 * Retrieves uploaded GIFs from local storage.
 * @returns {string[]} The list of uploaded GIF URLs.
 */
export function getUploadedGifsFromStorage() {
  const storedGifs = localStorage.getItem(UPLOADED_GIFS_KEY);
  return storedGifs ? JSON.parse(storedGifs) : [];
}
