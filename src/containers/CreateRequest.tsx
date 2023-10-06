import RequestService from "@/components/RequestService";
import ServiceType from "@/interfaces/requestServices";

const CreateRequest = () => {
  const services: ServiceType[] = [
    { img: "https://placehold.co/400x400/fee/31343C", title: "Translation" },
    { img: "https://placehold.co/400x400/fee/31343C", title: "Translation" },
    { img: "https://placehold.co/400x400/fee/31343C", title: "Translation" },
    { img: "https://placehold.co/400x400/fee/31343C", title: "Translation" },
    { img: "https://placehold.co/400x400/fee/31343C", title: "Translation" },
    { img: "https://placehold.co/400x400/fee/31343C", title: "Translation" },
    { img: "https://placehold.co/400x400/fee/31343C", title: "Translation" },
  ];
  return (
    <div className="flex flex-col flex-1 flex-wrap gap-6 items-start p-6 bg-white rounded-xl">
      <div className="flex flex-col gap-1">
        <h1 className="font-bold text-2xl">Choose a service</h1>
        <p className="font-normal text-gray-600 text-base">
          choose from hand picked services designed for you.
        </p>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {services.map((service) => (
          <RequestService {...service} />
        ))}
      </div>
    </div>
  );
};

export default CreateRequest;
