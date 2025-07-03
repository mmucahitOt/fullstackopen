import { useQuery } from "@apollo/client";
import { bookCount } from "../../resolverTypes";

const useBookCount = () => {
  const { data, loading, error } = useQuery(bookCount.query);

  return { data, loading, error };
};

export default useBookCount;