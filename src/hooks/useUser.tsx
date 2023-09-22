import Role from "@/interfaces/role";
import User from "@/interfaces/user";

type useUserReturnType = {
  user: Partial<User>;
  isLoggedIn: boolean;
  role: Role;
};

const useUser = (): useUserReturnType => {
  return {
    user: {},
    isLoggedIn: true,
    role: "supervisor",
  };
};

export default useUser;
