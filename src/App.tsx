import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import AllBlogs from "./Components/AllBlogs";
import AddBlog from "./Components/AddBlog";
import About from "./Components/About";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import "./sass/globals.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/new-blog" element={<AddBlog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
