import { Button } from "@/components/ui/button";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
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
  const { t, language } = useI18n();

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
    <div className="relative h-screen">
      <div className="absolute top-0 right-0">
        <img
          src={ellipse}
          alt="ellipse"
          className="w-[100px] h-[100px] md:h-auto md:w-auto"
        />
      </div>
      <div className="absolute top-0 left-0">
        <img
          src={ellipse2}
          alt="ellipse"
          className="w-[100px] h-[100px] md:h-auto md:w-auto"
        />
      </div>
      <div className="absolute bottom-0 left-0">
        <img
          src={ellipse3}
          alt="ellipse"
          className="w-[100px] h-[100px] md:h-auto md:w-auto"
        />
      </div>

      <div className="flex flex-col h-full justify-center relative z-10">
        <div className="container mx-auto">
          <div className="flex justify-end">
            <LanguageDropdown />
          </div>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-2 gap-10 md:gap-40 items-center">
            <div className="col-span-2 md:col-span-1">
              <h1 className="text-4xl font-bold ">{t("home.title")}</h1>
              <p className="py-10">{t("home.content")}</p>
              <Button
                className="flex items-center gap-2"
                onClick={handleGetStarted}
              >
                {t("home.button")}
                {language.dir === "ltr" ? (
                  <HiArrowNarrowRight />
                ) : (
                  <HiArrowNarrowLeft />
                )}
              </Button>
            </div>
            <div className="col-span-2 md:col-span-1 order-first md:order-last">
              <img
                className="w-2/3 md:w-full"
                src={home}
                alt="almotarjm-home"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
