import RequestServiceComponent from "@/components/RequestService";
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
import UploadedFile from "@/interfaces/uploadedFile";
import RequestService from "@/services/request.service";
import useUser from "@/hooks/useUser";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const createRequestSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  description: z.string().min(1, { message: "description is required" }),
});

type CreateRequestSchema = z.infer<typeof createRequestSchema>;

const CreateRequest = () => {
  const [step, setStep] = useState(0);
  const [currentService, setCurrentService] = useState<Service>();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { user } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRequestSchema>({
    resolver: zodResolver(createRequestSchema),
  });

  const { isLoading, data: services } = useQuery(
    "services",
    ServiceService.listServices
  );

  const onServiceClick = (service: Service) => {
    setCurrentService(service);
    setStep(1);
  };

  const onSubmit = async (data: CreateRequestSchema) => {
    if (files.length === 0) {
      alert("No files selected");
      return;
    }

    try {
      const res = await RequestService.createRequest({
        ...data,
        files: files.map(({ file }) => file),
        service_id: currentService?.id || "",
        client_id: user?.id,
      });
      toast({
        title: "Success",
        description: res.message,
      });
      navigate("/request");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col flex-1 flex-wrap gap-6 items-start p-6 bg-white rounded-xl">
        {step === 0 && (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-2xl">Choose a service</h1>
              <p className="font-normal text-gray-600 text-base">
                choose from hand picked services designed for you.
              </p>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {services.map((service: Service) => (
                <div key={service.id} onClick={() => onServiceClick(service)}>
                  <RequestServiceComponent {...service} />
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
            <div className="form w-full">
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
                  <Dropzone files={files} setFiles={setFiles} />
                </Field>
                <Button onClick={handleSubmit(onSubmit)}>Create Request</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CreateRequest;
