import { ABOUT, TRENDING, CONTAINER_SELECTOR, FAVORITES, HOME, UPLOADED_GIFS, HTTP, API_KEY } from '../common/constants.js';
import { loadAllGifs, loadSearchGifs, loadTrendingGifs, loadRandomGif, loadGifsDetails } from '../requests/request-service.js';
import { toTrendingView } from '../views/trending-view.js';
import { toHomeView } from '../views/home-view.js';
import { q, setActiveNav } from '../common/helpers.js';
import { toSearchView } from '../views/search-view.js';
import { toGifsDetails, toGifsSimple } from '../views/gifs-views.js';
import { toAboutView } from '../views/about-view.js';
import { toFavoritesView } from '../views/favorites-view.js';
import { toUploadedView } from '../views/uploaded-view.js';
import { getFavorites } from '../storage/favorites.js';
import { setupFavoriteButtons } from './favorites-events.js';

/**
 * Load the specified page and render the corresponding view.
 * 
 * @param {string} [page=''] - The name of the page to load.
 * @returns {Promise<null>} - Resolves to null.
 */
export const loadPage = async (page = '') => {
  switch (page) {
    case HOME:
      setActiveNav(HOME);
      return await renderHome();

    case TRENDING:
      setActiveNav(TRENDING);
      return await renderTrending();

    case FAVORITES:
      setActiveNav(FAVORITES);
      return await renderFavorites();

    case ABOUT:
      setActiveNav(ABOUT);
      return await renderAbout();

    case UPLOADED_GIFS:
      setActiveNav(UPLOADED_GIFS);
      return await renderUploadedGifs();

    default:
      return null;
  }
};

/**
 * Render the home view with all GIFs.
 * 
 * @returns {Promise<void>} - Resolves when rendering is complete.
 */
export const renderHome = async () => {
  try {
    const gifs = await loadAllGifs();
    q(CONTAINER_SELECTOR).innerHTML = await toHomeView(gifs);
  } catch (error) {
    console.error('Error rendering home view:', error);
    q(CONTAINER_SELECTOR).innerHTML = '<div>Error loading GIFs</div>';
  }
};

/**
 * Render the trending GIFs view.
 * 
 * @param {Array} [gifs=null] - Optional array of GIFs to display.
 * @returns {Promise<void>} - Resolves when rendering is complete.
 */
export const renderTrending = async (gifs = null) => {
  try {
    let currentPage = 1;
    const trendingGifs = gifs || await loadTrendingGifs(currentPage, 9);
    q(CONTAINER_SELECTOR).innerHTML = await toTrendingView(trendingGifs);
  } catch (error) {
    console.error('Error rendering trending view:', error);
    q(CONTAINER_SELECTOR).innerHTML = '<div>Error loading trending GIFs</div>';
  }
};

/**
 * Render search results based on the provided search term.
 * 
 * @param {string} searchTerm - The term to search for GIFs.
 * @returns {Promise<void>} - Resolves when rendering is complete.
 */
export const renderSearchItems = async (searchTerm) => {
  try {
    const searchGifs = await loadSearchGifs(searchTerm);
    q(CONTAINER_SELECTOR).innerHTML = await toSearchView(searchGifs);
  } catch (error) {
    console.error('Error rendering search view:', error);
    q(CONTAINER_SELECTOR).innerHTML = '<div>Error loading search GIFs</div>';
  }
};

/**
 * Render the details of a specific GIF based on its ID.
 * 
 * @param {string|null} [gifId=null] - The ID of the GIF to display.
 * @returns {Promise<void>} - Resolves when rendering is complete.
 */
export const renderGifDetails = async (gifId = null) => {
  try {
    if (!gifId) {
      q(CONTAINER_SELECTOR).innerHTML = '<div>No GIF selected or GIF ID is invalid.</div>';
      return;
    }

    const gifDetails = await loadGifsDetails(gifId);

    if (!gifDetails) {
      q(CONTAINER_SELECTOR).innerHTML = '<div>No details available for this GIF.</div>';
      return;
    }

    const gifHtml = toGifsDetails(gifDetails);
    q(CONTAINER_SELECTOR).innerHTML = gifHtml;

    setupFavoriteButtons();
  } catch (error) {
    q(CONTAINER_SELECTOR).innerHTML = '<div>Error loading GIF details</div>';
  }
};

/**
 * Render the favorites view with the user's favorite GIFs.
 * 
 * @returns {Promise<void>} - Resolves when rendering is complete.
 */
export const renderFavorites = async () => {
  try {
    const favoriteIds = getFavorites();
    const favoriteGifs = await Promise.all(
      favoriteIds.map(id => loadGifsDetails(id))
    );

    if (favoriteGifs.length === 0 || !favoriteGifs.some(gif => gif)) {
      // Fetch and display a random GIF if no favorites are available
      const randomGif = await loadRandomGif();
      q(CONTAINER_SELECTOR).innerHTML = `
        <div class="gif-container">${toGifsSimple(randomGif)}</div>
      `;
    } else {
      q(CONTAINER_SELECTOR).innerHTML = await toFavoritesView(favoriteGifs);
      setupFavoriteButtons();
    }
  } catch (error) {
    console.error('Error rendering favorites view:', error);
    q(CONTAINER_SELECTOR).innerHTML = '<div>Error loading favorite GIFs</div>';
  }
};

/**
 * Render the about view.
 * 
 * @returns {Promise<void>} - Resolves when rendering is complete.
 */
export const renderAbout = async () => {
  q(CONTAINER_SELECTOR).innerHTML = await toAboutView();
};

/**
 * Render the uploaded GIFs from local storage.
 * 
 * @returns {Promise<void>} - Resolves when rendering is complete.
 */
export async function renderUploadedGifs() {
  const uploadedGifIds = JSON.parse(localStorage.getItem('uploadedGifIds')) || [];

  if (uploadedGifIds.length > 0) {
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs?api_key=${API_KEY}&ids=${uploadedGifIds.join(',')}`);
      
      if (!response.ok) {
        console.error('Failed to fetch GIFs:', response.status, response.statusText);
        return;
      }

      const data = await response.json();
      const gifs = data.data || [];

      if (gifs.length === 0) {
        const randomGif = await loadRandomGif();
        q(CONTAINER_SELECTOR).innerHTML = `
            <div class="gif-container">
                ${toGifsSimple(randomGif)}
            </div>
        `;
      } else {
        const uploadedGifsHtml = toUploadedView(gifs);
        q(CONTAINER_SELECTOR).innerHTML = uploadedGifsHtml;
      }
    } catch (error) {
      console.error('Error loading uploaded GIFs:', error);
      q(CONTAINER_SELECTOR).innerHTML = '<div>Error loading uploaded GIFs.</div>';
    }
  } else {
    const randomGif = await loadRandomGif();
    q(CONTAINER_SELECTOR).innerHTML = `
        <div class="gif-container">
            ${toGifsSimple(randomGif)}
        </div>
    `;
  }
}

/**
 * Remove a GIF from local storage and re-render the uploaded GIFs.
 * 
 * @param {number} index - The index of the GIF to remove.
 * @returns {void} - No return value.
 */
export const removeGif = (index) => {
  const uploadedGifIds = JSON.parse(localStorage.getItem('uploadedGifIds') || '[]');

  if (index >= 0 && index < uploadedGifIds.length) {
    uploadedGifIds.splice(index, 1); // Remove the GIF at the specified index
  }

  localStorage.setItem('uploadedGifIds', JSON.stringify(uploadedGifIds));
  renderUploadedGifs(); // Re-render the uploaded GIFs after removal
};
