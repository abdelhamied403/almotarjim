import useI18n from "@/hooks/useI18n";
import { z } from "zod";

const useRegistrationSchema = () => {
  const { t } = useI18n();
  const registrationSchema = z.object({
    name: z.string().min(1, { message: t("register.nameError") }),
    email: z
      .string()
      .min(1, { message: t("register.emailError") })
      .email({ message: t("register.emailValidation") }),
    phone: z.string().min(1, { message: t("register.phoneError") }),
    password: z.string().min(1, { message: t("register.passError") }),
  });

  return {
    registrationSchema,
  };
};

export default useRegistrationSchema;
