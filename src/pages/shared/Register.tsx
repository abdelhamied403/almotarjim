import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import signup from "../../assets/auth/signup.svg";
import SocialLinks from "@/components/SocialLinks";
import AuthService from "@/services/auth.service";
import useProfileStore from "@/store/profile.slice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

import useI18n from "@/hooks/useI18n";
import Field from "@/components/Field";
import { useToast } from "@/components/ui/use-toast";
import useRegistrationSchema from "@/schemas/useRegistrationSchema";
import { z } from "zod";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { setUser } = useProfileStore();

  const { registrationSchema } = useRegistrationSchema();
  type RegistrationSchemaType = z.infer<typeof registrationSchema>;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegistrationSchemaType>>({});
  const { toast } = useToast();

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
      toast({
        title: "Error",
        description: "Some fields are invalid",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-primary-200 lg:bg-gradient-to-l from-[#C6E1F1] from-50%  lg:to-white lg:to-50%">
      <div className="grid lg:grid-cols-2 h-full items-center container mx-auto gap-52">
        <div className="grid gap-5">
          <h1 className="text-3xl font-bold text-center">
            {t("register.title")}
          </h1>
          <Field
            label={t("register.name")}
            error={errors.name || validationErrors?.name?.message}
          >
            <Input
              type="text"
              placeholder="Ahmed Mohamed"
              {...register("name")}
            />
          </Field>
          <Field
            label={t("register.email")}
            error={errors.email || validationErrors?.email?.message}
          >
            <Input
              type="email"
              placeholder="olivia@untitledui.com"
              {...register("email")}
            />
          </Field>
          <Field
            label={t("register.phone")}
            error={errors.phone || validationErrors?.phone?.message}
          >
            <Input
              type="text"
              placeholder="+96612216454844"
              {...register("phone")}
            />
          </Field>
          <Field
            label={t("register.password")}
            error={errors.password || validationErrors?.password?.message}
          >
            <Input
              type="password"
              placeholder="*********"
              {...register("password")}
            />
          </Field>
          <Button onClick={handleSubmit(handleRegister)}>
            {loading ? <Spinner /> : t("register.register")}
          </Button>
          <div className="flex flex-col gap-5">
            <p className="text-center">
              {t("register.check")}{" "}
              <Link to="/login" className="text-primary">
                {t("register.login")}
              </Link>
            </p>
            <SocialLinks />
          </div>
        </div>
        <div className="hidden lg:flex">
          <img src={signup} alt="almotarjim-signup" />
        </div>
      </div>
    </div>
  );
};

export default Register;
