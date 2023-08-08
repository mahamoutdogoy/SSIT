import React, { Component }  from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddVehicule from "./pages/AddVehicule";
import EditVehicule from "./pages/EditVehicule"
import Vehicules from "./pages/Vehicules";
import VitreFumees from "./pages/VitreFumees";
import AddVitreFumee from "./pages/AddVitreFumee";
import EditVitreFumee from "./pages/EditVitreFumee";
import AddPenalty from './pages/AddPenalty';
import Penalties from './pages/Penalties';
import EditPenalty from './pages/EditPenalty';
import Penaltiess from './pages/Amandes'
import PoliceStations from './pages/PoliceStations';
import AddPoliceStation from './pages/AddPoliceStation';
import EditPoliceStaion from './pages/EditPoliceStation';
import Account from './pages/Account';
import ViewVitreFumee from './components/ViewVitreFumee';
import ViewVitreFumeeOne from './pages/ViewVitreFumeeOne';
import Amandes from './pages/Amandes';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/account" element={<Account />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/vehicules" element={<Vehicules />} />
          <Route path="/vehicules/add" element={<AddVehicule />} />
          <Route path="/vehicules/edit/:id" element={<EditVehicule />} />
          <Route path="/vitreFumees" element={<VitreFumees />} />
          <Route path="/vitreFumees/add" element={<AddVitreFumee />} />
          <Route path="/vitreFumees/edit/:id" element={<EditVitreFumee />} />
          <Route path="/vitreFumees/view/:id" element={<ViewVitreFumeeOne />} />
          <Route path="/penalties/add" element={<AddPenalty />} />
          <Route path="/penalties" element={<Penalties />} />
          <Route path="/penalties/edit/:id" element={<EditPenalty/>} />
          <Route path="/amandes" element={<Amandes />} />
          <Route path="/amandes/edit/:id" element={<Amandes />} />
          <Route path="/policeStations/add" element={<AddPoliceStation />} />
          <Route path="/policeStations/edit/:id" element={<EditPoliceStaion />} />
          <Route path="/policeStations" element={<PoliceStations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
