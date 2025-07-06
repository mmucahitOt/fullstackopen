import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { useCurrentUser } from "./provider/current-user.hook";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./graphql/apolloClient";

const App = () => {
  const { currentUser } = useCurrentUser();

  return (
    <ApolloProvider client={apolloClient}>   
      <div>
        <h1>Library App</h1>
      </div>
      <div>
        <Link style={{ marginRight: "10px", padding: "5px", border: "1px solid black", borderRadius: "5px"}} to="/books">
          books
        </Link>
        <Link style={{ marginRight: "10px", padding: "5px", border: "1px solid black", borderRadius: "5px" }} to="/authors">authors</Link>
        {!currentUser && <Link style={{ marginRight: "10px", padding: "5px", border: "1px solid black", borderRadius: "5px"}} to="/login">login</Link>}
        {currentUser && <Link style={{ marginRight: "10px", padding: "5px", border: "1px solid black", borderRadius: "5px" }} to="/add">add book</Link>}
        {currentUser && <Logout />}
      </div>
      <div>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} /> 
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </ApolloProvider>
  );
};

export default App;
