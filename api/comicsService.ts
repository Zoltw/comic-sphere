import { useQuery } from '@tanstack/react-query';

export const fetchComic = async (comicId?: string) => {
  const res = await fetch(`http://10.0.2.2:8080/comic/${comicId}`);
  const data = await res.json();
  return data;
};

export const useComic = (comicId: string) => {
  return useQuery(['comic', comicId], () => fetchComic(comicId));
};
