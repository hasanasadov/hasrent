# Rent-a-Car Project

Welcome to the **Rent-a-Car** project! This application is designed to streamline the process of renting vehicles by combining an intuitive front-end experience with a robust back-end system. It leverages the latest web technologies to provide users with an efficient, secure, and seamless experience.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Getting Started](#getting-started)
5. [Environment Variables](#environment-variables)
6. [Scripts](#scripts)
7. [Folder Structure](#folder-structure)
8. [API Endpoints](#api-endpoints)
9. [Contributing](#contributing)
10. [License](#license)

---

## Project Overview

The **Rent-a-Car** application enables users to:
- Browse available cars for rent.
- Book vehicles based on their preferences.
- Manage bookings with ease.
- Use secure login options like Google, GitHub, or email-based authentication.

This system is suitable for rental agencies aiming to digitize their operations and provide customers with a modern booking solution.

---

## Features

### Frontend
- Modern and responsive UI built with **React** and **MUI**.
- Interactive components using **Radix UI**.
- Real-time data updates with **Socket.IO**.
- Authentication using **Google** and **GitHub** OAuth.
- Data validation powered by **Zod**.

### Backend
- RESTful APIs built with **Express.js**.
- Database management using **MongoDB** with **Mongoose**.
- Secure authentication with **Passport.js**.
- File uploads enabled by **Multer**.
- Email notifications using **Nodemailer**.

### Additional Features
- State management with **Redux Toolkit** and **Zustand**.
- Advanced table handling with **React Table**.
- Analytics and charts using **Chart.js**.

---

## Tech Stack

### Frontend
- **React**: Core framework for building the UI.
- **MUI**: Component library for material design.
- **Radix UI**: Accessible and customizable primitives.
- **TailwindCSS**: Utility-first CSS framework.
- **React Query**: Data fetching and caching.

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Backend framework for building APIs.
- **MongoDB**: NoSQL database for storing data.
- **Passport.js**: Authentication middleware.

### Other Tools
- **Socket.IO**: Real-time communication.
- **Multer**: File handling middleware.
- **Nodemailer**: Email notifications.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or later)
- **npm** or **yarn**
- **MongoDB**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rent-a-car.git
   cd rent-a-car
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Start the development servers:
   ```bash
   # Backend
   cd backend
   npm start

   # Frontend
   cd ../frontend
   npm start
   ```

4. Open the application in your browser at [http://localhost:5173](http://localhost:5173).

---

## Environment Variables

Create a `.env` file in the `backend` folder and define the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
EMAIL_HOST=your_email_host
EMAIL_USER=your_email_user
EMAIL_PASS=your_email_password
```

---

## Scripts

### Backend
- **`npm start`**: Start the server.
- **`npm run dev`**: Start the server in development mode.

### Frontend
- **`npm start`**: Start the development server.
- **`npm run build`**: Build the production version.

---

## Folder Structure

### Backend
```
backend/
├── controllers/
├── models/
├── routes/
├── utils/
├── middlewares/
├── .env
└── server.js
```

### Frontend
```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── store/
│   └── utils/
├── public/
└── package.json
```

---

## API Endpoints

### Authentication
- **POST** `/auth/login` - Login a user.
- **POST** `/auth/register` - Register a new user.

### Cars
- **GET** `/cars` - Fetch all available cars.
- **POST** `/cars` - Add a new car.

### Bookings
- **GET** `/bookings` - Fetch user bookings.
- **POST** `/bookings` - Create a new booking.

---

## Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

**Enjoy building with Rent-a-Car! 🚗**

