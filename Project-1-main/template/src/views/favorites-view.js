import { toGifsSimple } from './gifs-views.js';

/**
 * Generates the HTML content for the Favorites view.
 * @param {Array} gifs - An array of favorite GIF objects.
 * @returns {string} - The HTML string for the Favorites page.
 */
export const toFavoritesView = (gifs) => `
  <div id="favorites">
    <div class="content">
      ${gifs.length > 0 ? gifs.map(toGifsSimple).join('') : '<p>No favorite GIFs yet. Add some to see them here!</p>'}
    </div>
  </div>
`;

//testing