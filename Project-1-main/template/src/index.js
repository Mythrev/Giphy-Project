import { HOME, TRENDING, FAVORITES, ABOUT, UPLOADED_GIFS } from './common/constants.js';
import { renderTrending, renderHome, renderFavorites, renderUploadedGifs, renderAbout, renderGifDetails } from './events/navigation-events.js';
import { q, showNotification, changePage } from './common/helpers.js';
import { loadPage } from './events/navigation-events.js';
import { renderSearchItems } from './events/search-events.js';
import { uploadGif } from './requests/request-service.js';
import { addFavorite, removeFavorite } from './storage/favorites.js';
import { saveUploadedGif } from './storage/upload-storage.js';
import { removeGif } from './events/navigation-events.js';

/**
 * Initializes event listeners for the application after the DOM has fully loaded.
 * Listens for click events on navigation links, GIF containers, upload buttons, and more.
 */
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', async (e) => {
    // Handle navigation link clicks
    if (e.target.classList.contains('nav-link')) {
      const page = e.target.getAttribute('data-page');
      await loadPage(page); // Load the specified page

      // Handle specific page rendering based on page constants
      switch (page) {
        case HOME:
          await renderHome();
          break;
        case TRENDING:
          await renderTrending();
          break;
        case ABOUT:
          await renderAbout();
          break;
        case FAVORITES:
          await renderFavorites();
          break;
        case UPLOADED_GIFS:
          await renderUploadedGifs();
          break;
      }
    }

    // Handle GIF container click for GIF details
    const gifContainer = e.target.closest('.gif-container');  
    if (gifContainer) {
      const gifId = gifContainer.getAttribute('data-gif-id');
      await renderGifDetails(gifId);
    }

    // Handle favorite addition/removal
    if (e.target.classList.contains('add-favorite')) {
      const gifId = e.target.getAttribute('data-gif-id');
      addFavorite(gifId);
      showNotification('GIF added to favorites!', e.target, 950, 850);
    }

    if (e.target.classList.contains('remove-favorite')) {
      const gifId = e.target.getAttribute('data-gif-id');
      removeFavorite(gifId); // Remove the GIF from favorites
      showNotification('GIF removed from favorites!', e.target, 950, 850);
      loadPage(FAVORITES);
    }

    // Handle GIF removal from uploaded list
    if (e.target.classList.contains('remove-gif')) {
      const gifIndex = parseInt(e.target.getAttribute('data-gif-index'), 10);
      removeGif(gifIndex);
    }

    // Trigger file input for uploading GIFs
    if (e.target.id === 'upload-button' || e.target.closest('#upload-button')) {
      document.getElementById('gif-upload-input').click();
    }

    // Handle pagination button clicks
    if (e.target.id === 'prevPage' || e.target.id === 'nextPage') {
      const direction = e.target.id === 'prevPage' ? -1 : 1;
      await changePage(direction);
    }
  });

  // Handle GIF upload
  document.getElementById('gif-upload-input').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    const uploadButton = document.getElementById('upload-button');
  
    // Validate and upload the GIF file
    if (file && file.type === 'image/gif') {
      try {
        const uploadedGifId = await uploadGif(file);
  
        if (uploadedGifId) {
          saveUploadedGif(uploadedGifId);
          showNotification('GIF uploaded successfully!', uploadButton, 0, 87);
          await renderUploadedGifs();
        }
      } catch (error) {
        showNotification('Failed to upload GIF. Please try again.', uploadButton);
      }
    } else {
      showNotification('Please upload a valid GIF file.', uploadButton);
    }
  });

  // Handle search input
  q('input#search').addEventListener('input', async (e) => {
    await renderSearchItems(e.target.value);
  });

  // Load the home page by default
  loadPage(HOME);
});