import ServiceType from "@/interfaces/requestServices";

export type ServiceProps = ServiceType;

const RequestService = (props: ServiceProps) => {
  return (
    <div className="flex flex-col gap-2 p-2 bg-primary-100 rounded-xl items-center cursor-pointer">
      <img
        src={props.image}
        alt="almotarjim-translation"
        className="w-52 h-52 object-cover"
      />
      <span className="font-normal text-base">{props.title}</span>
    </div>
  );
};

export default RequestService;
