import React from 'react'
import styled from 'styled-components'
import { HiOutlineUser} from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import {IoLogOutOutline } from "react-icons/io5";
const StyleHeaderMenu = styled.ul`
display:flex;
gap:0.4rem;

`

function HeaderMenu() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
  
    const logout = () => {
      dispatch(LogOut());
      dispatch(reset());
      navigate("/");
    };
    const account = () => {
   
        navigate("/account");
      };


  return <StyleHeaderMenu>
    <li>
    <button onClick={account} className="button is-light">
               <HiOutlineUser />
                </button>
    </li>
    <li>
    <button onClick={logout} className="button is-white">
              <IoLogOutOutline /> 
            </button>
    </li>
  </StyleHeaderMenu>
}

export default HeaderMenu