import { api } from "./api";

const getRequests = async () => {
  const res = await api.get("/requests");
  return res.data.data;
};

const RequestService = {
  getRequests,
};

export default RequestService;
