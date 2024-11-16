/**
 * Generates the HTML content for the About view.
 * @returns {string} - The HTML string for the About page.
 */
export const toAboutView = () => `
  <div id="about">
    <div class="content">
      <h1 class="title">The wild world of Tom & Jerry,<br> where cartoon chaos and legendary <br>cat-and-mouse antics collide!</h1>
      <div class="about-container">
        <img src="../template/images/tom-and-jerry-about-image.webp" id="about-image" alt="Tom and Jerry Image" />
        <div class="about-details">
          <h2>Authors: <br><br> Ivan Mitrev <p class="links"><a href="https://github.com/Mythrev" target="_blank">Ivan's GitHub account</a></p>
           <br> Dalia Bedrosyan <p class="links"><a href="https://github.com/daliaBedrosyan" target="_blank">Dalia's GitHub account</a></p></h2>
          <h2>Date: 2024</h2>
        </div>
    </div>
  </div>
`;
