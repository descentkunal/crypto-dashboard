# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Cryptocurrency Dashboard

## Overview

This project is a web application that displays near real-time cryptocurrency data fetched from the CoinCap API. Users can view a list of cryptocurrencies, add them to favorites, and view detailed information about each cryptocurrency.

## Features

1. **Table Page (Main Page)**

   - Fetches real-time cryptocurrency data from the CoinCap API.
   - Displays data in a table with columns for the symbol, name, price, and market cap in USD.
   - Refreshes data every 10 seconds.
   - Supports pagination with 10 items per page.
   - Allows sorting by symbol, name, price, and market cap with persistent sorting even when data is refreshed.
   - Clicking on a cryptocurrency name navigates to the details page for that cryptocurrency.
   - Implements a "favorite" toggle button for each cryptocurrency, storing the favorite list locally using local storage to persist across sessions.

2. **Details Page**

   - Fetches and displays detailed information about the selected cryptocurrency using dynamic route parameters.
   - Displays data columns for symbol, name, price, and market cap.

3. **Testing**
   - Jest testing framework setup with test cases to verify functionality.

## Setup and Installation

### Prerequisites

- Node.js and npm should be installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/crypto-dashboard.git
   cd crypto-dashboard

   ```

2. Install dependencies:
   npm install

3. Start the development server:
   npm start

4. Open your browser and navigate to http://localhost:3000 to view the application.
   crypto-dashboard/
   ├── public/
   │ ├── index.html
   │ └── ...
   ├── src/
   │ ├── components/
   │ │ ├── TableComponent.tsx
   │ │ └── TableComponent.scss
   │ ├── hooks/
   │ │ └── useCryptoPrices.ts
   │ ├── pages/
   │ │ ├── TablePage.tsx
   │ │ ├── DetailsPage.tsx
   │ │ └── ...
   │ ├── utils/
   │ │ └── api.ts
   │ ├── types/
   │ │ └── index.ts
   │ ├── **tests**/
   │ │ ├── TableComponent.test.tsx
   │ │ └── ...
   │ ├── App.tsx
   │ ├── index.tsx
   │ └── ...
   ├── package.json
   ├── README.md
   └── ...

5. API Usage

   Fetch Cryptocurrency Data
   URL: https://api.coincap.io/v2/assets
   Method: GET
   Response: JSON array of cryptocurrency data.

   Fetch Cryptocurrency Details
   URL: https://api.coincap.io/v2/assets/<id>
   Method: GET
   Response: JSON object of cryptocurrency details.

6. Testing

Running Tests

To run tests, use the following command:
npm test

Test Cases

TableComponent
Renders the header text correctly.
Displays the loading indicator when loading.
Renders table rows with correct data.
Does not show pagination when itemsPerPage is 1.
Does not highlight the name on hover when highlightOnHover is false.

Additional Information

Local Storage
Favorites are stored in the local storage to ensure persistence across page reloads.

Styling
The project uses SCSS for styling with BEM methodology for better maintainability.

Improvements and Bonus Features
Allowed sorting by symbol, name, price, and market cap with persistent sorting even when data is refreshed.
Added a header with navigation controls for navigation like home and back.
Added a select component for current active currency.
Added a loading state when api is loading.
Added a custom error page when wrong routing is received. 
Used scss following BEM methodology
The application is delpoyed and is live on https://descentkunal.github.io/crypto-dashboard/

GITHUB
Repository: https://github.com/descentkunal/crypto-dashboard
Live Link : https://descentkunal.github.io/crypto-dashboard/

GIT Branches
master: The main brnach 
gh-pages: same as master deployed on github pages

Conclusion

This cryptocurrency dashboard project is designed to provide real-time data with a user-friendly interface. Feel free to explore the codebase, make improvements, and reach out with any questions or suggestions.
