type Request = {
  title: string;
  description: string;
  service_id: string;
  files: any;
  client_id?: string;
  agent_id?: string;
};

export default Request;
