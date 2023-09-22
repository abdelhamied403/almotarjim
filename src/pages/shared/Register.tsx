import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BsApple, BsFacebook, BsGoogle } from "react-icons/bs";
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
            <Input type="text" placeholder="Ahmed Mohamed" />
          </div>
          <div className="grid w-full items-center gap-2">
            <label htmlFor="email">Email</label>
            <Input type="email" placeholder="olivia@untitledui.com" />
          </div>
          <div className="grid w-full items-center gap-2">
            <label htmlFor="phone">Phone</label>
            <Input type="number" placeholder="+96612216454844" />
          </div>
          <div className="grid w-full items-center gap-2">
            <label htmlFor="password">Password</label>
            <Input type="password" placeholder="*********" />
          </div>
          <Button variant={"language"}>Register</Button>
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
        <div>
          <img src={signup} alt="almotarjim-signup" />
        </div>
      </div>
    </div>
  );
};

export default Register;
