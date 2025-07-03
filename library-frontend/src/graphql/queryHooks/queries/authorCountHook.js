import { useQuery } from "@apollo/client";
import { authorCount } from "../../resolverTypes";

const useAuthorCount = () => {
  const { data, loading, error } = useQuery(authorCount.query);

  return { data, loading, error };
};

export default useAuthorCount;
