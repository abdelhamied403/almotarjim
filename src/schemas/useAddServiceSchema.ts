import useI18n from "@/hooks/useI18n";
import { z } from "zod";

const useAddServiceSchema = () => {
  const { t } = useI18n();
  const addServiceSchema = z.object({
    title_en: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.title"),
    }),
    title_ar: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.title"),
    }),
    description_en: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.description"),
    }),
    description_ar: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.description"),
    }),
    price: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.description"),
    }),
  });

  return {
    addServiceSchema,
  };
};

export default useAddServiceSchema;
