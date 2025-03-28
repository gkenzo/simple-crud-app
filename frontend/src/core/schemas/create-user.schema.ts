import { object, string } from 'yup';

export const CreateUserSchema = object({
  name: string()
    .required('Must have a name')
    .min(2, 'Name must contain at least 2 characters')
    .max(255, 'Name exceed maximum characters'),
  email: string().email('Must be an email').required('Must have an email'),
});
