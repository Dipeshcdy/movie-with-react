import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import MovieDetail from "./components/MovieDetail";
import Profile from "./components/Profile";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/movie/:id" element={<MovieDetail/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/me" element={<Profile/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
