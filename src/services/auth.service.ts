import { RegistrationSchemaType } from "@/schemas/registrationSchema";
import { api } from "./api";

const login = async (email: string, password: string) => {
  const res = await api.post("/login", {
    email,
    password,
  });
  return res.data;
};
const register = async (data: RegistrationSchemaType) => {
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

const AuthService = {
  login,
  register,
  getUser,
  getIsValidToken,
};

export default AuthService;
