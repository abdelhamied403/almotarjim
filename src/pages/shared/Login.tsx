import { Input } from "@/components/ui/input";
import login from "../../assets/auth/login.svg";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { HiMiniKey } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import SocialLinks from "./social_links/SocialLinks";
import { useState } from "react";
import AuthService from "@/services/auth.service";
import useProfileStore from "@/store/profile.slice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useProfileStore();

  const handleLogin = async () => {
    const res = await AuthService.login(email, password);
    localStorage.setItem("token", res.access_token);
    navigate("/dashboard");
    const userData = await AuthService.getUser();
    setUser(userData.data);
  };
  return (
    <div className="h-screen bg-gradient-to-l from-[#C6E1F1] from-50%  to-white to-50%">
      <div className="grid grid-cols-2 container mx-auto gap-52 items-center h-full">
        <div className="grid gap-5">
          <h1 className="text-3xl font-bold text-center">Welcome back!</h1>
          <div className="grid w-full items-center gap-2">
            <label htmlFor="email">Email</label>
            <div className="relative">
              <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                <MdEmail />
              </div>
              <Input
                type="email"
                placeholder="olivia@untitledui.com"
                className="pl-9 "
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-2">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                <HiMiniKey />
              </div>
              <Input
                type="password"
                placeholder="*********"
                className="pl-9 "
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleLogin}>Login</Button>
          <Button variant={"outline"}>Anonymous Login</Button>
          <div className="flex flex-col gap-5">
            <p className="text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary">
                Register
              </Link>
            </p>
            <SocialLinks />
          </div>
        </div>
        <div className="">
          <img src={login} alt="almotarjim-login" className="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
