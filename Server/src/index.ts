import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import cors from "cors";

import "./config/db";
import "./config/auth-strategy";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import rentRoutes from "./routes/rent";
import getPage from "./controllers/get";
import reviewRoutes from "./routes/review";
import favoriteRoutes from "./routes/favorite";
import categoryRoutes from "./routes/category";
import locationRoutes from "./routes/location";
import reservationRoutes from "./routes/reservation";

const app = express();
app.set("trust proxy", 1);

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const production = process.env.NODE_ENV === "production";
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: !!production,
      sameSite: production ? "none" : "lax",
      httpOnly: !!production,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static("./public"));

app.get("/", getPage);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/locations", locationRoutes);
app.use("/categories", categoryRoutes);
app.use("/rents", rentRoutes);
app.use("/reservations", reservationRoutes);
app.use("/reviews", reviewRoutes);
app.use("/favorites", favoriteRoutes);

app.listen(PORT, () => {
  console.log(`Hasanali's Server is running on ${BASE_URL}`);
});
