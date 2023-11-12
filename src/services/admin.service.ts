import { api } from "./api";

const getUSers = async () => {
  const res = await api.get("/users/translator");
  console.log(res);
};

const AdminService = {
  getUSers,
};

export default AdminService;
