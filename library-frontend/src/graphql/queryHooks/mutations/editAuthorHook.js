import { useMutation } from "@apollo/client";
import { editAuthor as editAuthorQuery, allAuthors } from "../../resolverTypes";

const useEditAuthor = () => {
  const [editAuthor, { loading, error }] = useMutation(editAuthorQuery.query, {
    refetchQueries: [{ query: allAuthors.query }],
  });

  return { editAuthor, loading, error };
};

export default useEditAuthor;
