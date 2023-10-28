import { Button } from "@/components/ui/button";
import { HiArrowNarrowRight } from "react-icons/hi";
import home from "../../assets/auth/home.svg";
import ellipse from "../../assets/auth/Ellipse18.svg";
import ellipse2 from "../../assets/auth/Ellipse19.svg";
import ellipse3 from "../../assets/auth/Ellipsedown.svg";
import LanguageDropdown from "@/components/LanguageDropdown";
import AuthService from "@/services/auth.service";
import { useNavigate } from "react-router-dom";

import useI18n from "@/hooks/useI18n";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  const handleGetStarted = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const isValidToken = await AuthService.getIsValidToken();
      console.log(isValidToken);
      if (isValidToken) {
        navigate("/dashboard");
        return;
      }
    }
    navigate("/login");
  };

  return (
    <div className="relative h-screen flex flex-col">
      <div className="absolute top-0 right-0">
        <img
          src={ellipse}
          alt="ellipse"
          className="w-[100px] h-[100px] lg:h-auto lg:w-auto"
        />
      </div>
      <div className="absolute top-0 left-0">
        <img
          src={ellipse2}
          alt="ellipse"
          className="w-[100px] h-[100px] lg:h-auto lg:w-auto"
        />
      </div>
      <div className="absolute bottom-0 left-0">
        <img
          src={ellipse3}
          alt="ellipse"
          className="w-[100px] h-[100px] lg:h-auto lg:w-auto"
        />
      </div>
      <div className="container mx-auto pt-28 lg:pt-28">
        <div className="flex justify-end">
          <LanguageDropdown />
        </div>
      </div>
      <div className="flex-1 lg:gap-40">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-10 lg:gap-40 items-center">
            <div className="col-span-2 lg:col-span-1">
              <h1 className="text-4xl font-bold ">{t("home.title")}</h1>
              <p className="py-10">{t("home.content")}</p>
              <Button
                className="flex items-center gap-2"
                onClick={handleGetStarted}
              >
                {t("home.button")}
                <HiArrowNarrowRight />
              </Button>
            </div>
            <div className="col-span-2 lg:col-span-1 order-first md:order-last">
              <img src={home} alt="almotarjm-home" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
