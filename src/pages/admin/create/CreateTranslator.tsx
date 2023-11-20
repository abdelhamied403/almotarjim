import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegistrationSchemaType,
  registrationSchema,
} from "@/schemas/registrationSchema";
import { useState } from "react";
import Spinner from "@/components/ui/Spinner";

import useI18n from "@/hooks/useI18n";
import Field from "@/components/Field";
import { useToast } from "@/components/ui/use-toast";
import AdminService from "@/services/admin.service";

const CreateTranslator = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegistrationSchemaType>>({});
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  const handleRegister = async (data: RegistrationSchemaType) => {
    try {
      setLoading(true);
      await AdminService.createTranslator(data);
      toast({
        title: "Created",
        description: "Translator Created Succefully",
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
          <h1 className="text-3xl font-bold text-center">
            Create New Translator
          </h1>
          <Field
            label={t("register.name")}
            error={errors.name || validationErrors?.name?.message}
          >
            <Input
              type="text"
              placeholder="Ahmed Mohamed"
              {...register("name")}
            />
          </Field>
          <Field
            label={t("register.email")}
            error={errors.email || validationErrors?.email?.message}
          >
            <Input
              type="email"
              placeholder="olivia@untitledui.com"
              {...register("email")}
            />
          </Field>
          <Field
            label={t("register.phone")}
            error={errors.phone || validationErrors?.phone?.message}
          >
            <Input
              type="text"
              placeholder="+96612216454844"
              {...register("phone")}
            />
          </Field>
          <Field
            label={t("register.password")}
            error={errors.password || validationErrors?.password?.message}
          >
            <Input
              type="password"
              placeholder="*********"
              {...register("password")}
            />
          </Field>
          <Button onClick={handleSubmit(handleRegister)}>
            {loading ? <Spinner /> : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTranslator;
