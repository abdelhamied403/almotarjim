import Request from "@/interfaces/request";
import { api, formAxios } from "./api";

const getRequests = async () => {
  const res = await api.get("/requests");
  return res.data.data;
};
const getRequest = async (id: string) => {
  const res = await api.get(`/requests/${id}`);
  return res.data.data;
};
const createRequest = async (request: Request) => {
  const headers = {
    "Content-Type":
      "multipart/form-data; charset=utf-8; boundary=" +
      Math.random().toString().substr(2),
  };
  const res = await formAxios.post("/requests/create-request", request, {
    headers,
  });
  return res.data.data;
};

const RequestService = {
  getRequests,
  getRequest,
  createRequest,
};

export default RequestService;
