import { object, string } from 'yup';

export const UpdateUserSchema = object({
  id: string().uuid().required(),
  name: string()
    .required()
    .min(2, "User's name must contain at least 2 characters")
    .max(255, "User's name exceed maximum characters"),
  email: string().email('Must be an email').required('User must have an email'),
});
