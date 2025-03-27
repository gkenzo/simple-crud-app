import { object, string } from 'yup';

export const CreateUserSchema = object({
  name: string()
    .required('User must have a name')
    .min(2, "User's name must contain at least 2 characters")
    .max(255, "User's name exceed maximum characters"),
  email: string().email('Must be an email').required('User must have an email'),
});
