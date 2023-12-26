import Header from "./components/header/Header";
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/PostsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/create-post/CreatePost";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/admin-dashboard" element={<AdminDashboard />}/>
        <Route path="/posts" element={<PostsPage />}/>
        <Route path="/posts/create" element={<CreatePost />}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
