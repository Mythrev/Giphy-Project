import { toGifsSimple } from "./gifs-views.js";

/**
 * Generates the HTML content for the trending view, loading and displaying trending GIFs.
 * @returns {Promise<string>} - A promise that resolves to the HTML string for the trending view.
 */
export const toTrendingView = async (gifs) => {
  try {
    if (!gifs || gifs.length === 0) {
      return `
        <div id="gifs">
          <p>No trending GIFs available at the moment. Please check back later!</p>
        </div>
      `;
    }

    return `
      <div id="gifs">
        <div class="content">
          ${gifs.map(gif => toGifsSimple(gif)).join('\n')}
        </div>
        <div class="pagination-container">
          <button id="prevPage" class="pagination-btn">Previous</button>
          <button id="nextPage" class="pagination-btn">Next</button>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error loading trending GIFs:', error);
    return '<div>Error loading trending GIFs. Please try again later.</div>'; 
  }
};
