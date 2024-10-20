// App.js

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Component/Header';
import BannerCarousel from './Component/BannerCarousel';
import Main from './Page/Main';
import AllNovel from './Page/AllNovel';
import NovelCategory from './Page/NovelCategory';
import { NovelDataProvider } from './Context/NovelDataContext';
import Footer from './Component/Footer';
import NovelDetail from './Page/NovelDetail';
import ChapterDetail from './Page/ChapterDetail';
import Login from './Page/Login';
import Register from './Page/Register';
import ProfilePage from './Page/ProfilePage';
import EditProfileForm from './Page/EditProfileForm';
import Coin from './Page/Coin';
import AdminLogin from './Admin/AdminLogin'; 
import AdminDashBoard from './Admin/AdminDashBoard';
import NovelList from './Admin/NovelList';
import AddCategory from './Admin/AddCategory';
import EditCategory from './Admin/EditCategory';
import DeleteCategory from './Admin/DeleteCategory';
import AddNovel from './Admin/AddNovel';
import EditNovel from './Admin/EditNovel';
import DeleteNovel from './Admin/DeleteNovel';
import AddChapter from './Admin/AddChapter';
import EditChapter from './Admin/EditChapter';
import DeleteChapter from './Admin/DeleteChapter';
import BlogPage from './Page/BlogPage';
import BlogPageDetail from './Page/BlogPageDetail';
import PostNovel from './Page/PostNovel';
import PostNovelMain from './Page/PostNovelMain';
import ManageNovel from './Admin/ManageNovel';
import UpdatePage from './Page/UpdatePage';
import Rule from './Page/Rule';
import SearchResults from './Page/SearchResults';

function App() {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);

  return (
    <BrowserRouter>
      <NovelDataProvider>
        <Routes>
          <Route path="/" element={user ? <Navigate to="/main" /> : <Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<MainWithHeaderAndFooter user={user} />} />
          <Route path="/AllNovel" element={<AllNovelWithHeaderAndFooter user={user} />} />
          <Route path="/blogpage" element={<BlogPageWithHeaderAndFooter user={user}/>} />
          <Route path="/postnovel" element={<PostNovelWithHeaderAndFooter user={user} />} />
          <Route path="/rule" element={<RuleWithHeaderAndFooter user={user} />} />
          <Route path="/postnovelmain" element={<PostNovelMainWithHeaderAndFooter user={user} />} />
          <Route path="/blog/:id" element={<BlogPageDetailWithHeaderAndFooter user={user}/>} />
          <Route path="/category/:id" element={<NovelCategoryWithHeaderAndFooter user={user}/>} />
          <Route path="/novel/:id" element={<NovelDetailWithHeaderAndFooter user={user} setUser={setUser} />} />
          <Route path="/novel/:id/chapter/:chapterId" element={<ChapterDetailWithHeaderAndFooter user={user} />} />
          <Route path="/profile" element={user ? <ProfilePageWithHeaderAndFooter user={user} /> : <Navigate to="/" />} />
          <Route path="/edit" element={user ? <EditProfileFormWithHeaderAndFooter user={user} /> : <Navigate to="/" />} />
          <Route path="/coin" element={<CoinWithHeaderAndFooter user={user} setUser={setUser} />} />
          <Route path="/search-results" element={<SearchResultsWithHeaderAndFooter user={user} />} />
          <Route path="/adminlogin" element={<AdminLogin setAdmin={setAdmin}/>} />
          <Route path="/admindashboard" element={<AdminDashBoard />} />
          <Route path="/list" element={<NovelList />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route path="/editcategory" element={<EditCategory />} />
          <Route path="/deletecategory" element={<DeleteCategory />} />
          <Route path="/addnovel" element={<AddNovel />} />
          <Route path="/editnovel" element={<EditNovel />} />
          <Route path="/deletenovel" element={<DeleteNovel />} />
          <Route path="/addchapter" element={<AddChapter />} />
          <Route path="/editchapter" element={<EditChapter />} />
          <Route path="/deletechapter" element={<DeleteChapter />} />
          <Route path="/managenovel" element={<ManageNovel />} />
          <Route path="/updates" element={<UpdatePage />} />
        </Routes>
      </NovelDataProvider>
    </BrowserRouter>
  );
}

const MainWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <Main />
    <Footer />
  </>
);

const AllNovelWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <AllNovel />
    <Footer />
  </>
);

const SearchResultsWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <AllNovel />
    <Footer />
  </>
);

const BlogPageWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <BlogPage />
    <Footer />
  </>
);

const RuleWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <Rule />
    <Footer />
  </>
);

const PostNovelWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <PostNovel />
    <Footer />
  </>
);

const PostNovelMainWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <PostNovelMain />
    <Footer />
  </>
);

const BlogPageDetailWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <BlogPageDetail user={user} />
    <Footer />
  </>
);

const NovelCategoryWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <NovelCategory />
    <Footer />
  </>
);

const NovelDetailWithHeaderAndFooter = ({ user, setUser }) => (
  <>
    <Header user={user} setUser={setUser} />
    <BannerCarousel />
    <NovelDetail user={user} setUser={setUser} />
    <Footer />
  </>
);

const ChapterDetailWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <ChapterDetail />
    <Footer />
  </>
);

const ProfilePageWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <ProfilePage user={user} />
    <Footer />
  </>
);

const EditProfileFormWithHeaderAndFooter = ({ user }) => (
  <>
    <Header user={user} />
    <BannerCarousel />
    <EditProfileForm user={user} />
    <Footer />
  </>
);

const CoinWithHeaderAndFooter = ({ user, setUser }) => (
  <>
    <Header user={user} setUser={setUser} />
    <BannerCarousel />
    <Coin user={user} setUser={setUser} />
    <Footer />
  </>
);

export default App;
