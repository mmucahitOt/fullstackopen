import { useContext } from "react";
import { AuthContext } from "./auth.provider";

export const useCurrentUser = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  return { currentUser, setCurrentUser };
};
