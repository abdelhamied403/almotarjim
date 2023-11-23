import useI18n from "@/hooks/useI18n";
import { z } from "zod";

const useCreateRequestSchema = () => {
  const { t } = useI18n();
  const createRequestSchema = z.object({
    title: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.title"),
    }),
    description: z.string().min(1, {
      message: t("user.requests.createForm.errors.required.description"),
    }),
  });

  return {
    createRequestSchema,
  };
};

export default useCreateRequestSchema;
