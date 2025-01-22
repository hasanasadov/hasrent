import { Router } from "express";
import authController from "../controllers/auth";
import { authenticate, authorize } from "../middleware/auth";
import passport from "passport";

const router = Router();

router.post("/login", authenticate, authController.login);
router.post("/register", authController.register);
router.get("/current-user", authorize(), authController.currentUser);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  authController.googleCallback
);

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  authController.githubCallback
);

export default router;
