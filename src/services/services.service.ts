import { api } from "./api";

const listServices = async () => {
  const res = await api.get("/services");
  return res.data.data;
};

const ServiceService = {
  listServices,
};

export default ServiceService;
