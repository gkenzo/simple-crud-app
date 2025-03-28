import { object, string } from 'yup';

export const UpdateUserSchema = object({
  id: string().uuid().required(),
  name: string()
    .required()
    .min(2, "Name's too short")
    .max(255, "Name's too long"),
  email: string()
    .email('Must be a valid email')
    .required('Must be a valid email'),
});
