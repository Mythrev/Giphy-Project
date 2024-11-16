import { toGifsSimple } from "./gifs-views.js";
import { loadAllGifs } from "../requests/request-service.js";

/**
 * Generates the HTML content for the home view, loading and displaying GIFs.
 * @returns {Promise<string>} - A promise that resolves to the HTML string for the home view.
 */
export const toHomeView = async () => {
  try {
    const gifs = await loadAllGifs(); 
    const gifsHtml = gifs.map(gif => toGifsSimple(gif)).join('\n');
    return `
      <div id="gifs">
        <div class="content">
          ${gifsHtml}
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error in toHomeView:', error);
    return '<div>Error loading GIFs</div>'; 
  }
};
