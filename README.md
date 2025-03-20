# E-Commerce Application with React and Redux

## Project Overview
This project is a React-based e-commerce application designed to demonstrate the integration of Redux for state management, user authentication, and product management. The application features:

- **User Authentication:** Secure login with JWT token storage.
- **Product Display:** Fetch and display products from DummyJSON API with category-wise filters and pagination.
- **Add to Cart:** Products can be added to the cart with item count displayed in the navbar.
- **Checkout Page:** Displays all cart items with a total price for an enhanced user experience.
- **Material-UI Integration:** For a professional and modern UI design.

## Installation and Setup
Follow these steps to set up the project:

1. **Clone the Repository**
```bash
git clone https://github.com/MehulGS/TEMP_PRACTICAL.git
cd TMP_PracticalTest
```

2. **Install Dependencies**
```bash
npm install
```


4. **Start the React Application**
```bash
npm start
```

5. **Start the Authentication Server**
To run the authentication server:
```bash
npm run auth-server
```

## Features Implemented
- **User Authentication:** Login page with error handling for invalid credentials.
- **Product Display:** Product cards with category filters and pagination.
- **Add to Cart:** Item count in the navigation bar with Redux integration.
- **Checkout Page:** Displays all items in the cart with their total cost.

## Tech Stack
- **React** (with functional components and hooks)
- **Redux Toolkit** for state management
- **Material-UI** for UI components and styling
- **DummyJSON API** for data fetching

## Folder Structure
```
/src
  ├── components
  ├── pages
  ├── redux
  ├── App.js
  ├── index.js
```