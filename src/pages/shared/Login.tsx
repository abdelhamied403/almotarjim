import { Input } from "@/components/ui/input";
import login from "../../assets/auth/login.svg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BsApple, BsFacebook, BsGoogle } from "react-icons/bs";

const Login = () => {
  return (
    <div className="h-screen bg-gradient-to-l from-[#C6E1F1] from-50%  to-white to-50%">
      <div className="grid grid-cols-2 container mx-auto gap-52 items-center h-full">
        <div className="grid gap-5">
          <h1 className="text-3xl font-bold text-center">Welcome back!</h1>
          <div className="grid w-full items-center gap-2">
            <label>Email</label>
            <Input type="email" placeholder="olivia@untitledui.com" />
          </div>
          <div className="grid w-full items-center gap-2">
            <label>Password</label>
            <Input type="password" placeholder="********" />
          </div>
          <Button variant={"language"}>Login</Button>
          <Button variant={"outline"}>Anonymous Login</Button>
          <div className="flex flex-col gap-5">
            <p className="text-center">
              Don’t have an account? <Link to="#">Register</Link>
            </p>
            <div className="flex gap-2 items-center justify-center">
              <BsFacebook />
              <BsGoogle />
              <BsApple />
            </div>
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
