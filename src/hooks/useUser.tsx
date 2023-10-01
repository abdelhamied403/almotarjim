import Role from "@/interfaces/role";
import User from "@/interfaces/user";

type useUserReturnType = {
  user: Partial<User>;
  isLoggedIn: boolean;
  role: Role;
};

const useUser = (): useUserReturnType => {
  return {
    user: {
      name: "Ahmed Mohamed",
      email: "Ahmed@almorajim.com",
    },
    isLoggedIn: true,
    role: "supervisor",
  };
};

export default useUser;
