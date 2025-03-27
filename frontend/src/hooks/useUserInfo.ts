import { User } from '@/domain';

export const useUserInfo = () => {
  const create = async (values: { email: string; name: string }) => {
    const API_URL = `/api/users/`;
    const config: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        name: values.name,
        email: values.email,
      }),
    };

    return fetch(API_URL, config);
  };
  const update = async (values: User) => {
    const API_URL = `/api/user/${values.id}`;
    const config: RequestInit = {
      method: 'PUT',
      body: JSON.stringify({
        name: values.name,
        email: values.email,
      }),
    };

    return fetch(API_URL, config);
  };
  const remove = async (id: string) => {
    const API_URL = `/api/user/${id}`;
    const config: RequestInit = {
      method: 'DELETE',
    };

    return fetch(API_URL, config);
  };
  return { create, update, remove };
};
