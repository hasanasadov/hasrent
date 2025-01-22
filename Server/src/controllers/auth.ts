import { Request, Response } from "express";
import crypto from "crypto";

import User from "../mongoose/schemas/user";
import { hashPassword } from "../utils/bcrypt";
import { transporter } from "../utils/mail";

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, surname } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill in all fields!" });
      return;
    }

    const alreadyExists = await User.findOne({ email });

    if (alreadyExists) {
      res.status(400).json({ message: "User with this email already exists" });
      return;
    }

    const user = new User({
      email,
      surname,
      password: hashPassword(password),
      name,
    });

    await user.save();

    res.send({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const login = async (req: Request, res: Response) => {
  const user = req.user;
  res.send({ message: "User logged in successfully.", user });
};

const currentUser = async (req: Request, res: Response) => {
  const user = req.user;
  if (user?.avatar) user.avatar = `${process.env.BASE_URL}${user.avatar}`;

  res.json({ user });
};

const logout = async (req: Request, res: Response) => {
  req.logout(function (err) {
    if (err) {
      res.status(500).json({ message: "Internal server error!" });
    }
    res.send({ message: "User logged out successfully." });
  });
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordTokenExpires = new Date(Date.now() + 1000 * 60 * 15);
    await user.save();

    await transporter.sendMail({
      from: '"Passport Auth 👻" <hasanaliaa@code.edu.az>',
      to: email,
      subject: "Reset Password",
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border-radius: 10px; border: 1px solid #e0e0e0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #333; font-size: 24px; margin-bottom: 20px;">Reset Your Password</h2>
            <p style="font-size: 16px; color: #555;">Hi, ${user.name},</p>
            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">You requested to reset your password. To proceed, click the button below:</p>

            <a href="${process.env.CLIENT_URL}/reset-password/${token}" target="_blank" 
              style="display: inline-block; padding: 12px 25px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px; text-align: center; font-weight: bold;">
              Reset Password
            </a>

            <p style="font-size: 16px; color: #555; margin-bottom: 20px;">If you didn’t request this, you can safely ignore this email.</p>
            <p style="font-size: 16px; color: #555;">Thanks,<br>The Passport Auth Team</p>

            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;"/>

            <p style="font-size: 14px; color: #777; text-align: center;">If the button above doesn't work, copy and paste the following link into your browser:</p>
            <p style="font-size: 14px; color: #007BFF; text-align: center;">
              <a href="${process.env.CLIENT_URL}/reset-password/${token}" style="color: #007BFF; text-decoration: none;">${process.env.CLIENT_URL}/reset-password/${token}</a>
            </p>
          </div>`,
    });
    res.json({ message: "Password reset email sent successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token!" });
      return;
    }

    user.password = hashPassword(password);
    user.resetPasswordToken = "";
    user.resetPasswordTokenExpires = new Date(0);

    await user.save();

    res.json({ message: "Password reset succesfully." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const googleLogin = async (req: Request, res: Response) => {
  console.log(req.user);
  res.status(200).json({
    message: "User logged in successfully.",
    user: req.user,
  });
};

const googleCallback = async (req: Request, res: Response) => {
  const user = req.user;
  res.send({ message: "User logged in successfully.", user });
};

const githubCallback = async (req: Request, res: Response) => {
  const user = req.user;
  res.send({ message: "User logged in successfully.", user });
};

const authController = {
  googleCallback,
  githubCallback,
  forgotPassword,
  resetPassword,
  currentUser,
  googleLogin,
  register,
  logout,
  login,
};

export default authController;
