import axios from 'axios';
import { config } from 'dotenv';

config({ path: __dirname + '/.env' });

axios.defaults.headers.common['Authorization'] =
   `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;

export const fetchData = async <T>(url: string): Promise<T> => {
   const result = await axios.get(url);

   return result.data;
};

export const inserData = async <T>(url: string, payload: T): Promise<T> => {
   const result = await axios.post(url, payload);

   return result.data;
};

export const patchData = async <T>(
   url: string,
   payload: Partial<T>
): Promise<T> => {
   const result = await axios.patch(url, payload);

   return result.data;
};

export const updateData = async <T>(url: string, payload: T): Promise<T> => {
   const result = await axios.put(url, payload);

   return result.data;
};

export const deleteData = async <T>(url: string): Promise<T> => {
   const result = await axios.delete(url);

   return result.data;
};
