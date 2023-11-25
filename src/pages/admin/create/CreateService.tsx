import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

import Field from "@/components/Field";
import { useToast } from "@/components/ui/use-toast";
import AdminService from "@/services/admin.service";
import { Textarea } from "@/components/ui/textarea";
import useAddServiceSchema from "@/schemas/useAddServiceSchema";
import { z } from "zod";

const CreateService = () => {
  const { addServiceSchema } = useAddServiceSchema();
  type AddServiceSchemaType = z.infer<typeof addServiceSchema>;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<AddServiceSchemaType>>({});
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<AddServiceSchemaType>({
    resolver: zodResolver(addServiceSchema),
  });

  const handleAddService = async (data: AddServiceSchemaType) => {
    try {
      setLoading(true);
      await AdminService.createService(data);
      toast({
        title: "Created",
        description: "Service Created Succefully",
      });

      navigate("/dashboard");
    } catch (error: any) {
      setErrors(error.response.data.error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Some fields are invalid",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-primary-200 lg:bg-gradient-to-l from-white from-20%  lg:to-[#C6E1F1] lg:to-50%">
      <div className="grid  h-full items-center container mx-auto gap-52">
        <div className="grid gap-5">
          <h1 className="text-3xl font-bold text-center">Add New Service</h1>
          <div className="flex gap-3">
            <Field
              label="English Title"
              error={errors.title || validationErrors?.title?.message}
              className="basis-1/2"
            >
              <Input
                type="text"
                placeholder="Translation Services "
                {...register("title")}
              />
            </Field>
            <Field
              label="Arabic Title"
              error={errors.title || validationErrors?.title?.message}
              className="basis-1/2"
            >
              <Input
                type="text"
                placeholder="خدمات الترجمه"
                {...register("title")}
              />
            </Field>
          </div>
          <Field
            label="Arabic Description"
            error={errors.description || validationErrors?.description?.message}
            className="basis-1/2"
          >
            <Textarea
              placeholder="أدخل وصف الخدمه بالغه العربيه هنا "
              {...register("description")}
            ></Textarea>
          </Field>
          <Field
            label="English Description"
            error={errors.description || validationErrors?.description?.message}
            className="basis-1/2"
          >
            <Textarea
              placeholder="Type service English description here "
              {...register("description")}
            ></Textarea>
          </Field>
          <Field
            label="Service Price"
            error={errors.price || validationErrors?.price?.message}
            className="basis-1/2"
          >
            <Input type="text" placeholder="...96" {...register("price")} />
          </Field>
          <Field
            label="Choose Service Image"
            error={errors.image || validationErrors?.image?.message}
          >
            <Input placeholder="choose image" type="file" />
          </Field>
          <Button onClick={handleSubmit(handleAddService)}>
            {loading ? <Spinner /> : "Add New Service"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
