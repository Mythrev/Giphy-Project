import { renderTrending } from "../events/navigation-events.js";
import { loadTrendingGifs } from "../requests/request-service.js";

/**
 * Gets the first element matching the selector.
 * @param {string} selector - CSS selector.
 * @returns {Element|null} Matching element or null.
 */
export const q = (selector) => document.querySelector(selector);

/**
 * Gets all elements matching the selector.
 * @param {string} selector - CSS selector.
 * @returns {NodeList} List of matching elements.
 */
export const qs = (selector) => document.querySelectorAll(selector);

/**
 * Highlights the active navigation link.
 * @param {string} page - Current page identifier.
 */
export const setActiveNav = (page) => {
  const navs = qs('a.nav-link');
  Array.from(navs).forEach(element =>
    element.getAttribute('data-page') === page
      ? element.classList.add('active')
      : element.classList.remove('active')
  );
};

/**
 * Shows a notification near the target element.
 * @param {string} message - Notification message.
 * @param {HTMLElement} targetElement - Element to position the notification near.
 * @param {number} [offsetX=10] - Horizontal offset.
 * @param {number} [offsetY=0] - Vertical offset.
 */
export const showNotification = (message, targetElement, offsetX = 10, offsetY = 0) => {
  const notification = document.createElement('div');
  notification.className = 'favorite-notification';
  notification.textContent = message;

  document.body.appendChild(notification);

  const targetRect = targetElement.getBoundingClientRect();
  notification.style.top = `${window.scrollY + targetRect.top + offsetY}px`;
  notification.style.left = `${window.scrollX + targetRect.right + offsetX}px`;

  notification.classList.add('show');

  setTimeout(() => {
    notification.remove();
  }, 2000);
};

/**
 * Changes the page for trending GIFs.
 * @param {number} direction - Page change direction (1 for next, -1 for previous).
 */
let currentPage = 1;

export const changePage = async (direction) => {
  currentPage += direction;
  if (currentPage < 1) currentPage = 1;

  const gifs = await loadTrendingGifs(currentPage, 9);
  await renderTrending(gifs);
};