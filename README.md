## Product Display Page

This project has been developed to create a dynamic product display page that pulls product data from an API and presents it on a webpage.

## Key Features

- Retrieves product data from a JSON API
- Presents comprehensive product details including title, vendor, description, and price
- Displays product images with a primary image and clickable thumbnails
- Permits the selection of product variants like color and size
- Calculates and displays the discount percentage
- Incorporates an "Add to Cart" functionality

## Technologies Utilized

- HTML
- CSS (assumed, used for styling)
- JavaScript
- Axios (for API requests)

## Setup Instructions

1. Clone this repository to your local machine.
2. Confirm the setup of a web server to serve the files.
3. Open the `index.html` file in a web browser.

## Files Overview

- `index.html`: The primary HTML file structuring the product page.
- `style.js`: Holds all the JavaScript code for data fetching and DOM manipulation.
- `styles.css`: (Not provided in the snippets, but presumed) Contains the styles for the page.

## Functioning Process

1. The `fetchProductData()` function is initialized when the page loads.
2. It retrieves product data from the specified API endpoint.
3. On data retrieval, `displayProductData()` fills the page with product information.
4. User interactions (such as changing color/size and clicking thumbnails) prompt updates in the displayed information.

## API Details

The project fetches data from:
https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json

Ensure you have the necessary permissions to access this API.

## Identified Issues

- The current implementation may encounter CORS (Cross-Origin Resource Sharing) issues when obtaining data from a different domain. In a production environment, this may necessitate server-side configuration or the use of a proxy server.

## Potential Enhancements

- Incorporate error handling for API requests
- Add loading indicators during data retrieval
- Enhance the UI with more engaging features
- Implement a complete shopping cart functionality

## Contribution Guidelines

Contributions aimed at enhancing the project are encouraged. Please adhere to these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request