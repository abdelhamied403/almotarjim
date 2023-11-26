import useI18n from "@/hooks/useI18n";
import { z } from "zod";

const useAddServiceSchema = () => {
  const { t } = useI18n();
  const addServiceSchema = z.object({
    enTitle: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.title"),
    }),
    arTitle: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.title"),
    }),
    enDescription: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.description"),
    }),
    arDescription: z.string().min(1, {
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
