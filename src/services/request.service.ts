import Request from "@/interfaces/request";
import { api, formAxios } from "./api";

const getRequests = async () => {
  const res = await api.get("/requests");
  return res.data.data;
};
const getRequest = async (id: string) => {
  const res = await api.get(`/requests/get-request/${id}`);
  return res.data;
};
const createRequest = async (request: Partial<Request>) => {
  const headers = {
    "Content-Type":
      "multipart/form-data; charset=utf-8; boundary=" +
      Math.random().toString().substr(2),
  };
  const res = await formAxios.post("/requests/create-request", request, {
    headers,
  });
  return res.data;
};

const assignRequest = async (request_id: string, translator_id: string) => {
  const res = await api.post(`/requests/assign-request`, {
    request_id,
    translator_id,
  });
  return res.data;
};

const RequestService = {
  getRequests,
  getRequest,
  createRequest,
  assignRequest,
};

export default RequestService;
