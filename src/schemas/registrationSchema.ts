import z from "zod";

export const registrationSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "email is invalid" }),
  phone: z.string().min(1, { message: "phone is required" }),
  password: z.string().min(1, { message: "password is required" }),
});
export type RegistrationSchemaType = z.infer<typeof registrationSchema>;
