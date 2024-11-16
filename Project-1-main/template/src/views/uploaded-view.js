/**
 * Generates HTML for displaying uploaded GIFs.
 * 
 * @param {Object[]} uploadedGifs - An array of uploaded GIF objects.
 * @returns {string} - The HTML string representing the uploaded GIFs view.
 */
export const toUploadedView = (uploadedGifs) => {
  let html = `
    <div class="content-upload">
      <div class="uploaded-gif-container">
  `;

  uploadedGifs.forEach((gif, index) => {
    if (gif.images && gif.images.fixed_height) {
      html += `
        <div class="uploaded-gif-item">
          <img src="${gif.images.fixed_height.url}" alt="${gif.title}" class="uploaded-gif">
          <button class="remove-gif" data-gif-index="${index}">Remove</button>
        </div>
      `;
    }
  });

  html += '</div></div>'; 
  return html;
};
