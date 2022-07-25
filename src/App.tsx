import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./Context/AppContext";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Header from "./Components/Header";
import AllBlogs from "./Components/AllBlogs";
import MyBlogs from "./Components/MyBlogs";
import AddBlog from "./Components/AddBlog";
import About from "./Components/About";
import { AuthState } from "./Types/types";
import "./sass/globals.scss";

function App() {
  const [userStatus, setUserStatus] = useState<string>("");
  const authContext: AuthState = { userStatus, setUserStatus };

  return (
    <BrowserRouter>
      <AppProvider value={authContext}>
        <Header />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AllBlogs />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/new-blog" element={<AddBlog />} />
          <Route path="/about-us" element={<About />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
