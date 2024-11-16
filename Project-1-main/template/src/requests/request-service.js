import { API_KEY, HTTP } from "../common/constants.js";
import { showNotification } from "../common/helpers.js";

/**
 * Loads all GIFs based on a default search term.
 * @returns {Promise<Object[]>} - An array of GIF objects.
 */
export const loadAllGifs = async () => {
  try {
    const response = await fetch(`${HTTP}search?api_key=${API_KEY}&q=Tom and Jerry&limit=9`);
    const dataGifs = await response.json();
    return dataGifs.data;
  } catch (e) {
    console.log(e);
  }
};

/**
 * Loads trending GIFs.
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [limit=9] - The number of GIFs to fetch per page.
 * @returns {Promise<Object[]>} - An array of trending GIF objects.
 */
export const loadTrendingGifs = async (page = 1, limit = 9) => {
  try {
    const offset = (page - 1) * limit; // Calculate offset
    const response = await fetch(`${HTTP}trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`);
    const dataGifs = await response.json();
    return dataGifs.data; // Return the fetched GIFs data
  } catch (e) {
    console.error("Error fetching trending GIFs:", e);
  }
};

/**
 * Searches for GIFs based on a search term.
 * @param {string} searchTerm - The term to search for GIFs.
 * @returns {Promise<Object[]>} - An array of GIF objects that match the search term.
 */
export const loadSearchGifs = async (searchTerm) => {
  try {
    const query = `Tom and Jerry ${encodeURIComponent(searchTerm)}`;
    const response = await fetch(`${HTTP}search?api_key=${API_KEY}&limit=9&q=${query}`);
    if (!response.ok) {
      throw new Error(`Error fetching GIFs: ${response.statusText}`);
    }
    const dataGifs = await response.json();
    return dataGifs.data;
  } catch (e) {
    console.error('Error occurred while fetching GIFs:', e);
    return [];
  }
};

/**
 * Loads details of a specific GIF by its ID.
 * @param {string} gifId - The ID of the GIF to fetch details for.
 * @returns {Promise<Object|null>} - The details of the requested GIF or null if not found.
 */
export const loadGifsDetails = async (gifId) => {
  try {
    const response = await fetch(`${HTTP}${gifId}?api_key=${API_KEY}`);
    const gifDetails = await response.json();
    return gifDetails.data || null; // Return details or null
  } catch (e) {
    console.log('Error loading GIF details:', e);
    throw e; 
  }
};

/**
 * Uploads a GIF file and stores it in local storage.
 * @param {File} file - The GIF file to upload.
 * @returns {Promise<string>} - The ID of the uploaded GIF.
 */
export async function uploadGif(file) {
  const formData = new FormData();
  formData.append("file", file);

  const uploadUrl = `https://upload.giphy.com/v1/gifs?api_key=${API_KEY}`;

  try {
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(`Failed to upload GIF: ${result.meta.msg || response.statusText}`);
    }

    return result.data.id; // Return the uploaded GIF ID
  } catch (error) {
    console.error("Error uploading GIF:", error);
    throw error; // Rethrow the error for handling by the calling function
  }
}

/**
 * Loads all uploaded GIFs from local storage.
 * @returns {Promise<Object[]>} - An array of uploaded GIF objects.
 */
export const loadUploadedGifs = async () => {
  try {
    const uploadedGifs = JSON.parse(localStorage.getItem('uploadedGifs') || '[]');
    return uploadedGifs; // Return uploaded GIFs
  } catch (error) {
    console.error('Error loading uploaded GIFs:', error);
    return [];
  }
};

/**
 * Loads a random GIF.
 * @returns {Promise<Object|null>} - A random GIF object or null if an error occurs.
 */
export const loadRandomGif = async () => {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}&rating=g`);
    if (!response.ok) {
      throw new Error(`Failed to fetch random GIF: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data; // Return the random GIF data
  } catch (error) {
    console.error('Error fetching random GIF:', error);
    return null; // Return null if there's an error
  }
};
