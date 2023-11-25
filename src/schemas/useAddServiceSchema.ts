import useI18n from "@/hooks/useI18n";
import { z } from "zod";

const useAddServiceSchema = () => {
  const { t } = useI18n();
  const addServiceSchema = z.object({
    title: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.title"),
    }),
    description: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.description"),
    }),
    price: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.description"),
    }),
    image: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.description"),
    }),
  });

  return {
    addServiceSchema,
  };
};

export default useAddServiceSchema;
