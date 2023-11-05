import RequestService from "@/components/RequestService";
import Service from "@/interfaces/requestServices";
import ServiceService from "@/services/services.service";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import { BsFillChatDotsFill } from "react-icons/bs";
import useI18n from "@/hooks/useI18n";
import { Link } from "react-router-dom";
import Spinner from "@/components/ui/Spinner";

const Home = () => {
  const { t } = useI18n();

  const { isLoading, data: services } = useQuery(
    "services",
    ServiceService.listServices
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col flex-1 flex-wrap gap-6 items-start p-6 bg-white rounded-xl h-full">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">{t("user.home.title")}</h1>
          <p className="font-normal text-gray-600 text-base">
            {t("user.home.desc")}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {services.map((service: Service) => (
            <Link to={`/request/create/${service.id}`}>
              <RequestService {...service} />
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <span>{t("user.home.checkServices")}</span>
          </div>
          <div className="flex gap-6">
            <div>
              <Button className="flex gap-2">
                <span>{t("user.home.chat")}</span> <BsFillChatDotsFill />
              </Button>
            </div>
            <div>
              <a href={`https://wa.me/+201060126809`} target="_blank">
                <Button className="flex gap-2" variant={"success"}>
                  <span>{t("user.home.whatsapp")}</span>
                  <BsFillChatDotsFill />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
