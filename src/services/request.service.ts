import { api, formAxios } from "./api";

const getRequests = async () => {
  const res = await api.get("/requests");
  return res.data.data;
};
const getRequest = async (id: string) => {
  const res = await api.get(`/requests/get-request/${id}`);
  return res.data;
};

const createRequest = async (request: any) => {
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

const approveRequest = async (request_id: string) => {
  const res = await api.get(`/supervisor/done/${request_id}`);
  return res.data;
};

const submitRequest = async (request_id: string, files: File[]) => {
  const config = {
    headers: {
      "Content-Type":
        "multipart/form-data; charset=utf-8; boundary=" +
        Math.random().toString().substr(2),
    },
  };
  const data = {
    request_id,
    files,
  };
  const res = await formAxios.post("/translations/create", data, config);
  return res.data;
};

const getChat = async (requestId: string) => {
  const res = await api.get(`/messages/get-chat-by-request/${requestId}`);
  return res.data;
};

const RequestService = {
  getRequests,
  getRequest,
  createRequest,
  assignRequest,
  approveRequest,
  submitRequest,
  getChat,
};

export default RequestService;
