import Role from "@/interfaces/role";
import User from "@/interfaces/user";
import useProfileStore from "@/store/profile.slice";

type useUserReturnType = {
  user: User | null;
  isLoggedIn: boolean;
  role: Role | null;
};

const useUser = (): useUserReturnType => {
  const { user } = useProfileStore();

  return {
    user,
    isLoggedIn: !!user,
    role: user?.role || null,
  };
};

export default useUser;
