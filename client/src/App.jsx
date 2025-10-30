import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import EmptyPage from "./pages/EmptyPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DocFormPage from "./pages/DocumentFormPage";
import DivPage from "./pages/DivisionPage";
import DivFormPage from "./pages/DivisionFormPage";
import UserPage from "./pages/UserPage";
import UserFormPage from "./pages/UserFormPage";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EmptyPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/scan" element={<DocFormPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin-division" element={<DivPage />} />
          <Route path="/admin-division/create" element={<DivFormPage />} />
          <Route path="/admin-user" element={<UserPage />} />
          <Route path="/admin-user/create" element={<UserFormPage />} />
          <Route path="/admin-user" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
