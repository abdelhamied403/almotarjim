import { api } from "./api";

const getUsers = async () => {
  const res = await api.get("/users/client");
  return res.data.data;
};

const getAgents = async () => {
  const res = await api.get("/users/agent");
  return res.data.data;
};

const getTranslators = async () => {
  const res = await api.get("/users/translator");
  return res.data.data;
};

const getSupervisors = async () => {
  const res = await api.get("/users/supervisor");
  return res.data.data;
};

const AdminService = {
  getUsers,
  getAgents,
  getTranslators,
  getSupervisors,
};

export default AdminService;
