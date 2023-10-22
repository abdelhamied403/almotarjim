import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPhone, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { HiMiniKey } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import signup from "../../assets/auth/signup.svg";
import SocialLinks from "./social_links/SocialLinks";
import AuthService from "@/services/auth.service";
import useProfileStore from "@/store/profile.slice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegistrationSchemaType,
  registrationSchema,
} from "@/schemas/registrationSchema";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useProfileStore();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegistrationSchemaType>>({});

  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  const handleRegister = async (data: RegistrationSchemaType) => {
    try {
      setLoading(true);
      const res = await AuthService.register(data);
      localStorage.setItem("token", res.access_token);
      navigate("/dashboard");
      const userData = await AuthService.getUser();
      setUser(userData.data);
    } catch (error: any) {
      setErrors(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

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
              <div className="absolute h-10 left-0 inset-y-0 flex items-center pl-3">
                <FaUser />
              </div>
              <Input
                type="text"
                placeholder="Ahmed Mohamed"
                className="pl-9 "
                {...register("name")}
              />
              <span className="text-red-500">{errors.name}</span>
              <span className="text-red-500">
                {validationErrors?.name?.message}
              </span>
            </div>
          </div>
          <div className="grid w-full items-center gap-2">
            <label htmlFor="email">Email</label>
            <div className="relative">
              <div className="absolute h-10 left-0 inset-y-0 flex items-center pl-3">
                <MdEmail />
              </div>
              <Input
                type="email"
                placeholder="olivia@untitledui.com"
                className="pl-9 "
                {...register("email")}
              />
              <span className="text-red-500">{errors.email}</span>
              <span className="text-red-500">
                {validationErrors?.email?.message}
              </span>
            </div>
          </div>
          <div className="grid w-full items-center gap-2">
            <label htmlFor="phone">Phone</label>
            <div className="relative">
              <div className="absolute h-10 left-0 inset-y-0 flex items-center pl-3">
                <FaPhone />
              </div>
              <Input
                type="text"
                placeholder="+96612216454844"
                className="pl-9 "
                {...register("phone")}
              />
              <span className="text-red-500">{errors.phone}</span>
              <span className="text-red-500">
                {validationErrors?.phone?.message}
              </span>
            </div>
          </div>
          <div className="grid w-full items-center gap-2">
            <label htmlFor="password">Password</label>
            <div className="relative">
              <div className="absolute h-10 left-0 inset-y-0 flex items-center pl-3">
                <HiMiniKey />
              </div>
              <Input
                type="password"
                placeholder="*********"
                className="pl-9 "
                {...register("password")}
              />
              <span className="text-red-500">{errors.password}</span>
              <span className="text-red-500">
                {validationErrors?.password?.message}
              </span>
            </div>
          </div>
          <Button onClick={handleSubmit(handleRegister)}>
            {loading ? <Spinner /> : "Register"}
          </Button>
          <div className="flex flex-col gap-5">
            <p className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </p>
            <SocialLinks />
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
