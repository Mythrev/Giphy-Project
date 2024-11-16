import { CONTAINER_SELECTOR } from '../common/constants.js';
import { loadSearchGifs } from '../requests/request-service.js';
import { toSearchView } from '../views/search-view.js';
import { q } from '../common/helpers.js';

/**
 * Renders search items based on the provided search term.
 * @param {string} searchTerm - The term to search for GIFs.
 * @returns {Promise<void>} 
 */
export const renderSearchItems = async (searchTerm) => {
  try {
    const gifs = await toSearchView(searchTerm);
    q(CONTAINER_SELECTOR).innerHTML = gifs;
  } catch (error) {
    console.error('Error rendering search view', error);
  }
};