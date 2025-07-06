import { useQuery } from "@apollo/client";
import { genres } from "../../resolverTypes";

const useGenres = () => {
  const { data, loading, error } = useQuery(genres.query);

  return { data, loading, error };
};

export default useGenres;