import useAxios from 'axios-hooks';

export const GetGrafOfFiles = () => {
    const [{ data, loading, error }, refetch] = useAxios(
      {
    url:"http://localhost:4321/dash/7",
    method:'get'}
  );
    return { data, loading, error, refetch }
  };