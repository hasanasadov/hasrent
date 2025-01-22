# Rent-a-Car Project


Welcome to the **Rent-a-Car** project! This application is designed to streamline the process of renting vehicles by combining an intuitive front-end experience with a robust back-end system. It leverages the latest web technologies to provide users with an efficient, secure, and seamless experience.

##### Front-end deployed on [hasrent.vercel.app](https://hasrent.vercel.app)
##### Back-end deployed on [hasrent.onrender.com](https://hasrent.onrender.com)

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
   git clone https://github.com/hasanasadov/hasrent.git
   cd rent-a-car
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   cd Server
   pnpm install
   cd ../client
   pnpm install
   ```

3. Start the development servers:
   ```bash
   # Backend
   cd Server
   pnpm run start

   # Frontend
   cd ../client
   pnpm run dev
   ```

4. Open the application in your browser at [http://localhost:5173](http://localhost:5173).

---

## Environment Variables

Create a `.env` file in the `backend` folder and define the following variables:


## Scripts

### Backend
- **`pnpm run start`**: Start the server.
- **`pnpm run dev`**: Start the server in development mode.

### Frontend
- **`pnpm run dev`**: Start the development server.
- **`pnpm run build`**: Build the production version.

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

