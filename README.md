## BusyBuy React Project

**Key Features:**

- Secure user authentication with Firebase
- Scalable data storage with Firebase Cloud Firestore
- Organized project structure with separate context files
- Efficient state management with the Context API

**Table of Contents**

- [About BusyBuy](#about-busybuy)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running the Application](#running-the-application)

## About BusyBuy

BusyBuy is a modern and feature-rich React application that simplifies the online shopping experience. It empowers users to view all the products, filter products, add products to cart, place orders with ease.Firebase provides secure user authentication and a scalable NoSQL database (Cloud Firestore) to manage your application data effectively.

**Built with:**

- React
- Firebase (for authentication and storing data)

## Getting Started

### Prerequisites

- Node.js (version 14 or later) and npm (or yarn) installed on your system. You can download them from [https://nodejs.org/en/download](https://nodejs.org/en/download)

### Installation

1. Clone the repository:

```bash
git clone []()
```

2. Navigate to the project directory:

```bash
cd busy-buy
```

3. Install dependencies:

```bash
npm install
```

## Project Structure

This project adheres to a well-organized structure for better maintainability:

- src: Houses the core React application code.
- components: Reusable React components for building UI elements.
- pages: Individual application pages with specific functionalities, including login, signup, product listings, cart, orders and 404Page.
- context: Contains context files for managing application state:
  - Authentication.context.js: User authentication state and functions (login, signup, logout).
  - Product.context.js: Product data, filtering, and manipulation.
  - Cart.context.js: User cart items, quantities, and updates.
  - Order.context.js: Order details, history, and management.
- firebaseInit.js: Initializes the Firebase app using your project configuration.
- AuthContext.js: Provides a context for user authentication state and functions (login, signup, logout).
- App.js: The main application entry point, responsible for initializing components, routing, and authentication.
- public: Contains static assets like images, fonts, and favicons used throughout the app.
- package.json: Manages project dependencies, scripts, and metadata.

## Running the Application

1. Start the development server:

```bash
npm start
```

This will launch the development server and open BusyBuy in your default browser, usually at http://localhost:3000 (the port might vary).
