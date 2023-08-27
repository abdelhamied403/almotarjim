import roleType from "@/interfaces/role";

type useUserReturnType = {
  user: unknown;
  isLoggedIn: boolean;
  role: roleType;
};

const useUser = (): useUserReturnType => {
  return {
    user: {},
    isLoggedIn: true,
    role: "admin",
  };
};

export default useUser;
