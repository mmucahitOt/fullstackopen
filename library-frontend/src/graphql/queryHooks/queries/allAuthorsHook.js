import { useQuery } from "@apollo/client";
import { allAuthors } from "../../resolverTypes";

const useAllAuthors = () => {
  const { data, loading, error } = useQuery(allAuthors.query);

  return { data, loading, error };
};

export default useAllAuthors;
