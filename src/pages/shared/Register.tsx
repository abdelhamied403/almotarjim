import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BsApple, BsFacebook, BsGoogle } from "react-icons/bs";
import { FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiMiniKey } from "react-icons/hi2";
import { Link } from "react-router-dom";
import signup from "../../assets/auth/signup.svg";

const Register = () => {
  return (
    <div className="h-screen bg-gradient-to-l from-[#C6E1F1] from-50% to-white to-50%">
      <div className="grid grid-cols-2 h-full items-center container mx-auto gap-52">
        <div className="grid gap-5">
          <h1 className="text-3xl font-bold font-[Poppins] text-center">
            Welcome to almotarjim!
          </h1>
          <div className="grid w-full items-center gap-2">
            <label htmlFor="name">Full Name</label>
            <div className="relative">
              <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaUser />
              </div>
              <Input
                type="text"
                placeholder="Ahmed Mohamed"
                className="pl-9 "
              />
            </div>
          </div>
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
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-2">
            <label htmlFor="phone">Phone</label>
            <div className="relative">
              <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaPhone />
              </div>
              <Input
                type="text"
                placeholder="+96612216454844"
                className="pl-9 "
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
              />
            </div>
          </div>
          <Button variant={"language"}>Register</Button>
          <div className="flex flex-col gap-5">
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-500">
                Login
              </Link>
            </p>
            <div className="flex gap-2 items-center justify-center">
              <BsFacebook />
              <BsGoogle />
              <BsApple />
            </div>
          </div>
        </div>
        <div>
          <img src={signup} alt="almotarjim-signup" />
        </div>
      </div>
    </div>
  );
};

export default Register;
