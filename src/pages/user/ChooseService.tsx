import RequestService from "@/components/RequestService";
import Spinner from "@/components/ui/Spinner";
import useI18n from "@/hooks/useI18n";
import Service from "@/interfaces/service";
import ServiceService from "@/services/services.service";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const ChooseService = () => {
  const { t } = useI18n();
  const { isLoading, data: services } = useQuery("services", () =>
    ServiceService.listServices(1)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-end">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2xl">{t("user.home.title")}</h1>
        <p className="font-normal text-gray-600 text-base">
          {t("user.home.desc")}
        </p>
      </div>
      <div className="grid gird-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {services.data.map((service: Service) => (
          <Link to={`/request/create/${service.id}`}>
            <RequestService {...service} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ChooseService;
