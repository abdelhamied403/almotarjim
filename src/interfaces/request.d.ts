import Service from "./service";
import User from "./user";

type Request = {
  id?: string;
  title: string;
  description: string;
  service?: Service;
  translator?: User;
  status: "pending" | "finished";
  service_id?: string;
  files: any[];
  translations: any[];
  client_id?: string;
  agent_id?: string;
  chat?: Chat;
};

export default Request;
