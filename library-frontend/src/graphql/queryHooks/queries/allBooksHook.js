import { useQuery } from "@apollo/client";
import { allBooks } from "../../resolverTypes";
import { useState } from "react";

const useAllBooks = () => {
  const [authorName, setAuthorName] = useState(null);
  const [genre, setGenre] = useState(null);

  const { data, loading, error } = useQuery(allBooks.query, {
    variables: {
      authorName: authorName,
      genre: genre,
    },
  });

  console.log("data", data);
  console.log("loading", loading);
  console.log("error", error);

  return { data, loading, error, authorName, setAuthorName, genre, setGenre };
};

export default useAllBooks;
