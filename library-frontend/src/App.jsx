// import Authors from "./components/Authors";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {

  return (
    <div>
      <div>
        <Link style={{ marginRight: "10px", padding: "5px", border: "1px solid black", borderRadius: "5px"}} to="/">authors</Link>
        <Link style={{ marginRight: "10px", padding: "5px", border: "1px solid black", borderRadius: "5px"}} to="/books">
          books
        </Link>
        <Link style={{ marginRight: "10px", padding: "5px", border: "1px solid black", borderRadius: "5px"}} to="/add">add book</Link>
      </div>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
