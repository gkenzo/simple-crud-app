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

    const res = await fetch(API_URL, config);

    if (!res.ok)
      throw new Error('Something went wrong while trying to create user.');

    return res.json();
  };
  const list = async (): Promise<{ items: User[] }> => {
    const res = await fetch(`/api/users`);
    if (!res.ok)
      throw new Error('Something went wrong while trying to fetch users.');

    return res.json();
  };
  const find = async (id: string): Promise<User> => {
    const res = await fetch(`/api/user/${id}`);
    if (!res.ok)
      throw new Error('Something went wrong while trying to find user.');

    return res.json();
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

    const res = await fetch(API_URL, config);

    if (!res.ok)
      throw new Error('Something went wrong while trying to update user.');

    return res.json();
  };
  const remove = async (id: string) => {
    const API_URL = `/api/user/${id}`;
    const config: RequestInit = {
      method: 'DELETE',
    };

    const res = await fetch(API_URL, config);

    if (!res.ok)
      throw new Error('Something went wrong while trying to delete user.');

    return res.json();
  };
  return { create, list, find, update, remove };
};
