import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from './components/pages/includes/Layout';
import Dashboard from './components/pages/Dashboard';
import Users from './components/pages/Users';
import Meal from './components/pages/AssignMeal';
import ListMeal from './components/pages/ListMeal';
import Admins from './components/pages/Admin';
import Setting from './components/pages/ProfilePage';
import MessageCenter from './components/pages/MessageCenter';
import Forms from './components/pages/Forms';

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<Layout ><Dashboard /></Layout>} />
        <Route path="/users" element={<Layout ><Users /></Layout>} />
        <Route path="/admins" element={<Layout ><Admins /></Layout>} />
        <Route path="/forms" element={<Layout ><Forms /></Layout>} />
        <Route path="/meals" element={<Layout ><Meal /></Layout>} />
         <Route path="/listmeals" element={<Layout ><ListMeal /></Layout>} />
         <Route path="/messagecenter" element={<Layout ><MessageCenter /></Layout>} />
        <Route path="/setting" element={<Layout ><Setting /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
