import { addFavorite, removeFavorite } from '../storage/favorites.js';
import { showNotification } from '../common/helpers.js';

/**
 * Initializes event listeners for "Add to Favorites" and "Remove from Favorites" buttons.
 * This function handles the logic for adding and removing GIFs from the favorites list.
 */
export const setupFavoriteButtons = () => {
  const addFavoriteButtons = document.querySelectorAll('.add-favorite');
  const removeFavoriteButtons = document.querySelectorAll('.remove-favorite');

  /**
   * Adds a GIF to favorites and updates button visibility.
   * @param {HTMLElement} button - The "Add to Favorites" button element.
   */
  addFavoriteButtons.forEach(button => {
    const gifId = button.dataset.gifId;
    button.addEventListener('click', () => {
      addFavorite(gifId);
      button.style.display = 'none';
      const removeButton = button.parentElement.querySelector('.remove-favorite');
      if (removeButton) removeButton.style.display = 'inline-block';
    });
  });

  /**
   * Removes a GIF from favorites and updates button visibility.
   * @param {HTMLElement} button - The "Remove from Favorites" button element.
   */
  removeFavoriteButtons.forEach(button => {
    const gifId = button.dataset.gifId;
    button.addEventListener('click', () => {
      removeFavorite(gifId);
      button.style.display = 'none';
      const addButton = button.parentElement.querySelector('.add-favorite');
      if (addButton) addButton.style.display = 'inline-block';
    });
  });
};