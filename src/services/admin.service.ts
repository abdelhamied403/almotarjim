import { RegistrationSchemaType } from "@/schemas/registrationSchema";
import { api } from "./api";

const getUsers = async () => {
  const res = await api.get("/users/client");
  return res.data.data.data;
};

const getAgents = async () => {
  const res = await api.get("/users/agent");
  return res.data.data.data;
};

const getTranslators = async () => {
  const res = await api.get("/users/translator");
  return res.data.data.data;
};

const getSupervisors = async () => {
  const res = await api.get("/users/supervisor");
  return res.data.data;
};

const getReports = async () => {
  const res = await api.get("/statistics/reports");
  return res.data.data;
};

const createAgent = async (data: RegistrationSchemaType) => {
  const res = await api.post("/users/register/agent", {
    ...data,
    role: "agent",
  });

  return res.data;
};

const createTranslator = async (data: RegistrationSchemaType) => {
  const res = await api.post("/users/register/translator", {
    ...data,
    role: "translator",
  });

  return res.data;
};

const createSupervisor = async (data: RegistrationSchemaType) => {
  const res = await api.post("/users/register/supervisor", {
    ...data,
    role: "supervisor",
  });

  return res.data;
};

const AdminService = {
  getUsers,
  getAgents,
  getTranslators,
  getSupervisors,
  getReports,
  createAgent,
  createTranslator,
  createSupervisor,
};

export default AdminService;
