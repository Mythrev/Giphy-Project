import { isGifFavorited } from "../storage/favorites.js";

/**
 * Generates the HTML content for a simple GIF representation.
 * @param {Object} gif - The GIF object containing its details.
 * @returns {string} - The HTML string for the simple GIF view.
 */
export const toGifsSimple = (gif) => `
<div class="content">
  <div id="gif" class="gif-container" data-gif-id="${gif.id}">
    <img src="${gif.images.fixed_height.url}" alt="${gif.title}" />
  </div>
</div>`;

/**
 * Generates the HTML content for detailed GIF representation.
 * @param {Object} gif - The GIF object containing its details.
 * @returns {string} - The HTML string for the detailed GIF view.
 */
export const toGifsDetails = (gif) => {
  const isFavorited = isGifFavorited(gif.id); 

  return `
    <div class="gif-detailed">
      <div class="image">
        <img src="${gif.images.fixed_height.url}" alt="${gif.title}" />
      </div>
      <div class="gif-info">
        <h2>Details:</h2>
        <p>Title: ${gif.title}</p>
        <p>Rating: ${gif.rating}</p>
        <p>Upload date: ${gif.import_datetime}</p>
        <p>${gif.source ? `<a href="${gif.source}" target="_blank">Source</a>` : 'Source: Not available'}</p>
        ${isFavorited 
          ? `<button class="remove-favorite" data-gif-id="${gif.id}">Remove GIF from Favorites</button>`
          : `<button class="add-favorite" data-gif-id="${gif.id}">Add GIF to Favorites</button>`}
      </div>
    </div>
  `;
};
