import Header from "./components/header/Header";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from "./pages/home/Home";
import Login from "./pages/forms/Login";
import Register from "./pages/forms/Register";
import PostsPage from "./pages/posts-page/PostsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreatePost from "./pages/create-post/CreatePost";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";
import Category from "./pages/cateogry/Cateogry";
import Profile from "./pages/profile/Profile";
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";
import { useSelector } from "react-redux"
import VerifyEmail from "./pages/verify-email/VerifyEmail";
import isTokenExpired from "./utils/isTokenExpired";
import { useEffect, useState } from "react";


function App() {

  const { user } = useSelector(state => state.auth)
  const [isTokenValid, setIsTokenValid] = useState(false)

  useEffect(() => {
      setIsTokenValid(!isTokenExpired(user?.token))
  }, [user])

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center"/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={!isTokenValid ? <Login /> : <Navigate to="/" />}/>
        <Route path="/register" element={!isTokenValid ? <Register /> : <Navigate to="/" />}/>
        <Route path="/users/:userId/verify/:token" element={!isTokenValid ? <VerifyEmail /> : <Navigate to="/" />}/>
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />}/>
        <Route path="/profile/:id" element={<Profile />}/>
        <Route path="posts">
          <Route index element={<PostsPage />}/>
          <Route path="create" element={isTokenValid ? <CreatePost /> : <Navigate to="/" />}/>
          <Route path=":id" element={<PostDetails />}/>
          <Route path="categories/:category" element={<Category />}/>
        </Route>
        <Route path="admin-dashboard">
          <Route index element={ isTokenValid && user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />}/>
          <Route path="users-table" element={isTokenValid && user?.isAdmin ? <UsersTable /> : <Navigate to="/" />}/>
          <Route path="posts-table" element={isTokenValid && user?.isAdmin ? <PostsTable /> : <Navigate to="/" />}/>
          <Route path="categories-table" element={isTokenValid && user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />}/>
          <Route path="comments-table" element={isTokenValid && user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
