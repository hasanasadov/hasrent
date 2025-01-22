import axiosInstance from "../axiosInstance";
import {
  RegisterPayload,
  RegisterResponse,
  LoginPayload,
  LoginResponse,
  GetCurrentUser,
} from "./types";

async function register(data: RegisterPayload) {
  return await axiosInstance.post<RegisterResponse>("/auth/register", data);
}

async function login(data: LoginPayload) {
  return await axiosInstance.post<LoginResponse>("/auth/login", data);
}

async function getCurrentUser() {
  return await axiosInstance.get<GetCurrentUser>("/auth/current-user");
}

async function logout() {
  return await axiosInstance.post("/auth/logout");
}

async function forgotPassword(data: { email: string }) {
  return await axiosInstance.post("/auth/forgot-password", data);
}

async function resetPassword(data: { password: string; token: string }) {
  return await axiosInstance.post("/auth/reset-password", data);
}

async function googleLogin() {
  return await axiosInstance.get("/auth/google");
}

async function githubLogin() {
  return await axiosInstance.get("/auth/github");
}

const authService = {
  getCurrentUser,
  forgotPassword,
  resetPassword,
  googleLogin,
  githubLogin,
  register,
  login,
  logout,
};

export default authService;
