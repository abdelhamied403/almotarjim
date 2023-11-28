import { Input } from "@/components/ui/input";
import login from "../../assets/auth/login.svg";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import SocialLinks from "@/components/SocialLinks";
import { useState } from "react";
import AuthService from "@/services/auth.service";
import useProfileStore from "@/store/profile.slice";
import useI18n from "@/hooks/useI18n";
import Field from "@/components/Field";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const { t } = useI18n();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useProfileStore();
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      const res = await AuthService.login(email, password);
      localStorage.setItem("token", res.access_token);
      const userData = await AuthService.getUser();
      setUser(userData.data);
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: t("shared.error"),
        description: error?.response?.data?.error || error.toString(),
        variant: "destructive",
      });
    }
  };
  const handleAnonymousLogin = async () => {
    try {
      const res = await AuthService.anonymousLogin();
      localStorage.setItem("token", res.token);
      const userData = await AuthService.getUser();
      setUser(userData.data);
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: t("shared.error"),
        description: error?.response?.data?.error || error.toString(),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen bg-primary-200 lg:bg-gradient-to-l from-[#C6E1F1] from-50%  lg:to-white lg:to-50%">
      <div className="grid lg:grid-cols-2 container mx-auto gap-52 items-center h-full">
        <div className="grid gap-5">
          <h1 className="text-3xl font-bold text-center">{t("login.title")}</h1>
          <Field label={t("login.email")}>
            <Input
              type="email"
              placeholder="olivia@untitledui.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field>
          <Field label={t("login.password")}>
            <Input
              type="password"
              placeholder="*********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>

          <Button onClick={handleLogin}>{t("login.login")}</Button>
          <Button variant={"outline"} onClick={handleAnonymousLogin}>
            {t("login.anonymousLogin")}
          </Button>
          <div className="flex flex-col gap-5">
            <p className="text-center">
              {t("login.accountCheck")}{" "}
              <Link to="/register" className="text-primary">
                {t("login.register")}
              </Link>
            </p>
            <SocialLinks />
          </div>
        </div>
        <div className="hidden lg:flex">
          <img src={login} alt="almotarjim-login" className="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
