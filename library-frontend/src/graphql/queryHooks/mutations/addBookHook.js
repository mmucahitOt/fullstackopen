import { useMutation } from "@apollo/client";
import { addBook as addBookQuery, allBooks } from "../../resolverTypes";

const useAddBook = () => {
  const [addBook, { loading, error }] = useMutation(addBookQuery.query, {
    refetchQueries: [{ query: allBooks.query }],
  });

  return { addBook, loading, error };
};

export default useAddBook;
