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
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiChevronDown, HiChevronLeft } from "react-icons/hi";

const createRequestSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  description: z.string().min(1, { message: "description is required" }),
});

type CreateRequestSchema = z.infer<typeof createRequestSchema>;

const CreateRequest = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const { user } = useUser();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRequestSchema>({
    resolver: zodResolver(createRequestSchema),
  });

  const { isLoading, data: currentService } = useQuery<Service>(
    "service",
    async () => await ServiceService.getService(serviceId)
  );

  const onSubmit = async (data: CreateRequestSchema) => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please choose some files",
        className: "bg-red-500 text-white",
      });
      return;
    }

    try {
      const res = await RequestService.createRequest({
        ...data,
        files: files.map(({ file }) => file),
        service_id: serviceId || "",
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
    <div className="flex flex-col flex-1 flex-wrap gap-6 items-start p-6 bg-white rounded-xl">
      <div className="flex items-center gap-2">
        <Link to="/request/create">
          <HiChevronLeft />
        </Link>
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
    </div>
  );
};

export default CreateRequest;
