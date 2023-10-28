import RequestService from "@/components/RequestService";
import Service from "@/interfaces/requestServices";
import ServiceService from "@/services/services.service";
import { useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Field from "@/components/Field";
import { Input } from "@/components/ui/input";
import Dropzone from "@/components/ui/dropzone";
import { BsFillChatDotsFill } from "react-icons/bs";
import useI18n from "@/hooks/useI18n";

const validationSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  description: z.string().min(1, { message: "description is required" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const Home = () => {
  const { t } = useI18n();

  const [step, setStep] = useState(0);
  const [currentService, setCurrentService] = useState<Service | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const { isLoading, data: services } = useQuery(
    "requests",
    ServiceService.listServices
  );

  const onServiceClick = (service: Service) => {
    setCurrentService(service);
    setStep(1);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex flex-col flex-1 flex-wrap gap-6 items-start p-6 bg-white rounded-xl h-full">
        {step === 0 && (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-2xl">{t("user.home.title")}</h1>
              <p className="font-normal text-gray-600 text-base">
                {t("user.home.desc")}
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {services.map((service: Service) => (
                <div key={service.id} onClick={() => onServiceClick(service)}>
                  <RequestService {...service} />
                </div>
              ))}
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <div className="flex items-center gap-2">
              <img src={currentService?.image} alt={currentService?.title} />
              <h4>{currentService?.title}</h4>
            </div>
            <div className="form">
              <div className="grid w-full items-center gap-2">
                <Field label="Request Title" error={errors.title?.message}>
                  <Input {...register("title")}></Input>
                </Field>
                <Field
                  label="Request Description"
                  error={errors.description?.message}
                >
                  <Textarea {...register("description")}></Textarea>
                </Field>
                <Field label="">
                  <Dropzone />
                </Field>
                <Button onClick={handleSubmit(onSubmit)}>
                  {t("user.home.createRequest")}
                </Button>
              </div>
            </div>
          </>
        )}
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
              <Button className="flex gap-2" variant={"success"}>
                <span>{t("user.home.whatsapp")}</span>
                <BsFillChatDotsFill />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
