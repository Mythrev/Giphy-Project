import { toGifsSimple } from "./gifs-views.js";
import { loadSearchGifs } from "../requests/request-service.js";

/**
 * Generates the HTML content for the search view, loading and displaying GIFs based on the search term.
 * @param {string} searchTerm - The term to search for GIFs.
 * @returns {Promise<string>} - A promise that resolves to the HTML string for the search view.
 */
export const toSearchView = async (searchTerm) => {
    try {
        const gifs = await loadSearchGifs(searchTerm);
        const gifsHtml = gifs.map(gif => toGifsSimple(gif)).join('\n');

        if (gifs.length === 0) {
            return `
            <div id="gifs">
                <h1>No results found for: "${searchTerm}"</h1>
            </div>
            `;
        }

        return `
        <div id="gifs">
            <h1>Search Results for: ${searchTerm}</h1>
            <div class="content">
                ${gifsHtml}
            </div>
        </div>
        `;
    } catch (error) {
        console.error('Error in searchView', error);
        return '<div>Error loading search results. Please try again later.</div>'; 
    }
};
