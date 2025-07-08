import { useQuery } from "@apollo/client";
import { allAuthors } from "../../resolverTypes";

const useAllAuthors = () => {
  const { data, loading, error, refetch } = useQuery(allAuthors.query);

  return { data, loading, error, refetch };
};

export default useAllAuthors;
