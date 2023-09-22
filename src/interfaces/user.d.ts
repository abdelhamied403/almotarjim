import Role from "./role";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  image: string;
};

export default User;
