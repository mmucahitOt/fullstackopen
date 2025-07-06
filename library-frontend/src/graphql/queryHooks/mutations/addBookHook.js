import { useMutation } from "@apollo/client";
import {
  addBook as addBookQuery,
  allBooks,
  bookCount,
  genres,
} from "../../resolverTypes";

const useAddBook = () => {
  const [addBook, { loading, error }] = useMutation(addBookQuery.query, {
    refetchQueries: [
      { query: allBooks.query },
      { query: bookCount.query },
      { query: genres.query },
    ],
  });

  return { addBook, loading, error };
};

export default useAddBook;
