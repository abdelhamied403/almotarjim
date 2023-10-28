import { api } from "./api";

const listServices = async () => {
  const res = await api.get("/services");
  return res.data.data;
};

const getService = async (id?: string) => {
  // TODO: To be fixed later
  const res = await api.get("/requests/get-request/21");
  return res.data.data.find((service) => service.id == id);
};

const ServiceService = {
  listServices,
  getService,
};

export default ServiceService;
