import z from "zod";

import i18n from "@/i18n";

let registrationSchema = z.object({
  name: z.string().min(1, { message: i18n.t("register.nameError") }),
  email: z
    .string()
    .min(1, { message: i18n.t("register.emailError") })
    .email({ message: i18n.t("register.emailValidation") }),
  phone: z.string().min(1, { message: i18n.t("register.phoneError") }),
  password: z.string().min(1, { message: i18n.t("register.passError") }),
});

const initRegistrationSchema = () => {
  registrationSchema = z.object({
    name: z.string().min(1, { message: i18n.t("register.nameError") }),
    email: z
      .string()
      .min(1, { message: i18n.t("register.emailError") })
      .email({ message: i18n.t("register.emailValidation") }),
    phone: z.string().min(1, { message: i18n.t("register.phoneError") }),
    password: z.string().min(1, { message: i18n.t("register.passError") }),
  });
};

initRegistrationSchema();

i18n.on("languageChanged init", () => {
  initRegistrationSchema();
});

export { registrationSchema };
export type AddServiceSchemaType = z.infer<typeof registrationSchema>;
