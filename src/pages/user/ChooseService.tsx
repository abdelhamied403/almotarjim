import RequestService from "@/components/RequestService";
import Service from "@/interfaces/service";
import ServiceService from "@/services/services.service";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const ChooseService = () => {
  const { isLoading, data: services } = useQuery(
    "services",
    ServiceService.listServices
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2xl">Choose a service</h1>
        <p className="font-normal text-gray-600 text-base">
          choose from hand picked services designed for you.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {services.map((service: Service) => (
          <Link to={`/request/create/${service.id}`}>
            <RequestService {...service} />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ChooseService;
