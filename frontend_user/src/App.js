import logo from './logo.svg';
import './App.css';
import React, { use } from "react";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from './components/Home';
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/pages/Dashboard";
import Layout from './components/pages/include/Layout';
import Body_type from './components/pages/Body_type';
import MealPlans from './components/pages/MealPlans';
import TipsPage from './components/pages/TipsPage';
import ProfilePage from './components/pages/ProfilePage';

function App() {

   


  return (
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login  />} />

        <Route path="/dashboard" element={<Layout ><Dashboard /></Layout>} />
         <Route path="/body_type" element={<Layout ><Body_type /></Layout>} />
         <Route path="/mealplans" element={<Layout ><MealPlans  /></Layout>} />
         <Route path="/tipspage" element={<Layout ><TipsPage /></Layout>} />
         <Route path="/profilepage" element={<Layout ><ProfilePage /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
