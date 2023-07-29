import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/UserAvatar";


const StyledNavBar  = styled.nav`
background-color:var(--color-grey-0);
padding:1.2rem 2.2rem ;

display: flex;
gap:2.0rem;
align-items:center;
justify-content:flex-end


`
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    
      <StyledNavBar>
       

       
          <UserAvatar />
          <HeaderMenu />
        
      </StyledNavBar>
    
    
  );
};

export default Navbar;
