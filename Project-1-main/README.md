
# Tom and Jerry GIFs Website

The website is centered around the theme of Tom and Jerry, providing a fun and interactive interface for users to explore and share GIFs.

## Features

### Main Functionalities

#### 1. Display Trending GIFs
- Users can view the top trending GIFs from Giphy. This is implemented using the Giphy trending endpoint, and the number of displayed GIFs can be adjusted via the limit parameter.

#### 2. Search GIFs
- Users can search for GIFs based on a query. The search feature uses the Giphy search endpoint, allowing users to find GIFs that match the search term they provide.

#### 3. Display GIF Details
- Users can view detailed information about a selected GIF, including the username of the person who uploaded it. This is achieved using the get-gif-by-id endpoint from Giphy.

#### 4. Upload GIF
- Users can upload their own GIFs to the platform. The upload functionality is implemented using a POST request to the Giphy API, and users can view their uploaded GIFs on their Giphy channel.

#### 5. Display Uploaded GIFs
- The website stores the IDs of uploaded GIFs in the browser's local storage, and users can see a list of their uploaded GIFs. This is achieved using the get-gifs-by-id endpoint.

#### 5. Favorite GIF
- Users can mark a GIF as their favorite, and it will be displayed in a dedicated section of the website. If a user hasn't chosen a favorite, a random GIF is selected. The favorite GIF ID is stored in local storage, and both the get-gif-by-id and random endpoints are used to implement this functionality.

## General Features
- Native DOM API is used for all DOM manipulations.
- Git is used for version control, and GitHub's issue tracking system is employed for project management.
- ESLint is used to enforce consistent code style.
- Modules are used to keep the project single-responsible and modular.
- Code is fully documented using the JSDoc standard.
- The code follows clean coding principles, with meaningful naming conventions and clear structure.
- Latest ES6+ features are implemented.


## Usage
- Browse trending GIFs.
- Search for specific GIFs.
- View details of any selected GIF.
- Upload your own GIFs.
- Mark a GIF as your favorite and display it in a special section.

Enjoy exploring and sharing fun Tom and Jerry GIFs!
