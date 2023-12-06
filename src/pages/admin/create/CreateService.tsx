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
import useI18n from "@/hooks/useI18n";

const CreateService = () => {
  const { t } = useI18n();
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
        title: t("admin.createService.created"),
        description: t("admin.createService.serviceCreatedSuccess"),
      });

      navigate("/dashboard");
    } catch (error: any) {
      setErrors(error.response.data.error);
      toast({
        title: t("admin.createService.error"),
        variant: "destructive",
        description: t("admin.createService.someFieldsAreInvalid"),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-primary-200 lg:bg-gradient-to-l from-white from-20%  lg:to-[#C6E1F1] lg:to-50%">
      <div className="grid  h-full items-center container mx-auto gap-52">
        <div className="grid gap-5">
          <h1 className="text-3xl font-bold text-center">
            {t("admin.createService.addNewService")}
          </h1>
          <div className="flex gap-3">
            <Field
              label={t("admin.createService.englishTitle")}
              error={errors.title_ar || validationErrors?.title_ar?.message}
              className="basis-1/2"
            >
              <Input
                type="text"
                placeholder="Translation Services "
                {...register("title_ar")}
              />
            </Field>
            <Field
              label={t("admin.createService.arabicTitle")}
              error={errors.title_ar || validationErrors?.title_ar?.message}
              className="basis-1/2"
            >
              <Input
                type="text"
                placeholder="خدمات الترجمه"
                {...register("title_ar")}
              />
            </Field>
          </div>
          <Field
            label={t("admin.createService.englishDesc")}
            error={
              errors.description_en || validationErrors?.description_en?.message
            }
            className="basis-1/2"
          >
            <Textarea
              placeholder="Type service English description here "
              {...register("description_en")}
            ></Textarea>
          </Field>
          <Field
            label={t("admin.createService.arabicDesc")}
            error={
              errors.description_ar || validationErrors?.description_ar?.message
            }
            className="basis-1/2"
          >
            <Textarea
              placeholder="أدخل وصف الخدمه بالغه العربيه هنا "
              {...register("description_ar")}
            ></Textarea>
          </Field>

          <Field
            label={t("admin.createService.price")}
            error={errors.price || validationErrors?.price?.message}
            className="basis-1/2"
          >
            <Input type="text" placeholder="...96" {...register("price")} />
          </Field>
          <Field
            label={t("admin.createService.uploadServiceImage")}
            // error={errors.image || validationErrors?.image?.message}
          >
            <Input
              placeholder={t("admin.createService.uploadImage")}
              type="file"
            />
          </Field>
          <Button onClick={handleSubmit(handleAddService)}>
            {loading ? <Spinner /> : t("admin.createService.addNewService")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateService;
