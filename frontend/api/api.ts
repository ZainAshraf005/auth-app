import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const fetchUser = async () => {
  const res = await api.get("/api/auth/me");
  if (res.data.success) {
    return res.data.user;
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data;
};

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/api/auth/register", { name, email, password });
  return res.data;
};

export const logoutUser = async () => {
  await api.post("/api/auth/logout");
};

export const googleLogin = () => {
  window.open(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, "_self");
};

export const resetOtp = async ({
  email,
  type,
}: {
  email: string;
  type: "reset" | "verify";
}) => {
  const res = await api.post("/api/mail/reset-otp", { email, type });
  return res.data;
};

export const verifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string | number;
}) => {
  const res = await api.post("/api/mail/verify-otp", { email, otp });
  return res.data;
};

export const resetPassword = async ({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) => {
  const res = await api.post("/api/mail/reset-password", {
    email,
    newPassword,
  });
  return res.data;
};

export const deleteUser = async () => {
  const res = await api.delete("/api/auth/delete");
  console.log("deleting user");
  return res.data;
};
