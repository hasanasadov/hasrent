import { Request, Response } from "express";

const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to the API</title>
    <style>
        body {
        margin: 0;
        font-family: Arial, sans-serif;
        background: linear-gradient(135deg, #6e85b7, #b4c6e7);
        color: #fff;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        }
        h1 {
        font-size: 3rem;
        margin-bottom: 20px;
        }
        p {
        font-size: 1.2rem;
        margin-bottom: 30px;
        }
        .routes {
        margin-top: 20px;
        text-align: left;
        }
        a {
        color: #ffd700;
        text-decoration: none;
        font-weight: bold;
        }
        a:hover {
        color: #fff;
        }
        footer {
        margin-top: 50px;
        font-size: 0.9rem;
        opacity: 0.8;
        }
        .container {
        max-width: 800px;
        margin: auto;
        }
        .route {
        margin: 10px 0;
        padding: 10px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>Welcome to the API</h1>
        <p>Explore our RESTful API endpoints for various resources.</p>
        <div class="routes">
        <div class="route">🔑 <a href="/auth">/auth</a> - Authentication endpoints</div>
        <div class="route">👤 <a href="/users">/users</a> - User management</div>
        <div class="route">📍 <a href="/locations">/locations</a> - Location details</div>
        <div class="route">📂 <a href="/categories">/categories</a> - Category management</div>
        <div class="route">🏠 <a href="/rents">/rents</a> - Rent listings</div>
        <div class="route">📅 <a href="/reservations">/reservations</a> - Reservations</div>
        <div class="route">⭐ <a href="/reviews">/reviews</a> - Reviews</div>
        <div class="route">❤️ <a href="/favorites">/favorites</a> - Favorite items</div>
        </div>
    </div>
    <footer>© 2025 API - Built with ❤️ by [Your Name]</footer>
    </body>
    </html>
`;

export const getPage = async (req: Request, res: Response) => {
  res.send(htmlContent);
};

export default getPage;
