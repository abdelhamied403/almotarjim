import RequestService from "@/components/RequestService";
import useI18n from "@/hooks/useI18n";
import ServiceType from "@/interfaces/requestServices";

const CreateRequest = () => {
  const { t } = useI18n();
  const services: ServiceType[] = [];

  return (
    <>
      <div className="flex flex-col flex-1 flex-wrap gap-6 items-start p-6 bg-white rounded-xl">
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">
            {t("supervisor.createRequest.chooseService")}
          </h1>
          <p className="font-normal text-gray-600 text-base">
            {t("supervisor.createRequest.desc")}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {services.map((service) => (
            <RequestService {...service} />
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateRequest;
