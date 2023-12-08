import { api } from "./api";

const listServices = async (page: number) => {
  const res = await api.get(`/services?page=${page}`);
  return res.data.data;
};

const getService = async (id?: string) => {
  const res = await api.get(`/services/show/${id}`);
  return res.data.data;
};

const ServiceService = {
  listServices,
  getService,
};

export default ServiceService;
