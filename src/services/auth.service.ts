import User from "@/interfaces/user";
import { api } from "./api";
import Role from "@/interfaces/role";

const login = async (email: string, password: string) => {
  const res = await api.post("/login", {
    email,
    password,
  });
  return res.data;
};
const anonymousLogin = async () => {
  const res = await api.get("/anonymous-login");
  return res.data;
};
const facebookLogin = async () => {
  const res = await api.get("/facebook/auth");
  return res.data;
};
const googleLogin = async () => {
  const res = await api.get("/google/login");
  return res.data;
};
const googleLoginCallback = async (credential: any) => {
  const res = await api.post("/google/callback", { credential });
  return res.data;
};
const register = async (data: Partial<User>) => {
  const res = await api.post("/register/client", {
    ...data,
    role: "client",
  });

  return res.data;
};

const getUser = async () => {
  const res = await api.get("/users/profile/me");
  return res.data;
};

const getIsValidToken = async () => {
  try {
    await api.get("/users/profile/me");
    return true;
  } catch (error) {
    return false;
  }
};

const getUsersByRole = async (role: Role) => {
  const res = await api.get(`/users/${role}`);
  return res.data.data.data;
};

const AuthService = {
  login,
  anonymousLogin,
  register,
  getUser,
  getIsValidToken,
  getUsersByRole,
  facebookLogin,
  googleLogin,
  googleLoginCallback,
};

export default AuthService;
