# ecommerce-mern

This repository contains the code for an eCommerce web application built using Bootstrap, SCSS, React, MongoDB, Express, and Node.js. The application consists of both client-side and server-side components, with separate dashboards for users and administrators.

## Features

- User Dashboard:
  - Order details: Users can view their order history and track the status of their orders.
  - Cart functionality: Users can add items to their cart, update quantities, and proceed to checkout.
  - Account management: Users can manage their profile information and update their personal details.

- Admin Dashboard:
  - Order management: Administrators can view and manage all orders placed by users.
  - Product management: Administrators can add, edit, and delete products available for sale.
  - User management: Administrators can manage user accounts, including creating new users and modifying existing ones.
  - Category management: Administrators can manage product categories, including creating new categories and modifying existing ones.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/UsmanMERN/ecommerce-mern
   ```

2. Navigate to the project directory:

   ```
   cd ecommerce-mern
   ```

3. Install the dependencies:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm start
   ```

   The client-side React application will be accessible at `http://localhost:3000`, and the server will run on `http://localhost:8000`.

5. Configure MongoDB:

   - Ensure that you have MongoDB installed and running on your machine.
   - Update the MongoDB connection string in the server configuration file (`server/config.js`).

## Technologies Used

- Frontend:
  - Bootstrap: A popular CSS framework for building responsive and mobile-first websites.
  - SCSS: A preprocessor that extends the capabilities of CSS with variables, mixins, and more.
  - React: A JavaScript library for building user interfaces.
  - Ant Design (antd): A UI library for React that provides a set of high-quality and customizable components for building modern web applications.

- Backend:
  - MongoDB: A NoSQL document database used for storing application data.
  - Express: A web application framework for Node.js.
  - Node.js: A JavaScript runtime for building scalable server-side applications.

## Folder Structure

The repository has the following structure:

```
ecommerce-mern/
  ├── client/                # Client-side code
  │   ├── public/            # Public assets
  │   └── src/               # Source code
  │       ├── components/    # React components
  │       ├── pages/         # Application pages
  │       ├── services/      # API service functions
  │       └── styles/        # SCSS stylesheets
  ├── server/                # Server-side code
  │   ├── config/            # Server configuration
  │   ├── controllers/       # Request handlers
  │   ├── models/            # Database models
  │   ├── routes/            # API routes
  │   └── app.js             # Express app configuration
  ├── .gitignore             # Git ignore file
  ├── package.json           # NPM package configuration
  └── README.md              # Project documentation
```

## Contributing

Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## Deployed Website

The eCommerce web application has been successfully deployed and is accessible at [https://trendblend.netlify.app/](https://trendblend.netlify.app/). You can visit the website to explore its

 features and functionalities.

Feel free to reach out if you have any questions or feedback regarding the deployed website.

## Acknowledgements

This project was customized and contributed by [Muhammd Usman](https://github.com/UsmanMERN).

- [Bootstrap](https://getbootstrap.com/)
- [React](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [Node.js](https://nodejs.org/).
