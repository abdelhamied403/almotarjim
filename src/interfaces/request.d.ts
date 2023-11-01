import Service from "./service";
import User from "./user";

type RequestTranslationFile = {
  id: string;
  mood: string;
  name: string;
  path: string;
};

export type RequestStatus = "PENDING" | "IN_PROGRESS" | "DONE" | "DEFAULT";
type Request = {
  id?: string;
  title: string;
  description: string;
  service?: Service;
  translator?: User;
  status: RequestStatus;
  service_id?: string;
  files: any[];
  translations: {
    files: RequestTranslationFile[];
    id: number;
    status: string;
    translator: User;
  };
  client_id?: string;
  agent_id?: string;
  chat?: Chat;
};

export default Request;
