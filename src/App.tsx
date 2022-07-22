import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Header from "./Components/Header";
import AllBlogs from "./Components/AllBlogs";
import MyBlogs from "./Components/MyBlogs";
import AddBlog from "./Components/AddBlog";
import About from "./Components/About";
import "./sass/globals.scss";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<AllBlogs />} />
        <Route path="/my-blogs" element={<MyBlogs />} />
        <Route path="/new-blog" element={<AddBlog />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
