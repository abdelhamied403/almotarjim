import User from "@/interfaces/user";
import { create } from "zustand";

type ProfileState = {
  user: User | null;
  setUser: (user: User) => void;
};

const useProfileStore = create<ProfileState>()((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));

export default useProfileStore;
